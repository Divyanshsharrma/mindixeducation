// Roadmap Page JavaScript

// Loading Screen Handler
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Add loading class initially
    body.classList.add('loading-active');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        body.classList.remove('loading-active');
        
        // Remove loading screen completely after fade animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2000);
});

// Scroll to form function (redirect to main page)
function scrollToForm(purpose) {
    // Store the purpose in sessionStorage
    sessionStorage.setItem('formPurpose', purpose);
    
    // Redirect to main page
    window.location.href = 'index.html#contact';
}

// Progress bar interaction
document.addEventListener('DOMContentLoaded', function() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            progressSteps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked step and all previous steps
            for (let i = 0; i <= index; i++) {
                progressSteps[i].classList.add('active');
            }
            
            // Scroll to corresponding roadmap step
            const targetStep = document.querySelector(`.roadmap-step:nth-child(${index + 1})`);
            if (targetStep) {
                targetStep.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight the step
                targetStep.style.transform = 'scale(1.02)';
                targetStep.style.boxShadow = '0 25px 70px rgba(102, 126, 234, 0.2)';
                
                setTimeout(() => {
                    targetStep.style.transform = '';
                    targetStep.style.boxShadow = '';
                }, 1000);
            }
        });
    });
    
    // Animate roadmap steps on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide and offset roadmap steps
    document.querySelectorAll('.roadmap-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(step);
    });
    
    // Animate floating elements
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 1.5}s`;
    });
    
    // Check for stored purpose from sessionStorage
    const storedPurpose = sessionStorage.getItem('formPurpose');
    if (storedPurpose) {
        sessionStorage.removeItem('formPurpose');
        // The form will be handled by the main page script
    }
});

// Mobile menu functionality (if needed)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.roadmap-hero-image');
    const floatingElements = document.querySelector('.floating-elements');
    
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (floatingElements && scrolled < 800) {
        floatingElements.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Console welcome
console.log('%c🗺️ Mindix Education - Learning Roadmap', 'color: #667eea; font-size: 16px; font-weight: bold;');
