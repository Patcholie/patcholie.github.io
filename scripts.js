// =================================================================================
// CINEMATIC PORTFOLIO - 3D CAMERA EXPERIENCE ENGINE
// =================================================================================

// EPIC 3D SPACE TRAVEL EXPERIENCE - Moving through dimensional layers
const CAMERA_CONFIG = {
  // Ultra-smooth space travel settings
  smoothness: 0.05,
  rotationSmooth: 0.03,

  // 3D SPACE CORRIDOR - Each scene positioned along Z-axis depth journey
  scenes: [
    { x: 0, y: 0, z: 0, rotY: 0, rotX: 0, rotZ: 0 },        // Home - Starting point
    { x: 0, y: 0, z: -300, rotY: 0, rotX: 0, rotZ: 0 },       // Skills - Deeper into space
    { x: 0, y: 0, z: -600, rotY: 0, rotX: 0, rotZ: 0 },       // Experience - Even deeper
    { x: 0, y: 0, z: -900, rotY: 0, rotX: 0, rotZ: 0 },       // Projects - Deep space
    { x: 0, y: 0, z: -1200, rotY: 0, rotX: 0, rotZ: 0 },       // About - Deepest dimension
  ],

  // Space travel timings
  sceneTransitionDuration: 2000,
  particleSpeed: 2.0,

  // Mobile optimizations
  mobile: {
    smoothness: 0.08,
    reducedParticles: false, // Full particles for space effect
    simplifiedTransitions: false,
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
    this.transitionProgress = 0;

    this.viewport = document.getElementById("cameraViewport");
    this.cinematicBg = document.getElementById("cinematicBg");

    this.mousePosition = { x: 0, y: 0 };
    this.mouseInfluence = { x: 0, y: 0 };

    // Enhanced 3D effect properties
    this.motionBlur = 0;
    this.perspectiveShift = 0;
    this.depthLayers = [];

    this.animationId = null;
    this.lastTime = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAnimation();
    
    // Initialize scene visibility - show only the home scene
    this.initializeScenes();
    this.goToScene(0, false);
  }

  initializeScenes() {
    const scenes = document.querySelectorAll(".scene");
    scenes.forEach((scene, index) => {
      if (index === 0) {
        // Home scene should be visible and active initially
        scene.style.visibility = "visible";
        scene.style.display = "flex";
        scene.classList.add("active");
        console.log(`Initialized scene ${index} as active`);
      } else {
        // All other scenes should be hidden initially
        scene.style.visibility = "hidden";
        scene.style.display = "none";
        scene.classList.remove("active");
        console.log(`Initialized scene ${index} as hidden`);
      }
    });
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
    let wheelDebounce = false;
    
    document.addEventListener(
      "wheel",
      (e) => {
        if (wheelDebounce || this.isTransitioning) return;
        
        wheelDebounce = true;
        
        // More sensitive wheel detection for immediate space travel response
        const scrollDirection = e.deltaY > 0 ? 1 : -1;
        let targetScene = this.currentScene + scrollDirection;
        
        // Boundary checking
        if (targetScene >= 0 && targetScene < CAMERA_CONFIG.scenes.length) {
          console.log(`🚀 SPACE TRAVEL: ${scrollDirection > 0 ? 'DIVING DEEPER' : 'RETURNING'} to scene ${targetScene}!`);
          this.goToScene(targetScene);
        }

        // Space travel debouncing
        setTimeout(() => {
          wheelDebounce = false;
        }, 800); // Faster for more responsive space travel
      },
      { passive: true }
    );
  }

  createScreenFlash() {
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100vw";
    flash.style.height = "100vh";
    flash.style.background = "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)";
    flash.style.pointerEvents = "none";
    flash.style.zIndex = "9999";
    flash.style.opacity = "0";
    flash.style.transition = "opacity 0.15s ease-out";
    
    document.body.appendChild(flash);
    
    // Quick flash effect
    setTimeout(() => flash.style.opacity = "1", 10);
    setTimeout(() => flash.style.opacity = "0", 150);
    setTimeout(() => flash.remove(), 300);
  }

  handleResize() {
    this.mousePosition = { x: 0, y: 0 };
    this.mouseInfluence = { x: 0, y: 0 };
    
    // Reset any ongoing effects
    if (this.viewport) {
      this.viewport.style.perspective = "1200px";
    }
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

    console.log(`🚀 LAUNCHING to scene ${sceneIndex} with spectacular 3D transition!`);

    this.isTransitioning = true;
    this.transitionProgress = 0;
    const prevScene = this.currentScene;
    this.currentScene = sceneIndex;
    const targetSceneData = CAMERA_CONFIG.scenes[sceneIndex];

    this.updateNavigationUI();
    this.triggerTransitionEffects(prevScene, sceneIndex);

    if (!animate || prefersReducedMotion) {
      this.position = { ...targetSceneData };
      this.target = { ...targetSceneData };
      this.rotation.x = targetSceneData.rotX || 0;
      this.rotation.y = targetSceneData.rotY || 0;
      this.rotation.z = targetSceneData.rotZ || 0;
      this.targetRotation.x = targetSceneData.rotX || 0;
      this.targetRotation.y = targetSceneData.rotY || 0;
      this.targetRotation.z = targetSceneData.rotZ || 0;
      this.updateSceneVisibility();
      this.isTransitioning = false;
      return;
    }

    // Set target for SPECTACULAR 3D movement
    this.target = { ...targetSceneData };
    this.targetRotation.x = targetSceneData.rotX || 0;
    this.targetRotation.y = targetSceneData.rotY || 0;
    this.targetRotation.z = targetSceneData.rotZ || 0;

    const direction = sceneIndex > prevScene ? "forward" : "backward";
    
    // ENHANCED scene transition with EPIC space travel effects
    this.updateSceneVisibility(prevScene, direction);
    this.animateSceneElements(prevScene, sceneIndex, direction);

    // Progress tracking for advanced effects
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      this.transitionProgress = Math.min((Date.now() - startTime) / CAMERA_CONFIG.sceneTransitionDuration, 1);
      
      // Update dynamic effects based on progress
      this.updateTransitionEffects();
      
      if (this.transitionProgress >= 1) {
        clearInterval(progressInterval);
      }
    }, 16); // 60fps updates

    // Extended timeout for cinematic experience
    setTimeout(() => {
      this.isTransitioning = false;
      this.transitionProgress = 0;
      
      // Cleanup with spectacular fade-out effects
      this.cleanupTransitionEffects();
      
      console.log(`✨ SPECTACULAR transition to scene ${sceneIndex} completed!`);
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

  // *** FIXED: Scene visibility with only active scene shown ***
  updateSceneVisibility(prevSceneIndex = -1, direction = "forward") {
    const scenes = document.querySelectorAll(".scene");
    
    scenes.forEach((scene, index) => {
      const isActive = index === this.currentScene;
      const wasActive = index === prevSceneIndex;

      // Remove all previous states
      scene.classList.remove(
        "active",
        "exiting",
        "exiting-forward",
        "exiting-backward"
      );

      if (isActive) {
        // Make the new active scene visible and active
        scene.style.visibility = "visible";
        scene.style.display = "flex";
        scene.classList.add("active");
        console.log(`Scene ${index} is now active and visible`);
      } else if (wasActive && prevSceneIndex !== -1) {
        // Handle the previous scene exit with animation
        scene.classList.add("exiting", `exiting-${direction}`);
        console.log(`Scene ${index} is exiting ${direction}`);
        
        // Hide after transition completes
        setTimeout(() => {
          scene.style.visibility = "hidden";
          scene.style.display = "none";
        }, CAMERA_CONFIG.sceneTransitionDuration);
      } else {
        // Immediately hide all other scenes
        scene.style.visibility = "hidden";
        scene.style.display = "none";
      }
    });
  }

  updateCamera() {
    // EPIC space travel camera movement
    const prevZ = this.position.z;
    
    this.position.x += (this.target.x - this.position.x) * CAMERA_CONFIG.smoothness;
    this.position.y += (this.target.y - this.position.y) * CAMERA_CONFIG.smoothness;
    this.position.z += (this.target.z - this.position.z) * CAMERA_CONFIG.smoothness;
    
    // Calculate forward/backward movement speed for space effects
    const movementSpeed = Math.abs(this.position.z - prevZ);
    this.motionBlur = Math.min(movementSpeed * 0.02, 2);

    // Enhanced mouse parallax for immersive space navigation
    if (!isMobile && !isTouch) {
      this.mouseInfluence.x += (this.mousePosition.x * 15 - this.mouseInfluence.x) * 0.04;
      this.mouseInfluence.y += (this.mousePosition.y * 10 - this.mouseInfluence.y) * 0.04;
    }

    // SPACE TRAVEL camera transform
    if (this.viewport) {
      const transform = `
        translate3d(${-this.position.x + this.mouseInfluence.x}px, 
                   ${-this.position.y + this.mouseInfluence.y}px, 
                   ${-this.position.z}px)
        ${this.isTransitioning ? `scale(${1 + this.motionBlur * 0.1})` : 'scale(1)'}
      `;
      
      this.viewport.style.transform = transform;
      
      // Dynamic perspective for space travel feel
      const dynamicPerspective = 1200 + Math.abs(this.position.z) * 0.1;
      this.viewport.style.perspective = `${dynamicPerspective}px`;
      
      // Motion blur during fast space travel
      if (this.isTransitioning && this.motionBlur > 0.3) {
        this.viewport.style.filter = `blur(${this.motionBlur}px)`;
      } else {
        this.viewport.style.filter = 'none';
      }
    }
    
    // EPIC background parallax for space corridor effect
    if (this.cinematicBg && !isMobile) {
      const bgTransform = `
        translate3d(${this.position.x * 0.05 + this.mouseInfluence.x * 0.2}px, 
                   ${this.position.y * 0.05 + this.mouseInfluence.y * 0.2}px, 
                   ${this.position.z * 0.8}px) 
        scale(${1 + Math.abs(this.position.z) * 0.0001})
      `;
      this.cinematicBg.style.transform = bgTransform;
    }

    // Update space corridor depth layers
    this.updateSpaceCorridorLayers();
  }

  startAnimation() {
    const animate = () => {
      this.updateCamera();
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  }

  // *** EPIC: Space travel effects ***
  triggerTransitionEffects(prevScene, nextScene) {
    // Activate WARP DRIVE
    this.activateWarpDrive();
    
    // Create speed lines for space travel
    this.createSpeedLines();
    
    // Add subtle screen flash effect
    this.createScreenFlash();
    
    // Create space particles
    this.createSpaceParticles();
  }

  activateWarpDrive() {
    if (this.viewport) {
      this.viewport.classList.add('warping');
      
      // Remove warp effect after transition
      setTimeout(() => {
        this.viewport.classList.remove('warping');
      }, CAMERA_CONFIG.sceneTransitionDuration);
    }
  }

  createSpeedLines() {
    const speedLinesContainer = document.getElementById("speedLines");
    if (!speedLinesContainer) return;

    // Clear existing speed lines
    speedLinesContainer.innerHTML = '';

    // Create radial speed lines from center
    for (let i = 0; i < (isMobile ? 30 : 60); i++) {
      const line = document.createElement("div");
      line.className = "speed-line";
      
      // Random position around center
      const angle = (i / (isMobile ? 30 : 60)) * Math.PI * 2;
      const distance = Math.random() * 300 + 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      line.style.left = `calc(50% + ${x}px)`;
      line.style.top = `calc(50% + ${y}px)`;
      line.style.animation = `speedLineTravel ${1 + Math.random()}s ease-out forwards`;
      line.style.animationDelay = `${Math.random() * 0.5}s`;
      
      speedLinesContainer.appendChild(line);
    }

    // Clean up speed lines after animation
    setTimeout(() => {
      speedLinesContainer.innerHTML = '';
    }, 2000);
  }

  createSpaceParticles() {
    const particleContainer = document.getElementById("particleUniverse");
    if (!particleContainer) return;

    // Create spectacular space particles during transition
    for (let i = 0; i < (isMobile ? 25 : 50); i++) {
      const particle = document.createElement("div");
      particle.className = "space-particle";
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1000";
      particle.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)";
      
      // Random starting position around center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 200 + 50;
      const startX = window.innerWidth / 2 + Math.cos(angle) * radius;
      const startY = window.innerHeight / 2 + Math.sin(angle) * radius;
      
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      
      // Space travel animation
      particle.style.animation = `spaceTravel ${1.5 + Math.random()}s ease-out forwards`;
      
      particleContainer.appendChild(particle);
      
      // Remove after animation
      setTimeout(() => particle.remove(), 2500);
    }
  }

  animateSceneElements(prevScene, nextScene, direction) {
    const scenes = document.querySelectorAll(".scene");
    
    // Smooth depth-based transitions for space travel
    if (scenes[prevScene]) {
      const exitingScene = scenes[prevScene];
      exitingScene.style.transition = "opacity 1s ease-out";
      exitingScene.style.opacity = "0";
    }
    
    // Smooth incoming scene entrance
    if (scenes[nextScene]) {
      const enteringScene = scenes[nextScene];
      enteringScene.style.transition = "opacity 1s ease-in";
      enteringScene.style.opacity = "1";
    }
  }

  updateSpaceCorridorLayers() {
    // Update space corridor depth layers for enhanced 3D travel effect
    const depthLayers = document.querySelectorAll(".bg-layer");
    depthLayers.forEach((layer, index) => {
      const depth = (index + 1) * 0.2;
      const parallaxZ = this.position.z * depth;
      const scale = 1 + Math.abs(this.position.z) * depth * 0.0002;
      
      // Create tunnel effect with layers moving at different speeds
      layer.style.transform = `
        translateZ(${-index * 200 + parallaxZ}px) 
        scale(${scale})
        rotateZ(${this.position.z * depth * 0.01}deg)
      `;
      
      // Fade layers based on distance for depth perception
      const opacity = Math.max(0.1, 1 - Math.abs(this.position.z) * depth * 0.0003);
      layer.style.opacity = opacity;
    });
  }

  updateTransitionEffects() {
    // Dynamic space travel effects based on transition progress
    const progress = this.transitionProgress;
    
    // Dynamic tunnel effect during space travel
    if (this.viewport) {
      const dynamicPerspective = 1200 + Math.sin(progress * Math.PI) * 300;
      this.viewport.style.perspective = `${dynamicPerspective}px`;
    }
    
    // Space warp effect during peak transition
    if (progress > 0.3 && progress < 0.7) {
      const warpIntensity = Math.sin((progress - 0.3) * Math.PI * 2.5);
      document.body.style.filter = `
        saturate(${1 + warpIntensity * 0.5}) 
        contrast(${1 + warpIntensity * 0.2})
        hue-rotate(${warpIntensity * 30}deg)
      `;
    } else {
      document.body.style.filter = "none";
    }
  }

  cleanupTransitionEffects() {
    // Clean up all space travel effects
    document.querySelectorAll(".space-particle, .speed-line").forEach(p => p.remove());
    document.body.style.filter = "none";
    
    const speedLines = document.getElementById("speedLines");
    if (speedLines) speedLines.innerHTML = '';
    
    if (this.viewport) {
      this.viewport.style.perspective = "1200px";
      this.viewport.classList.remove('warping');
    }
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
    this.createShootingStars();
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
    const shootingStarsContainer = document.getElementById("shootingStars");
    if (!shootingStarsContainer) return;

    const createShootingStar = () => {
      const star = document.createElement("div");
      star.className = "shooting-star";
      star.style.position = "absolute";
      star.style.width = "2px";
      star.style.height = "2px";
      star.style.background = "white";
      star.style.boxShadow = "0 0 10px white";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = "0";
      star.style.animation = "shootingStarFall 3s linear";
      
      shootingStarsContainer.appendChild(star);
      
      star.addEventListener("animationend", () => {
        star.remove();
      });
    };

    // Create shooting stars periodically
    setInterval(createShootingStar, 3000 + Math.random() * 5000);
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
    this.setupCodeAnimation();
  }

  // *** Smooth cursor system - back to working version ***
  setupSmoothCursor() {
    if (isMobile || isTouch) return;

    const dot = document.querySelector(".cursor-dot");
    const circle = document.querySelector(".cursor-circle");

    if (!dot || !circle) return;

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
      "a, button, .project-cube, .skill-planet, .timeline-node, .dot, .nav-btn, .link-planet"
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

  setupCodeAnimation() {
    // Add typing animation to code lines
    const codeLines = document.querySelectorAll(".code-line");
    codeLines.forEach((line, index) => {
      line.style.opacity = "0";
      line.style.transform = "translateX(-20px)";
      line.style.transition = "all 0.3s ease";
      
      setTimeout(() => {
        line.style.opacity = "1";
        line.style.transform = "translateX(0)";
      }, index * 200 + 2000); // Start after 2s, stagger by 200ms
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
    
    // Wait for all resources to load
    window.addEventListener("load", () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      setTimeout(() => this.completeLoading(), remainingTime);
    });
    
    // Fallback timeout
    setTimeout(() => this.completeLoading(), 4000);
  }

  completeLoading() {
    if (this.isLoaded) return;
    this.isLoaded = true;
    
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");
    }
    
    document.body.classList.remove("loading");
    
    // Initialize the main app after loading is complete
    setTimeout(() => {
      if (window.portfolioApp) {
        window.portfolioApp.initialize();
      }
    }, 500);
  }
}

// =================================================================================
// BACKGROUND EFFECTS
// =================================================================================


class BackgroundEffects {
  constructor() {
    this.init();
  }

  init() {
    this.createFloatingCodeFragments();
    this.createDataStreams();
    this.createTemporalGrid();
    this.createCodeRain();
    this.createConnectionWeb();
  }

  createFloatingCodeFragments() {
    const container = document.getElementById("codeFragments");
    if (!container) return;

    const fragments = [
      "class CyberSec",
      "void encrypt()",
      "std::mutex",
      "thread_safe",
      "0x4A7F2E",
      "RSA-2048",
      "AES-256",
      "SHA-512"
    ];

    fragments.forEach((text, index) => {
      const fragment = document.createElement("div");
      fragment.className = "code-fragment";
      fragment.textContent = text;
      fragment.style.position = "absolute";
      fragment.style.left = `${Math.random() * 80 + 10}%`;
      fragment.style.top = `${Math.random() * 80 + 10}%`;
      fragment.style.color = "rgba(255, 255, 255, 0.1)";
      fragment.style.fontFamily = "var(--font-mono)";
      fragment.style.fontSize = "0.8rem";
      fragment.style.animation = `floatCode ${20 + Math.random() * 10}s infinite linear`;
      fragment.style.animationDelay = `${index * 2}s`;
      container.appendChild(fragment);
    });
  }

  createDataStreams() {
    const container = document.getElementById("dataStreams");
    if (!container) return;

    for (let i = 0; i < 5; i++) {
      const stream = document.createElement("div");
      stream.className = "data-stream";
      stream.style.position = "absolute";
      stream.style.width = "1px";
      stream.style.height = "100vh";
      stream.style.background = "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)";
      stream.style.left = `${Math.random() * 100}%`;
      stream.style.animation = `dataFlow ${10 + Math.random() * 5}s infinite linear`;
      stream.style.animationDelay = `${i * 2}s`;
      container.appendChild(stream);
    }
  }

  createTemporalGrid() {
    const container = document.querySelector(".temporal-grid");
    if (!container) return;

    container.style.position = "absolute";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundImage = `
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `;
    container.style.backgroundSize = "60px 60px";
    container.style.animation = "gridPulse 4s ease-in-out infinite";
  }

  createCodeRain() {
    const container = document.getElementById("codeRain");
    if (!container) return;

    const characters = "01ABCDEF{}[]();#include<iostream>";
    
    for (let i = 0; i < 20; i++) {
      const column = document.createElement("div");
      column.className = "code-rain-column";
      column.style.position = "absolute";
      column.style.left = `${Math.random() * 100}%`;
      column.style.color = "rgba(255,255,255,0.1)";
      column.style.fontFamily = "var(--font-mono)";
      column.style.fontSize = "0.8rem";
      column.style.animation = `rainFall ${5 + Math.random() * 5}s infinite linear`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      let text = "";
      for (let j = 0; j < 20; j++) {
        text += characters[Math.floor(Math.random() * characters.length)] + "\n";
      }
      column.textContent = text;
      
      container.appendChild(column);
    }
  }

  createConnectionWeb() {
    const container = document.getElementById("connectionWeb");
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.opacity = "0.1";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const nodes = [];

    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Add CSS animations for the background effects
const style = document.createElement("style");
style.textContent = `
  @keyframes floatCode {
    0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
    50% { opacity: 0.3; }
    100% { transform: translateY(-20px) rotate(360deg); opacity: 0.1; }
  }
  
  @keyframes dataFlow {
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
  
  @keyframes gridPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  @keyframes rainFall {
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
  
  @keyframes shootingStarFall {
    0% { transform: translateY(0) translateX(0); opacity: 1; }
    100% { transform: translateY(100vh) translateX(50px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// =================================================================================
// MAIN APPLICATION
// =================================================================================

class CinematicPortfolio {
  constructor() {
    this.camera = null;
    this.particleUniverse = null;
    this.interactiveEffects = null;
    this.backgroundEffects = null;
    this.isInitialized = false;
  }

  initialize() {
    if (this.isInitialized) return;
    
    console.log("Initializing portfolio app..."); // Debug log
    
    this.camera = new CinematicCamera();
    this.particleUniverse = new ParticleUniverse();
    this.interactiveEffects = new InteractiveEffects();
    this.backgroundEffects = new BackgroundEffects();
    
    this.isInitialized = true;
    console.log("Portfolio app initialized successfully!"); // Debug log
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
  console.log("DOM loaded, starting loading manager..."); // Debug log
  new LoadingManager();
});

document.addEventListener("visibilitychange", () => {
  document.body.style.animationPlayState = document.hidden
    ? "paused"
    : "running";
});