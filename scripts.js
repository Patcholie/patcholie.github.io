// =================================================================================
// CINEMATIC PORTFOLIO - 3D CAMERA EXPERIENCE ENGINE
// =================================================================================

// Global Configuration
const CAMERA_CONFIG = {
  // Camera movement settings
  smoothness: 0.08,
  rotationSmooth: 0.06,
  sceneDistance: 2000,

  // Scene positions in 3D space
  scenes: [
    { x: 0, y: 0, z: 0, rotY: 0 },
    { x: 1500, y: -500, z: 2000, rotY: 20 },
    { x: -1200, y: 800, z: 4000, rotY: -15 },
    { x: 2000, y: -800, z: 6000, rotY: 25 },
    { x: 0, y: 1200, z: 8000, rotY: 0 },
  ],

  // Animation timings
  sceneTransitionDuration: 1800, // Adjusted for smoother scene overlap
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
    this.isScrolling = false;
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
    this.goToScene(0, false);
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
    this.setupWheelControls();
    if (isMobile || isTouch) this.setupTouchControls();
    this.setupKeyboardControls();
    window.addEventListener("resize", () => this.handleResize());
  }

  setupNavigationControls() {
    document.querySelectorAll(".nav-btn, .nav-dot").forEach((el) => {
      el.addEventListener("click", () => {
        const sceneIndex = parseInt(el.dataset.scene);
        this.goToScene(sceneIndex);
      });
    });
  }

  setupWheelControls() {
    document.addEventListener(
      "wheel",
      (e) => {
        if (this.isScrolling || this.isTransitioning) return;
        this.isScrolling = true;

        if (e.deltaY > 0) {
          if (this.currentScene < CAMERA_CONFIG.scenes.length - 1)
            this.goToScene(this.currentScene + 1);
        } else {
          if (this.currentScene > 0) this.goToScene(this.currentScene - 1);
        }

        setTimeout(() => {
          this.isScrolling = false;
        }, 1200);
      },
      { passive: true }
    );
  }

  setupTouchControls() {
    let startY = 0,
      startX = 0,
      isSwiping = false;
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
          if (deltaY < 0 && this.currentScene < CAMERA_CONFIG.scenes.length - 1)
            this.goToScene(this.currentScene + 1);
          else if (deltaY > 0 && this.currentScene > 0)
            this.goToScene(this.currentScene - 1);
        }
      },
      { passive: true }
    );
  }

  setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (this.isTransitioning) return;
      let targetScene = this.currentScene;
      if (e.key === "ArrowUp" || e.key === "w") targetScene--;
      else if (e.key === "ArrowDown" || e.key === "s") targetScene++;
      else if (e.key === "Home") targetScene = 0;
      else if (e.key === "End") targetScene = CAMERA_CONFIG.scenes.length - 1;
      else {
        const num = parseInt(e.key);
        if (!isNaN(num) && num >= 1 && num <= CAMERA_CONFIG.scenes.length)
          targetScene = num - 1;
      }
      if (targetScene !== this.currentScene) {
        e.preventDefault();
        this.goToScene(targetScene);
      }
    });
  }

  goToScene(sceneIndex, animate = true) {
    if (
      sceneIndex < 0 ||
      sceneIndex >= CAMERA_CONFIG.scenes.length ||
      sceneIndex === this.currentScene ||
      this.isTransitioning
    )
      return;

    this.isTransitioning = true;
    const prevScene = this.currentScene;
    this.currentScene = sceneIndex;
    const targetSceneData = CAMERA_CONFIG.scenes[sceneIndex];

    this.updateNavigationUI();

    if (!animate || prefersReducedMotion) {
      this.position = { ...targetSceneData };
      this.target = { ...targetSceneData };
      this.rotation.y = targetSceneData.rotY;
      this.targetRotation.y = targetSceneData.rotY;
      this.updateSceneVisibility();
      this.isTransitioning = false;
      return;
    }

    this.target = { ...targetSceneData };
    this.targetRotation.y = targetSceneData.rotY;

    const direction = sceneIndex > prevScene ? "forward" : "backward";
    this.updateSceneVisibility(prevScene, direction);

    setTimeout(() => {
      this.isTransitioning = false;
      // Clean up exiting classes after transition
      document
        .querySelectorAll(".scene.exiting")
        .forEach((s) =>
          s.classList.remove("exiting", "exiting-forward", "exiting-backward")
        );
    }, CAMERA_CONFIG.sceneTransitionDuration);
  }

  updateNavigationUI() {
    document.querySelectorAll(".nav-btn, .nav-dot").forEach((el, index) => {
      el.classList.toggle(
        "active",
        parseInt(el.dataset.scene) === this.currentScene
      );
    });
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

  // *** MODIFIED: Scene visibility logic for smoother transitions
  updateSceneVisibility(prevSceneIndex = -1, direction = "forward") {
    const scenes = document.querySelectorAll(".scene");
    scenes.forEach((scene, index) => {
      const isActive = index === this.currentScene;
      const wasActive = index === prevSceneIndex;

      if (isActive) {
        scene.style.display = "flex";
        scene.classList.add("active");
        scene.classList.remove(
          "exiting",
          "exiting-forward",
          "exiting-backward"
        );
      } else if (wasActive) {
        scene.classList.remove("active");
        scene.classList.add("exiting", `exiting-${direction}`);
      } else {
        scene.classList.remove(
          "active",
          "exiting",
          "exiting-forward",
          "exiting-backward"
        );
        // Hide non-relevant scenes to improve performance
        setTimeout(() => {
          if (
            !scene.classList.contains("active") &&
            !scene.classList.contains("exiting")
          ) {
            scene.style.display = "none";
          }
        }, CAMERA_CONFIG.sceneTransitionDuration);
      }
    });
  }

  updateCamera() {
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
    const animate = () => {
      this.updateCamera();
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
// PARTICLE SYSTEM
// =================================================================================

class ParticleUniverse {
  constructor() {
    this.particleCount = isMobile ? 50 : 150;
    this.init();
  }
  init() {
    this.createParticles();
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
}

// =================================================================================
// INTERACTIVE EFFECTS & SMOOTH CURSOR
// =================================================================================

class InteractiveEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothCursor();
    this.setupProjectCubeInteractions();
  }

  // *** Smooth, two-part cursor system
  setupSmoothCursor() {
    if (isMobile || isTouch) return;

    const dot = document.querySelector(".cursor-dot");
    const circle = document.querySelector(".cursor-circle");

    let mouseX = 0,
      mouseY = 0;
    let circleX = 0,
      circleY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      // Dot position is immediate
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Circle position is smoothed (lerped)
      const smoothing = 0.15;
      circleX += (mouseX - circleX) * smoothing;
      circleY += (mouseY - circleY) * smoothing;
      circle.style.transform = `translate(${circleX}px, ${circleY}px)`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-cube, .skill-planet, .timeline-node, .dot"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => circle.classList.add("hover"));
      el.addEventListener("mouseleave", () => circle.classList.remove("hover"));
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
    const minLoadingTime = 1500;
    const startTime = Date.now();
    window.addEventListener("load", () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      setTimeout(() => this.completeLoading(), remainingTime);
    });
    setTimeout(() => this.completeLoading(), 4000); // Fallback
  }

  completeLoading() {
    if (this.isLoaded) return;
    this.isLoaded = true;
    if (this.loadingScreen) this.loadingScreen.classList.add("hidden");
    document.body.classList.remove("loading");
    setTimeout(() => window.portfolioApp.initialize(), 500);
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
    this.camera = new CinematicCamera();
    this.particleUniverse = new ParticleUniverse();
    this.interactiveEffects = new InteractiveEffects();
    this.isInitialized = true;
  }

  destroy() {
    if (this.camera) this.camera.destroy();
  }
}

// =================================================================================
// INITIALIZATION
// =================================================================================

window.portfolioApp = new CinematicPortfolio();
document.addEventListener("DOMContentLoaded", () => new LoadingManager());
document.addEventListener("visibilitychange", () => {
  document.body.style.animationPlayState = document.hidden
    ? "paused"
    : "running";
});
