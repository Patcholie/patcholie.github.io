/**
 * Premium Portfolio JavaScript - Professional & Sophisticated
 * Advanced interactions, animations, and UX enhancements
 */

// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    // Performance settings
    ANIMATION_FRAME_RATE: 60,
    SCROLL_THROTTLE: 16, // ~60fps
    RESIZE_DEBOUNCE: 250,
    
    // Animation settings
    INTERSECTION_THRESHOLD: 0.1,
    INTERSECTION_ROOT_MARGIN: '50px 0px',
    
    // Cursor settings
    CURSOR_TRAIL_LENGTH: 10,
    CURSOR_MAGNETIC_DISTANCE: 100,
    
    // Preloader settings
    PRELOADER_DURATION: 4000,
    STATS_ANIMATION_DURATION: 2000,
    
    // Navigation settings
    SCROLL_OFFSET: 100,
    
    // Device detection
    IS_MOBILE: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    IS_TOUCH: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    PREFERS_REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// ===== GLOBAL STATE =====
const STATE = {
    isLoaded: false,
    currentSection: 'home',
    scrollY: 0,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    mouseX: 0,
    mouseY: 0,
    isScrolling: false,
    navigationVisible: true,
    
    // Animation states
    animationFrameId: null,
    intersectionObserver: null,
    progressObserver: null,
    
    // Performance monitoring
    frameCount: 0,
    lastFrameTime: performance.now(),
    fps: 60
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // Throttle function for performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Debounce function for resize events
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // Linear interpolation
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    // Map value from one range to another
    mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },

    // Get element's position relative to viewport
    getElementOffset(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
            bottom: rect.bottom + window.pageYOffset,
            right: rect.right + window.pageXOffset,
            width: rect.width,
            height: rect.height
        };
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    },

    // Smooth scroll to element
    smoothScrollTo(element, offset = CONFIG.SCROLL_OFFSET) {
        const elementPosition = this.getElementOffset(element).top - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Generate random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Ease functions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
};

// ===== PRELOADER =====
class Preloader {
    constructor() {
        this.element = document.getElementById('preloader');
        this.progressBar = this.element?.querySelector('.progress-bar::after');
        this.progressText = this.element?.querySelector('.progress-percentage');
        this.statusText = this.element?.querySelector('.progress-status');
        this.statNumbers = this.element?.querySelectorAll('.stat-number');
        
        this.progress = 0;
        this.targetProgress = 0;
        this.isComplete = false;
        
        this.statusMessages = [
            'Initializing Security Protocols...',
            'Loading Cybersecurity Modules...',
            'Establishing Secure Connection...',
            'Analyzing Network Topology...',
            'Validating Encryption Keys...',
            'Deploying Steganography Engine...',
            'Finalizing Security Layer...',
            'System Ready - Welcome!'
        ];
        
        this.init();
    }

    init() {
        if (!this.element) return;
        
        this.animateStatNumbers();
        this.simulateLoading();
        
        // Hide preloader after duration
        setTimeout(() => {
            this.hide();
        }, CONFIG.PRELOADER_DURATION);
    }

    animateStatNumbers() {
        if (!this.statNumbers.length) return;
        
        this.statNumbers.forEach((stat, index) => {
            const target = parseInt(stat.dataset.target);
            const duration = CONFIG.STATS_ANIMATION_DURATION;
            const startTime = performance.now() + (index * 200);
            
            const animate = (currentTime) => {
                if (currentTime < startTime) {
                    requestAnimationFrame(animate);
                    return;
                }
                
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = Utils.easeOutQuart(progress);
                const current = Math.floor(target * eased);
                
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    simulateLoading() {
        const duration = CONFIG.PRELOADER_DURATION - 500;
        const startTime = performance.now();
        
        const updateProgress = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = Utils.easeInOutCubic(progress);
            
            this.targetProgress = eased * 100;
            
            // Update status message based on progress
            const messageIndex = Math.floor((this.statusMessages.length - 1) * eased);
            if (this.statusText) {
                this.statusText.textContent = this.statusMessages[messageIndex];
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                this.isComplete = true;
            }
        };
        
        requestAnimationFrame(updateProgress);
        
        // Smooth progress bar animation
        const animateProgress = () => {
            this.progress = Utils.lerp(this.progress, this.targetProgress, 0.05);
            
            if (this.progressText) {
                this.progressText.textContent = Math.floor(this.progress) + '%';
            }
            
            if (!this.isComplete || Math.abs(this.progress - this.targetProgress) > 0.1) {
                requestAnimationFrame(animateProgress);
            }
        };
        
        requestAnimationFrame(animateProgress);
    }

    hide() {
        if (!this.element) return;
        
        this.element.classList.add('hidden');
        
        setTimeout(() => {
            this.element.style.display = 'none';
            STATE.isLoaded = true;
            document.body.classList.add('loaded');
            
            // Initialize other components after preloader
            this.onComplete();
        }, 800);
    }

    onComplete() {
        // Trigger hero animations
        HeroAnimations.init();
        
        // Start intersection observer
        ScrollAnimations.init();
        
        // Initialize progress tracking
        ProgressTracking.init();
        
        // Initialize performance monitoring
        PerformanceMonitor.init();
    }
}

// ===== CURSOR SYSTEM =====
class CursorSystem {
    constructor() {
        if (CONFIG.IS_MOBILE || CONFIG.IS_TOUCH) return;
        
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-outline');
        
        if (!this.cursorDot || !this.cursorOutline) return;
        
        this.dotX = 0;
        this.dotY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.isHovering = false;
        this.currentElement = null;
        
        this.interactiveElements = document.querySelectorAll(`
            a, button, .btn, .nav-link, .social-link, .contact-link,
            .expertise-card, .project-card, .timeline-content,
            .stat-card, .skill-tag, .tech-tag, .control-dot,
            .code-line, .hero-badge, [role="button"], [tabindex]
        `);
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.animate();
        this.setupInteractiveElements();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            STATE.mouseX = e.clientX;
            STATE.mouseY = e.clientY;
        }, { passive: true });

        document.addEventListener('mousedown', () => {
            this.cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });

        document.addEventListener('mouseup', () => {
            this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    setupInteractiveElements() {
        this.interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.onElementEnter(e.target);
            });

            element.addEventListener('mouseleave', () => {
                this.onElementLeave();
            });
        });
    }

    onElementEnter(element) {
        this.isHovering = true;
        this.currentElement = element;
        this.cursorOutline.classList.add('hover');
        
        // Add magnetic effect for specific elements
        if (element.classList.contains('btn') || element.classList.contains('magnetic')) {
            this.addMagneticEffect(element);
        }
    }

    onElementLeave() {
        this.isHovering = false;
        this.currentElement = null;
        this.cursorOutline.classList.remove('hover');
        this.removeMagneticEffect();
    }

    addMagneticEffect(element) {
        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < CONFIG.CURSOR_MAGNETIC_DISTANCE) {
                const strength = (CONFIG.CURSOR_MAGNETIC_DISTANCE - distance) / CONFIG.CURSOR_MAGNETIC_DISTANCE;
                const moveX = deltaX * strength * 0.3;
                const moveY = deltaY * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.magneticHandler = handleMouseMove;
    }

    removeMagneticEffect() {
        if (this.currentElement && this.currentElement.magneticHandler) {
            this.currentElement.removeEventListener('mousemove', this.currentElement.magneticHandler);
            this.currentElement.style.transform = '';
            delete this.currentElement.magneticHandler;
        }
    }

    animate() {
        // Smooth cursor movement
        this.dotX = Utils.lerp(this.dotX, STATE.mouseX, 1);
        this.dotY = Utils.lerp(this.dotY, STATE.mouseY, 1);
        this.outlineX = Utils.lerp(this.outlineX, STATE.mouseX, 0.15);
        this.outlineY = Utils.lerp(this.outlineY, STATE.mouseY, 0.15);

        // Apply transforms
        this.cursorDot.style.left = this.dotX + 'px';
        this.cursorDot.style.top = this.dotY + 'px';
        this.cursorOutline.style.left = this.outlineX + 'px';
        this.cursorOutline.style.top = this.outlineY + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// ===== NAVIGATION SYSTEM =====
class NavigationSystem {
    constructor() {
        this.nav = document.getElementById('navigation');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link[data-section]');
        this.sections = document.querySelectorAll('.section[id]');
        
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveSection();
    }

    bindEvents() {
        // Navigation toggle for mobile
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                this.navigateToSection(sectionId);
                
                // Close mobile menu if open
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Scroll events
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, CONFIG.SCROLL_THROTTLE), { passive: true });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.nav.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            Utils.smoothScrollTo(section);
            this.updateActiveSection(sectionId);
        }
    }

    handleScroll() {
        const currentScrollY = window.pageYOffset;
        
        // Update navigation background based on scroll
        if (currentScrollY > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }

        // Hide/show navigation based on scroll direction
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.nav.style.transform = 'translateY(-100%)';
            STATE.navigationVisible = false;
        } else {
            this.nav.style.transform = 'translateY(0)';
            STATE.navigationVisible = true;
        }

        this.lastScrollY = currentScrollY;
        
        // Update active section based on scroll position
        this.updateActiveSection();
    }

    updateActiveSection(forcedSection = null) {
        if (forcedSection) {
            STATE.currentSection = forcedSection;
            this.updateNavigation();
            return;
        }

        const scrollPosition = window.pageYOffset + CONFIG.SCROLL_OFFSET;
        let activeSection = 'home';

        this.sections.forEach(section => {
            const sectionTop = Utils.getElementOffset(section).top;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });

        if (activeSection !== STATE.currentSection) {
            STATE.currentSection = activeSection;
            this.updateNavigation();
        }
    }

    updateNavigation() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === STATE.currentSection) {
                link.classList.add('active');
            }
        });
    }
}

// ===== HERO ANIMATIONS =====
class HeroAnimations {
    static init() {
        this.animateHeroElements();
        this.setupTerminalInteractions();
        this.setupStatCardAnimations();
    }

    static animateHeroElements() {
        const heroElements = [
            '.hero-badge',
            '.title-line-1',
            '.title-line-2', 
            '.title-line-3',
            '.hero-description',
            '.hero-stats',
            '.hero-actions',
            '.hero-visual'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 500 + (index * 200));
            }
        });
    }

    static setupTerminalInteractions() {
        const controlDots = document.querySelectorAll('.control-dot');
        const terminal = document.querySelector('.terminal-container');
        const codeLines = document.querySelectorAll('.code-line');

        controlDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                switch(index) {
                    case 0: // Red - Minimize effect
                        terminal.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            terminal.style.transform = 'scale(1)';
                        }, 200);
                        break;
                        
                    case 1: // Yellow - Typewriter effect
                        this.triggerTypewriterEffect(codeLines);
                        break;
                        
                    case 2: // Green - Glow effect
                        terminal.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.5)';
                        setTimeout(() => {
                            terminal.style.boxShadow = '';
                        }, 1000);
                        break;
                }
            });
        });
    }

    static triggerTypewriterEffect(codeLines) {
        codeLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.3s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    static setupStatCardAnimations() {
        const statCards = document.querySelectorAll('.stat-card');
        const statFills = document.querySelectorAll('.stat-fill');

        // Animate stat bars
        setTimeout(() => {
            statFills.forEach(fill => {
                const percentage = fill.dataset.percentage;
                fill.style.transform = `scaleX(${percentage / 100})`;
            });
        }, 2000);

        // Add hover effects
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!CONFIG.IS_MOBILE) {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                    card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!CONFIG.IS_MOBILE) {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }
            });
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    static init() {
        this.setupIntersectionObserver();
        this.setupProgressBars();
    }

    static setupIntersectionObserver() {
        const options = {
            threshold: CONFIG.INTERSECTION_THRESHOLD,
            rootMargin: CONFIG.INTERSECTION_ROOT_MARGIN
        };

        STATE.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll(`
            .section-header, .expertise-card, .timeline-item, 
            .project-card, .about-content, .contact-card,
            .skills-overview, .projects-cta
        `);

        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            STATE.intersectionObserver.observe(element);
        });
    }

    static animateElement(element) {
        element.classList.add('animated');
        
        // Special animations for specific elements
        if (element.classList.contains('expertise-card')) {
            this.animateProgressBar(element);
        }
        
        if (element.classList.contains('timeline-item')) {
            this.animateTimelineItem(element);
        }
    }

    static animateProgressBar(card) {
        const progressFill = card.querySelector('.progress-fill');
        if (progressFill) {
            setTimeout(() => {
                const percentage = progressFill.dataset.percentage;
                progressFill.style.transform = `scaleX(${percentage / 100})`;
            }, 300);
        }
    }

    static animateTimelineItem(item) {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');
        
        if (marker) {
            marker.style.transform = 'scale(1.2)';
            setTimeout(() => {
                marker.style.transform = 'scale(1)';
            }, 300);
        }
        
        if (content) {
            content.style.transform = 'translateX(20px)';
            setTimeout(() => {
                content.style.transform = 'translateX(0)';
            }, 200);
        }
    }

    static setupProgressBars() {
        // Setup any additional progress bar animations
        const progressElements = document.querySelectorAll('[data-percentage]');
        
        progressElements.forEach(element => {
            STATE.intersectionObserver.observe(element);
        });
    }
}

// ===== PROGRESS TRACKING =====
class ProgressTracking {
    static init() {
        this.progressFill = document.querySelector('.scroll-progress-fill');
        this.bindEvents();
    }

    static bindEvents() {
        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateProgress();
        }, CONFIG.SCROLL_THROTTLE), { passive: true });
    }

    static updateProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / documentHeight) * 100;
        
        if (this.progressFill) {
            this.progressFill.style.width = `${Math.min(scrollProgress, 100)}%`;
        }
        
        STATE.scrollY = scrollTop;
    }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
    static init() {
        if (CONFIG.PREFERS_REDUCED_MOTION) return;
        
        this.startTime = performance.now();
        this.frameCount = 0;
        this.lastTime = this.startTime;
        
        this.monitor();
    }

    static monitor() {
        const now = performance.now();
        this.frameCount++;
        
        if (now - this.lastTime >= 1000) {
            STATE.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            
            // Adjust performance based on FPS
            if (STATE.fps < 30) {
                this.reducePerfomance();
            } else if (STATE.fps > 50) {
                this.enhancePerformance();
            }
            
            this.frameCount = 0;
            this.lastTime = now;
        }
        
        requestAnimationFrame(() => this.monitor());
    }

    static reducePerfomance() {
        // Disable some animations on low-end devices
        document.body.classList.add('low-performance');
        console.warn('Low performance detected, reducing animations');
    }

    static enhancePerformance() {
        // Enable enhanced animations on high-end devices
        document.body.classList.remove('low-performance');
    }
}

// ===== ENHANCED INTERACTIONS =====
class EnhancedInteractions {
    static init() {
        this.setupButtonEffects();
        this.setupCardHovers();
        this.setupSkillTags();
        this.setupFloatingElements();
    }

    static setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Ripple effect
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });

        // Add ripple animation styles
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    static setupCardHovers() {
        const cards = document.querySelectorAll('.expertise-card, .project-card, .timeline-content');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!CONFIG.IS_MOBILE) {
                    this.enhanceCard(card);
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!CONFIG.IS_MOBILE) {
                    this.resetCard(card);
                }
            });
        });
    }

    static enhanceCard(card) {
        card.style.transform = 'translateY(-12px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
        
        // Add glow effect to borders
        const glowElement = document.createElement('div');
        glowElement.className = 'card-glow-effect';
        glowElement.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent);
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            animation: glowPulse 2s ease-in-out infinite;
        `;
        
        card.style.position = 'relative';
        card.appendChild(glowElement);
    }

    static resetCard(card) {
        card.style.transform = '';
        card.style.boxShadow = '';
        
        const glowEffect = card.querySelector('.card-glow-effect');
        if (glowEffect) {
            glowEffect.remove();
        }
    }

    static setupSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                this.animateSkillTag(tag);
            });
        });
    }

    static animateSkillTag(tag) {
        tag.style.transform = 'scale(1.1)';
        tag.style.background = 'rgba(0, 212, 255, 0.2)';
        tag.style.borderColor = 'var(--color-accent-primary)';
        tag.style.color = 'var(--color-accent-primary)';
        
        setTimeout(() => {
            tag.style.transform = '';
            tag.style.background = '';
            tag.style.borderColor = '';
            tag.style.color = '';
        }, 200);
    }

    static setupFloatingElements() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            this.animateFloatingIcon(icon, index);
        });
    }

    static animateFloatingIcon(icon, index) {
        const initialDelay = index * 2000;
        const animationDuration = 8000;
        
        const animate = () => {
            icon.style.animation = `floatAround ${animationDuration}ms ease-in-out infinite`;
            icon.style.animationDelay = `${initialDelay}ms`;
        };
        
        animate();
        
        // Add interaction on hover
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(15deg)';
            icon.style.opacity = '0.8';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.opacity = '';
        });
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancements {
    static init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupReducedMotion();
        this.setupAriaLabels();
    }

    static setupKeyboardNavigation() {
        // Tab navigation enhancement
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Arrow key navigation for sections
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                const sections = Array.from(document.querySelectorAll('.section[id]'));
                const currentIndex = sections.findIndex(section => section.id === STATE.currentSection);
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    e.preventDefault();
                    Utils.smoothScrollTo(sections[currentIndex + 1]);
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    e.preventDefault();
                    Utils.smoothScrollTo(sections[currentIndex - 1]);
                }
            }
        });
    }

    static setupFocusManagement() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-accent-primary);
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Focus visible enhancement
        const focusableElements = document.querySelectorAll(`
            a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])
        `);

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.setAttribute('data-focused', 'true');
            });

            element.addEventListener('blur', () => {
                element.removeAttribute('data-focused');
            });
        });
    }

    static setupReducedMotion() {
        if (CONFIG.PREFERS_REDUCED_MOTION) {
            document.body.classList.add('reduced-motion');
            
            // Override animations with reduced motion alternatives
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion *,
                .reduced-motion *::before,
                .reduced-motion *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    static setupAriaLabels() {
        // Add missing aria labels
        const interactiveElements = document.querySelectorAll('button:not([aria-label]), a:not([aria-label])');
        
        interactiveElements.forEach(element => {
            const text = element.textContent.trim() || element.title || 'Interactive element';
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                element.setAttribute('aria-label', text);
            }
        });

        // Add roles where appropriate
        const nav = document.getElementById('navigation');
        if (nav && !nav.getAttribute('role')) {
            nav.setAttribute('role', 'navigation');
        }

        const main = document.querySelector('main, .main-content');
        if (main && !main.getAttribute('role')) {
            main.setAttribute('role', 'main');
        }
    }
}

// ===== INITIALIZATION =====
class Portfolio {
    static init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    static initialize() {
        console.log('🚀 Initializing Premium Portfolio...');
        
        // Update window dimensions
        this.updateDimensions();
        
        // Initialize core systems
        new Preloader();
        new CursorSystem();
        new NavigationSystem();
        
        // Initialize enhanced features
        EnhancedInteractions.init();
        AccessibilityEnhancements.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('✨ Portfolio initialized successfully!');
    }

    static updateDimensions() {
        STATE.windowWidth = window.innerWidth;
        STATE.windowHeight = window.innerHeight;
    }

    static setupEventListeners() {
        // Window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.updateDimensions();
            this.handleResize();
        }, CONFIG.RESIZE_DEBOUNCE));

        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Window focus/blur
        window.addEventListener('focus', () => {
            this.resumeAnimations();
        });

        window.addEventListener('blur', () => {
            this.pauseAnimations();
        });
    }

    static handleResize() {
        // Handle responsive behavior
        if (STATE.windowWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }

    static pauseAnimations() {
        document.body.classList.add('animations-paused');
        
        if (STATE.animationFrameId) {
            cancelAnimationFrame(STATE.animationFrameId);
        }
    }

    static resumeAnimations() {
        document.body.classList.remove('animations-paused');
        
        // Resume any paused animations
        if (STATE.isLoaded && !CONFIG.PREFERS_REDUCED_MOTION) {
            this.startAnimationLoop();
        }
    }

    static startAnimationLoop() {
        // Main animation loop for smooth animations
        const animate = () => {
            // Update any smooth animations here
            STATE.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.warn('Non-critical error caught:', e.error);
    // Continue execution - don't break the user experience
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent default browser error handling
});

// ===== EXPORT FOR DEBUGGING =====
window.Portfolio = {
    CONFIG,
    STATE,
    Utils,
    NavigationSystem,
    CursorSystem,
    ScrollAnimations,
    EnhancedInteractions
};

// ===== START THE APPLICATION =====
Portfolio.init();