// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Mobile menu toggle
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

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Simple fetch to Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbzpQKDIAtmUKIbEx05-CQF0mQcAMYzBxrEuCmSgeA-FZ2_OoymnY42nCuNLT4h94T7Idg/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });
            
            console.log('Form submitted successfully');
            
            // Show success message
            formMessage.innerHTML = '✅ Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            formMessage.innerHTML = '❌ Sorry, there was an error sending your message. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } finally {
            // Reset button state
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

// Course enrollment - Specific handling
document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        
        // Check if it's the HR Executive course
        if (courseTitle.includes('HR Executive with AI Integrated Tools')) {
            // Redirect to the dedicated HR Executive course page
            window.location.href = 'hr-executive-course.html';
        } else {
            // Show coming soon message for other courses
            alert('🚀 Coming Soon!\n\nWe are working on something amazing! Enrollment will be available shortly.\n\nFor inquiries, please contact us:\n📞 WhatsApp: 8810696963\n📧 Email: info@mindixeducation.com');
        }
    });
});

// Smooth scrolling
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

// Console welcome
console.log('%c🚀 Mindix Education - Ready!', 'color: #667eea; font-size: 16px; font-weight: bold;');
