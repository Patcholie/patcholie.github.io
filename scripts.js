// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, Observer);

// Elite State Management - RESTORED
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
  lastScrollTime: 0
};

// Performance optimized scroll container - RESTORED
const container = document.querySelector(".container");

// Enhanced Locomotive Scroll Configuration - RESTORED
const scroller = new LocomotiveScroll({
  el: container,
  smooth: true,
  multiplier: 1,
  class: 'is-revealed',
  scrollbarContainer: false,
  scrollFromAnywhere: false,
  getDirection: true,
  getSpeed: true,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

// Enhanced ScrollTrigger Integration - RESTORED
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
      height: window.innerHeight
    };
  },
  pinType: container.style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => scroller.update());

// Professional Scroll Progress System - RESTORED
class ScrollProgressSystem {
  constructor() {
    this.progressLine = document.querySelector('.progress-line');
    this.progressText = document.querySelector('.progress-text');
    this.progressIndicator = document.querySelector('.progress-indicator');
    
    this.init();
  }

  init() {
    // Show progress indicator after initial load
    setTimeout(() => {
      this.progressIndicator?.classList.add('visible');
    }, 2000);
  }

  update(progress) {
    const percentage = Math.round(progress * 100);
    
    if (this.progressLine) {
      gsap.set(this.progressLine, {
        scaleX: progress,
        transformOrigin: "left center"
      });
    }
    
    if (this.progressText) {
      // Animate number change
      gsap.to(this.progressText, {
        textContent: percentage.toString().padStart(2, '0'),
        duration: 0.5,
        ease: "power2.out",
        snap: { textContent: 1 }
      });
    }
  }
}

// Professional Section Navigation System - RESTORED
class SectionNavigationSystem {
  constructor() {
    this.navDots = document.querySelectorAll('.nav-dot');
    this.sections = document.querySelectorAll('[data-section-index]');
    this.sectionNavigation = document.querySelector('.section-navigation');
    
    this.init();
  }

  init() {
    // Show section navigation after load
    setTimeout(() => {
      this.sectionNavigation?.classList.add('visible');
    }, 3000);

    // Bind click events
    this.navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.scrollToSection(index));
    });
  }

  scrollToSection(index) {
    const targetSection = document.querySelector(`[data-section-index="${index}"]`);
    if (targetSection) {
      scroller.scrollTo(targetSection, {
        duration: 1500,
        easing: [0.25, 0.0, 0.35, 1.0]
      });
    }
  }

  updateActiveSection(scrollY) {
    const windowHeight = window.innerHeight;
    
    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenter = sectionTop + (sectionHeight / 2);
      
      if (scrollY + (windowHeight / 2) >= sectionCenter - (windowHeight / 4) &&
          scrollY + (windowHeight / 2) <= sectionCenter + (windowHeight / 4)) {
        
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
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

// Professional Cursor System - RESTORED WITH TRAILS
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

// Enhanced Preloader System - RESTORED ORIGINAL
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

    tl.to(this.gatewayLines, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });

    tl.to(this.progressBar, {
      width: "35%",
      duration: 1.5,
      ease: "power2.inOut",
    }, 0.5);

    tl.to(this.progressBar, {
      width: "70%",
      duration: 1.2,
      ease: "power2.inOut",
    }, 2);

    tl.to(this.progressBar, {
      width: "100%",
      duration: 1,
      ease: "power2.inOut",
    }, 3.5);

    tl.to(this.gatewayLines, {
      x: 3,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
      stagger: 0.01,
    }, 2.5);

    tl.to(this.gatewayLines, {
      opacity: 0.7,
      duration: 0.03,
      yoyo: true,
      repeat: 5,
      stagger: 0.005,
    }, 4);
  }

  complete() {
    gsap.to(this.preloader, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        this.preloader.style.display = "none";
        AppState.isLoaded = true;
        this.initMainContent();
      },
    });
  }

  initMainContent() {
    const mainContent = document.getElementById("main-content");
    const header = document.getElementById("main-header");
    const footer = document.getElementById("main-footer");

    gsap.to(mainContent, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(header, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    // Initialize all enhanced systems
    new HeroAnimations();
    new TerminalAnimations();
    new NavigationSystem();
    new ParallaxSystem();
    new ReactiveScrollSystem();
    new VisualElementsSystem();
  }
}

// Enhanced Reactive Scroll System - RESTORED
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
    allScrollElements.forEach(element => {
      gsap.set(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "transform,filter"
      });
    });

    // Set initial states for specific elements
    const heroElements = document.querySelectorAll('.scroll-element');
    heroElements.forEach(element => {
      gsap.set(element, { opacity: 1, y: 0 });
    });

    const cards = document.querySelectorAll('.scroll-card');
    cards.forEach(card => {
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
    });

    const textElements = document.querySelectorAll('.scroll-text, .scroll-description, .scroll-project-title');
    textElements.forEach(text => {
      gsap.set(text, { opacity: 1, y: 0 });
    });
  }

  initElementReactivity() {
    // Hero elements scroll reactivity
    const heroElements = document.querySelectorAll('.scroll-element');
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
            y: (progress - 0.5) * 20 * offset
          });
        }
      });
    });

    // Section numbers dynamic scaling
    const sectionNumbers = document.querySelectorAll('.scroll-number');
    sectionNumbers.forEach((number) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: number.closest('.section'),
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress * 0.3;
          
          gsap.set(number, {
            scale: scale,
            rotationZ: progress * 5
          });
        }
      });
    });
  }

  initCardMagnetism() {
    const cards = document.querySelectorAll('.project-card');
    
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
            boxShadow: `0 ${5 + magnetism * 20}px ${30 + magnetism * 20}px rgba(212, 175, 55, ${glow})`,
            z: magnetism * 30
          });

          // Update card class for CSS interactions
          if (magnetism > 0.5) {
            card.classList.add('magnetic');
          } else {
            card.classList.remove('magnetic');
          }
        }
      });
    });
  }

  initTextAnimations() {
    // Highlight words animation
    const highlightWords = document.querySelectorAll('.highlight-word');
    highlightWords.forEach((word) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: word,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(word, {
            color: 'var(--color-accent-primary)',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    });
  }

  initButtonReactions() {
    const scrollButtons = document.querySelectorAll('.btn');
    
    scrollButtons.forEach((button) => {
      const btnText = button.querySelector('.btn-text');
      const btnIcon = button.querySelector('.btn-icon');
      
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
            boxShadow: `0 ${5 + glow * 15}px ${20 + glow * 20}px rgba(212, 175, 55, ${glow * 0.3})`
          });
        }
      });

      // Enhanced hover effects
      if (btnText && btnIcon) {
        button.addEventListener('mouseenter', () => {
          gsap.to(btnText, {
            x: 5,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(btnIcon, {
            x: 8,
            scale: 1.1,
            rotation: 5,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
          
          gsap.to(button, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(btnText, {
            x: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(btnIcon, {
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(button, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      }
    });
  }

  initIconAnimations() {
    const scrollIcons = document.querySelectorAll('.project-icon');
    
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
            textShadow: `0 0 ${progress * 20}px rgba(212, 175, 55, 0.5)`
          });
        }
      });
    });
  }

  initSectionStates() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          section.classList.add('active-section');
        },
        onLeave: () => {
          section.classList.remove('active-section');
        },
        onEnterBack: () => {
          section.classList.add('active-section');
        },
        onLeaveBack: () => {
          section.classList.remove('active-section');
        }
      });
    });
  }
}

// Enhanced Professional Parallax System - RESTORED
class ParallaxSystem {
  constructor() {
    this.initBackgroundParallax();
    this.initElementParallax();
    this.initTextParallax();
    this.initInteractiveParallax();
    this.initSectionSpecificParallax();
  }

  initBackgroundParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
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
            opacity: opacity
          });
        }
      });
    });

    // Enhanced video background parallax
    const video = document.getElementById('bg-video');
    if (video) {
      ScrollTrigger.create({
        scroller: container,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress * 0.15;
          const y = progress * 80;
          const opacity = 0.8 + Math.sin(progress * Math.PI) * 0.2;
          
          gsap.set(video, {
            scale: scale,
            y: y,
            opacity: opacity
          });
        }
      });
    }

    // Grid overlay subtle animation
    const gridOverlay = document.querySelector('.grid-overlay');
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
            opacity: 0.6 + Math.sin(progress * Math.PI * 4) * 0.2
          });
        }
      });
    }
  }

  initElementParallax() {
    // Enhanced hero elements parallax
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');

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
            scale: 1 - progress * 0.1
          });
          
          gsap.set(heroVisual, {
            y: progress * -150,
            rotationY: progress * 15,
            scale: 1 + progress * 0.15,
            opacity: 1 - progress * 0.3
          });
        }
      });
    }

    // Enhanced terminal effects
    const terminal = document.querySelector('.quantum-terminal');
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
            boxShadow: `0 0 ${(1 - centerProgress) * 40}px rgba(212, 175, 55, 0.3)`
          });
        }
      });
    }

    // Enhanced project cards parallax - MORE NOTICEABLE
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      const speed = 0.15 + (index * 0.08);
      
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
            scale: scale
          });
        }
      });
    });
  }

  initTextParallax() {
    // Enhanced section titles parallax
    const sectionTitles = document.querySelectorAll('.section-title');
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
            scale: scale
          });
        }
      });
    });
  }

  initInteractiveParallax() {
    // Enhanced floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
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
            scale: scale
          });
        }
      });
    });
  }

  initSectionSpecificParallax() {
    // About section cards
    const aboutCards = document.querySelectorAll('.about-card');
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
            scale: scale
          });
        }
      });
    });
  }
}

// Enhanced Hero Animations - RESTORED
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
    const tl = gsap.timeline({ delay: 0.8 });

    tl.to(this.badge, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.to(this.titleWords, {
      y: "0%",
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out",
    }, 0.4);

    tl.to([this.description, this.actions], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    }, 1.2);
  }
}

// Enhanced Terminal Animations - RESTORED
class TerminalAnimations {
  constructor() {
    this.codeLines = document.querySelectorAll(".code-line");
    this.animate();
  }

  animate() {
    gsap.to(this.codeLines, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.08,
      delay: 2.5,
      ease: "power2.out",
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

  minimizeEffect() {
    const terminal = document.querySelector(".quantum-terminal");
    gsap.to(terminal, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }

  scrambleEffect() {
    gsap.to(this.codeLines, {
      x: Math.random() * 4 - 2,
      duration: 0.05,
      yoyo: true,
      repeat: 7,
      stagger: 0.01,
      ease: "none",
    });
  }

  glowEffect() {
    const terminal = document.querySelector(".quantum-terminal");
    gsap.to(terminal, {
      boxShadow: "0 0 60px rgba(212, 175, 55, 0.6)",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }
}

// Enhanced Navigation System with Menu Highlighting - RESTORED
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
    const sections = document.querySelectorAll('[data-section-index]');
    
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
        }
      });
    });
  }

  updateActiveMenuItem(sectionIndex) {
    this.navLinks.forEach((link, index) => {
      if (index == sectionIndex) {
        link.classList.add('active');
        gsap.to(link, {
          color: 'var(--color-accent-primary)',
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        link.classList.remove('active');
        gsap.to(link, {
          color: 'var(--color-overlay-text)',
          duration: 0.3,
          ease: "power2.out"
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
              easing: [0.25, 0.0, 0.35, 1.0]
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

    tl.fromTo(this.featuredImage, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.3");

    tl.to([this.overlayBrand, this.closeSection], {
      y: "0%",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.4");

    tl.to(this.navLinks, {
      y: "0%",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.6");
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

    tl.to(this.navLinks, {
      y: "-100%",
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.in",
    }, "<");

    tl.to(this.featuredImage, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.4");

    tl.to(this.navOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        this.navOverlay.style.pointerEvents = "none";
        this.resetStates();
      },
    }, "-=0.6");
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

// Enhanced Visual Elements System - RESTORED
class VisualElementsSystem {
  constructor() {
    this.initSkillBars();
    this.initAchievementAnimations();
    this.initCardEnhancements();
    this.initFloatingElements();
  }

  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar) => {
      const progress = parseInt(bar.dataset.progress) || 0;
      
      ScrollTrigger.create({
        scroller: container,
        trigger: bar,
        start: "top 80%",
        onEnter: () => {
          gsap.to(bar, {
            width: `${progress}%`,
            duration: 2,
            delay: 0.5,
            ease: "power3.out"
          });
          
          this.addSparkleEffect(bar);
        }
      });
    });
  }

  addSparkleEffect(bar) {
    const sparkles = [];
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'skill-sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--color-accent-primary);
        border-radius: 50%;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        opacity: 0;
        box-shadow: 0 0 10px var(--color-accent-primary);
      `;
      bar.appendChild(sparkle);
      sparkles.push(sparkle);
    }

    sparkles.forEach((sparkle, index) => {
      gsap.to(sparkle, {
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        opacity: 1,
        scale: Math.random() * 0.5 + 0.5,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(sparkle, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => sparkle.remove()
          });
        }
      });
    });
  }

  initAchievementAnimations() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach((item, index) => {
      ScrollTrigger.create({
        scroller: container,
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(item, {
            x: -30,
            opacity: 0
          }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)"
          });
        }
      });

      // Enhanced hover effect
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: 10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        const icon = item.querySelector('i');
        if (icon) {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(1.7)"
          });
        }
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        const icon = item.querySelector('i');
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    });
  }

  initCardEnhancements() {
    const allCards = document.querySelectorAll('.about-card, .experience-card, .project-card');
    
    allCards.forEach((card) => {
      // Enhanced card entry animation
      ScrollTrigger.create({
        scroller: container,
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(card, {
            y: 50,
            opacity: 0,
            scale: 0.9
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out"
          });
        }
      });

      // Enhanced hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });

        const icon = card.querySelector('.card-icon, .experience-icon, .project-icon');
        if (icon) {
          gsap.to(icon, {
            rotationY: 180,
            scale: 1.1,
            duration: 0.6,
            ease: "back.out(1.7)"
          });
        }

        const floatingElement = card.querySelector('.floating-element');
        if (floatingElement) {
          gsap.to(floatingElement, {
            scale: 1.5,
            opacity: 0.3,
            rotationZ: 360,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });

        const icon = card.querySelector('.card-icon, .experience-icon, .project-icon');
        if (icon) {
          gsap.to(icon, {
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }

        const floatingElement = card.querySelector('.floating-element');
        if (floatingElement) {
          gsap.to(floatingElement, {
            scale: 1,
            opacity: 0.1,
            rotationZ: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    });
  }

  initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element) => {
      // Continuous floating animation
      gsap.to(element, {
        y: "+=15",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to(element, {
        x: "+=10",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }
}

// Global utility functions - RESTORED
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

// Performance optimization: Debounced scroll end detection - RESTORED
function detectScrollEnd() {
  const now = Date.now();
  if (now - AppState.lastScrollTime > 150) {
    AppState.isScrolling = false;
  }
  requestAnimationFrame(detectScrollEnd);
}

// Initialize Application - RESTORED ALL FEATURES
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

// Enhanced resize handler with debouncing - RESTORED
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scroller.update();
    ScrollTrigger.refresh();
  }, 250);
});

// Performance-optimized load handler - RESTORED
window.addEventListener("load", function () {
  setTimeout(() => {
    scroller.update();
    ScrollTrigger.refresh();
  }, 100);
});

// Handle visibility change for performance - RESTORED
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
    scroller.update();
  }
});