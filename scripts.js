// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Elite State Management
const AppState = {
  mouseX: 0,
  mouseY: 0,
  cursorTrails: [],
  isMenuOpen: false,
  isLoaded: false,
  trailCount: 20,
};

// Smooth Scrolling
const container = document.querySelector(".container");

const scroller = new LocomotiveScroll({
  el: container,
  smooth: true
});

scroller.on("scroll", ScrollTrigger.update);

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
ScrollTrigger.refresh();

// Professional Cursor System
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
      trail.style.background = `rgba(0, 255, 136, ${opacity})`;

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

    // Interactive elements
    const interactiveElements = document.querySelectorAll(`
                    a, button, .control-dot, .nav-link, .social-link, 
                    .btn, .logo-container, .nav-toggle, .close-toggle, .project-card
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
    // Main cursor dot - immediate follow
    gsap.set(this.dot, {
      x: AppState.mouseX,
      y: AppState.mouseY,
    });

    // Cursor outline - smooth lag
    gsap.to(this.outline, {
      x: AppState.mouseX,
      y: AppState.mouseY,
      duration: 0.3,
      ease: "power2.out",
    });

    // Advanced trail system
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

// Elite Preloader
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

    // Gateway lines animation with stagger
    tl.to(this.gatewayLines, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Progress bar with multiple phases
    tl.to(
      this.progressBar,
      {
        width: "35%",
        duration: 1.5,
        ease: "power2.inOut",
      },
      0.5
    );

    tl.to(
      this.progressBar,
      {
        width: "70%",
        duration: 1.2,
        ease: "power2.inOut",
      },
      2
    );

    tl.to(
      this.progressBar,
      {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
      },
      3.5
    );

    // Glitch effects
    tl.to(
      this.gatewayLines,
      {
        x: 3,
        duration: 0.05,
        yoyo: true,
        repeat: 3,
        stagger: 0.01,
      },
      2.5
    );

    tl.to(
      this.gatewayLines,
      {
        opacity: 0.7,
        duration: 0.03,
        yoyo: true,
        repeat: 5,
        stagger: 0.005,
      },
      4
    );
  }

  complete() {
    // Clip-path animation
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

    // Reveal main content
    gsap.to(mainContent, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    // Reveal header and footer
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

    // Initialize other systems
    new HeroAnimations();
    new TerminalAnimations();
    new NavigationSystem();
  }
}

// Hero Animations
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

    // Set initial states
    gsap.set(this.titleWords, { y: "100%" });
    gsap.set([this.badge, this.description, this.actions], {
      opacity: 0,
      y: 40,
    });
  }

  animate() {
    const tl = gsap.timeline({ delay: 0.8 });

    // Badge reveal
    tl.to(this.badge, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Title words reveal with sophisticated stagger
    tl.to(
      this.titleWords,
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.4
    );

    // Description and actions
    tl.to(
      [this.description, this.actions],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      1.2
    );
  }
}

// Terminal Animations
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

    // Terminal dot interactions
    const dots = document.querySelectorAll(".control-dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        switch (index) {
          case 0: // Red - minimize effect
            this.minimizeEffect();
            break;
          case 1: // Yellow - scramble effect
            this.scrambleEffect();
            break;
          case 2: // Green - glow effect
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
      boxShadow: "0 0 60px rgba(0, 255, 136, 0.6)",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }
}

// Elite Navigation System - FIXED
class NavigationSystem {
  constructor() {
    this.initElements();
    this.bindEvents();
    this.setupScrollTriggers();
  }

  initElements() {
    this.navToggle = document.getElementById("nav-toggle");
    this.closeToggle = document.getElementById("close-toggle");
    this.navOverlay = document.getElementById("nav-overlay");
    this.featuredImage = document.getElementById("featured-image");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.overlayBrand = document.querySelector(".overlay-brand a");
    this.closeSection = document.querySelector(".close-toggle");

    // Set initial states
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

  bindEvents() {
    this.navToggle.addEventListener("click", () => this.openMenu());
    this.closeToggle.addEventListener("click", () => this.closeMenu());

    // Navigation links with smooth scrolling
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          this.closeMenu();

          // Wait for menu to close, then scroll using Locomotive Scroll's method
          setTimeout(() => {
            // Use the scroller instance directly
            scroller.scrollTo(targetSection);
          }, 800); // Keep this delay to allow the menu to animate out
        }
      });
    });

    // Keyboard shortcut
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

 setupScrollTriggers() {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      const sectionHeader = section.querySelector(".section-header");
      const sectionContent = section.querySelector(
        '.projects-grid, .hero-content, div[style*="max-width"]'
      );

      if (sectionHeader) {
        gsap.set(sectionHeader, { opacity: 0, y: 50 });

        ScrollTrigger.create({
          // ADD THIS LINE
          scroller: container, 
          
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            gsap.to(sectionHeader, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            });
          },
        });
      }

      if (sectionContent) {
        gsap.set(sectionContent, { opacity: 0, y: 50 });

        ScrollTrigger.create({
          // ADD THIS LINE
          scroller: container,
          
          trigger: section,
          start: "top 70%",
          onEnter: () => {
            gsap.to(sectionContent, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              ease: "power3.out",
            });
          },
        });
      }
    });
}


  openMenu() {
    if (AppState.isMenuOpen) return;
    AppState.isMenuOpen = true;

    const tl = gsap.timeline();

    // Overlay reveal
    tl.to(this.navOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power3.inOut",
      onStart: () => {
        this.navOverlay.style.pointerEvents = "all";
      },
    });

    // Featured image reveal
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

    // Header elements
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

    // Navigation links
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

    // Elements out
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

    // Featured image close
    tl.to(
      this.featuredImage,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.4"
    );

    // Overlay close
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

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cursor system
  new EliteCursor();

  // Start preloader
  new SecurityPreloader();
});

// Handle resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// Ensuring final refresh on load
window.addEventListener("load", function () {
  // Update Locomotive Scroll
  scroller.update();
  // Update ScrollTrigger
  ScrollTrigger.refresh();
});

