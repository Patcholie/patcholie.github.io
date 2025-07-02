// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
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
    const content = document.querySelector('.content');
    const scrollTop = content.scrollTop;
    const parallaxBg = document.getElementById('parallaxBg');
    parallaxBg.style.transform = `translateY(${scrollTop * 0.1}px)`;
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
const interactiveElements = document.querySelectorAll('a, button, .card, .list-item, .sidebar-item, .traffic-light, .hero-visual, .card-icon, .list-icon, .profile-avatar, .notification-icon, .tag, .code-window, .code-dot, .code-line');

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
        cursorLarge.classList.add('morphed');
        
        const rect = el.getBoundingClientRect();
        let newWidth, newHeight;
        
        if (el.classList.contains('traffic-light') || el.classList.contains('profile-avatar')) {
            const size = Math.max(rect.width, rect.height) + 24;
            newWidth = Math.min(size, 60);
            newHeight = newWidth;
            cursorLarge.style.borderRadius = '50%';
        } else if (el.classList.contains('card-icon') || el.classList.contains('list-icon')) {
            const size = Math.max(rect.width, rect.height) + 16;
            newWidth = Math.min(size, 56);
            newHeight = newWidth;
            cursorLarge.style.borderRadius = '12px';
        } else if (el.classList.contains('sidebar-item')) {
            newWidth = Math.min(rect.width + 16, 200);
            newHeight = Math.min(rect.height + 8, 50);
            cursorLarge.style.borderRadius = '8px';
        } else if (el.classList.contains('card')) {
            newWidth = Math.min(rect.width * 0.95, 320);
            newHeight = Math.min(rect.height * 0.95, 240);
            cursorLarge.style.borderRadius = '16px';
        } else if (el.classList.contains('tag')) {
            newWidth = rect.width + 12;
            newHeight = rect.height + 8;
            cursorLarge.style.borderRadius = '20px';
        } else if (el.classList.contains('code-window')) {
            newWidth = Math.min(rect.width * 0.98, 400);
            newHeight = Math.min(rect.height * 0.98, 300);
            cursorLarge.style.borderRadius = '16px';
        } else if (el.classList.contains('code-dot')) {
            const size = Math.max(rect.width, rect.height) + 20;
            newWidth = Math.min(size, 50);
            newHeight = newWidth;
            cursorLarge.style.borderRadius = '50%';
        } else if (el.classList.contains('code-line')) {
            newWidth = Math.min(rect.width + 20, 350);
            newHeight = rect.height + 8;
            cursorLarge.style.borderRadius = '6px';
        } else {
            newWidth = Math.min(rect.width + 16, 120);
            newHeight = Math.min(rect.height + 16, 80);
            cursorLarge.style.borderRadius = '12px';
        }
        
        newWidth = Math.max(newWidth, 36);
        newHeight = Math.max(newHeight, 36);
        
        cursorLarge.style.width = newWidth + 'px';
        cursorLarge.style.height = newHeight + 'px';
        cursorLarge.style.transition = 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-radius 0.3s ease';
    });
    
    el.addEventListener('mouseleave', () => {
        isHovering = false;
        hoverTarget = null;
        cursorLarge.classList.remove('morphed');
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            
            // Staggered animations for cards and list items
            if (entry.target.classList.contains('card') || entry.target.classList.contains('list-item')) {
                const siblings = [...entry.target.parentElement.children];
                const currentIndex = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${currentIndex * 0.1}s`;
            }
            
            // Animate section titles
            const sectionTitle = entry.target.querySelector('.section-title');
            if (sectionTitle && !sectionTitle.classList.contains('animate')) {
                sectionTitle.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
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
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
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
