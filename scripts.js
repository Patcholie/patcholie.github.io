// ================================
// IMMERSIVE 3D PORTFOLIO SYSTEM
// ================================

// Enhanced 3D Configuration
const CONFIG = {
  // 3D Camera System - Immersive Space Travel
  camera: {
    smoothness: 0.015,          // Ultra-smooth movement
    rotationSmooth: 0.02,       // Smooth rotation
    transitionDuration: 2200,   // Cinematic transition time
    approachDistance: 300,      // Distance to start approaching scene
    
    // 3D Cube Space Formation - Professional Layout
    positions: [
      { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, name: "Home" },           // Center
      { x: 1500, y: 0, z: -2000, rotX: 0, rotY: 0, rotZ: 0, name: "Skills" },     // Right
      { x: 0, y: -1500, z: 2000, rotX: 0, rotY: 0, rotZ: 0, name: "Experience" },  // Up
      { x: 0, y: 0, z: -4000, rotX: 0, rotY: 0, rotZ: 0, name: "Projects" },    // Back
      { x: -1500, y: 0, z: 4000, rotX: 0, rotY: 0, rotZ: 0, name: "About" },       // Left
    ],
    
    // Immersive effects
    mouseInfluence: 0.1,
    parallaxStrength: 0.3,
    motionBlurThreshold: 80,    // Speed threshold for motion blur
  },
  
  // Enhanced cursor system
  cursor: {
    dotSmoothing: 0,            // Immediate dot
    trailSmoothing: 0.1,        // Smooth trail
  },
  
  // Immersive effects
  effects: {
    particleCount: 200,
    transitionEffects: true,
    motionBlur: true,
    speedLines: true,
    warpEffect: true,
  },
  
  // Performance
  performance: {
    maxFPS: 60,
    reducedMotion: false,
  }
};

// Device Detection & Optimization
const DEVICE = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768,
  isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Performance detection
  getPerformanceTier() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'low';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (renderer.includes('Intel HD') || renderer.includes('Basic')) return 'low';
      if (renderer.includes('GTX') || renderer.includes('RTX') || renderer.includes('Radeon')) return 'high';
    }
    
    return 'medium';
  }
};

// Auto-adjust for mobile and performance
if (DEVICE.isMobile) {
  CONFIG.camera.smoothness = 0.03;
  CONFIG.camera.transitionDuration = 1500;
  CONFIG.effects.particleCount = 40;
  CONFIG.effects.motionBlur = false;
}

if (DEVICE.prefersReducedMotion) {
  CONFIG.camera.transitionDuration = 800;
  CONFIG.effects.transitionEffects = false;
  CONFIG.effects.motionBlur = false;
}

// ================================
// ENHANCED SMOOTH CURSOR SYSTEM
// ================================

class ImmersiveCursor {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.trail = document.querySelector('.cursor-trail');
    this.system = document.querySelector('.cursor-system');
    
    this.mouse = { x: 0, y: 0 };
    this.trailPos = { x: 0, y: 0 };
    
    this.isActive = !DEVICE.isMobile && !DEVICE.isTouch;
    
    if (this.isActive) {
      this.init();
    }
  }
  
  init() {
    this.setupEventListeners();
    this.animate();
  }
  
  setupEventListeners() {
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Visibility
    document.addEventListener('mouseleave', () => {
      this.system.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
      this.system.style.opacity = '1';
    });
    
    // Interactive elements
    this.setupInteractiveElements();
  }
  
  setupInteractiveElements() {
    const interactiveElements = document.querySelectorAll([
      'a', 'button', '.nav-btn', '.mobile-nav-item', '.social-link',
      '.skill-card', '.project-card', '.timeline-item', '.control-dot',
      '.tag', '.tech-badge', '[tabindex]'
    ].join(', '));
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.system.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        this.system.classList.remove('hover');
      });
    });
  }
  
  animate() {
    // Immediate dot positioning
    this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    
    // Smooth trail following
    this.trailPos.x += (this.mouse.x - this.trailPos.x) * CONFIG.cursor.trailSmoothing;
    this.trailPos.y += (this.mouse.y - this.trailPos.y) * CONFIG.cursor.trailSmoothing;
    
    this.trail.style.transform = `translate(${this.trailPos.x}px, ${this.trailPos.y}px)`;
    
    requestAnimationFrame(() => this.animate());
  }
}

// ================================
// IMMERSIVE 3D CAMERA SYSTEM
// ================================

class ImmersiveCamera3D {
  constructor() {
    this.viewport = document.getElementById('cameraViewport');
    this.navCoords = document.getElementById('navCoords');
    this.transitionEffects = document.getElementById('transitionEffects');
    
    this.position = { x: 0, y: 0, z: 0 };
    this.target = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.targetRotation = { x: 0, y: 0, z: 0 };
    
    this.currentScene = 0;
    this.isTransitioning = false;
    this.transitionProgress = 0;
    this.travelSpeed = 0;
    
    this.mouse = { x: 0, y: 0 };
    this.mouseSmooth = { x: 0, y: 0 };
    
    this.particleSystem = null;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.initializeScenes();
    this.animate();
  }
  
  setupEventListeners() {
    // Mouse parallax
    if (!DEVICE.isMobile) {
      document.addEventListener('mousemove', (e) => {
        this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }
    
    // Navigation
    document.querySelectorAll('.nav-btn, .mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const sceneIndex = parseInt(btn.dataset.scene);
        this.travelToScene(sceneIndex);
      });
    });
    
    // Keyboard navigation
    this.setupKeyboardControls();
    
    // Wheel/scroll navigation
    this.setupWheelControls();
    
    // Touch navigation
    if (DEVICE.isMobile || DEVICE.isTouch) {
      this.setupTouchControls();
    }
  }
  
  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (this.isTransitioning) return;
      
      let targetScene = this.currentScene;
      
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          targetScene = 4; // About (Left)
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          targetScene = 1; // Skills (Right)
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          targetScene = 2; // Experience (Up)
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          targetScene = 3; // Projects (Back)
          break;
        case 'Home':
        case 'h':
        case 'H':
          targetScene = 0; // Home
          break;
        case '1': targetScene = 0; break;
        case '2': targetScene = 1; break;
        case '3': targetScene = 2; break;
        case '4': targetScene = 3; break;
        case '5': targetScene = 4; break;
      }
      
      if (targetScene !== this.currentScene) {
        e.preventDefault();
        this.travelToScene(targetScene);
      }
    });
  }
  
  setupWheelControls() {
    let wheelCooldown = false;
    
    document.addEventListener('wheel', (e) => {
      if (this.isTransitioning || wheelCooldown) return;
      
      wheelCooldown = true;
      setTimeout(() => wheelCooldown = false, 600);
      
      const direction = e.deltaY > 0 ? 1 : -1;
      let targetScene = this.currentScene + direction;
      
      // Wrap around
      if (targetScene < 0) targetScene = CONFIG.camera.positions.length - 1;
      if (targetScene >= CONFIG.camera.positions.length) targetScene = 0;
      
      this.travelToScene(targetScene);
    }, { passive: true });
  }
  
  setupTouchControls() {
    let startX, startY, startTime;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      if (this.isTransitioning) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = Date.now() - startTime;
      
      if ((Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) && deltaTime < 300) {
        let targetScene = this.currentScene;
        
        // Determine direction based on strongest swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) targetScene = 4; // About (Left)
          else targetScene = 1; // Skills (Right)
        } else {
          // Vertical swipe
          if (deltaY > 0) targetScene = 3; // Projects (Back)
          else targetScene = 2; // Experience (Up)
        }
        
        this.travelToScene(targetScene);
      }
    }, { passive: true });
  }
  
  initializeScenes() {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach((scene, index) => {
      if (index === 0) {
        scene.classList.add('active');
        scene.style.opacity = '1';
        scene.style.visibility = 'visible';
      } else {
        scene.classList.remove('active');
        scene.style.opacity = '0';
        scene.style.visibility = 'hidden';
      }
    });
  }
  
  travelToScene(sceneIndex) {
    if (sceneIndex === this.currentScene || this.isTransitioning) return;
    if (sceneIndex < 0 || sceneIndex >= CONFIG.camera.positions.length) return;
    
    console.log(`🚀 Traveling to ${CONFIG.camera.positions[sceneIndex].name}`);
    
    this.isTransitioning = true;
    this.transitionProgress = 0;
    
    const prevScene = this.currentScene;
    this.currentScene = sceneIndex;
    
    // Calculate travel distance for effects
    const currentPos = CONFIG.camera.positions[prevScene];
    const targetPos = CONFIG.camera.positions[sceneIndex];
    const distance = Math.sqrt(
      Math.pow(targetPos.x - currentPos.x, 2) +
      Math.pow(targetPos.y - currentPos.y, 2) +
      Math.pow(targetPos.z - currentPos.z, 2)
    );
    
    // Set camera target
    this.target = { ...targetPos };
    this.targetRotation = { 
      x: targetPos.rotX || 0, 
      y: targetPos.rotY || 0, 
      z: targetPos.rotZ || 0 
    };
    
    // Update UI
    this.updateNavigationUI();
    
    // Start immersive transition
    this.startImmersiveTransition(distance);
    
    // Update scene visibility with approach system
    this.updateSceneVisibilityWithApproach(prevScene, sceneIndex);
    
    // Track transition progress
    this.trackTransitionProgress();
  }
  
  startImmersiveTransition(distance) {
    // Activate transition effects
    if (CONFIG.effects.transitionEffects) {
      this.activateTransitionEffects();
    }
    
    // Add motion blur based on distance
    if (CONFIG.effects.motionBlur && distance > CONFIG.camera.motionBlurThreshold) {
      this.viewport.classList.add('fast-travel');
    } else {
      this.viewport.classList.add('traveling');
    }
    
    // Create particle trail
    if (CONFIG.effects.particleCount > 0) {
      this.createParticleTrail(distance);
    }
    
    // Create speed lines for fast travel
    if (CONFIG.effects.speedLines && distance > CONFIG.camera.motionBlurThreshold) {
      this.createSpeedLines();
    }
  }
  
  activateTransitionEffects() {
    if (this.transitionEffects) {
      this.transitionEffects.classList.add('active');
      
      // Add different effects based on transition type
      const effects = ['motion-blur-overlay', 'speed-lines', 'warp-field'];
      
      effects.forEach((effect, index) => {
        const element = document.createElement('div');
        element.className = effect;
        this.transitionEffects.appendChild(element);
        
        // Remove effect after animation
        setTimeout(() => {
          element.remove();
        }, CONFIG.camera.transitionDuration);
      });
    }
  }
  
  createParticleTrail(distance) {
    const particleCount = Math.min(CONFIG.effects.particleCount, distance / 20);
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'travel-particle';
      
      // Random position around center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 200 + 100;
      const x = window.innerWidth / 2 + Math.cos(angle) * radius;
      const y = window.innerHeight / 2 + Math.sin(angle) * radius;
      
      particle.style.cssText = `
        position: fixed;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: rgba(255, 255, 255, ${0.3 + Math.random() * 0.7});
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 ${5 + Math.random() * 10}px rgba(255, 255, 255, 0.5);
      `;
      
      document.body.appendChild(particle);
      
      // Animate particle
      const duration = 1000 + Math.random() * 1000;
      const targetX = x + (Math.random() - 0.5) * 400;
      const targetY = y + (Math.random() - 0.5) * 400;
      
      particle.animate([
        { transform: `translate(0, 0) scale(1)`, opacity: 0 },
        { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0.1)`, opacity: 1 },
        { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`, opacity: 0 }
      ], {
        duration: duration,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  }
  
  createSpeedLines() {
    const speedLineCount = 30;
    
    for (let i = 0; i < speedLineCount; i++) {
      const line = document.createElement('div');
      line.className = 'speed-line';
      
      // Random position and angle
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300 + 150;
      const x = window.innerWidth / 2 + Math.cos(angle) * distance;
      const y = window.innerHeight / 2 + Math.sin(angle) * distance;
      
      line.style.cssText = `
        position: fixed;
        width: 2px;
        height: ${20 + Math.random() * 40}px;
        background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), transparent);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 999;
        transform-origin: center;
        transform: rotate(${angle}rad);
      `;
      
      document.body.appendChild(line);
      
      // Animate line
      line.animate([
        { transform: `rotate(${angle}rad) translateY(0) scale(1)`, opacity: 0 },
        { transform: `rotate(${angle}rad) translateY(-100px) scale(1.5)`, opacity: 1 },
        { transform: `rotate(${angle}rad) translateY(-300px) scale(0.5)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 400,
        easing: 'ease-out'
      }).onfinish = () => line.remove();
    }
  }
  
  updateSceneVisibilityWithApproach(prevScene, nextScene) {
    const scenes = document.querySelectorAll('.scene');
    
    scenes.forEach((scene, index) => {
      scene.classList.remove('active', 'approaching', 'transitioning');
      
      if (index === nextScene) {
        scene.classList.add('approaching');
        scene.style.visibility = 'visible';
        scene.style.opacity = '0.6';
        
        // Activate scene after short delay
        setTimeout(() => {
          scene.classList.remove('approaching');
          scene.classList.add('active');
          scene.style.opacity = '1';
        }, CONFIG.camera.transitionDuration * 0.7);
        
      } else if (index === prevScene) {
        scene.classList.add('transitioning');
        scene.style.opacity = '0.3';
        
        // Hide scene after transition
        setTimeout(() => {
          scene.classList.remove('transitioning');
          scene.style.opacity = '0';
          scene.style.visibility = 'hidden';
        }, CONFIG.camera.transitionDuration * 0.5);
        
      } else {
        scene.style.opacity = '0';
        scene.style.visibility = 'hidden';
      }
    });
  }
  
  trackTransitionProgress() {
    const startTime = Date.now();
    
    const progressInterval = setInterval(() => {
      this.transitionProgress = Math.min(
        (Date.now() - startTime) / CONFIG.camera.transitionDuration,
        1
      );
      
      // Update travel speed for effects
      this.travelSpeed = Math.sin(this.transitionProgress * Math.PI) * 100;
      
      if (this.transitionProgress >= 1) {
        clearInterval(progressInterval);
        this.endTransition();
      }
    }, 16);
  }
  
  endTransition() {
    this.isTransitioning = false;
    this.transitionProgress = 0;
    this.travelSpeed = 0;
    
    // Remove transition effects
    this.viewport.classList.remove('traveling', 'fast-travel');
    
    if (this.transitionEffects) {
      this.transitionEffects.classList.remove('active');
    }
    
    console.log(`✨ Arrived at ${CONFIG.camera.positions[this.currentScene].name}`);
  }
  
  updateNavigationUI() {
    // Update navigation buttons
    document.querySelectorAll('.nav-btn, .mobile-nav-item').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.scene) === this.currentScene);
    });
    
    // Update coordinates display
    if (this.navCoords) {
      const pos = CONFIG.camera.positions[this.currentScene];
      this.navCoords.textContent = `X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}`;
    }
    
    // Update scene info
    const sceneInfo = document.getElementById('sceneInfo');
    if (sceneInfo) {
      sceneInfo.textContent = CONFIG.camera.positions[this.currentScene].name;
    }
  }
  
  updateCamera() {
    // Smooth mouse parallax
    this.mouseSmooth.x += (this.mouse.x - this.mouseSmooth.x) * CONFIG.camera.mouseInfluence;
    this.mouseSmooth.y += (this.mouse.y - this.mouseSmooth.y) * CONFIG.camera.mouseInfluence;
    
    // Smooth camera movement
    this.position.x += (this.target.x - this.position.x) * CONFIG.camera.smoothness;
    this.position.y += (this.target.y - this.position.y) * CONFIG.camera.smoothness;
    this.position.z += (this.target.z - this.position.z) * CONFIG.camera.smoothness;
    
    // Smooth rotation
    this.rotation.x += (this.targetRotation.x - this.rotation.x) * CONFIG.camera.rotationSmooth;
    this.rotation.y += (this.targetRotation.y - this.rotation.y) * CONFIG.camera.rotationSmooth;
    this.rotation.z += (this.targetRotation.z - this.rotation.z) * CONFIG.camera.rotationSmooth;
    
    // Apply camera transform
    if (this.viewport) {
      const parallaxX = this.mouseSmooth.x * 20;
      const parallaxY = this.mouseSmooth.y * 20;
      
      const transform = `
        translate3d(${-this.position.x + parallaxX}px, ${-this.position.y + parallaxY}px, ${-this.position.z}px)
        rotateX(${this.rotation.x}deg) 
        rotateY(${this.rotation.y}deg) 
        rotateZ(${this.rotation.z}deg)
      `;
      
      this.viewport.style.transform = transform;
    }
    
    // Update background parallax
    this.updateBackgroundParallax();
  }
  
  updateBackgroundParallax() {
    // Particle universe parallax
    const particleUniverse = document.getElementById('particleUniverse');
    if (particleUniverse) {
      const parallaxX = this.position.x * 0.1 + this.mouseSmooth.x * 15;
      const parallaxY = this.position.y * 0.1 + this.mouseSmooth.y * 15;
      const parallaxZ = this.position.z * 0.1;
      
      particleUniverse.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, ${parallaxZ}px)`;
    }
    
    // Grid system parallax
    const gridSystem = document.getElementById('gridSystem');
    if (gridSystem) {
      const parallaxX = this.position.x * 0.05;
      const parallaxY = this.position.y * 0.05;
      const parallaxZ = this.position.z * 0.05;
      
      gridSystem.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, ${parallaxZ}px)`;
    }
  }
  
  animate() {
    this.updateCamera();
    requestAnimationFrame(() => this.animate());
  }
}

// ================================
// ENHANCED LOADING MANAGER
// ================================

class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.loadingBar = document.querySelector('.loading-bar');
    this.loadingPercentage = document.querySelector('.loading-percentage');
    this.loadingSubtitle = document.querySelector('.loading-subtitle');
    
    this.progress = 0;
    this.targetProgress = 0;
    
    this.init();
  }
  
  init() {
    this.simulateLoading();
  }
  
  simulateLoading() {
    const steps = [
      { progress: 15, delay: 200, text: 'Initializing 3D Engine...' },
      { progress: 35, delay: 500, text: 'Loading Immersive Environment...' },
      { progress: 60, delay: 800, text: 'Preparing Space Navigation...' },
      { progress: 85, delay: 1100, text: 'Activating Particle Systems...' },
      { progress: 100, delay: 1400, text: 'Ready for Launch!' }
    ];
    
    steps.forEach(step => {
      setTimeout(() => {
        this.targetProgress = step.progress;
        if (this.loadingSubtitle) {
          this.loadingSubtitle.textContent = step.text;
        }
      }, step.delay);
    });
    
    this.animateProgress();
  }
  
  animateProgress() {
    const animate = () => {
      this.progress += (this.targetProgress - this.progress) * 0.1;
      
      if (this.loadingBar) {
        this.loadingBar.style.transform = `scaleX(${this.progress / 100})`;
      }
      
      if (this.loadingPercentage) {
        this.loadingPercentage.textContent = `${Math.floor(this.progress)}%`;
      }
      
      if (this.progress < 99) {
        requestAnimationFrame(animate);
      } else {
        this.completeLoading();
      }
    };
    
    animate();
  }
  
  completeLoading() {
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('hidden');
      }
      
      setTimeout(() => {
        if (window.portfolioApp) {
          window.portfolioApp.initialize();
        }
      }, 500);
    }, 1000);
  }
}

// ================================
// FLOATING ELEMENTS SYSTEM
// ================================

class FloatingElements {
  constructor() {
    this.container = document.getElementById('floatingElements');
    
    if (this.container && !DEVICE.isMobile) {
      this.init();
    }
  }
  
  init() {
    this.createElements();
  }
  
  createElements() {
    const fragments = [
      'class SecuritySystem',
      'void encrypt()',
      'std::mutex _mutex',
      'thread_safe',
      'RAII',
      'steganography',
      'network_security',
      'covert_channel',
      'AES-256',
      'SHA-512',
      'std::unique_ptr',
      'async_await',
      'blockchain',
      'quantum_crypto'
    ];
    
    fragments.forEach((text, index) => {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.textContent = text;
      element.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${index * 0.3}s;
      `;
      
      this.container.appendChild(element);
    });
  }
}

// ================================
// PERFORMANCE MONITOR
// ================================

class PerformanceMonitor {
  constructor() {
    this.fpsCounter = document.getElementById('fpsCount');
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    
    this.init();
  }
  
  init() {
    this.startMonitoring();
  }
  
  startMonitoring() {
    const monitor = () => {
      const now = performance.now();
      this.frameCount++;
      
      if (now - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
        this.frameCount = 0;
        this.lastTime = now;
        
        if (this.fpsCounter) {
          this.fpsCounter.textContent = this.fps;
        }
        
        // Auto-adjust quality based on FPS
        this.adjustQuality();
      }
      
      requestAnimationFrame(monitor);
    };
    
    monitor();
  }
  
  adjustQuality() {
    if (this.fps < 30) {
      document.body.classList.add('low-performance');
      CONFIG.effects.particleCount = Math.max(20, CONFIG.effects.particleCount - 5);
    } else if (this.fps > 55) {
      document.body.classList.remove('low-performance');
      CONFIG.effects.particleCount = Math.min(80, CONFIG.effects.particleCount + 2);
    }
  }
}

// ================================
// MAIN APPLICATION
// ================================

class ImmersivePortfolio3D {
  constructor() {
    this.cursor = null;
    this.camera = null;
    this.loadingManager = null;
    this.performanceMonitor = null;
    this.floatingElements = null;
    
    this.isInitialized = false;
  }
  
  initialize() {
    if (this.isInitialized) return;
    
    console.log('🚀 Initializing Immersive 3D Portfolio');
    
    // Initialize core systems
    this.cursor = new ImmersiveCursor();
    this.camera = new ImmersiveCamera3D();
    this.performanceMonitor = new PerformanceMonitor();
    this.floatingElements = new FloatingElements();
    
    // Setup additional features
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
    
    this.isInitialized = true;
    console.log('✨ Immersive portfolio ready for exploration!');
  }
  
  setupAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -50px;
      left: 10px;
      background: var(--accent-secondary);
      color: var(--space-black);
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 5px;
      z-index: 10001;
      transition: top 0.3s ease;
      font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-50px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.camera-viewport');
    if (mainContent) {
      mainContent.id = 'main-content';
      mainContent.setAttribute('role', 'main');
      mainContent.setAttribute('aria-label', 'Interactive 3D Portfolio');
    }
  }
  
  setupPerformanceOptimizations() {
    // Pause animations when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
      } else {
        document.body.style.animationPlayState = 'running';
      }
    });
    
    // Optimize for battery saving
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          CONFIG.effects.particleCount = 20;
          CONFIG.effects.motionBlur = false;
          CONFIG.effects.speedLines = false;
        }
      });
    }
  }
  
  destroy() {
    this.isInitialized = false;
    // Cleanup code would go here
  }
}

// ================================
// INITIALIZATION
// ================================

// Global application instance
window.portfolioApp = new ImmersivePortfolio3D();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌟 DOM loaded, starting immersive experience...');
  
  // Start loading manager
  new LoadingManager();
  
  // Global error handling
  window.addEventListener('error', (e) => {
    console.error('⚠️ Application error:', e.error);
  });
  
  // Performance monitoring
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('portfolio-start');
  }
});

// Debug helpers (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.debugPortfolio = {
    travelTo: (index) => window.portfolioApp.camera?.travelToScene(index),
    getConfig: () => CONFIG,
    getPosition: () => window.portfolioApp.camera?.position,
    getDevice: () => DEVICE,
    toggleEffects: () => {
      CONFIG.effects.transitionEffects = !CONFIG.effects.transitionEffects;
      console.log('Transition effects:', CONFIG.effects.transitionEffects);
    }
  };
  
  console.log('🔧 Debug mode enabled. Use window.debugPortfolio');
}