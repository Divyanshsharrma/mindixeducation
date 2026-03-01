// About Page JavaScript

// Handle Get in Touch button click
function handleGetInTouch() {
    // Store the purpose and redirect to main page
    sessionStorage.setItem('formPurpose', 'counselling');
    sessionStorage.setItem('scrollToForm', 'true');
    
    // Redirect to main page
    window.location.href = 'index.html#contact';
}

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

// Get in Touch button handler
document.addEventListener('DOMContentLoaded', function() {
    const getInTouchBtn = document.getElementById('getInTouchBtn');
    
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Store the purpose and redirect to main page
            sessionStorage.setItem('formPurpose', 'counselling');
            sessionStorage.setItem('scrollToForm', 'true');
            
            // Redirect to main page
            window.location.href = 'index.html#contact';
        });
    }
});

// Mobile menu functionality
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

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Animate story highlights
    document.querySelectorAll('.highlight-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animate mission/vision cards
    document.querySelectorAll('.mv-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Animate value cards
    document.querySelectorAll('.value-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(member);
    });
    
    // Animate stats numbers
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = entry.target;
                const finalText = target.textContent;
                const number = parseInt(finalText.replace(/\D/g, ''));
                const suffix = finalText.replace(/\d/g, '');
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 30);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => statsObserver.observe(stat));
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.about-hero-image');
    
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to value cards
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.value-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.value-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Console welcome
console.log('%c🏢 Mindix Education - About Page', 'color: #667eea; font-size: 16px; font-weight: bold;');
