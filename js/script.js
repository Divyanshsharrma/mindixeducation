// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

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

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items in the same category
            const category = faqItem.closest('.faq-category');
            const allItems = category.querySelectorAll('.faq-item');
            
            allItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Check for stored purpose from sessionStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedPurpose = sessionStorage.getItem('formPurpose');
    const scrollToFormFlag = sessionStorage.getItem('scrollToForm');
    
    if (storedPurpose && (window.location.hash === '#contact' || scrollToFormFlag === 'true')) {
        // Remove the stored items
        sessionStorage.removeItem('formPurpose');
        sessionStorage.removeItem('scrollToForm');
        
        // Scroll to form after a short delay
        setTimeout(() => {
            scrollToForm(storedPurpose);
        }, 500);
    }
});

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
            const response = await fetch('https://script.google.com/macros/s/AKfycbwRgfC8GlXEMzQ1nvExSMbqwaKZHRqAHrnJQnH12-DAmeO4Jby077FE_6eGe3nw1Atv/exec', {
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
console.log('%c🚀 Mindix Education - Fresh Start!', 'color: #667eea; font-size: 16px; font-weight: bold;');

// Scroll to form with purpose
function scrollToForm(purpose) {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        // Set the purpose in the hidden field
        const purposeField = document.getElementById('formPurpose');
        if (purposeField) {
            purposeField.value = purpose;
        }
        
        // Scroll to contact section
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight form and focus on name field
        const contactForm = document.getElementById('contactForm');
        const nameField = document.getElementById('name');
        
        if (contactForm) {
            contactForm.style.border = '2px solid #667eea';
            contactForm.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
            
            // Focus on name field after scrolling completes
            setTimeout(() => {
                if (nameField) {
                    nameField.focus();
                    nameField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 800); // Wait for scroll to complete
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                contactForm.style.border = '';
                contactForm.style.boxShadow = '';
            }, 3000);
        }
    }
}

// Explore Courses function
function exploreCourses() {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
        // Scroll to courses section
        coursesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Show all courses by clicking the "All Courses" filter
        setTimeout(() => {
            const allCoursesBtn = document.querySelector('[data-filter="all"]');
            if (allCoursesBtn) {
                // Remove active class from all filter buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to "All Courses" button
                allCoursesBtn.classList.add('active');
                
                // Show all course cards
                document.querySelectorAll('.course-card').forEach(card => {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                });
                
                // Highlight the courses section
                coursesSection.style.border = '2px solid #667eea';
                coursesSection.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
                setTimeout(() => {
                    coursesSection.style.border = '';
                    coursesSection.style.boxShadow = '';
                }, 3000);
            }
        }, 800);
    }
}

// Course Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            courseCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                    } else {
                        card.classList.remove('visible');
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // View All Courses button functionality
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // Scroll to courses section
            const coursesSection = document.getElementById('courses');
            if (coursesSection) {
                coursesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Show all courses and set "All Courses" filter as active
                setTimeout(() => {
                    const allCoursesBtn = document.querySelector('[data-filter="all"]');
                    if (allCoursesBtn) {
                        // Remove active class from all filter buttons
                        filterBtns.forEach(btn => btn.classList.remove('active'));
                        // Add active class to "All Courses" button
                        allCoursesBtn.classList.add('active');
                        
                        // Show all course cards
                        courseCards.forEach(card => {
                            card.classList.remove('hidden');
                            card.classList.add('visible');
                        });
                        
                        // Highlight the courses section
                        coursesSection.style.border = '2px solid #667eea';
                        coursesSection.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
                        setTimeout(() => {
                            coursesSection.style.border = '';
                            coursesSection.style.boxShadow = '';
                        }, 3000);
                    }
                }, 800);
            }
        });
    }
});

// Check Eligibility function - WhatsApp redirect
function checkEligibility() {
    const whatsappNumber = '6397325703';
    const message = encodeURIComponent(
        `🎓 *Eligibility Check Request*\n\n` +
        `👋 Hello Mindix Education!\n` +
        `I want to check my eligibility for your courses.\n\n` +
        `Please help me with:\n` +
        `• Eligibility assessment\n` +
        `• Career guidance\n` +
        `• Course recommendations\n` +
        `• Skill evaluation\n\n` +
        `Looking forward to your response! 🙏\n\n` +
        `⏰ Sent from: ${window.location.href}`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Navigation handlers for step buttons
document.querySelectorAll('.step-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        switch(buttonText) {
            case 'Book Counselling':
                scrollToForm('counselling');
                break;
                
            case 'Resume Review':
                // Scroll to ATS Checker section
                const resumeSection = document.querySelector('.resume-review');
                if (resumeSection) {
                    resumeSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Highlight upload area
                    const uploadArea = document.querySelector('.upload-area');
                    if (uploadArea) {
                        uploadArea.style.border = '2px solid #667eea';
                        uploadArea.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                        setTimeout(() => {
                            uploadArea.style.border = '';
                            uploadArea.style.boxShadow = '';
                        }, 3000);
                    }
                }
                break;
                
            case 'Get Placed':
                scrollToForm('placement');
                break;
        }
    });
});

// Chat/Call buttons handler
document.querySelectorAll('.counselor-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const counselorCard = this.closest('.counselor-card');
        const counselorName = counselorCard.querySelector('h4').textContent;
        const counselorTitle = counselorCard.querySelector('.counselor-title').textContent;
        
        const whatsappNumber = '6397325703';
        const message = encodeURIComponent(
            `🎓 *Free Career Counseling Request*\n\n` +
            `👋 Hello Mindix Education!\n\n` +
            `📝 *Counselor Preference:* ${counselorName}\n` +
            `🔖 *Specialization:* ${counselorTitle}\n\n` +
            `I would like to schedule a free 10-minute counseling session with ${counselorName}.\n\n` +
            `Please help me with:\n` +
            `• Career guidance\n` +
            `• Course recommendations\n` +
            `• Skill development path\n\n` +
            `Looking forward to your response! 🙏\n\n` +
            `⏰ Sent from: ${window.location.href}`
        );
        
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    });
});

// Resume upload handler
async function uploadResume() {
    console.log('🚀 Resume upload started');
    
    const fileInput = document.getElementById('resumeFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    console.log('📁 File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    // Validate file
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF or DOCX file only.');
        return;
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        return;
    }
    
    try {
        console.log('🔄 Converting to base64...');
        // Convert to base64
        const base64 = await fileToBase64(file);
        console.log('✅ Base64 conversion completed, length:', base64.length);
        
        console.log('📤 Sending to Apps Script...');
        // Send to Apps Script
        const resumeData = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: base64
        };
        
        console.log('📋 Resume data object:', {
            name: resumeData.name,
            size: resumeData.size,
            type: resumeData.type,
            dataLength: resumeData.data.length
        });
        
        const params = new URLSearchParams();
        params.append('resumeData', JSON.stringify(resumeData));
        
        console.log('📨 URLSearchParams created, length:', params.toString().length);
        console.log('🔗 Full URL:', 'https://script.google.com/macros/s/AKfycbwRgfC8GlXEMzQ1nvExSMbqwaKZHRqAHrnJQnH12-DAmeO4Jby077FE_6eGe3nw1Atv/exec');
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbwRgfC8GlXEMzQ1nvExSMbqwaKZHRqAHrnJQnH12-DAmeO4Jby077FE_6eGe3nw1Atv/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });
        
        console.log('📨 Response received:', response);
        console.log('📨 Response status:', response.status);
        console.log('📨 Response ok:', response.ok);
        
        alert('🎉 Resume uploaded successfully!\n\nOur team will review your resume within 24 hours.');
        fileInput.value = '';
        
        // Hide file info
        document.getElementById('fileInfo').style.display = 'none';
        document.getElementById('uploadBtn').style.display = 'none';
        
        // Silent WhatsApp to admin
        const adminMessage = encodeURIComponent(
            `📄 *New Resume Upload*\n\n` +
            `📁 File: ${file.name}\n` +
            `📊 Size: ${formatFileSize(file.size)}\n` +
            `⏰ Time: ${new Date().toLocaleString()}\n` +
            `🔗 Check Google Drive: Resume Uploads folder`
        );
        
        fetch(`https://wa.me/6397325703?text=${adminMessage}`, {mode: 'no-cors'});
        
    } catch (error) {
        console.error('❌ Upload error:', error);
        alert('❌ Upload failed. Please try again.');
    }
}

// Helper function
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// File selection handler
function handleFileSelect(input) {
    const file = input.files[0];
    if (file) {
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('fileSize').textContent = formatFileSize(file.size);
        document.getElementById('fileInfo').style.display = 'block';
        document.getElementById('uploadBtn').style.display = 'inline-block';
    }
}

// Test function - add this to browser console
window.testResumeUpload = async function() {
    console.log('🧪 Test function called');
    
    const fileInput = document.getElementById('resumeFile');
    const file = fileInput.files[0];
    
    if (!file) {
        console.error('❌ No file selected');
        return;
    }
    
    console.log('📁 File info:', {
        name: file.name,
        size: file.size,
        type: file.type
    });
    
    try {
        const testData = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9M="
        };
        
        const params = new URLSearchParams();
        params.append('resumeData', JSON.stringify(testData));
        
        console.log('📨 Sending test data...');
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbwRgfC8GlXEMzQ1nvExSMbqwaKZHRqAHrnJQnH12-DAmeO4Jby077FE_6eGe3nw1Atv/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });
        
        console.log('✅ Test response:', response);
        
    } catch (error) {
        console.error('❌ Test error:', error);
    }
}
