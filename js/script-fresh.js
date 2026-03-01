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

// Course enrollment - WhatsApp direct
document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        const coursePrice = courseCard.querySelector('.price').textContent;
        
        const whatsappNumber = '6397325703';
        const message = encodeURIComponent(
            `🎓 *Course Enrollment Inquiry*\n\n` +
            `📚 *Course:* ${courseTitle}\n` +
            `💰 *Price:* ${coursePrice}\n\n` +
            `👋 Hello Mindix Education!\n` +
            `I'm interested in this course. Please provide me with:\n` +
            `• Course details\n` +
            `• Batch timings\n` +
            `• Enrollment process\n\n` +
            `Thank you! 🙏`
        );
        
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
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
