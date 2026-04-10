/* ═══════════════════════════════════════════════════════════
   INIT - wait for GSAP + Lenis (deferred scripts)
   Falls back gracefully after ~3s if CDNs are blocked.
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  let attempts = 0;

  const wait = (fn) => {
    attempts++;

    if (typeof gsap !== 'undefined' && typeof Lenis !== 'undefined') {
      // Libs loaded - remove loading class and run
      document.body.classList.remove('js-loading');
      fn();
    } else if (attempts > 180) {
      // ~3 seconds elapsed, libs didn't load (slow network / firewall)
      // Gracefully show content that would otherwise stay hidden
      document.body.classList.remove('js-loading');
      const photo = document.getElementById('heroPhoto');
      if (photo) photo.style.cssText = 'opacity:1;transition:opacity 0.6s ease';
      // chars never got translateY applied since setupHeroTitle() never ran
      // so they're already visible - no action needed
    } else {
      requestAnimationFrame(() => wait(fn));
    }
  };

  wait(init);
});

function init() {
  gsap.registerPlugin(ScrollTrigger);
  setupLenis();
  setupCursor();
  setupMobileNav();
  setupNav();
  setupHeroTitle();
  setupHeroPhoto();
  setupScrollReveal();
  setupSkillBars();
  setupProjectHover();
}

/* ═══════════════════════════════════════════════════════════
   LENIS SMOOTH SCROLL
═══════════════════════════════════════════════════════════ */
function setupLenis() {
  const lenis = new Lenis({
    duration: 0.85,
    easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic — snappy start, gentle stop
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  window._lenis = lenis;
}

/* ═══════════════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════════════ */
function setupCursor() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  const dot  = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');

  let mouseX = -200, mouseY = -200;
  let ringX  = -200, ringY  = -200;
  let visible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!visible) {
      visible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    }
  });

  window.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
    visible = false;
  });

  gsap.ticker.add(() => {
    gsap.set(dot, { x: mouseX, y: mouseY });
    ringX += (mouseX - ringX) * 0.11;
    ringY += (mouseY - ringY) * 0.11;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Hover states
  document.querySelectorAll('.project, .skill-block, .about__photo-frame, .timeline__item').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.remove('cursor--hover');
      cursor.classList.add('cursor--link');
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--link'));
  });

  gsap.set(cursor, { opacity: 0 });
}

/* ═══════════════════════════════════════════════════════════
   MOBILE NAV
   Hamburger toggle - fullscreen overlay with staggered link reveals.
   Uses GSAP for smooth open/close. Body scroll locked while open.
═══════════════════════════════════════════════════════════ */
function setupMobileNav() {
  const burger    = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  if (!burger || !mobileNav) return;

  const links = Array.from(mobileNav.querySelectorAll('a'));

  // Add decorative numbers to main nav links (not the resume one)
  links.forEach((link, i) => {
    if (!link.classList.contains('nav__mobile-link--resume')) {
      const num = document.createElement('span');
      num.className = 'nav__mobile-num';
      num.textContent = `0${i + 1}`;
      link.prepend(num);
    }
  });

  // Initial hidden state - GSAP owns opacity + y so CSS stays clean
  gsap.set(links, { y: 40, opacity: 0 });

  let isOpen = false;
  let tl     = null;

  const openMenu = () => {
    isOpen = true;
    burger.classList.add('is-open');
    mobileNav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (tl) tl.kill();
    tl = gsap.timeline();

    // Links slide up with quick stagger after overlay fades in
    tl.to(links, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'expo.out',
      stagger: 0.065,
      delay: 0.18,
    });
  };

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');

    if (tl) tl.kill();
    tl = gsap.timeline({
      onComplete: () => {
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Reset for next open
        gsap.set(links, { y: 40, opacity: 0 });
      },
    });

    // Links fly out upward in reverse stagger, then overlay fades
    tl.to(links, {
      y: -22,
      opacity: 0,
      duration: 0.28,
      ease: 'expo.in',
      stagger: { each: 0.045, from: 'end' },
    });
  };

  burger.addEventListener('click', () => {
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close on any link click, then scroll to anchor
  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && window._lenis) {
        const target = document.querySelector(href);
        if (target) {
          // Wait for close animation to finish
          setTimeout(() => {
            window._lenis.scrollTo(target, { offset: -72, duration: 1.4, easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 });
          }, 380);
        }
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
function setupNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -60',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });

  // Smooth scroll anchor links (desktop nav)
  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (window._lenis) {
        window._lenis.scrollTo(target, { offset: -72, duration: 1.4, easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   HERO TITLE - character split + stagger
═══════════════════════════════════════════════════════════ */
function setupHeroTitle() {
  const lines = document.querySelectorAll('.hero__line[data-split]');

  lines.forEach((line) => {
    const text = line.textContent.trim();
    line.innerHTML = text.split('').map((char) =>
      char === ' '
        ? '<span class="char" style="display:inline-block;width:0.28em"> </span>'
        : `<span class="char" style="display:inline-block;transform:translateY(115%)">${char}</span>`
    ).join('');
  });

  const chars = document.querySelectorAll('.hero__line .char');

  gsap.to(chars, {
    y: 0,
    duration: 1.05,
    ease: 'expo.out',
    stagger: 0.038,
    delay: 0.1,
  });

  gsap.from('.hero__label', {
    opacity: 0, y: 10,
    duration: 0.8, ease: 'expo.out', delay: 0.25,
  });
  gsap.from('.hero__bottom', {
    opacity: 0, y: 18,
    duration: 0.9, ease: 'expo.out', delay: 0.65,
  });
  gsap.from('.hero__scroll-hint', {
    opacity: 0,
    duration: 0.7, ease: 'none', delay: 1.1,
  });
}

/* ═══════════════════════════════════════════════════════════
   HERO PHOTO
═══════════════════════════════════════════════════════════ */
function setupHeroPhoto() {
  const photo = document.getElementById('heroPhoto');
  if (!photo) return;

  gsap.to(photo, {
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.55,
  });

  // Subtle vertical drift on scroll
  gsap.to('.hero__photo-wrap', {
    y: '-6%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
function setupScrollReveal() {
  // Section titles - slide up reveal
  document.querySelectorAll('.section__title[data-split]').forEach((title) => {
    const text = title.textContent.trim();
    title.innerHTML = `<span style="display:block;overflow:hidden"><span style="display:block;transform:translateY(100%)">${text}</span></span>`;

    ScrollTrigger.create({
      trigger: title,
      start: 'top 87%',
      onEnter: () => {
        gsap.to(title.querySelector('span span'), {
          y: 0, duration: 0.95, ease: 'expo.out',
        });
      },
      once: true,
    });
  });

  // Contact CTA - two lines
  const contactCta = document.querySelector('.contact__cta[data-split]');
  if (contactCta) {
    const lines = contactCta.innerHTML.split('<br>');
    contactCta.innerHTML = lines.map((line) =>
      `<span style="display:block;overflow:hidden"><span style="display:block;transform:translateY(105%)">${line}</span></span>`
    ).join('');

    ScrollTrigger.create({
      trigger: contactCta,
      start: 'top 87%',
      onEnter: () => {
        gsap.to(contactCta.querySelectorAll('span span'), {
          y: 0, duration: 1.05, ease: 'expo.out', stagger: 0.09,
        });
      },
      once: true,
    });
  }

  // Projects
  gsap.utils.toArray('.project').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 24,
      duration: 0.75, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      delay: i * 0.06,
    });
  });

  // Skill blocks
  gsap.utils.toArray('.skill-block').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 16,
      duration: 0.65, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      delay: (i % 3) * 0.07,
    });
  });

  // Timeline items
  gsap.utils.toArray('.timeline__item').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 20,
      duration: 0.75, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      delay: i * 0.08,
    });
  });

  // About
  gsap.from('.about__photo-frame', {
    opacity: 0, x: -24,
    duration: 0.95, ease: 'expo.out',
    scrollTrigger: { trigger: '.about__grid', start: 'top 82%', once: true },
  });

  gsap.utils.toArray('.about__text-col > *').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 18,
      duration: 0.75, ease: 'expo.out',
      delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray('.award').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: -14,
      duration: 0.6, ease: 'expo.out',
      delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });

  // Contact pieces
  gsap.from('.contact__email', {
    opacity: 0, y: 14,
    duration: 0.75, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact__email', start: 'top 90%', once: true },
  });

  gsap.from('.contact__links', {
    opacity: 0, y: 10,
    duration: 0.65, ease: 'expo.out',
    scrollTrigger: { trigger: '.contact__links', start: 'top 93%', once: true },
  });

  // Section headers
  gsap.utils.toArray('.section__header').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 14,
      duration: 0.65, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   SKILL BARS
═══════════════════════════════════════════════════════════ */
function setupSkillBars() {
  document.querySelectorAll('.skill-block__fill').forEach((bar) => {
    const target = bar.dataset.width || '70';
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(bar, {
          width: target + '%',
          duration: 1.5, ease: 'expo.out', delay: 0.15,
        });
      },
      once: true,
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   PROJECT HOVER - title nudge
═══════════════════════════════════════════════════════════ */
function setupProjectHover() {
  document.querySelectorAll('.project').forEach((project) => {
    const title = project.querySelector('.project__title');
    if (!title) return;

    project.addEventListener('mouseenter', () => {
      gsap.to(title, { x: 7, duration: 0.38, ease: 'expo.out' });
    });
    project.addEventListener('mouseleave', () => {
      gsap.to(title, { x: 0, duration: 0.5, ease: 'expo.out' });
    });
  });
}