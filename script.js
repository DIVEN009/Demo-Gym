// Smooth scroll for anchor links
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

// Add scroll animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to buttons on mobile
const buttons = document.querySelectorAll('.btn, .whatsapp-sticky, .call-sticky');
buttons.forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add hover effect to cards
const cards = document.querySelectorAll('.feature-card, .service-card, .membership-card, .trainer-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add animation to service cards on scroll
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    serviceObserver.observe(card);
});

// Add animation to feature cards
const featureCards = document.querySelectorAll('.feature-card');
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    featureObserver.observe(card);
});

// Add pulse animation to CTA buttons
const ctaButtons = document.querySelectorAll('.final-cta .btn');
setInterval(() => {
    ctaButtons.forEach(btn => {
        btn.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
    });
}, 3000);

// Hide/show sticky buttons based on scroll
let lastScroll = 0;
const stickyButtons = document.querySelectorAll('.whatsapp-sticky, .call-sticky');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 300) {
        stickyButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
        });
    } else {
        stickyButtons.forEach(btn => {
            btn.style.opacity = '0.7';
        });
    }
    
    lastScroll = currentScroll;
});

// Add click tracking for demo purposes (console log)
document.querySelectorAll('a[href^="https://wa.me"], a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const action = this.href.includes('wa.me') ? 'WhatsApp' : 'Call';
        console.log(`${action} button clicked - Demo mode`);
    });
});

// Prevent horizontal scroll
document.body.style.overflowX = 'hidden';

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu optimization
if (window.innerWidth <= 768) {
    // Optimize touch events for mobile
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Prevent zoom on double tap for buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                event.preventDefault();
            }
        }
        lastTouchEnd = now;
    }, false);
    
    // Add haptic feedback for buttons (if supported)
    const buttons = document.querySelectorAll('.btn, .whatsapp-sticky, .call-sticky');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });
    
    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Scroll handling code here
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Add viewport height fix for mobile browsers (fixes iOS Safari bottom bar)
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Detect if user is on mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    document.body.classList.add('mobile-device');
    
    // Optimize animations for mobile
    const cards = document.querySelectorAll('.feature-card, .service-card, .membership-card, .trainer-card');
    cards.forEach(card => {
        card.style.willChange = 'transform';
    });
    
    // Add touch feedback
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        }, { passive: true });
    });
}

// Improve scroll performance on mobile
let scrollTimeout;
window.addEventListener('scroll', function() {
    document.body.classList.add('scrolling');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        document.body.classList.remove('scrolling');
    }, 150);
}, { passive: true });

// Lazy load map iframe
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.getAttribute('data-src');
            }
            mapObserver.unobserve(entry.target);
        }
    });
});

const mapContainer = document.querySelector('.map-container');
if (mapContainer) {
    mapObserver.observe(mapContainer);
}
