// Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const selector = this.getAttribute('href');
        if (selector === "#") return; // Skip invalid
        const target = document.querySelector(selector);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toggle mobile navigation menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Close mobile navigation menu
function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

// Open contact modal
function openModal() {
    // You can replace this with actual modal logic
    alert("Contact modal opened!");
}


// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated counter for hero stats
function animateCounter(element, target, duration = 2000) {
    const start = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        // Format numbers with appropriate suffixes
        if (target >= 1000000) {
            element.textContent = (currentValue / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
            element.textContent = (currentValue / 1000).toFixed(0) + '+';
        } else {
            element.textContent = currentValue + '%';
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when hero section comes into view
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const text = counter.textContent;
                    if (text.includes('500')) {
                        animateCounter(counter, 500);
                    } else if (text.includes('1M')) {
                        animateCounter(counter, 1000000);
                    } else if (text.includes('99')) {
                        animateCounter(counter, 99);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-stats, .feature-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Chatbot preview animation
function animateChatMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        message.style.animationDelay = `${index * 0.5}s`;
    });
}

// Typing effect for chatbot messages
function typeMessage(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Enhanced chatbot preview with typing effect
function enhancedChatPreview() {
    const messageElements = document.querySelectorAll('.chat-messages .message p');

    const texts = [];
    messageElements.forEach(msg => texts.push(msg.textContent));

    // Clear text first
    messageElements.forEach(el => el.textContent = "");

    // Animate in correct DOM order
    texts.forEach((text, i) => {
        setTimeout(() => {
            typeMessage(messageElements[i], text);
        }, i * 2500); // 2.5s delay between messages
    });
}


// Form validation (if forms are added later)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu toggle (for responsive navigation)
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.style.display = 'none';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button
    nav.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    // Show/hide mobile menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Lazy loading for images (when images are added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateChatMessages();
    enhancedChatPreview();
    initMobileMenu();
    initParallax();
    initLazyLoading();
    
    // Add click tracking for CTA buttons
    document.querySelectorAll('.cta-button, .btn-primary, .pricing-button').forEach(button => {
        button.addEventListener('click', (e) => {
            // Add analytics tracking here
            console.log('CTA clicked:', e.target.textContent);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
// Open modal when Get Started or Start Free Trial is clicked
document.querySelectorAll('.cta-button, .btn-primary, .pricing-button').forEach(button => {
    button.addEventListener('click', e => {
        const modal = document.getElementById('contact-modal');
        if (modal) modal.style.display = 'flex';
    });
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('contact-modal').style.display = 'none';
});
function openModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const res = await fetch( "https://Vishesh1005-admismart.hf.space/submit-form" , {
        method: 'POST',
        body: formData
    });
    const result = await res.json();
    alert(result.message);
    this.reset();
    document.getElementById('contact-modal').style.display = 'none';
});

// Contact sales button => opens email client
document.querySelectorAll('.pricing-button').forEach(button => {
    if (button.textContent.includes('Contact')) {
        button.addEventListener('click', () => {
            window.location.href = 'mailto:admismart.in@gmail.com?subject=Enterprise Inquiry';
        });
    }
});


// Add CSS for mobile menu and ripple effect
const additionalStyles = `
    .mobile-menu-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #333;
        cursor: pointer;
        padding: 0.5rem;
        margin-left: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links li {
            margin: 0.5rem 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
