// ===== ENHANCED 3D PARALLAX PORTFOLIO JAVASCRIPT =====

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
    enabled: !prefersReducedMotion,
    intensity: isMobile ? 0.3 : 0.6
};

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Enhanced 3D Parallax Portfolio...');
    
    initializeLoadingScreen();
    setupParallaxSystem();
    setupScrollHandling();
    setupNavigation();
    setupMobileMenu();
    setupCursorEffects();
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
            startParallaxAnimation();
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

// ===== SIMPLIFIED PARALLAX SYSTEM =====

function setupParallaxSystem() {
    if (!parallaxConfig.enabled) return;
    
    // Only apply parallax to background layers
    const backgroundLayers = document.querySelectorAll('.parallax-layer[data-depth]');
    backgroundLayers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        const speed = parseFloat(layer.dataset.speed) || 1;
        
        // Store parallax data for background layers only
        if (depth < 0) {
            layer.parallaxData = { depth, speed };
        }
    });
}

function startParallaxAnimation() {
    if (!parallaxConfig.enabled) return;
    
    function animate() {
        const viewport = document.getElementById('parallaxViewport');
        if (!viewport) return;
        
        const scrollY = viewport.scrollTop;
        
        // Only animate background layers
        const backgroundLayers = document.querySelectorAll('.parallax-layer[data-depth]');
        backgroundLayers.forEach(layer => {
            if (layer.parallaxData) {
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

// ===== CURSOR EFFECTS =====

function setupCursorEffects() {
    if (isMobile || isTouch) return;
    
    const cursorSmall = document.querySelector('.cursor-small');
    const cursorLarge = document.querySelector('.cursor-large');
    
    if (!cursorSmall || !cursorLarge) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let largeCursorX = 0;
    let largeCursorY = 0;
    
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorSmall.style.left = mouseX + 'px';
        cursorSmall.style.top = mouseY + 'px';
    });
    
    // Animate large cursor with lag
    function animateCursor() {
        largeCursorX += (mouseX - largeCursorX) * 0.1;
        largeCursorY += (mouseY - largeCursorY) * 0.1;
        
        cursorLarge.style.left = largeCursorX + 'px';
        cursorLarge.style.top = largeCursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-item, .traffic-light, .dot, .magnetic, .expertise-card, .project-card, .timeline-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorLarge.classList.add('hover');
            cursorSmall.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorLarge.classList.remove('hover');
            cursorSmall.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorSmall.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorSmall.style.transform = 'translate(-50%, -50%) scale(1)';
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
                    setTimeout(() => {
                        terminal.style.transform = '';
                    }, 300);
                    break;
                    
                case 1: // Yellow dot - typewriter
                    typewriterEffect(codeLines);
                    break;
                    
                case 2: // Green dot - glow
                    terminal.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.5)';
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
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
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
    // Update mobile detection
    const wasMobile = isMobile;
    const newIsMobile = window.innerWidth <= 768;
    
    if (wasMobile !== newIsMobile) {
        // Reinitialize if device type changed
        location.reload();
    }
    
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

console.log('🎉 Enhanced 3D Parallax Portfolio fully loaded and ready!');