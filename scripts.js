// Loading Screen
document.body.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        // Hide loading screen
        document.getElementById('loadingScreen').classList.add('hidden');

        // Enable scrolling again
        document.body.classList.remove('loading');

        // Reset scroll sso even if the user scrolled in the middle, it will scroll to the top
        const content = document.querySelector('.content');
        if (content) {
            content.scrollTop = 0;
        } else {
            window.scrollTo(0, 0);
        }
    }, 2800);
});

// Particle System
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Scroll Progress
function updateScrollProgress() {
    const content = document.querySelector('.content');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = content.scrollTop;
    const scrollHeight = content.scrollHeight - content.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

// Parallax Effect
function updateParallax() {
    // Mouse-Based Parallax for Video Background
    const parallaxBg = document.getElementById('parallaxBg');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate relative position [-1, 1]
        targetX = (e.clientX - centerX) / centerX;
        targetY = (e.clientY - centerY) / centerY;
    });

    function animateParallaxMouse() {
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        // Apply subtle movement (adjust scale for intensity)
        const maxTranslate = 10; // pixels
        const translateX = currentX * maxTranslate;
        const translateY = currentY * maxTranslate;

        parallaxBg.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.02)`;

        requestAnimationFrame(animateParallaxMouse);
    }
    animateParallaxMouse();
}

// Enhanced Cursor System
const cursorSmall = document.querySelector('.cursor--small');
const cursorLarge = document.querySelector('.cursor--large');

let mouseX = 0;
let mouseY = 0;
let largeCursorX = 0;
let largeCursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorSmall.style.left = mouseX + 'px';
    cursorSmall.style.top = mouseY + 'px';
});

let isHovering = false;
let hoverTarget = null;

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

// Enhanced cursor morphing with magnetic effect
const magneticElements = document.querySelectorAll('.magnetic-btn');
const interactiveElements = document.querySelectorAll('a, button, .card, .list-item, .sidebar-item, .traffic-light, .hero-visual, .card-icon, .list-icon, .profile-avatar, .tag, .code-window, .code-dot, .code-line');

magneticElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorLarge.classList.add('magnetic');
    });
    
    el.addEventListener('mouseleave', () => {
        cursorLarge.classList.remove('magnetic');
    });
});

interactiveElements.forEach(el => {

    el.addEventListener('mouseenter', () => {
        isHovering = true;
        hoverTarget = el;
        cursorLarge.classList.add('morphed', 'interactive');

        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);

        // Apply real element shape
        cursorLarge.style.borderRadius = computedStyle.borderRadius || '12px';

        // Slightly more width than element
        cursorLarge.style.width = rect.width + 'px';
        cursorLarge.style.height = rect.height + 'px';

        // Smooth animation
        cursorLarge.style.transition = 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-radius 0.4s ease';
    });

    el.addEventListener('mouseleave', () => {
        isHovering = false;
        hoverTarget = null;
        cursorLarge.classList.remove('morphed', 'interactive');

        // Reset size and shape
        cursorLarge.style.width = '32px';
        cursorLarge.style.height = '32px';
        cursorLarge.style.borderRadius = '50%';
    });

});

// Code window interactions
const codeDots = document.querySelectorAll('.code-dot');
const codeWindow = document.querySelector('.code-window');
const codeLines = document.querySelectorAll('.code-line');

codeDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === 0) {
            // Red dot - minimize effect
            codeWindow.style.transform = 'scale(0.95) rotate(-2deg)';
            setTimeout(() => {
                codeWindow.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
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
            codeWindow.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.4), 0 20px 60px rgba(0, 0, 0, 0.6)';
            setTimeout(() => {
                codeWindow.style.boxShadow = '';
            }, 1000);
        }
    });
});

// Code line hover effects
codeLines.forEach(line => {
    line.addEventListener('mouseenter', () => {
        line.style.background = 'rgba(59, 130, 246, 0.05)';
        line.style.borderLeft = '3px solid var(--accent-primary)';
        line.style.paddingLeft = '8px';
    });
    
    line.addEventListener('mouseleave', () => {
        line.style.background = '';
        line.style.borderLeft = '';
        line.style.paddingLeft = '';
    });
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
            el.classList.add('reveal');

            // Staggered animation delay
            if (el.classList.contains('card') || el.classList.contains('list-item')) {
                const siblings = [...el.parentElement.children];
                const index = siblings.indexOf(el);
                el.style.transitionDelay = `${index * 0.1}s`;
            }

            const sectionTitle = el.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.classList.add('animate');
            }
        } else {
            // Reset classes and inline styles on exit
            el.classList.remove('reveal');
            el.style.transitionDelay = '';

            const sectionTitle = el.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.classList.remove('animate');
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.content-section, .card, .list-item').forEach(el => {
    observer.observe(el);
});


// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const navItems = document.querySelectorAll('.sidebar-item');
const sections = document.querySelectorAll('.content-section');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        
        // Get section position relative to viewport
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const viewportMiddle = window.innerHeight / 2;

        if (sectionTop <= viewportMiddle && sectionTop + sectionHeight > viewportMiddle) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Combined scroll listener
let ticking = false;
const content = document.querySelector('.content');

content.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            updateScrollProgress();
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize
createParticles();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
})
