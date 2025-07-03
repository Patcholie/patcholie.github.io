// =================================================================================
// CINEMATIC PORTFOLIO - 3D CAMERA EXPERIENCE ENGINE
// =================================================================================

// Global Configuration
const CAMERA_CONFIG = {
    // Camera movement settings
    smoothness: 0.08,           // Camera movement smoothness (lower = smoother)
    rotationSmooth: 0.06,       // Rotation smoothness
    sceneDistance: 2000,        // Distance between scenes in 3D space
    
    // Scene positions in 3D space
    scenes: [
        { x: 0, y: 0, z: 0, rotY: 0 },           // Hero
        { x: 1500, y: -500, z: 2000, rotY: 20 },   // Skills
        { x: -1200, y: 800, z: 4000, rotY: -15 },  // Experience
        { x: 2000, y: -800, z: 6000, rotY: 25 },   // Projects
        { x: 0, y: 1200, z: 8000, rotY: 0 }      // About
    ],
    
    // Animation timings
    sceneTransitionDuration: 2500,
    particleSpeed: 0.8,
    
    // Mobile optimizations
    mobile: {
        smoothness: 0.12,
        reducedParticles: true,
        simplifiedTransitions: true
    }
};

// Device Detection & Configuration
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        this.transitionProgress = 0;
        
        this.viewport = document.getElementById('cameraViewport');
        this.cinematicBg = document.getElementById('cinematicBg');
        
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
        // Desktop mouse tracking for subtle camera movement
        if (!isMobile && !isTouch) {
            document.addEventListener('mousemove', (e) => {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                this.mousePosition.x = (e.clientX - centerX) / centerX;
                this.mousePosition.y = (e.clientY - centerY) / centerY;
            });
        }
        
        // Navigation controls
        this.setupNavigationControls();
        
        // Mobile touch controls
        if (isMobile || isTouch) {
            this.setupTouchControls();
        }
        
        // Keyboard controls
        this.setupKeyboardControls();
        
        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    setupNavigationControls() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const navDots = document.querySelectorAll('.nav-dot');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sceneIndex = parseInt(btn.dataset.scene);
                this.goToScene(sceneIndex);
            });
        });
        
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sceneIndex = parseInt(dot.dataset.scene);
                this.goToScene(sceneIndex);
            });
        });
    }
    
    setupTouchControls() {
        let startY = 0;
        let startX = 0;
        let isScrolling = false;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
            isScrolling = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!isScrolling) {
                const deltaY = e.touches[0].clientY - startY;
                const deltaX = e.touches[0].clientX - startX;
                
                // Determine scroll direction
                if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
                    isScrolling = true;
                    
                    if (deltaY < 0 && this.currentScene < CAMERA_CONFIG.scenes.length - 1) {
                        // Swipe up - next scene
                        this.goToScene(this.currentScene + 1);
                    } else if (deltaY > 0 && this.currentScene > 0) {
                        // Swipe down - previous scene
                        this.goToScene(this.currentScene - 1);
                    }
                }
            }
        }, { passive: true });
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    if (this.currentScene > 0) {
                        this.goToScene(this.currentScene - 1);
                    }
                    break;
                    
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    if (this.currentScene < CAMERA_CONFIG.scenes.length - 1) {
                        this.goToScene(this.currentScene + 1);
                    }
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    this.goToScene(0);
                    break;
                    
                case 'End':
                    e.preventDefault();
                    this.goToScene(CAMERA_CONFIG.scenes.length - 1);
                    break;
                    
                default:
                    // Number keys for direct scene access
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
        if (sceneIndex < 0 || sceneIndex >= CAMERA_CONFIG.scenes.length || 
            sceneIndex === this.currentScene || this.isTransitioning) {
            return;
        }
        
        this.currentScene = sceneIndex;
        const targetScene = CAMERA_CONFIG.scenes[sceneIndex];
        
        // Update navigation UI
        this.updateNavigationUI();
        
        if (!animate || prefersReducedMotion) {
            // Instant transition
            this.position = { ...targetScene };
            this.target = { ...targetScene };
            this.targetRotation.y = targetScene.rotY;
            this.rotation.y = targetScene.rotY;
            this.updateSceneVisibility();
            this.updateProgressIndicator();
            return;
        }
        
        // Smooth animated transition
        this.isTransitioning = true;
        this.transitionProgress = 0;
        
        this.target = {
            x: targetScene.x,
            y: targetScene.y,
            z: targetScene.z
        };
        
        this.targetRotation.y = targetScene.rotY;
        
        // Trigger scene-specific animations
        this.triggerSceneAnimations(sceneIndex);
        
        // Update scene visibility after a delay
        setTimeout(() => {
            this.updateSceneVisibility();
        }, CAMERA_CONFIG.sceneTransitionDuration * 0.3);
    }
    
    updateNavigationUI() {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentScene);
        });
        
        // Update mobile navigation dots
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentScene);
        });
        
        this.updateProgressIndicator();
    }
    
    updateProgressIndicator() {
        const progressText = document.getElementById('progressText');
        const progressBar = document.querySelector('.progress-bar');
        
        if (progressText) {
            progressText.textContent = String(this.currentScene + 1).padStart(2, '0');
        }
        
        if (progressBar) {
            const progress = (this.currentScene / (CAMERA_CONFIG.scenes.length - 1)) * 157;
            progressBar.style.strokeDashoffset = 157 - progress;
        }
    }
    
    updateSceneVisibility() {
        document.querySelectorAll('.scene').forEach((scene, index) => {
            const isActive = index === this.currentScene;
            scene.classList.toggle('active', isActive);
            
            // Performance optimization: hide non-active scenes
            scene.style.display = Math.abs(index - this.currentScene) <= 1 ? 'block' : 'none';
        });
    }
    
    triggerSceneAnimations(sceneIndex) {
        // Scene-specific entrance animations
        const scene = document.querySelector(`[data-scene="${sceneIndex}"]`);
        if (!scene) return;
        
        // Remove any existing animation classes
        scene.classList.remove('scene-enter');
        
        // Trigger entrance animation
        setTimeout(() => {
            scene.classList.add('scene-enter');
        }, 100);
        
        // Scene-specific effects
        switch (sceneIndex) {
            case 0: // Hero
                this.animateHeroElements();
                break;
            case 1: // Skills
                this.animateSkillElements();
                break;
            case 2: // Experience
                this.animateExperienceElements();
                break;
            case 3: // Projects
                this.animateProjectElements();
                break;
            case 4: // About
                this.animateAboutElements();
                break;
        }
    }
    
    animateHeroElements() {
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach((word, index) => {
            word.style.animation = 'none';
            word.offsetHeight; // Force reflow
            word.style.animation = `titleReveal 1s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2}s forwards`;
        });
        
        const terminal = document.querySelector('.floating-terminal');
        if (terminal) {
            terminal.style.animation = 'none';
            terminal.offsetHeight;
            terminal.style.animation = 'terminalFloat 1.5s ease 0.5s forwards';
        }
    }
    
    animateSkillElements() {
        const skillPlanets = document.querySelectorAll('.skill-planet');
        skillPlanets.forEach((planet, index) => {
            planet.style.transform = 'translateZ(-200px) scale(0.5)';
            planet.style.opacity = '0';
            
            setTimeout(() => {
                planet.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
                planet.style.transform = 'translateZ(0) scale(1)';
                planet.style.opacity = '1';
            }, index * 200);
        });
    }
    
    animateExperienceElements() {
        const timelineNodes = document.querySelectorAll('.timeline-node');
        timelineNodes.forEach((node, index) => {
            node.style.transform = 'translateX(-100px)';
            node.style.opacity = '0';
            
            setTimeout(() => {
                node.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                node.style.transform = 'translateX(0)';
                node.style.opacity = '1';
            }, index * 150);
        });
    }
    
    animateProjectElements() {
        const projectCubes = document.querySelectorAll('.project-cube');
        projectCubes.forEach((cube, index) => {
            cube.style.transform = 'translateZ(-300px) rotateY(45deg)';
            cube.style.opacity = '0';
            
            setTimeout(() => {
                cube.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
                cube.style.transform = 'translateZ(0) rotateY(0deg)';
                cube.style.opacity = '1';
            }, index * 200);
        });
    }
    
    animateAboutElements() {
        const avatar = document.querySelector('.cosmic-avatar');
        const paragraphs = document.querySelectorAll('.cosmic-paragraph');
        const links = document.querySelectorAll('.cosmic-link');
        
        if (avatar) {
            avatar.style.transform = 'scale(0) rotateY(180deg)';
            setTimeout(() => {
                avatar.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
                avatar.style.transform = 'scale(1) rotateY(0deg)';
            }, 200);
        }
        
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                p.style.transition = 'all 0.6s ease';
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, 600 + index * 200);
        });
        
        links.forEach((link, index) => {
            link.style.transform = 'translateZ(-100px)';
            link.style.opacity = '0';
            
            setTimeout(() => {
                link.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                link.style.transform = 'translateZ(0)';
                link.style.opacity = '1';
            }, 1200 + index * 100);
        });
    }
    
    updateCamera(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Smooth camera position interpolation
        this.position.x += (this.target.x - this.position.x) * CAMERA_CONFIG.smoothness;
        this.position.y += (this.target.y - this.position.y) * CAMERA_CONFIG.smoothness;
        this.position.z += (this.target.z - this.position.z) * CAMERA_CONFIG.smoothness;
        
        // Smooth rotation interpolation
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * CAMERA_CONFIG.rotationSmooth;
        
        // Mouse influence for subtle camera movement (desktop only)
        if (!isMobile && !isTouch) {
            this.mouseInfluence.x += (this.mousePosition.x * 20 - this.mouseInfluence.x) * 0.05;
            this.mouseInfluence.y += (this.mousePosition.y * 10 - this.mouseInfluence.y) * 0.05;
        }
        
        // Apply transforms
        if (this.viewport) {
            const transformString = `
                translate3d(${-this.position.x + this.mouseInfluence.x}px, 
                           ${-this.position.y + this.mouseInfluence.y}px, 
                           ${-this.position.z}px) 
                rotateY(${-this.rotation.y}deg)
            `;
            this.viewport.style.transform = transformString;
        }
        
        // Update background parallax
        if (this.cinematicBg && !isMobile) {
            const bgTransform = `
                translate3d(${this.position.x * 0.1}px, 
                           ${this.position.y * 0.1}px, 
                           0px) 
                rotateZ(${this.rotation.y * 0.1}deg)
            `;
            this.cinematicBg.style.transform = bgTransform;
        }
        
        // Check if transition is complete
        if (this.isTransitioning) {
            const distance = Math.sqrt(
                Math.pow(this.target.x - this.position.x, 2) +
                Math.pow(this.target.y - this.position.y, 2) +
                Math.pow(this.target.z - this.position.z, 2)
            );
            
            if (distance < 50) {
                this.isTransitioning = false;
            }
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
        // Recalculate mouse positions and camera settings for new viewport
        this.mousePosition = { x: 0, y: 0 };
        this.mouseInfluence = { x: 0, y: 0 };
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// =================================================================================
// ENHANCED 3D PARTICLE SYSTEM
// =================================================================================

class ParticleUniverse {
    constructor() {
        this.particles = [];
        this.shootingStars = [];
        this.codeFragments = [];
        this.dataStreams = [];
        
        this.particleCount = isMobile ? 50 : 150;
        this.shootingStarCount = isMobile ? 2 : 5;
        this.codeFragmentCount = isMobile ? 10 : 30;
        this.dataStreamCount = isMobile ? 5 : 15;
        
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.createShootingStars();
        this.createCodeFragments();
        this.createDataStreams();
        this.startAnimation();
    }
    
    createParticles() {
        const layers = document.querySelectorAll('.particle-layer');
        
        layers.forEach((layer, layerIndex) => {
            const particlesInLayer = Math.floor(this.particleCount / layers.length);
            
            for (let i = 0; i < particlesInLayer; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random starting position
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = Math.random() * 100 + 'vh';
                
                // Random animation delay and duration
                const delay = Math.random() * 20;
                const duration = 15 + Math.random() * 15;
                
                particle.style.animationDelay = delay + 's';
                particle.style.animationDuration = duration + 's';
                
                // Layer-specific properties
                const opacity = 0.2 + (layerIndex * 0.2);
                particle.style.opacity = opacity;
                
                layer.appendChild(particle);
                this.particles.push({
                    element: particle,
                    layer: layerIndex,
                    speed: 0.5 + Math.random() * 0.5
                });
            }
        });
    }
    
    createShootingStars() {
        const container = document.getElementById('shootingStars');
        if (!container) return;
        
        for (let i = 0; i < this.shootingStarCount; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // Random starting position and delay
            star.style.left = 100 + Math.random() * 50 + 'vw';
            star.style.top = Math.random() * 50 + 'vh';
            star.style.animationDelay = Math.random() * 10 + 's';
            star.style.animationDuration = 2 + Math.random() * 3 + 's';
            
            container.appendChild(star);
            this.shootingStars.push(star);
        }
    }
    
    createCodeFragments() {
        const container = document.getElementById('codeFragments');
        if (!container) return;
        
        const codeSnippets = [
            'std::mutex',
            'class HitchHiker',
            'void transmit()',
            'bool secure',
            'pthread_t',
            'encrypt()',
            '0x41414141',
            'TCP_NODELAY',
            'socket()',
            'bind()',
            'listen()',
            'accept()',
            'recv()',
            'send()',
            'close()'
        ];
        
        for (let i = 0; i < this.codeFragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'code-fragment';
            fragment.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            
            // Random properties
            fragment.style.left = Math.random() * 100 + 'vw';
            fragment.style.animationDelay = Math.random() * 15 + 's';
            fragment.style.animationDuration = 10 + Math.random() * 10 + 's';
            fragment.style.fontSize = 0.6 + Math.random() * 0.4 + 'rem';
            
            container.appendChild(fragment);
            this.codeFragments.push(fragment);
        }
    }
    
    createDataStreams() {
        const container = document.getElementById('dataStreams');
        if (!container) return;
        
        for (let i = 0; i < this.dataStreamCount; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            
            // Random position and properties
            stream.style.left = Math.random() * 100 + 'vw';
            stream.style.animationDelay = Math.random() * 8 + 's';
            stream.style.animationDuration = 6 + Math.random() * 4 + 's';
            stream.style.height = 100 + Math.random() * 200 + 'px';
            
            container.appendChild(stream);
            this.dataStreams.push(stream);
        }
    }
    
    createCodeRain() {
        const container = document.getElementById('codeRain');
        if (!container) return;
        
        const rainCharacters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.textContent = rainCharacters[Math.floor(Math.random() * rainCharacters.length)];
            
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDelay = Math.random() * 10 + 's';
            drop.style.animationDuration = 8 + Math.random() * 4 + 's';
            
            container.appendChild(drop);
        }
    }
    
    updateParticles(currentTime) {
        // Dynamic particle behavior could be added here
        // For now, CSS animations handle the movement
    }
    
    startAnimation() {
        const animate = (currentTime) => {
            this.updateParticles(currentTime);
            this.animationId = requestAnimationFrame(animate);
        };
        
        this.animationId = requestAnimationFrame(animate);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
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
        this.setupTerminalInteractions();
        this.setupProjectCubeInteractions();
        this.setupSkillPlanetInteractions();
        this.setupLinkPlanetInteractions();
        this.setupCodeLineInteractions();
    }
    
    setupTerminalInteractions() {
        const dots = document.querySelectorAll('.dot');
        const terminal = document.querySelector('.floating-terminal');
        const codeLines = document.querySelectorAll('.code-line');
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                switch (index) {
                    case 0: // Red dot - minimize effect
                        if (terminal) {
                            terminal.style.transform = 'scale(0.9) rotateY(-5deg)';
                            setTimeout(() => {
                                terminal.style.transform = '';
                            }, 300);
                        }
                        break;
                        
                    case 1: // Yellow dot - typewriter effect
                        codeLines.forEach((line, lineIndex) => {
                            line.style.opacity = '0';
                            line.style.transform = 'translateX(-20px)';
                            
                            setTimeout(() => {
                                line.style.transition = 'all 0.3s ease';
                                line.style.opacity = '1';
                                line.style.transform = 'translateX(0)';
                            }, lineIndex * 100);
                        });
                        break;
                        
                    case 2: // Green dot - matrix effect
                        this.createMatrixEffect();
                        break;
                }
            });
        });
    }
    
    setupProjectCubeInteractions() {
        const cubes = document.querySelectorAll('.project-cube');
        
        cubes.forEach(cube => {
            let isFlipped = false;
            
            cube.addEventListener('click', () => {
                if (!isFlipped) {
                    cube.style.transform = 'translateZ(50px) rotateY(180deg)';
                    isFlipped = true;
                } else {
                    cube.style.transform = 'translateZ(0) rotateY(0deg)';
                    isFlipped = false;
                }
            });
            
            // Auto-flip back after delay
            cube.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (isFlipped) {
                        cube.style.transform = 'translateZ(0) rotateY(0deg)';
                        isFlipped = false;
                    }
                }, 3000);
            });
        });
    }
    
    setupSkillPlanetInteractions() {
        const planets = document.querySelectorAll('.skill-planet');
        
        planets.forEach(planet => {
            planet.addEventListener('mouseenter', () => {
                // Create orbital rings
                this.createOrbitalRings(planet);
            });
            
            planet.addEventListener('mouseleave', () => {
                // Remove orbital rings
                const rings = planet.querySelectorAll('.orbital-ring');
                rings.forEach(ring => ring.remove());
            });
            
            planet.addEventListener('click', () => {
                // Pulse effect
                planet.style.animation = 'skillPulse 0.6s ease';
                setTimeout(() => {
                    planet.style.animation = '';
                }, 600);
            });
        });
    }
    
    setupLinkPlanetInteractions() {
        const linkPlanets = document.querySelectorAll('.link-planet');
        
        linkPlanets.forEach(planet => {
            planet.addEventListener('mouseenter', () => {
                // Create connection lines
                this.createConnectionLines(planet);
            });
            
            planet.addEventListener('mouseleave', () => {
                // Remove connection lines
                const lines = document.querySelectorAll('.connection-line');
                lines.forEach(line => line.remove());
            });
        });
    }
    
    setupCodeLineInteractions() {
        const codeLines = document.querySelectorAll('.code-line');
        
        codeLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                line.style.background = 'rgba(0, 255, 255, 0.1)';
                line.style.transform = 'translateX(10px) scale(1.02)';
                line.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
            });
            
            line.addEventListener('mouseleave', () => {
                line.style.background = '';
                line.style.transform = '';
                line.style.boxShadow = '';
            });
        });
    }
    
    createMatrixEffect() {
        const terminal = document.querySelector('.terminal-content');
        if (!terminal) return;
        
        const matrixChars = '01アイウエオカキクケコサシスセソ';
        
        for (let i = 0; i < 20; i++) {
            const char = document.createElement('span');
            char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            char.style.position = 'absolute';
            char.style.left = Math.random() * 100 + '%';
            char.style.top = Math.random() * 100 + '%';
            char.style.color = '#00ff00';
            char.style.fontSize = '0.8rem';
            char.style.animation = 'matrixFall 2s linear forwards';
            char.style.zIndex = '1000';
            
            terminal.appendChild(char);
            
            setTimeout(() => {
                char.remove();
            }, 2000);
        }
    }
    
    createOrbitalRings(planet) {
        for (let i = 1; i <= 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'orbital-ring';
            ring.style.position = 'absolute';
            ring.style.top = '50%';
            ring.style.left = '50%';
            ring.style.width = (100 + i * 30) + '%';
            ring.style.height = (100 + i * 30) + '%';
            ring.style.transform = 'translate(-50%, -50%)';
            ring.style.border = '1px solid rgba(0, 255, 255, 0.3)';
            ring.style.borderRadius = '50%';
            ring.style.pointerEvents = 'none';
            ring.style.animation = `ringRotate ${10 + i * 2}s linear infinite`;
            
            planet.appendChild(ring);
        }
    }
    
    createConnectionLines(startPlanet) {
        const otherPlanets = document.querySelectorAll('.link-planet');
        const startRect = startPlanet.getBoundingClientRect();
        
        otherPlanets.forEach(planet => {
            if (planet === startPlanet) return;
            
            const endRect = planet.getBoundingClientRect();
            const line = document.createElement('div');
            line.className = 'connection-line';
            
            // Calculate line properties
            const deltaX = endRect.left - startRect.left;
            const deltaY = endRect.top - startRect.top;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            
            line.style.position = 'fixed';
            line.style.left = startRect.left + startRect.width / 2 + 'px';
            line.style.top = startRect.top + startRect.height / 2 + 'px';
            line.style.width = distance + 'px';
            line.style.height = '1px';
            line.style.background = 'linear-gradient(90deg, rgba(0, 255, 255, 0.5), transparent)';
            line.style.transformOrigin = '0 0';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.pointerEvents = 'none';
            line.style.zIndex = '999';
            line.style.animation = 'connectionPulse 2s ease-in-out infinite';
            
            document.body.appendChild(line);
        });
    }
}

// =================================================================================
// LOADING SCREEN MANAGER
// =================================================================================

class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.isLoaded = false;
        
        this.init();
    }
    
    init() {
        // Prevent any interaction during loading
        document.body.classList.add('loading');
        
        // Simulate loading time
        setTimeout(() => {
            this.completeLoading();
        }, 4000);
        
        // Also listen for actual page load
        window.addEventListener('load', () => {
            if (!this.isLoaded) {
                setTimeout(() => {
                    this.completeLoading();
                }, 1000);
            }
        });
    }
    
    completeLoading() {
        if (this.isLoaded) return;
        
        this.isLoaded = true;
        
        // Hide loading screen
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
        }
        
        // Remove loading class from body
        document.body.classList.remove('loading');
        
        // Initialize main application after loading
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
        this.loadingManager = null;
        
        this.isInitialized = false;
    }
    
    initialize() {
        if (this.isInitialized) return;
        
        console.log('🎬 Initializing Cinematic Portfolio Experience...');
        
        // Initialize core systems
        this.camera = new CinematicCamera();
        this.particleUniverse = new ParticleUniverse();
        this.interactiveEffects = new InteractiveEffects();
        
        // Setup additional effects
        this.setupAdditionalEffects();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        this.isInitialized = true;
        
        console.log('✨ Cinematic Portfolio Experience Ready!');
    }
    
    setupAdditionalEffects() {
        // Add CSS animations for matrix effects
        const style = document.createElement('style');
        style.textContent = `
            @keyframes matrixFall {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(100px); }
            }
            
            @keyframes skillPulse {
                0%, 100% { transform: translateZ(0) scale(1); }
                50% { transform: translateZ(100px) scale(1.1); }
            }
            
            @keyframes connectionPulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            
            .scene-enter {
                animation: sceneEnter 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
            }
            
            @keyframes sceneEnter {
                from {
                    opacity: 0;
                    transform: translateZ(-500px) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateZ(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupPerformanceMonitoring() {
        // Monitor frame rate and adjust quality accordingly
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Adjust quality based on performance
                if (fps < 30 && !isMobile) {
                    console.warn('⚠️ Low FPS detected, reducing particle count...');
                    this.reduceParticleCount();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    reduceParticleCount() {
        // Remove some particles for better performance
        const particles = document.querySelectorAll('.particle');
        for (let i = particles.length - 1; i >= particles.length / 2; i--) {
            if (particles[i]) {
                particles[i].remove();
            }
        }
    }
    
    destroy() {
        if (this.camera) {
            this.camera.destroy();
        }
        
        if (this.particleUniverse) {
            this.particleUniverse.destroy();
        }
    }
}

// =================================================================================
// INITIALIZATION
// =================================================================================

// Create global application instance
window.portfolioApp = new CinematicPortfolio();

// Initialize loading manager immediately
document.addEventListener('DOMContentLoaded', () => {
    const loadingManager = new LoadingManager();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.warn('⚠️ Non-critical error in portfolio:', e.error);
    // Continue with degraded functionality rather than breaking
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.portfolioApp) {
        window.portfolioApp.destroy();
    }
});

// Export for debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CinematicPortfolio, CinematicCamera, ParticleUniverse };
}

console.log('🚀 Cinematic Portfolio Engine Loaded - Ready for Launch!');