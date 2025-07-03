// =================================================================================
// CINEMATIC PORTFOLIO - 3D CAMERA EXPERIENCE ENGINE
// =================================================================================

// Global Configuration
const CAMERA_CONFIG = {
  // Camera movement settings
  smoothness: 0.08, // Camera movement smoothness (lower = smoother)
  rotationSmooth: 0.06, // Rotation smoothness
  sceneDistance: 2000, // Distance between scenes in 3D space

  // Scene positions in 3D space
  scenes: [
    { x: 0, y: 0, z: 0, rotY: 0 }, // Hero
    { x: 1500, y: -500, z: 2000, rotY: 20 }, // Skills
    { x: -1200, y: 800, z: 4000, rotY: -15 }, // Experience
    { x: 2000, y: -800, z: 6000, rotY: 25 }, // Projects
    { x: 0, y: 1200, z: 8000, rotY: 0 }, // About
  ],

  // Animation timings
  sceneTransitionDuration: 1500, // Reduced duration for faster transitions
  particleSpeed: 0.8,

  // Mobile optimizations
  mobile: {
    smoothness: 0.12,
    reducedParticles: true,
    simplifiedTransitions: true,
  },
};

// Device Detection & Configuration
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Apply mobile optimizations
if (isMobile) {
  Object.assign(CAMERA_CONFIG, CAMERA_CONFIG.mobile);
}

// =================================================================================
// CORE CAMERA SYSTEM
// =================================================================================

class CinematicCamera {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 };
    this.target = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.targetRotation = { x: 0, y: 0, z: 0 };

    this.currentScene = 0;
    this.isTransitioning = false;
    this.isScrolling = false; // Flag to prevent rapid scroll
    this.scrollTimeout = null;

    this.viewport = document.getElementById("cameraViewport");
    this.cinematicBg = document.getElementById("cinematicBg");

    this.mousePosition = { x: 0, y: 0 };
    this.mouseInfluence = { x: 0, y: 0 };

    this.animationId = null;
    this.lastTime = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAnimation();
    this.goToScene(0, false); // Start at hero scene without animation
  }

  setupEventListeners() {
    if (!isMobile && !isTouch) {
      document.addEventListener("mousemove", (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        this.mousePosition.x = (e.clientX - centerX) / centerX;
        this.mousePosition.y = (e.clientY - centerY) / centerY;
      });
    }

    this.setupNavigationControls();
    this.setupWheelControls(); // *** NEW: Added wheel controls

    if (isMobile || isTouch) {
      this.setupTouchControls();
    }

    this.setupKeyboardControls();
    window.addEventListener("resize", () => this.handleResize());
  }

  setupNavigationControls() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const navDots = document.querySelectorAll(".nav-dot");

    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sceneIndex = parseInt(btn.dataset.scene);
        this.goToScene(sceneIndex);
      });
    });

    navDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const sceneIndex = parseInt(dot.dataset.scene);
        this.goToScene(sceneIndex);
      });
    });
  }

  // *** NEW: Method to handle mouse wheel scrolling for navigation
  setupWheelControls() {
    document.addEventListener(
      "wheel",
      (e) => {
        if (this.isScrolling || this.isTransitioning) return;

        this.isScrolling = true;

        if (e.deltaY > 0) {
          // Scrolling down
          if (this.currentScene < CAMERA_CONFIG.scenes.length - 1) {
            this.goToScene(this.currentScene + 1);
          }
        } else {
          // Scrolling up
          if (this.currentScene > 0) {
            this.goToScene(this.currentScene - 1);
          }
        }

        // Timeout to prevent scrolling through multiple scenes at once
        setTimeout(() => {
          this.isScrolling = false;
        }, 1000);
      },
      { passive: true }
    );
  }

  setupTouchControls() {
    let startY = 0;
    let startX = 0;
    let isSwiping = false;

    document.addEventListener(
      "touchstart",
      (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        isSwiping = false;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        if (this.isTransitioning || isSwiping) return;

        const deltaY = e.touches[0].clientY - startY;
        const deltaX = e.touches[0].clientX - startX;

        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
          isSwiping = true;
          if (
            deltaY < 0 &&
            this.currentScene < CAMERA_CONFIG.scenes.length - 1
          ) {
            this.goToScene(this.currentScene + 1);
          } else if (deltaY > 0 && this.currentScene > 0) {
            this.goToScene(this.currentScene - 1);
          }
        }
      },
      { passive: true }
    );
  }

  setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (this.isTransitioning) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault();
          if (this.currentScene > 0) this.goToScene(this.currentScene - 1);
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          if (this.currentScene < CAMERA_CONFIG.scenes.length - 1)
            this.goToScene(this.currentScene + 1);
          break;
        case "Home":
          e.preventDefault();
          this.goToScene(0);
          break;
        case "End":
          e.preventDefault();
          this.goToScene(CAMERA_CONFIG.scenes.length - 1);
          break;
        default:
          const num = parseInt(e.key);
          if (!isNaN(num) && num >= 1 && num <= CAMERA_CONFIG.scenes.length) {
            e.preventDefault();
            this.goToScene(num - 1);
          }
          break;
      }
    });
  }

  goToScene(sceneIndex, animate = true) {
    if (
      sceneIndex < 0 ||
      sceneIndex >= CAMERA_CONFIG.scenes.length ||
      sceneIndex === this.currentScene ||
      this.isTransitioning
    ) {
      return;
    }

    this.isTransitioning = true;
    const prevScene = this.currentScene;
    this.currentScene = sceneIndex;
    const targetScene = CAMERA_CONFIG.scenes[sceneIndex];

    this.updateNavigationUI();

    if (!animate || prefersReducedMotion) {
      this.position = { ...targetScene };
      this.target = { ...targetScene };
      this.rotation.y = targetScene.rotY;
      this.targetRotation.y = targetScene.rotY;
      this.updateSceneVisibility();
      this.isTransitioning = false;
      return;
    }

    this.target = { ...targetScene };
    this.targetRotation.y = targetScene.rotY;

    this.updateSceneVisibility(prevScene);
    this.triggerSceneAnimations(sceneIndex);

    setTimeout(() => {
      this.isTransitioning = false;
    }, CAMERA_CONFIG.sceneTransitionDuration);
  }

  updateNavigationUI() {
    document
      .querySelectorAll(".nav-btn")
      .forEach((btn, index) =>
        btn.classList.toggle("active", index === this.currentScene)
      );
    document
      .querySelectorAll(".nav-dot")
      .forEach((dot, index) =>
        dot.classList.toggle("active", index === this.currentScene)
      );
    this.updateProgressIndicator();
  }

  updateProgressIndicator() {
    const progressText = document.getElementById("progressText");
    const progressBar = document.querySelector(".progress-bar");
    if (progressText)
      progressText.textContent = String(this.currentScene + 1).padStart(2, "0");
    if (progressBar) {
      const progress =
        (this.currentScene / (CAMERA_CONFIG.scenes.length - 1)) * 157;
      progressBar.style.strokeDashoffset = 157 - progress;
    }
  }

  updateSceneVisibility(prevScene = -1) {
    document.querySelectorAll(".scene").forEach((scene, index) => {
      const isActive = index === this.currentScene;
      const wasActive = index === prevScene;

      scene.classList.toggle("active", isActive);
      scene.classList.toggle("exiting", wasActive);

      if (isActive || wasActive) {
        scene.style.display = "flex";
      } else {
        setTimeout(() => {
          if (!scene.classList.contains("active")) {
            scene.style.display = "none";
          }
        }, CAMERA_CONFIG.sceneTransitionDuration);
      }
    });
  }

  triggerSceneAnimations(sceneIndex) {
    const scene = document.querySelector(`.scene[data-scene="${sceneIndex}"]`);
    if (!scene) return;
    scene.classList.remove("scene-enter-done");
    void scene.offsetWidth; // Trigger reflow
    scene.classList.add("scene-enter");
    setTimeout(() => {
      scene.classList.add("scene-enter-done");
      scene.classList.remove("scene-enter");
    }, 1500); // Match animation duration
  }

  updateCamera(currentTime) {
    this.lastTime = this.lastTime || currentTime;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.position.x +=
      (this.target.x - this.position.x) * CAMERA_CONFIG.smoothness;
    this.position.y +=
      (this.target.y - this.position.y) * CAMERA_CONFIG.smoothness;
    this.position.z +=
      (this.target.z - this.position.z) * CAMERA_CONFIG.smoothness;
    this.rotation.y +=
      (this.targetRotation.y - this.rotation.y) * CAMERA_CONFIG.rotationSmooth;

    if (!isMobile && !isTouch) {
      this.mouseInfluence.x +=
        (this.mousePosition.x * 20 - this.mouseInfluence.x) * 0.05;
      this.mouseInfluence.y +=
        (this.mousePosition.y * 10 - this.mouseInfluence.y) * 0.05;
    }

    if (this.viewport) {
      this.viewport.style.transform = `translate3d(${-this.position
        .x}px, ${-this.position.y}px, ${-this.position.z}px) rotateY(${-this
        .rotation.y}deg)`;
    }
    if (this.cinematicBg && !isMobile) {
      this.cinematicBg.style.transform = `translate3d(${
        this.position.x * 0.1 + this.mouseInfluence.x
      }px, ${this.position.y * 0.1 + this.mouseInfluence.y}px, 0px) rotateZ(${
        this.rotation.y * 0.1
      }deg)`;
    }
  }

  startAnimation() {
    const animate = (currentTime) => {
      this.updateCamera(currentTime);
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  }

  handleResize() {
    this.mousePosition = { x: 0, y: 0 };
    this.mouseInfluence = { x: 0, y: 0 };
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}

// =================================================================================
// ENHANCED 3D PARTICLE SYSTEM
// =================================================================================

class ParticleUniverse {
  constructor() {
    this.particleCount = isMobile ? 50 : 150;
    this.shootingStarCount = isMobile ? 2 : 5;
    this.codeFragmentCount = isMobile ? 10 : 30;
    this.dataStreamCount = isMobile ? 5 : 15;
    this.init();
  }

  init() {
    this.createParticles();
    this.createShootingStars();
    this.createCodeFragments();
    this.createDataStreams();
  }

  createParticles() {
    const layers = document.querySelectorAll(".particle-layer");
    layers.forEach((layer, layerIndex) => {
      const particlesInLayer = Math.floor(this.particleCount / layers.length);
      for (let i = 0; i < particlesInLayer; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        p.style.animationDelay = `${Math.random() * 20}s`;
        p.style.animationDuration = `${15 + Math.random() * 15}s`;
        p.style.opacity = 0.2 + layerIndex * 0.2;
        layer.appendChild(p);
      }
    });
  }

  createShootingStars() {
    const container = document.getElementById("shootingStars");
    if (!container) return;
    for (let i = 0; i < this.shootingStarCount; i++) {
      const star = document.createElement("div");
      star.className = "shooting-star";
      star.style.left = `${100 + Math.random() * 50}vw`;
      star.style.top = `${Math.random() * 50}vh`;
      star.style.animationDelay = `${Math.random() * 10}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(star);
    }
  }

  createCodeFragments() {
    const container = document.getElementById("codeFragments");
    if (!container) return;
    const snippets = [
      "std::mutex",
      "class HitchHiker",
      "transmit()",
      "secure",
      "pthread_t",
      "encrypt()",
      "0x41414141",
      "TCP_NODELAY",
      "socket()",
      "bind()",
      "listen()",
      "accept()",
      "recv()",
      "send()",
      "close()",
    ];
    for (let i = 0; i < this.codeFragmentCount; i++) {
      const frag = document.createElement("div");
      frag.className = "code-fragment";
      frag.textContent = snippets[Math.floor(Math.random() * snippets.length)];
      frag.style.left = `${Math.random() * 100}vw`;
      frag.style.animationDelay = `${Math.random() * 15}s`;
      frag.style.animationDuration = `${10 + Math.random() * 10}s`;
      frag.style.fontSize = `${0.6 + Math.random() * 0.4}rem`;
      container.appendChild(frag);
    }
  }

  createDataStreams() {
    const container = document.getElementById("dataStreams");
    if (!container) return;
    for (let i = 0; i < this.dataStreamCount; i++) {
      const stream = document.createElement("div");
      stream.className = "data-stream";
      stream.style.left = `${Math.random() * 100}vw`;
      stream.style.animationDelay = `${Math.random() * 8}s`;
      stream.style.animationDuration = `${6 + Math.random() * 4}s`;
      stream.style.height = `${100 + Math.random() * 200}px`;
      container.appendChild(stream);
    }
  }
}

// =================================================================================
// INTERACTIVE ELEMENTS & EFFECTS
// =================================================================================

class InteractiveEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupCursor();
    this.setupProjectCubeInteractions();
  }

  setupCursor() {
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor || isMobile || isTouch) return;

    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-cube, .skill-planet, .timeline-node, .dot"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

  setupProjectCubeInteractions() {
    document.querySelectorAll(".project-cube").forEach((cube) => {
      cube.addEventListener("click", () => {
        cube.classList.toggle("is-flipped");
      });
    });
  }
}

// =================================================================================
// LOADING SCREEN MANAGER
// =================================================================================

class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.isLoaded = false;
    this.init();
  }

  init() {
    document.body.classList.add("loading");
    // *** MODIFIED: Reduced artificial delay for a snappier start
    const minLoadingTime = 1500;
    const startTime = Date.now();

    window.addEventListener("load", () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      setTimeout(() => this.completeLoading(), remainingTime);
    });

    // Fallback if load event fails
    setTimeout(() => this.completeLoading(), 4000);
  }

  completeLoading() {
    if (this.isLoaded) return;
    this.isLoaded = true;

    if (this.loadingScreen) this.loadingScreen.classList.add("hidden");
    document.body.classList.remove("loading");

    setTimeout(() => {
      window.portfolioApp.initialize();
    }, 500);
  }
}

// =================================================================================
// MAIN APPLICATION
// =================================================================================

class CinematicPortfolio {
  constructor() {
    this.camera = null;
    this.particleUniverse = null;
    this.interactiveEffects = null;
    this.isInitialized = false;
  }

  initialize() {
    if (this.isInitialized) return;
    console.log("🎬 Initializing Cinematic Portfolio Experience...");

    this.camera = new CinematicCamera();
    this.particleUniverse = new ParticleUniverse();
    this.interactiveEffects = new InteractiveEffects();

    this.isInitialized = true;
    console.log("✨ Cinematic Portfolio Experience Ready!");
  }

  destroy() {
    if (this.camera) this.camera.destroy();
  }
}

// =================================================================================
// INITIALIZATION
// =================================================================================

window.portfolioApp = new CinematicPortfolio();

document.addEventListener("DOMContentLoaded", () => {
  new LoadingManager();
});

document.addEventListener("visibilitychange", () => {
  document.body.style.animationPlayState = document.hidden
    ? "paused"
    : "running";
});

window.addEventListener("error", (e) => {
  console.warn("⚠️ Non-critical error in portfolio:", e.error);
});

window.addEventListener("beforeunload", () => {
  if (window.portfolioApp) window.portfolioApp.destroy();
});

console.log("🚀 Cinematic Portfolio Engine Loaded - Ready for Launch!");
