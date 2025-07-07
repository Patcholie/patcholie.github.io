// ===== ENHANCED 3D PARALLAX PORTFOLIO JAVASCRIPT - FIXED =====

// Performance and device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Global state
let isLoading = true;
let currentSection = 'home';
let scrollProgress = 0;
let isScrolling = false;
let scrollTimeout;
let animationFrame;

// Performance throttling
let lastScrollTime = 0;
const scrollThrottle = 16; // ~60fps

// Parallax configuration
const parallaxConfig = {
    enabled: !prefersReducedMotion && !isMobile,
    intensity: isMobile ? 0.2 : 0.4
};

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Enhanced 3D Parallax Portfolio...');
    
    initializeLoadingScreen();
    setupParallaxSystem();
    setupScrollHandling();
    setupNavigation();
    setupMobileMenu();
    if (!isMobile && !isTouch) {
        setupCursorEffects();
    }
    setupInteractiveElements();
    setupAnimationObservers();
    updateTime();
    
    console.log('✨ Portfolio initialized successfully!');
});

// ===== LOADING SCREEN =====

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const statNumbers = document.querySelectorAll('.loading-stats .stat-number');
    
    // Animate counter numbers
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 50; // 50 steps
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(current);
        }, 40);
    });
    
    // Hide loading screen after delay
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');
        isLoading = false;
        
        // Start main animations
        setTimeout(() => {
            if (parallaxConfig.enabled) {
                startParallaxAnimation();
            }
            revealInitialContent();
        }, 800);
    }, 3000);
}

function revealInitialContent() {
    // Simple reveal animation for hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// ===== FIXED PARALLAX SYSTEM =====

function setupParallaxSystem() {
    if (!parallaxConfig.enabled) return;
    
    // Only apply parallax to specific background elements
    const backgroundLayers = document.querySelectorAll('.parallax-layer[data-depth]');
    backgroundLayers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        const speed = parseFloat(layer.dataset.speed) || 1;
        
        // Only store parallax data for background layers (negative depth)
        if (depth < 0) {
            layer.parallaxData = { depth, speed };
            // Ensure these layers don't interfere with fixed elements
            layer.style.position = 'fixed';
            layer.style.pointerEvents = 'none';
        }
    });
}

function startParallaxAnimation() {
    if (!parallaxConfig.enabled) return;
    
    function animate() {
        const viewport = document.getElementById('parallaxViewport');
        if (!viewport) {
            animationFrame = requestAnimationFrame(animate);
            return;
        }
        
        const scrollY = viewport.scrollTop;
        
        // Only animate background layers with negative depth
        const backgroundLayers = document.querySelectorAll('.parallax-layer[data-depth]');
        backgroundLayers.forEach(layer => {
            if (layer.parallaxData && layer.parallaxData.depth < 0) {
                const { speed } = layer.parallaxData;
                const offset = scrollY * (speed - 1) * parallaxConfig.intensity;
                layer.style.transform = `translateY(${offset}px)`;
            }
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== SCROLL HANDLING =====

function setupScrollHandling() {
    const viewport = document.getElementById('parallaxViewport');
    const progressBar = document.getElementById('scrollProgress');
    
    if (!viewport || !progressBar) return;
    
    function handleScroll() {
        const currentTime = performance.now();
        if (currentTime - lastScrollTime < scrollThrottle) return;
        lastScrollTime = currentTime;
        
        const scrollTop = viewport.scrollTop;
        const scrollHeight = viewport.scrollHeight - viewport.clientHeight;
        scrollProgress = Math.min(scrollTop / scrollHeight, 1);
        
        // Update progress bar
        progressBar.style.width = `${scrollProgress * 100}%`;
        
        // Update active section
        updateActiveSection();
        
        // Handle scroll state
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }
    
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    
    // Smooth scroll for anchor links
    setupSmoothScrolling();
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const viewport = document.getElementById('parallaxViewport');
            
            if (targetElement && viewport) {
                const targetTop = targetElement.offsetTop - 100; // Account for header
                
                viewport.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('.content-section');
    const viewport = document.getElementById('parallaxViewport');
    
    if (!viewport) return;
    
    const viewportTop = viewport.scrollTop;
    const viewportHeight = viewport.clientHeight;
    const viewportCenter = viewportTop + viewportHeight / 2;
    
    let activeSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionCenter = sectionTop + sectionHeight / 2;
        
        if (Math.abs(viewportCenter - sectionCenter) < sectionHeight / 2) {
            activeSection = section.id;
        }
    });
    
    if (activeSection && activeSection !== currentSection) {
        updateActiveNavigation(activeSection);
        currentSection = activeSection;
    }
}

function updateActiveNavigation(activeSection) {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === activeSection) {
            item.classList.add('active');
        }
    });
}

// ===== NAVIGATION =====

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = item.dataset.section;
            const targetElement = document.getElementById(targetSection);
            const viewport = document.getElementById('parallaxViewport');
            
            if (targetElement && viewport) {
                const targetTop = targetElement.offsetTop - 100;
                
                viewport.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU =====

function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (!mobileToggle || !sidebar) return;
    
    mobileToggle.addEventListener('click', () => {
        const isActive = mobileToggle.classList.contains('active');
        
        mobileToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        
        // Prevent background scrolling
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking nav items
    const navItems = sidebar.querySelectorAll('.nav-item[data-section]');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileToggle.classList.remove('active');
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== FIXED CURSOR EFFECTS =====

function setupCursorEffects() {
    const cursorSmall = document.querySelector('.cursor-small');
    const cursorLarge = document.querySelector('.cursor-large');
    
    if (!cursorSmall || !cursorLarge) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let largeCursorX = 0;
    let largeCursorY = 0;
    let isHovering = false;
    let hoverTarget = null;
    
    // Fixed mouse movement tracking - NO TRANSITIONS for small cursor
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Direct 1:1 tracking for small cursor - NO TRANSITIONS
        cursorSmall.style.left = mouseX + 'px';
        cursorSmall.style.top = mouseY + 'px';
        cursorSmall.style.transition = 'none'; // Remove all transitions for smooth tracking
    }, { passive: true });
    
    // Animate large cursor with smooth lag
    function animateLargeCursor() {
        if (isHovering && hoverTarget) {
            const rect = hoverTarget.getBoundingClientRect();
            const targetX = rect.left + rect.width / 2;
            const targetY = rect.top + rect.height / 2;
            
            largeCursorX += (targetX - largeCursorX) * 0.25;
            largeCursorY += (targetY - largeCursorY) * 0.25;
        } else {
            largeCursorX += (mouseX - largeCursorX) * 0.15;
            largeCursorY += (mouseY - largeCursorY) * 0.15;
        }
        
        cursorLarge.style.left = largeCursorX + 'px';
        cursorLarge.style.top = largeCursorY + 'px';
        
        requestAnimationFrame(animateLargeCursor);
    }
    animateLargeCursor();
    
    // Fixed interactive elements - improved selector and logic
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-item, .traffic-light, .dot, .magnetic, .expertise-card, .project-card, .timeline-item, .skill-tag, .tech-tag, .contact-btn, .terminal-dots, .code-line, .hero-badge, .stat-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            isHovering = true;
            hoverTarget = element;
            
            const rect = element.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(element);
            
            // Add morphed class immediately
            cursorLarge.classList.add('morphed', 'interactive');
            cursorSmall.classList.add('hovered');

            // Set size and position to match the element
            cursorLarge.style.width = (rect.width + 8) + 'px';
            cursorLarge.style.height = (rect.height + 8) + 'px';
            cursorLarge.style.borderRadius = computedStyle.borderRadius || '12px';
            cursorLarge.style.transition = 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
            
            // Position the cursor to center of element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            largeCursorX = centerX;
            largeCursorY = centerY;
        });

        element.addEventListener('mouseleave', () => {
            isHovering = false;
            hoverTarget = null;
            
            // Remove morphed classes
            cursorLarge.classList.remove('morphed', 'interactive');
            cursorSmall.classList.remove('hovered');

            // Reset to default size
            cursorLarge.style.width = '40px';
            cursorLarge.style.height = '40px';
            cursorLarge.style.borderRadius = '50%';
            cursorLarge.style.transition = 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
        });
    });
    
    // Enhanced magnetic buttons
    const magneticElements = document.querySelectorAll('.magnetic, .btn');
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorLarge.classList.add('magnetic');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorLarge.classList.remove('magnetic');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorSmall.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorSmall.style.transition = 'transform 0.1s ease';
    });
    
    document.addEventListener('mouseup', () => {
        cursorSmall.style.transform = 'translate(-50%, -50%) scale(1)';
        setTimeout(() => {
            cursorSmall.style.transition = 'none'; // Remove transition after animation
        }, 100);
    });
}

// ===== INTERACTIVE ELEMENTS =====

function setupInteractiveElements() {
    setupTerminalEffects();
    setupTrafficLights();
    setupMagneticElements();
    setupButtonEffects();
    setupCardHoverEffects();
}

function setupTerminalEffects() {
    const dots = document.querySelectorAll('.terminal-dots .dot');
    const terminal = document.querySelector('.terminal-window');
    const codeLines = document.querySelectorAll('.code-line');
    
    if (!dots.length || !terminal) return;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            switch(index) {
                case 0: // Red dot - minimize
                    terminal.style.transform = 'scale(0.95) rotate(-1deg)';
                    terminal.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        terminal.style.transform = '';
                    }, 300);
                    break;
                    
                case 1: // Yellow dot - typewriter
                    typewriterEffect(codeLines);
                    break;
                    
                case 2: // Green dot - glow
                    terminal.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.5)';
                    terminal.style.transition = 'box-shadow 0.3s ease';
                    setTimeout(() => {
                        terminal.style.boxShadow = '';
                    }, 1000);
                    break;
            }
        });
    });
}

function typewriterEffect(lines) {
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.3s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function setupTrafficLights() {
    const trafficLights = document.querySelectorAll('.traffic-light');
    
    trafficLights.forEach((light, index) => {
        light.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: currentColor;
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                opacity: 0.3;
                pointer-events: none;
            `;
            
            light.style.position = 'relative';
            light.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
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

function setupMagneticElements() {
    if (isMobile || isTouch) return;
    
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                element.style.transition = 'transform 0.1s ease';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.transition = 'transform 0.3s ease';
        });
    });
}

function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect on click
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
                animation: button-ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add button ripple animation
    if (!document.querySelector('#button-ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'button-ripple-animation';
        style.textContent = `
            @keyframes button-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupCardHoverEffects() {
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.expertise-card, .project-card, .timeline-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!isMobile) {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 60px rgba(0, 212, 255, 0.15)';
                card.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!isMobile) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    });
}

// ===== ANIMATION OBSERVERS =====

function setupAnimationObservers() {
    // Simple intersection observer for subtle reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                element.classList.add('revealed');
                
                // Stagger children animations if they exist
                const children = element.querySelectorAll('.expertise-card, .timeline-item, .project-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);
    
    // Observe sections only, cards are visible by default
    const sectionsToObserve = document.querySelectorAll('.content-section');
    sectionsToObserve.forEach(section => {
        revealObserver.observe(section);
    });
}

// ===== UTILITY FUNCTIONS =====

function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (!timeElement) return;
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        timeElement.textContent = timeString;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE MONITORING =====

function setupPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Adjust quality based on performance
            if (fps < 30 && parallaxConfig.enabled) {
                parallaxConfig.intensity *= 0.8;
                console.warn('🐌 Performance degraded, reducing parallax effects');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    if (!prefersReducedMotion) {
        requestAnimationFrame(measureFPS);
    }
}

// ===== WINDOW EVENT HANDLERS =====

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileNavToggle');
        
        if (sidebar && mobileToggle) {
            mobileToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 100));

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    } else {
        // Resume animations when tab becomes visible
        if (parallaxConfig.enabled && !isLoading) {
            startParallaxAnimation();
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'Escape':
            // Close mobile menu
            const sidebar = document.getElementById('sidebar');
            const mobileToggle = document.getElementById('mobileNavToggle');
            
            if (sidebar && sidebar.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
            break;
            
        case 'Tab':
            document.body.classList.add('keyboard-nav');
            break;
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Touch handling for mobile
if (isMobile || isTouch) {
    document.addEventListener('touchstart', () => {
        document.body.style.cursor = 'auto';
    }, { passive: true });
    
    // Prevent context menu on long press
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Add touch feedback
    const touchElements = document.querySelectorAll('.btn, .nav-item, .expertise-card, .project-card, .timeline-item');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        }, { passive: true });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.error);
    // Continue with degraded functionality
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent default browser error handling
});

// ===== INITIALIZATION COMPLETION =====

// Start performance monitoring
setupPerformanceMonitoring();

// Export for debugging
window.ParallaxPortfolio = {
    config: parallaxConfig,
    state: {
        currentSection: () => currentSection,
        scrollProgress: () => scrollProgress,
        isLoading: () => isLoading,
        isMobile,
        isTouch
    },
    utils: {
        updateActiveSection,
        updateTime,
        debounce,
        throttle
    }
};
