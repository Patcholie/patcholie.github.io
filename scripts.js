// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, Observer);

// Elite State Management - 
const AppState = {
  mouseX: 0,
  mouseY: 0,
  cursorTrails: [],
  isMenuOpen: false,
  isLoaded: false,
  trailCount: 20,
  currentSection: 0,
  totalSections: 5,
  scrollProgress: 0,
  isScrolling: false,
  lastScrollTime: 0,
};

// Performance optimized scroll container - 
const container = document.querySelector(".container");

// Enhanced Locomotive Scroll Configuration - 
const scroller = new LocomotiveScroll({
  el: container,
  smooth: true,
  multiplier: 1,
  class: "is-revealed",
  scrollbarContainer: false,
  scrollFromAnywhere: false,
  getDirection: true,
  getSpeed: true,
  smartphone: {
    smooth: true,
  },
  tablet: {
    smooth: true,
  },
});

// Enhanced ScrollTrigger Integration - 
scroller.on("scroll", (args) => {
  ScrollTrigger.update();
  AppState.scrollProgress = args.scroll.y / (args.limit.y || 1);
  AppState.isScrolling = true;
  AppState.lastScrollTime = Date.now();

  // Update progress indicators
  updateScrollProgress();
  updateSectionNavigation(args.scroll.y);
});

ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: container.style.transform ? "transform" : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => scroller.update());

// Professional Scroll Progress System - 
class ScrollProgressSystem {
  constructor() {
    this.progressLine = document.querySelector(".progress-line");
    this.progressText = document.querySelector(".progress-text");
    this.progressIndicator = document.querySelector(".progress-indicator");

    this.init();
  }

  init() {
    // Show progress indicator after initial load
    setTimeout(() => {
      this.progressIndicator?.classList.add("visible");
    }, 2000);
  }

  update(progress) {
    const percentage = Math.round(progress * 100);

    if (this.progressLine) {
      gsap.set(this.progressLine, {
        scaleX: progress,
        transformOrigin: "left center",
      });
    }

    if (this.progressText) {
      // Animate number change
      gsap.to(this.progressText, {
        textContent: percentage.toString().padStart(2, "0"),
        duration: 0.5,
        ease: "power2.out",
        snap: { textContent: 1 },
      });
    }
  }
}

// Professional Section Navigation System - 
class SectionNavigationSystem {
  constructor() {
    this.navDots = document.querySelectorAll(".nav-dot");
    this.sections = document.querySelectorAll("[data-section-index]");
    this.sectionNavigation = document.querySelector(".section-navigation");

    this.init();
  }

  init() {
    // Show section navigation after load
    setTimeout(() => {
      this.sectionNavigation?.classList.add("visible");
    }, 3000);

    // Bind click events
    this.navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.scrollToSection(index));
    });
  }

  scrollToSection(index) {
    const targetSection = document.querySelector(
      `[data-section-index="${index}"]`
    );
    if (targetSection) {
      scroller.scrollTo(targetSection, {
        duration: 1500,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }
  }

  updateActiveSection(scrollY) {
    const windowHeight = window.innerHeight;

    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenter = sectionTop + sectionHeight / 2;

      if (
        scrollY + windowHeight / 2 >= sectionCenter - windowHeight / 4 &&
        scrollY + windowHeight / 2 <= sectionCenter + windowHeight / 4
      ) {
        if (AppState.currentSection !== index) {
          AppState.currentSection = index;
          this.updateNavDots(index);
        }
      }
    });
  }

  updateNavDots(activeIndex) {
    this.navDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }
}

// Professional Cursor System -  WITH TRAILS
class EliteCursor {
  constructor() {
    if (window.innerWidth <= 768) return;
    this.init();
    this.createTrails();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.dot = document.getElementById("cursor-dot");
    this.outline = document.getElementById("cursor-outline");
    this.system = document.querySelector(".cursor-system");

    gsap.set([this.dot, this.outline], { opacity: 1 });
  }

  createTrails() {
    for (let i = 0; i < AppState.trailCount; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";

      const size = 6 - i * 0.25;
      const opacity = (1 - i / AppState.trailCount) * 0.5;

      trail.style.width = `${size}px`;
      trail.style.height = `${size}px`;
      trail.style.opacity = opacity;
      trail.style.background = `rgba(212, 175, 55, ${opacity})`;
      trail.style.position = "absolute";
      trail.style.borderRadius = "50%";
      trail.style.pointerEvents = "none";
      trail.style.willChange = "transform";

      this.system.appendChild(trail);

      AppState.cursorTrails.push({
        element: trail,
        x: 0,
        y: 0,
        speed: 0.04 + i * 0.002,
      });
    }
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => {
      AppState.mouseX = e.clientX;
      AppState.mouseY = e.clientY;
    });

    const interactiveElements = document.querySelectorAll(`
      a, button, .control-dot, .nav-link, .social-link, 
      .btn, .logo-container, .nav-toggle, .close-toggle, 
      .project-card, .nav-dot
    `);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => this.onHover(true));
      element.addEventListener("mouseleave", () => this.onHover(false));
    });
  }

  onHover(isHovering) {
    if (isHovering) {
      gsap.to(this.outline, {
        scale: 2.5,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(this.dot, {
        scale: 0.2,
        duration: 0.4,
      });
      this.outline.classList.add("hover");
    } else {
      gsap.to(this.outline, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(this.dot, {
        scale: 1,
        duration: 0.4,
      });
      this.outline.classList.remove("hover");
    }
  }

  animate() {
    gsap.set(this.dot, {
      x: AppState.mouseX,
      y: AppState.mouseY,
    });

    gsap.to(this.outline, {
      x: AppState.mouseX,
      y: AppState.mouseY,
      duration: 0.3,
      ease: "power2.out",
    });

    AppState.cursorTrails.forEach((trail, index) => {
      const speed = trail.speed;
      trail.x += (AppState.mouseX - trail.x) * speed;
      trail.y += (AppState.mouseY - trail.y) * speed;

      gsap.set(trail.element, {
        x: trail.x,
        y: trail.y,
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Enhanced Preloader System -  ORIGINAL
class SecurityPreloader {
  constructor() {
    this.preloader = document.getElementById("preloader");
    this.progressBar = document.getElementById("progress-bar");
    this.gatewayLines = document.querySelectorAll(".gateway-line");

    this.init();
  }

  init() {
    gsap.set(this.gatewayLines, { opacity: 0, x: -60 });
    this.animate();
  }

  animate() {
    const tl = gsap.timeline({
      onComplete: () => this.complete(),
    });

    // Slower line appearances with more elegant stagger
    tl.to(this.gatewayLines, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power2.out", // Smoother easing
    });

    // Much slower progress bar animation
    tl.to(
      this.progressBar,
      {
        width: "25%",
        duration: 1.8,
        ease: "power1.inOut",
      },
      1.0
    );

    tl.to(
      this.progressBar,
      {
        width: "60%",
        duration: 1.4,
        ease: "power1.inOut",
      },
      3.0
    );

    tl.to(
      this.progressBar,
      {
        width: "100%",
        duration: 1.2,
        ease: "power1.inOut",
      },
      5.5
    );

    // Subtle glitch effects - less jarring
    tl.to(
      this.gatewayLines,
      {
        x: 1, // Reduced from 3
        duration: 0.03,
        yoyo: true,
        repeat: 1, // Reduced from 3
        stagger: 0.005,
      },
      4.0
    );

    tl.to(
      this.gatewayLines,
      {
        opacity: 0.9, // Less dramatic
        duration: 0.02,
        yoyo: true,
        repeat: 2, // Reduced from 5
        stagger: 0.003,
      },
      6.5
    );
  }

  // smoother exit transition
  complete() {
    gsap.to(this.preloader, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.0,
      ease: "power2.inOut", // Smoother easing
      onComplete: () => {
        this.preloader.style.display = "none";
        AppState.isLoaded = true;
        this.initMainContent();
      },
    });
  }

  // Much more gradual content appearance
  initMainContent() {
    const mainContent = document.getElementById("main-content");
    const header = document.getElementById("main-header");
    const footer = document.getElementById("main-footer");

    gsap.fromTo(
      mainContent,
      {
        y: "100vh",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );

    // Header slides down from top
    gsap.fromTo(
      header,
      {
        y: "-100%",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        delay: 0.6,
        ease: "back.out(1.2)",
      }
    );

    // Footer slides up from bottom
    gsap.fromTo(
      footer,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        delay: 0.9,
        ease: "back.out(1.2)",
      }
    );

    // Initialize systems with delays for smoother experience
    setTimeout(() => new HeroAnimations(), 800);
    setTimeout(() => new TerminalAnimations(), 1200);
    setTimeout(() => new NavigationSystem(), 1600);
    setTimeout(() => new ParallaxSystem(), 2000);
    setTimeout(() => new ReactiveScrollSystem(), 2400);
    setTimeout(() => new VisualElementsSystem(), 2800);
  }
}

// Enhanced Reactive Scroll System - 
class ReactiveScrollSystem {
  constructor() {
    this.initializeElementVisibility();
    this.initElementReactivity();
    this.initCardMagnetism();
    this.initTextAnimations();
    this.initButtonReactions();
    this.initIconAnimations();
    this.initSectionStates();
  }

  initializeElementVisibility() {
    // Ensure all elements are visible by default
    const allScrollElements = document.querySelectorAll('[class*="scroll-"]');
    allScrollElements.forEach((element) => {
      gsap.set(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "transform,filter",
      });
    });

    // Set initial states for specific elements
    const heroElements = document.querySelectorAll(".scroll-element");
    heroElements.forEach((element) => {
      gsap.set(element, { opacity: 1, y: 0 });
    });

    const cards = document.querySelectorAll(".scroll-card");
    cards.forEach((card) => {
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
    });

    const textElements = document.querySelectorAll(
      ".scroll-text, .scroll-description, .scroll-project-title"
    );
    textElements.forEach((text) => {
      gsap.set(text, { opacity: 1, y: 0 });
    });
  }

  initElementReactivity() {
    // Hero elements scroll reactivity
    const heroElements = document.querySelectorAll(".scroll-element");
    heroElements.forEach((element, index) => {
      const offset = parseFloat(element.dataset.scrollOffset) || 0;

      ScrollTrigger.create({
        scroller: container,
        trigger: element,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const centerDistance = Math.abs(progress - 0.5) * 2;
          const scale = 1 + (1 - centerDistance) * 0.02;

          gsap.set(element, {
            scale: scale,
            y: (progress - 0.5) * 20 * offset,
          });
        },
      });
    });

    // Section numbers dynamic scaling
    const sectionNumbers = document.querySelectorAll(".scroll-number");
    sectionNumbers.forEach((number) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: number.closest(".section"),
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress * 0.3;

          gsap.set(number, {
            scale: scale,
            rotationZ: progress * 5,
          });
        },
      });
    });
  }

  initCardMagnetism() {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card, index) => {
      // Enhanced magnetic effect
      ScrollTrigger.create({
        scroller: container,
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const centerY = 0.5;
          const distance = Math.abs(progress - centerY);
          const magnetism = Math.max(0, 1 - distance * 2);

          const scale = 1 + magnetism * 0.05;
          const rotationY = (progress - centerY) * 8;
          const glow = magnetism * 0.2;

          gsap.set(card, {
            scale: scale,
            rotationY: rotationY,
            boxShadow: `0 ${5 + magnetism * 20}px ${
              30 + magnetism * 20
            }px rgba(212, 175, 55, ${glow})`,
            z: magnetism * 30,
          });

          // Update card class for CSS interactions
          if (magnetism > 0.5) {
            card.classList.add("magnetic");
          } else {
            card.classList.remove("magnetic");
          }
        },
      });
    });
  }

  initTextAnimations() {
    // Highlight words animation
    const highlightWords = document.querySelectorAll(".highlight-word");
    highlightWords.forEach((word) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: word,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(word, {
            color: "var(--color-accent-primary)",
            textShadow: "0 0 10px rgba(212, 175, 55, 0.3)",
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    });
  }

  initButtonReactions() {
    const scrollButtons = document.querySelectorAll(".btn");

    scrollButtons.forEach((button) => {
      const btnText = button.querySelector(".btn-text");
      const btnIcon = button.querySelector(".btn-icon");

      // Scroll-based button animation
      ScrollTrigger.create({
        scroller: container,
        trigger: button,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const centerDistance = Math.abs(progress - 0.5) * 2;
          const scale = 1 + (1 - centerDistance) * 0.02;
          const glow = (1 - centerDistance) * 0.3;

          gsap.set(button, {
            scale: scale,
            boxShadow: `0 ${5 + glow * 15}px ${
              20 + glow * 20
            }px rgba(212, 175, 55, ${glow * 0.3})`,
          });
        },
      });

      // Enhanced hover effects
      if (btnText && btnIcon) {
        button.addEventListener("mouseenter", () => {
          gsap.to(btnText, {
            x: 5,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(btnIcon, {
            x: 8,
            scale: 1.1,
            rotation: 5,
            duration: 0.4,
            ease: "back.out(1.7)",
          });

          gsap.to(button, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(btnText, {
            x: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(btnIcon, {
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(button, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    });
  }

  initIconAnimations() {
    const scrollIcons = document.querySelectorAll(".project-icon");

    scrollIcons.forEach((icon) => {
      // Scroll-based enhancement (NO SPINNING)
      ScrollTrigger.create({
        scroller: container,
        trigger: icon,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress * 0.1;
          const brightness = 1 + progress * 0.3;

          gsap.set(icon, {
            scale: scale,
            filter: `brightness(${brightness})`,
            textShadow: `0 0 ${progress * 20}px rgba(212, 175, 55, 0.5)`,
          });
        },
      });
    });
  }

  initSectionStates() {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          section.classList.add("active-section");
        },
        onLeave: () => {
          section.classList.remove("active-section");
        },
        onEnterBack: () => {
          section.classList.add("active-section");
        },
        onLeaveBack: () => {
          section.classList.remove("active-section");
        },
      });
    });
  }
}

// Enhanced Professional Parallax System - 
class ParallaxSystem {
  constructor() {
    this.initBackgroundParallax();
    this.initElementParallax();
    this.initTextParallax();
    this.initInteractiveParallax();
    this.initSectionSpecificParallax();
  }

  initBackgroundParallax() {
    const orbs = document.querySelectorAll(".gradient-orb");

    orbs.forEach((orb, index) => {
      const speed = parseFloat(orb.dataset.speed) || 0.3;

      ScrollTrigger.create({
        scroller: container,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const moveY = progress * 200 * speed;
          const rotation = progress * 60 * speed;
          const scale = 1 + progress * 0.1 * speed;
          const opacity = 0.25 + Math.sin(progress * Math.PI * 2) * 0.1;

          gsap.set(orb, {
            y: moveY,
            rotation: rotation,
            scale: scale,
            opacity: opacity,
          });
        },
      });
    });

    // Enhanced video background parallax
    const video = document.getElementById("bg-video");
    if (video) {
      ScrollTrigger.create({
        scroller: container,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress * 0.30;
          const y = progress * 120;
          const opacity = 0.7 + Math.sin(progress * Math.PI) * 0.2;

          gsap.set(video, {
            scale: scale,
            y: y,
            opacity: opacity,
          });
        },
      });
    }

    // Grid overlay subtle animation
    const gridOverlay = document.querySelector(".grid-overlay");
    if (gridOverlay) {
      ScrollTrigger.create({
        scroller: container,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const backgroundPosition = progress * 30;

          gsap.set(gridOverlay, {
            backgroundPosition: `${backgroundPosition}px ${backgroundPosition}px`,
            opacity: 0.6 + Math.sin(progress * Math.PI * 4) * 0.2,
          });
        },
      });
    }
  }

  initElementParallax() {
    // Enhanced hero elements parallax
    const heroText = document.querySelector(".hero-text");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroText && heroVisual) {
      ScrollTrigger.create({
        scroller: container,
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.set(heroText, {
            y: progress * 100,
            opacity: 1 - progress * 0.6,
            scale: 1 - progress * 0.1,
          });

          gsap.set(heroVisual, {
            y: progress * -150,
            rotationY: progress * 15,
            scale: 1 + progress * 0.15,
            opacity: 1 - progress * 0.3,
          });
        },
      });
    }

    // Enhanced terminal effects
    const terminal = document.querySelector(".quantum-terminal");
    if (terminal) {
      ScrollTrigger.create({
        scroller: container,
        trigger: terminal,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const centerProgress = Math.abs(progress - 0.5) * 2;

          gsap.set(terminal, {
            rotationY: (progress - 0.5) * 8,
            scale: 1 + (1 - centerProgress) * 0.08,
            boxShadow: `0 0 ${
              (1 - centerProgress) * 40
            }px rgba(212, 175, 55, 0.3)`,
          });
        },
      });
    }

    // Enhanced project cards parallax - MORE NOTICEABLE
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
      const speed = 0.15 + index * 0.08;

      ScrollTrigger.create({
        scroller: container,
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const y = (progress - 0.5) * 80 * speed;
          const rotationY = (progress - 0.5) * 15;
          const scale = 1 + Math.sin(progress * Math.PI) * 0.04;

          gsap.set(card, {
            y: y,
            rotationY: rotationY,
            scale: scale,
          });
        },
      });
    });
  }

  initTextParallax() {
    // Enhanced section titles parallax
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: title,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const y = (progress - 0.5) * 50;
          const scale = 1 + Math.sin(progress * Math.PI) * 0.05;

          gsap.set(title, {
            y: y,
            scale: scale,
          });
        },
      });
    });
  }

  initInteractiveParallax() {
    // Enhanced floating elements
    const floatingElements = document.querySelectorAll(".floating-element");
    floatingElements.forEach((element, index) => {
      const floatSpeed = 0.05 + (index % 4) * 0.03;

      ScrollTrigger.create({
        scroller: container,
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const y = Math.sin(progress * Math.PI * 3) * 15 * floatSpeed;
          const x = Math.cos(progress * Math.PI * 2) * 10 * floatSpeed;
          const rotation = Math.sin(progress * Math.PI * 2) * 15;
          const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.3;

          gsap.set(element, {
            x: x,
            y: y,
            rotation: rotation,
            scale: scale,
          });
        },
      });
    });
  }

  initSectionSpecificParallax() {
    // About section cards
    const aboutCards = document.querySelectorAll(".about-card");
    aboutCards.forEach((card, index) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const direction = index % 2 === 0 ? 1 : -1;
          const y = (progress - 0.5) * 25 * direction;
          const rotationZ = (progress - 0.5) * 2 * direction;
          const scale = 1 + Math.sin(progress * Math.PI) * 0.02;

          gsap.set(card, {
            y: y,
            rotationZ: rotationZ,
            scale: scale,
          });
        },
      });
    });
  }
}

// Enhanced Hero Animations - 
class HeroAnimations {
  constructor() {
    this.initElements();
    this.animate();
  }

  initElements() {
    this.titleWords = document.querySelectorAll(".title-word");
    this.badge = document.querySelector(".hero-badge");
    this.description = document.querySelector(".hero-description");
    this.actions = document.querySelector(".hero-actions");

    gsap.set(this.titleWords, { y: "100%" });
    gsap.set([this.badge, this.description, this.actions], {
      opacity: 1,
      y: 0,
    });
  }

  animate() {
    const tl = gsap.timeline({ delay: 0.8 }); // Increased delay

    // Scale + rotate entrance for badge
    gsap.fromTo(
      this.badge,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.7)",
      }
    );
    // Much slower title word reveals
    tl.to(
      this.titleWords,
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.12,
        ease: "power2.out",
      },
      0.8
    );

    // Slower description and actions
    tl.to(
      [this.description, this.actions],
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: "power2.out",
      },
      2.0
    );
  }
}
class TerminalAnimations {
  constructor() {
    this.terminal = document.querySelector(".quantum-terminal");
    this.codeLines = document.querySelectorAll(".code-line");
    this.animate();
    this.initFloatingEffect();
  }

  animate() {
    // Slower code line reveals
    gsap.to(this.codeLines, {
      opacity: 1,
      x: 0,
      duration: 1.0, // Increased from 0.6
      stagger: 0.15, // Increased from 0.08
      delay: 1.0, // Increased from 2.5
      ease: "power1.out",
    });

    const dots = document.querySelectorAll(".control-dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        switch (index) {
          case 0:
            this.minimizeEffect();
            break;
          case 1:
            this.scrambleEffect();
            break;
          case 2:
            this.glowEffect();
            break;
        }
      });
    });
  }

  // NEW: Continuous floating effect for terminal
  initFloatingEffect() {
    if (!this.terminal) return;

    // Gentle floating animation
    gsap.to(this.terminal, {
      y: "+=8",
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Subtle rotation float
    gsap.to(this.terminal, {
      rotationZ: "+=0.5",
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Gentle scale breathing
    gsap.to(this.terminal, {
      scale: 1.01,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Subtle glow pulse
    gsap.to(this.terminal, {
      boxShadow: "0 25px 60px rgba(212, 175, 55, 0.15)",
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  minimizeEffect() {
    gsap.to(this.terminal, {
      scale: 0.99,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  }

  scrambleEffect() {
    gsap.to(this.codeLines, {
      x: Math.random() * 2 - 1, // Reduced movement
      duration: 0.04,
      yoyo: true,
      repeat: 3, // Reduced from 7
      stagger: 0.008,
      ease: "none",
    });
  }

  glowEffect() {
    gsap.to(this.terminal, {
      boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)",
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  }
}

// Enhanced Navigation System with Menu Highlighting - 
class NavigationSystem {
  constructor() {
    this.initElements();
    this.bindEvents();
    this.initMenuHighlighting();
  }

  initElements() {
    this.navToggle = document.getElementById("nav-toggle");
    this.closeToggle = document.getElementById("close-toggle");
    this.navOverlay = document.getElementById("nav-overlay");
    this.featuredImage = document.getElementById("featured-image");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.overlayBrand = document.querySelector(".overlay-brand a");
    this.closeSection = document.querySelector(".close-toggle");

    gsap.set(this.navOverlay, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      pointerEvents: "none",
    });

    gsap.set(this.featuredImage, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.set([this.overlayBrand, this.closeSection], { y: "100%" });
    gsap.set(this.navLinks, { y: "100%" });
  }

  initMenuHighlighting() {
    const sections = document.querySelectorAll("[data-section-index]");

    sections.forEach((section) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: section,
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => {
          this.updateActiveMenuItem(section.dataset.sectionIndex);
        },
        onEnterBack: () => {
          this.updateActiveMenuItem(section.dataset.sectionIndex);
        },
      });
    });
  }

  updateActiveMenuItem(sectionIndex) {
    this.navLinks.forEach((link, index) => {
      if (index == sectionIndex) {
        link.classList.add("active");
        gsap.to(link, {
          color: "var(--color-accent-primary)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        link.classList.remove("active");
        gsap.to(link, {
          color: "var(--color-overlay-text)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }

  bindEvents() {
    this.navToggle.addEventListener("click", () => this.openMenu());
    this.closeToggle.addEventListener("click", () => this.closeMenu());

    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          this.closeMenu();
          setTimeout(() => {
            scroller.scrollTo(targetSection, {
              duration: 1500,
              easing: [0.25, 0.0, 0.35, 1.0],
            });
          }, 800);
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "m" || e.key === "M") {
        if (AppState.isMenuOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    });
  }

  openMenu() {
    if (AppState.isMenuOpen) return;
    AppState.isMenuOpen = true;

    const tl = gsap.timeline();

    tl.to(this.navOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power3.inOut",
      onStart: () => {
        this.navOverlay.style.pointerEvents = "all";
      },
    });

    tl.fromTo(
      this.featuredImage,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.3"
    );

    tl.to(
      [this.overlayBrand, this.closeSection],
      {
        y: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.4"
    );

    tl.to(
      this.navLinks,
      {
        y: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }

  closeMenu() {
    if (!AppState.isMenuOpen) return;
    AppState.isMenuOpen = false;

    const tl = gsap.timeline();

    tl.to([this.overlayBrand, this.closeSection], {
      y: "-100%",
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.in",
    });

    tl.to(
      this.navLinks,
      {
        y: "-100%",
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.in",
      },
      "<"
    );

    tl.to(
      this.featuredImage,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.4"
    );

    tl.to(
      this.navOverlay,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          this.navOverlay.style.pointerEvents = "none";
          this.resetStates();
        },
      },
      "-=0.6"
    );
  }

  resetStates() {
    gsap.set(this.navOverlay, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.set(this.featuredImage, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.set([this.overlayBrand, this.closeSection], { y: "100%" });
    gsap.set(this.navLinks, { y: "100%" });
  }
}

// Enhanced Visual Elements System - 
class VisualElementsSystem {
  constructor() {
    this.initSkillBars();
    this.initAchievementAnimations();
    this.initCardEnhancements();
    this.initFloatingElements();
  }

  initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const progress = parseInt(bar.dataset.progress) || 0;

      ScrollTrigger.create({
        scroller: container,
        trigger: bar,
        start: "top 70%",
        onEnter: () => {
          gsap.to(bar, {
            width: `${progress}%`,
            duration: 3,
            delay: 0.5,
            ease: "power3.out",
          });
        },
      });
    });
  }


  initAchievementAnimations() {
    const achievementItems = document.querySelectorAll(".achievement-item");

    achievementItems.forEach((item, index) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            item,
            {
              x: -30,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.7)",
            }
          );
        },
      });

      // Enhanced hover effect
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          x: 10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });

        const icon = item.querySelector("i");
        if (icon) {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        }
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        const icon = item.querySelector("i");
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });
  }

  initCardEnhancements() {
    const allCards = document.querySelectorAll(
      ".about-card, .experience-card, .project-card"
    );

    allCards.forEach((card) => {
      // Enhanced card entry animation
      ScrollTrigger.create({
        scroller: container,
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            }
          );
        },
      });

      // Enhanced hover effects
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -15,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out",
        });

        const icon = card.querySelector(
          ".card-icon, .experience-icon, .project-icon"
        );
        if (icon) {
          gsap.to(icon, {
            rotationY: 180,
            scale: 1.1,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        }

        const floatingElement = card.querySelector(".floating-element");
        if (floatingElement) {
          gsap.to(floatingElement, {
            scale: 1.5,
            opacity: 0.3,
            rotationZ: 360,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        const icon = card.querySelector(
          ".card-icon, .experience-icon, .project-icon"
        );
        if (icon) {
          gsap.to(icon, {
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        const floatingElement = card.querySelector(".floating-element");
        if (floatingElement) {
          gsap.to(floatingElement, {
            scale: 1,
            opacity: 0.1,
            rotationZ: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
    });
  }

  initFloatingElements() {
    const floatingElements = document.querySelectorAll(".floating-element");

    floatingElements.forEach((element) => {
      // Continuous floating animation
      gsap.to(element, {
        y: "+=15",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(element, {
        x: "+=10",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    });
  }
}

// Global utility functions - 
function updateScrollProgress() {
  if (window.scrollProgressSystem) {
    window.scrollProgressSystem.update(AppState.scrollProgress);
  }
}

function updateSectionNavigation(scrollY) {
  if (window.sectionNavigationSystem) {
    window.sectionNavigationSystem.updateActiveSection(scrollY);
  }
}

// Performance optimization: Debounced scroll end detection - 
function detectScrollEnd() {
  const now = Date.now();
  if (now - AppState.lastScrollTime > 150) {
    AppState.isScrolling = false;
  }
  requestAnimationFrame(detectScrollEnd);
}

// Initialize Application -  ALL FEATURES
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cursor system
  new EliteCursor();

  // Initialize progress and navigation systems
  window.scrollProgressSystem = new ScrollProgressSystem();
  window.sectionNavigationSystem = new SectionNavigationSystem();

  // Start preloader
  new SecurityPreloader();

  // Start scroll end detection
  detectScrollEnd();
});

// Enhanced resize handler with debouncing - 
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scroller.update();
    ScrollTrigger.refresh();
  }, 250);
});

// Performance-optimized load handler - 
window.addEventListener("load", function () {
  setTimeout(() => {
    scroller.update();
    ScrollTrigger.refresh();
  }, 100);
});

// Handle visibility change for performance - 
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
    scroller.update();
  }
});

// =================================
// MOBILE DETECTION AND STATE
// =================================

// Enhanced mobile detection
const MobileDetection = {
  isMobile: () => window.innerWidth <= 768,
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
  isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  isLandscape: () => window.innerWidth > window.innerHeight,
  getViewportHeight: () => window.innerHeight || document.documentElement.clientHeight,
  
  // Detect if device prefers reduced motion
  prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// Enhanced App State for mobile
Object.assign(AppState, {
  isMobile: MobileDetection.isMobile(),
  isTouchDevice: MobileDetection.isTouchDevice(),
  touchStartY: 0,
  touchEndY: 0,
  isMenuAnimating: false,
  mobileMenuHeight: 0,
  lastOrientation: window.orientation || 0,
  reducedMotion: MobileDetection.prefersReducedMotion()
});

// =================================
// MOBILE TOUCH GESTURE SYSTEM
// =================================

class MobileTouchSystem {
  constructor() {
    if (!AppState.isTouchDevice) return;
    
    this.touchStartY = 0;
    this.touchStartX = 0;
    this.touchThreshold = 50;
    this.swipeVelocityThreshold = 0.5;
    this.lastTouchTime = 0;
    
    this.init();
  }
  
  init() {
    // Add touch event listeners
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    
    // Prevent zoom on double-tap for buttons and interactive elements
    this.preventZoomOnInteractiveElements();
    
    // Add haptic feedback simulation
    this.setupHapticFeedback();
  }
  
  handleTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
    this.touchStartX = e.touches[0].clientX;
    this.lastTouchTime = Date.now();
  }
  
  handleTouchMove(e) {
    if (!this.touchStartY || !this.touchStartX) return;
    
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const diffY = this.touchStartY - currentY;
    const diffX = this.touchStartX - currentX;
    
    // Prevent overscroll bounce effect
    if (this.isAtTopAndScrollingUp(diffY) || this.isAtBottomAndScrollingDown(diffY)) {
      e.preventDefault();
    }
  }
  
  handleTouchEnd(e) {
    if (!this.touchStartY || !this.touchStartX) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = this.touchStartY - touchEndY;
    const diffX = this.touchStartX - touchEndX;
    const timeDiff = Date.now() - this.lastTouchTime;
    const velocity = Math.abs(diffY) / timeDiff;
    
    // Detect swipe gestures
    if (Math.abs(diffY) > this.touchThreshold && velocity > this.swipeVelocityThreshold) {
      if (diffY > 0) {
        this.handleSwipeUp();
      } else {
        this.handleSwipeDown();
      }
    }
    
    // Reset touch coordinates
    this.touchStartY = 0;
    this.touchStartX = 0;
  }
  
  handleSwipeUp() {
    // Close mobile menu if open
    if (AppState.isMenuOpen) {
      document.getElementById('close-toggle')?.click();
    }
  }
  
  handleSwipeDown() {
    // Optional: Could implement pull-to-refresh or other actions
    console.log('Swipe down detected');
  }
  
  isAtTopAndScrollingUp(diffY) {
    return window.pageYOffset === 0 && diffY < 0;
  }
  
  isAtBottomAndScrollingDown(diffY) {
    return (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) && diffY > 0;
  }
  
  preventZoomOnInteractiveElements() {
    const interactiveSelectors = [
      '.btn', '.nav-link', '.social-link', '.nav-toggle', 
      '.close-toggle', '.project-card', '.about-card', 
      '.contact-method', '.achievement'
    ];
    
    interactiveSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.addEventListener('touchend', (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Trigger click after a tiny delay to ensure touch feedback
          setTimeout(() => {
            element.click();
          }, 50);
        });
      });
    });
  }
  
  setupHapticFeedback() {
    // Simulate haptic feedback for touch interactions
    const hapticElements = document.querySelectorAll('.btn, .nav-toggle, .close-toggle, .nav-link');
    
    hapticElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        if (navigator.vibrate) {
          navigator.vibrate(10); // Very short vibration
        }
      });
    });
  }
}

// =================================
// MOBILE-OPTIMIZED LOCOMOTIVE SCROLL
// =================================

class MobileLocomotiveScroll {
  constructor() {
    this.setupMobileScroll();
  }
  
  setupMobileScroll() {
    // Destroy existing scroller if mobile
    if (AppState.isMobile && window.scroller) {
      window.scroller.destroy();
    }
    
    // Create mobile-optimized scroll configuration
    if (AppState.isMobile) {
      const mobileScrollConfig = {
        el: container,
        smooth: true,
        multiplier: 0.8, // Slower scroll for better mobile control
        class: "is-revealed",
        scrollbarContainer: false,
        scrollFromAnywhere: true, // Better for mobile
        getDirection: true,
        getSpeed: true,
        smartphone: {
          smooth: true,
          multiplier: 0.6 // Even slower on phones
        },
        tablet: {
          smooth: true,
          multiplier: 0.7
        },
        // Reduce CPU usage on mobile
        lerp: 0.1,
        touchMultiplier: 2
      };
      
      window.scroller = new LocomotiveScroll(mobileScrollConfig);
    }
  }
}

// =================================
// MOBILE-OPTIMIZED NAVIGATION SYSTEM
// =================================

class MobileNavigationSystem extends NavigationSystem {
  constructor() {
    super();
    if (AppState.isMobile) {
      this.setupMobileNavigation();
    }
  }
  
  setupMobileNavigation() {
    // Add mobile-specific event listeners
    this.setupMobileMenuHandling();
    this.setupTouchNavigation();
    this.preventBodyScrollWhenMenuOpen();
  }
  
  setupMobileMenuHandling() {
    // Enhanced mobile menu opening with better animations
    const originalOpenMenu = this.openMenu.bind(this);
    const originalCloseMenu = this.closeMenu.bind(this);
    
    this.openMenu = () => {
      if (AppState.isMenuAnimating) return;
      AppState.isMenuAnimating = true;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      
      originalOpenMenu();
      
      setTimeout(() => {
        AppState.isMenuAnimating = false;
      }, 1000);
    };
    
    this.closeMenu = () => {
      if (AppState.isMenuAnimating) return;
      AppState.isMenuAnimating = true;
      
      originalCloseMenu();
      
      setTimeout(() => {
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.height = '';
        AppState.isMenuAnimating = false;
      }, 800);
    };
  }
  
  setupTouchNavigation() {
    // Add touch event handling for nav links
    this.navLinks.forEach((link, index) => {
      link.addEventListener('touchstart', () => {
        // Add active state immediately on touch
        link.classList.add('touching');
      });
      
      link.addEventListener('touchend', () => {
        link.classList.remove('touching');
      });
      
      link.addEventListener('touchcancel', () => {
        link.classList.remove('touching');
      });
    });
  }
  
  preventBodyScrollWhenMenuOpen() {
    // Prevent background scrolling when menu is open
    const overlay = this.navOverlay;
    
    overlay.addEventListener('touchmove', (e) => {
      if (AppState.isMenuOpen) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

// =================================
// MOBILE-OPTIMIZED ANIMATIONS
// =================================

class MobileAnimationSystem {
  constructor() {
    if (AppState.isMobile) {
      this.optimizeAnimationsForMobile();
    }
  }
  
  optimizeAnimationsForMobile() {
    // Reduce animation complexity on mobile
    this.simplifyScrollAnimations();
    this.optimizeIntersectionObserver();
    this.reduceParallaxEffects();
  }
  
  simplifyScrollAnimations() {
    // Kill complex scroll triggers on mobile
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.scrub && AppState.isMobile) {
        trigger.kill();
      }
    });
    
    // Create simpler mobile-friendly scroll animations
    this.createMobileScrollAnimations();
  }
  
  createMobileScrollAnimations() {
    // Simple fade-in animations for mobile
    const mobileElements = document.querySelectorAll('.project-card, .about-card, .experience-item');
    
    mobileElements.forEach((element, index) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            scroller: container,
            once: true // Only animate once for better performance
          }
        }
      );
    });
  }
  
  optimizeIntersectionObserver() {
    // Use Intersection Observer for better mobile performance
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);
    
    // Observe elements for mobile animations
    document.querySelectorAll('.section, .project-card, .about-card').forEach(el => {
      observer.observe(el);
    });
  }
  
  reduceParallaxEffects() {
    if (AppState.isMobile) {
      // Disable complex parallax on mobile
      document.querySelectorAll('[data-scroll-speed]').forEach(element => {
        element.removeAttribute('data-scroll-speed');
      });
    }
  }
}

// =================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// =================================

class MobilePerformanceOptimizer {
  constructor() {
    if (AppState.isMobile) {
      this.optimizeForMobile();
    }
  }
  
  optimizeForMobile() {
    this.reduceBackgroundEffects();
    this.optimizeVideoBackground();
    this.throttleScrollEvents();
    this.lazyLoadImages();
    this.optimizeTerminalAnimation();
  }
  
  reduceBackgroundEffects() {
    if (AppState.isMobile) {
      // Hide complex background effects
      const bgEffects = document.querySelector('.bg-effects');
      if (bgEffects) {
        bgEffects.style.display = 'none';
      }
      
      // Reduce video background opacity
      const videoOverlay = document.querySelector('.video-blur-overlay');
      if (videoOverlay) {
        videoOverlay.style.backdropFilter = 'blur(3px)';
        videoOverlay.style.webkitBackdropFilter = 'blur(3px)';
      }
    }
  }
  
  optimizeVideoBackground() {
    const video = document.getElementById('bg-video');
    if (video && AppState.isMobile) {
      // Pause video on mobile to save battery
      video.pause();
      video.style.opacity = '0.2';
      
      // Show static background instead
      const videoContainer = document.querySelector('.video-background');
      if (videoContainer) {
        videoContainer.style.background = 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)';
      }
    }
  }
  
  throttleScrollEvents() {
    // Throttle scroll events for better mobile performance
    let scrollTimeout;
    
    const originalScrollHandler = scroller.on;
    scroller.on = function(event, callback) {
      if (event === 'scroll' && AppState.isMobile) {
        const throttledCallback = (args) => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            callback(args);
          }, 16); // ~60fps
        };
        return originalScrollHandler.call(this, event, throttledCallback);
      }
      return originalScrollHandler.call(this, event, callback);
    };
  }
  
  lazyLoadImages() {
    // Implement lazy loading for images
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  optimizeTerminalAnimation() {
    if (AppState.isMobile) {
      // Simplify terminal animations
      const codeLines = document.querySelectorAll('.code-line');
      codeLines.forEach((line, index) => {
        gsap.set(line, {
          opacity: 1,
          x: 0
        });
      });
      
      // Disable terminal floating animation on mobile
      const terminal = document.querySelector('.quantum-terminal');
      if (terminal) {
        gsap.killTweensOf(terminal);
        gsap.set(terminal, {
          transform: 'none',
          scale: 1,
          rotation: 0
        });
      }
    }
  }
}

// =================================
// MOBILE ORIENTATION HANDLING
// =================================

class MobileOrientationHandler {
  constructor() {
    this.setupOrientationHandling();
  }
  
  setupOrientationHandling() {
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 300); // Wait for orientation change to complete
    });
    
    // Handle resize events
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }
  
  handleOrientationChange() {
    // Update mobile state
    AppState.isMobile = MobileDetection.isMobile();
    
    // Refresh scroll instance
    if (window.scroller) {
      setTimeout(() => {
        window.scroller.update();
        ScrollTrigger.refresh();
      }, 100);
    }
    
    // Update viewport height for better mobile experience
    this.updateViewportHeight();
    
    // Close menu on orientation change
    if (AppState.isMenuOpen) {
      document.getElementById('close-toggle')?.click();
    }
  }
  
  handleResize() {
    // Update mobile detection
    const wasMobile = AppState.isMobile;
    AppState.isMobile = MobileDetection.isMobile();
    
    // Reinitialize systems if mobile state changed
    if (wasMobile !== AppState.isMobile) {
      this.reinitializeSystems();
    }
    
    this.updateViewportHeight();
  }
  
  updateViewportHeight() {
    // Fix mobile viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  reinitializeSystems() {
    // Reinitialize mobile-specific systems when switching between mobile/desktop
    if (AppState.isMobile) {
      new MobileLocomotiveScroll();
      new MobileAnimationSystem();
      new MobilePerformanceOptimizer();
    }
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// =================================
// ENHANCED MOBILE PRELOADER
// =================================

class MobileSecurityPreloader extends SecurityPreloader {
  constructor() {
    super();
    if (AppState.isMobile) {
      this.optimizeForMobile();
    }
  }
  
  optimizeForMobile() {
    // Faster preloader animation on mobile
    const progressBar = document.getElementById('progress-bar');
    const gatewayLines = document.querySelectorAll('.gateway-line');
    
    // Speed up animations
    gsap.killTweensOf([progressBar, gatewayLines]);
    
    const tl = gsap.timeline({
      onComplete: () => this.complete(),
    });
    
    // Faster line appearances
    tl.to(gatewayLines, {
      opacity: 1,
      x: 0,
      duration: 0.5, // Faster
      stagger: 0.1, // Faster stagger
      ease: "power2.out",
    });
    
    // Faster progress bar
    tl.to(progressBar, {
      width: "100%",
      duration: 1.5, // Much faster
      ease: "power2.inOut",
    }, 0.5);
    
    // Skip glitch effects on mobile
  }
}

// =================================
// MOBILE-SPECIFIC UTILITIES
// =================================

const MobileUtils = {
  // Prevent iOS bounce scrolling
  preventBounceScrolling() {
    document.addEventListener('touchmove', (e) => {
      if (e.target.closest('.nav-overlay') || e.target.closest('.quantum-terminal')) {
        return;
      }
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if ((scrollTop === 0 && e.touches[0].clientY > e.touches[0].previousClientY) ||
          (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < e.touches[0].previousClientY)) {
        e.preventDefault();
      }
    }, { passive: false });
  },
  
  // Improve mobile tap highlighting
  improveTapHighlighting() {
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: rgba(212, 175, 55, 0.1);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `;
    document.head.appendChild(style);
  },
  
  // Handle mobile viewport
  handleMobileViewport() {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
  },
  
  // Add mobile-specific CSS classes
  addMobileClasses() {
    document.documentElement.classList.add('mobile');
    
    if (MobileDetection.isTouchDevice()) {
      document.documentElement.classList.add('touch');
    }
    
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      document.documentElement.classList.add('ios');
    }
    
    if (navigator.userAgent.includes('Android')) {
      document.documentElement.classList.add('android');
    }
  }
};

// =================================
// INITIALIZE MOBILE SYSTEMS
// =================================

// Override the original initialization for mobile
const originalDOMContentLoaded = () => {
  // Initialize cursor system (desktop only)
  if (!AppState.isMobile) {
    new EliteCursor();
  }

  // Initialize progress and navigation systems
  window.scrollProgressSystem = new ScrollProgressSystem();
  window.sectionNavigationSystem = new SectionNavigationSystem();

  // Start preloader (mobile-optimized)
  if (AppState.isMobile) {
    new MobileSecurityPreloader();
  } else {
    new SecurityPreloader();
  }

  // Initialize mobile-specific systems
  if (AppState.isMobile || AppState.isTouchDevice) {
    new MobileTouchSystem();
    new MobileLocomotiveScroll();
    new MobileAnimationSystem();
    new MobilePerformanceOptimizer();
    new MobileOrientationHandler();
    
    // Setup mobile utilities
    MobileUtils.preventBounceScrolling();
    MobileUtils.improveTapHighlighting();
    MobileUtils.handleMobileViewport();
    MobileUtils.addMobileClasses();
  }

  // Start scroll end detection
  detectScrollEnd();
};

// Replace the original DOMContentLoaded event listener
document.removeEventListener('DOMContentLoaded', originalDOMContentLoaded);
document.addEventListener('DOMContentLoaded', originalDOMContentLoaded);

// =================================
// MOBILE NAVIGATION OVERRIDE
// =================================

// Override NavigationSystem for mobile
if (AppState.isMobile || AppState.isTouchDevice) {
  // Wait for DOM content to be loaded
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const mobileNav = new MobileNavigationSystem();
      
      // Replace the global navigation system
      if (window.navigationSystem) {
        window.navigationSystem = mobileNav;
      }
    }, 100);
  });
}

// =================================
// MOBILE CSS CUSTOM PROPERTIES
// =================================

// Set mobile-specific CSS custom properties
if (AppState.isMobile) {
  document.documentElement.style.setProperty('--mobile-vh', `${window.innerHeight}px`);
  
  // Update on resize
  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--mobile-vh', `${window.innerHeight}px`);
  });
}

// Export mobile detection for external use
window.MobileDetection = MobileDetection;
window.AppState = AppState;
