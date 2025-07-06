// Mobile Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Performance throttling
let ticking = false;
let scrollTimeoutId = null;

// Global state
let isLoading = true;
let currentSection = 'home';
let parallaxElements = [];

// Loading Screen
document.body.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.body.classList.remove('loading');
        isLoading = false;
        
        // Reset scroll position
        const content = document.querySelector('.content');
        if (content) {
            content.scrollTop = 0;
        } else {
            window.scrollTo(0, 0);
        }
        
        // Initialize after loading
        initializeAnimations();
    }, 2800);
});

// Initialize all animations and interactions
function initializeAnimations() {
    createParticles();
    initializeParallax();
    setupScrollAnimations();
    setupMobileNavigation();
    setupInteractiveElements();
    
    if (!isMobile && !isTouch) {
        setupCursorEffects();
    }
}

// Enhanced Particle System
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = isMobile ? 25 : 50; // Reduce particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.opacity = isMobile ? 0.2 : 0.3; // Subtle on mobile
        container.appendChild(particle);
    }
}

// Simplified Parallax System
function initializeParallax() {
    parallaxElements = document.querySelectorAll('.parallax-element');
    
    // Initialize parallax elements with simple, smooth properties
    parallaxElements.forEach((element) => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        const direction = element.dataset.direction || 'up';
        
        element.parallaxData = {
            speed,
            direction,
            originalTransform: element.style.transform || ''
        };
        
        // Smooth transition for non-scroll interactions only
        element.style.transition = 'opacity 0.3s ease, transform 0.1s linear';
        element.style.willChange = 'transform, opacity';
    });
}

// Smooth intersection observer for reveals
function initializeAdvancedObserver() {
    const observerOptions = {
        threshold: [0, 0.2, 0.5, 0.8, 1],
        rootMargin: '50px 0px 50px 0px'
    };

    const smoothObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                element.classList.add('reveal');
                
                // Smooth staggered animation for child elements
                if (element.classList.contains('card') || element.classList.contains('list-item')) {
                    const siblings = [...element.parentElement.children];
                    const index = siblings.indexOf(element);
                    element.style.transitionDelay = `${index * 0.05}s`; // Reduced delay for smoothness
                }
            } else if (!isMobile) {
                element.classList.remove('reveal');
                element.style.transitionDelay = '';
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const elementsToObserve = document.querySelectorAll('.content-section, .card, .list-item');
    elementsToObserve.forEach(el => smoothObserver.observe(el));
}

// Mouse-based parallax for desktop only
function updateMouseParallax() {
    if (isMobile || isTouch) return;
    
    const parallaxBg = document.getElementById('parallaxBg');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        targetX = (e.clientX - centerX) / centerX;
        targetY = (e.clientY - centerY) / centerY;
    });

    function animateMouseParallax() {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        const maxTranslate = 15;
        const translateX = currentX * maxTranslate;
        const translateY = currentY * maxTranslate;

        if (parallaxBg) {
            parallaxBg.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.02)`;
        }

        requestAnimationFrame(animateMouseParallax);
    }
    animateMouseParallax();
}

// Smooth background movement
function updateSmoothBackgroundParallax(scrollProgress) {
    const parallaxBg = document.getElementById('parallaxBg');
    if (!parallaxBg || isMobile) return;
    
    // Very subtle, smooth movement
    const moveY = scrollProgress * 20; // Slow, smooth movement
    const scale = 1 + scrollProgress * 0.02; // Very subtle scaling
    
    parallaxBg.style.transform = `translateY(${moveY}px) scale(${scale})`;
}


// Enhanced Cursor System (Desktop Only)
function setupCursorEffects() {
    const cursorSmall = document.querySelector('.cursor--small');
    const cursorLarge = document.querySelector('.cursor--large');

    if (!cursorSmall || !cursorLarge) return;

    let mouseX = 0;
    let mouseY = 0;
    let largeCursorX = 0;
    let largeCursorY = 0;
    let isHovering = false;
    let hoverTarget = null;

    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorSmall.style.left = mouseX + 'px';
        cursorSmall.style.top = mouseY + 'px';
    });

    // Animate large cursor
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

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .list-item, .sidebar-item, .traffic-light, .hero-visual, .card-icon, .list-icon, .profile-avatar, .tag, .code-window, .code-dot, .code-line');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            hoverTarget = el;
            cursorLarge.classList.add('morphed', 'interactive');
            cursorSmall.classList.add('hovered');

            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);

            cursorLarge.style.borderRadius = computedStyle.borderRadius || '12px';
            cursorLarge.style.width = rect.width + 'px';
            cursorLarge.style.height = rect.height + 'px';
            cursorLarge.style.transition = 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-radius 0.4s ease';
        });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            hoverTarget = null;
            cursorLarge.classList.remove('morphed', 'interactive');
            cursorSmall.classList.remove('hovered');

            cursorLarge.style.width = '32px';
            cursorLarge.style.height = '32px';
            cursorLarge.style.borderRadius = '50%';
        });
    });

    // Magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorLarge.classList.add('magnetic');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorLarge.classList.remove('magnetic');
        });
    });

    /* ───────── click pulse (inner dot) ───────── */
    document.addEventListener('mousedown', () => {
        cursorSmall.classList.remove('clicked');  // restart if mid‑animation
        void cursorSmall.offsetWidth;             // force reflow so keyframes replay
        cursorSmall.classList.add('clicked');
    });
    
    /* remove .clicked after the keyframe finishes so the
       dot returns to its proper idle size (small or hovered) */
    cursorSmall.addEventListener('animationend', (e) => {
        if (e.animationName === 'cursorClick') {
            cursorSmall.classList.remove('clicked');
        }
    });

}

// Interactive Elements Setup
function setupInteractiveElements() {
    // Code window interactions
    const codeDots = document.querySelectorAll('.code-dot');
    const codeWindow = document.querySelector('.code-window');
    const codeLines = document.querySelectorAll('.code-line');

    codeDots.forEach((dot, index) => {
        const clickHandler = () => {
            if (index === 0) {
                // Red dot - minimize effect
                if (codeWindow) {
                    codeWindow.style.transform = 'scale(0.95) rotate(-2deg)';
                    setTimeout(() => {
                        codeWindow.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                }
            } else if (index === 1) {
                // Yellow dot - typewriter effect
                codeLines.forEach((line, lineIndex) => {
                    line.style.opacity = '0';
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.animation = 'slideInCode 0.2s ease forwards';
                    }, lineIndex * 100);
                });
            } else {
                // Green dot - glow effect
                if (codeWindow) {
                    codeWindow.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.4), 0 20px 60px rgba(0, 0, 0, 0.6)';
                    setTimeout(() => {
                        codeWindow.style.boxShadow = '';
                    }, 1000);
                }
            }
        };

        if (isMobile || isTouch) {
            dot.addEventListener('touchend', clickHandler);
        } else {
            dot.addEventListener('click', clickHandler);
        }
    });

    // Enhanced code line interactions
    codeLines.forEach(line => {
        const hoverHandler = () => {
            line.style.background = 'rgba(59, 130, 246, 0.05)';
            line.style.borderLeft = '3px solid var(--accent-primary)';
            line.style.paddingLeft = '8px';
        };
        
        const leaveHandler = () => {
            line.style.background = '';
            line.style.borderLeft = '';
            line.style.paddingLeft = '';
        };

        if (isMobile || isTouch) {
            line.addEventListener('touchstart', hoverHandler);
            line.addEventListener('touchend', leaveHandler);
        } else {
            line.addEventListener('mouseenter', hoverHandler);
            line.addEventListener('mouseleave', leaveHandler);
        }
    });
}

// Mobile Navigation
function setupMobileNavigation() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileNavToggle && sidebar) {
        const toggleNavigation = () => {
            mobileNavToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
            
            // Prevent background scrolling when nav is open
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        mobileNavToggle.addEventListener('click', toggleNavigation);
        mobileNavToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleNavigation();
        });

        // Close navigation when clicking on sidebar items
        const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileNavToggle.classList.remove('active');
                    sidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close navigation when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !mobileNavToggle.contains(e.target)) {
                mobileNavToggle.classList.remove('active');
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scroll Animations Setup
function setupScrollAnimations() {
    // Scroll progress indicator with smooth glow
    function updateScrollProgress() {
        const content = document.querySelector('.content');
        const scrollProgress = document.getElementById('scrollProgress');
        
        if (content && scrollProgress) {
            const scrollTop = content.scrollTop;
            const scrollHeight = content.scrollHeight - content.clientHeight;
            const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
            scrollProgress.style.width = progress + '%';
        }
    }

    // Smooth combined scroll listener
    const content = document.querySelector('.content');
    
    const scrollHandler = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    };

    if (content) {
        content.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Smooth scroll behavior
        content.style.scrollBehavior = 'smooth';
        content.style.webkitOverflowScrolling = 'touch';
    } else {
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
    
    // Initialize the smooth observer
    initializeAdvancedObserver();
}

// Remove mouse parallax to prevent background jumping
function updateMouseParallax() {
    // Disabled to prevent jumping background
    return;
}

// Active Navigation Highlighting
function updateActiveNav() {
    const navItems = document.querySelectorAll('.sidebar-item');
    const sections = document.querySelectorAll('.content-section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const viewportMiddle = window.innerHeight / 2;

        if (sectionTop <= viewportMiddle && sectionTop + sectionHeight > viewportMiddle) {
            current = section.getAttribute('id');
        }
    });
    
    if (current !== currentSection) {
        currentSection = current;
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const content = document.querySelector('.content');
                const targetTop = target.offsetTop - 100; // Account for header
                
                if (content) {
                    content.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Touch interactions for mobile
function setupTouchInteractions() {
    if (!isMobile && !isTouch) return;

    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .card, .list-item, .sidebar-item, .tag');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', () => {
            element.style.transform = '';
        }, { passive: true });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
        
        // ESC key to close mobile navigation
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            const mobileNavToggle = document.getElementById('mobileNavToggle');
            
            if (sidebar && sidebar.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// Window resize handler
function handleResize() {
    // Close mobile navigation on resize to desktop
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        const mobileNavToggle = document.getElementById('mobileNavToggle');
        
        if (sidebar && mobileNavToggle) {
            mobileNavToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Reinitialize parallax elements
    if (parallaxElements.length > 0) {
        initializeParallax();
    }
}

// Performance optimizations
function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-smooth', '0.01ms');
        document.documentElement.style.setProperty('--transition-gentle', '0.01ms');
        
        // Disable parallax for reduced motion
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
        return;
    }
    }

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupTouchInteractions();
    setupKeyboardNavigation();
    optimizePerformance();
    });

// Handle window resize
window.addEventListener('resize', () => {
    clearTimeout(scrollTimeoutId);
    scrollTimeoutId = setTimeout(handleResize, 100);
});

// Prevent context menu on long press for mobile
if (isMobile || isTouch) {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.error);
    // Continue with degraded functionality rather than breaking
});

// Export for potential external use
window.PortfolioApp = {
    isMobile,
    isTouch,
    updateActiveNav,
    currentSection: () => currentSection
};