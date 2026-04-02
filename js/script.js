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

// Course enrollment - Brochure display
document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        const coursePrice = courseCard.querySelector('.price').textContent;
        
        showCourseBrochure(courseTitle, coursePrice);
    });
});

// Course brochure data
const courseBrochures = {
    'Digital Marketing': {
        duration: '3 Months',
        level: 'Beginner to Advanced',
        modules: ['SEO Fundamentals', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Analytics'],
        highlights: ['Live Projects', 'Google Certification Prep', 'Internship Opportunities'],
        comingSoon: false
    },
    'Video Editing': {
        duration: '2 Months',
        level: 'Beginner to Intermediate',
        modules: ['Adobe Premiere Pro', 'After Effects Basics', 'Color Grading', 'Audio Editing', 'Export Settings'],
        highlights: ['Portfolio Building', 'Industry Tools', 'Project-Based Learning'],
        comingSoon: false
    },
    'Graphics Designing': {
        duration: '3 Months',
        level: 'Beginner to Advanced',
        modules: ['Photoshop Mastery', 'Illustrator Basics', 'InDesign', 'Typography', 'Brand Design'],
        highlights: ['Creative Portfolio', 'Software Training', 'Client Projects'],
        comingSoon: false
    },
    'US IT Recruiter': {
        duration: '2 Months',
        level: 'Intermediate',
        modules: ['US Staffing Basics', 'Job Portals', 'Candidate Screening', 'Interview Coordination', 'Client Management'],
        highlights: ['US Market Training', 'Night Shift Support', 'Placement Assistance'],
        comingSoon: false
    },
    'HR Executive with AI Integrated Tools': {
        duration: '60 Days',
        level: 'Job-Ready Program with AI Tools',
        modules: [
            'Week 1: HR Foundation & Corporate Basics',
            'Week 2: Recruitment & Talent Acquisition', 
            'Week 3: Interviewing & Onboarding',
            'Week 4: Payroll, Labour Law & Compliance',
            'Week 5: Employee Engagement & HR Operations',
            'Week 6: AI Tools for Modern HR',
            'Week 7: Practical HR & Industry Exposure',
            'Last 5 Days: Placement & Career Support'
        ],
        highlights: [
            'Monday to Friday Classes | Saturday: Assignments | Sunday: Off',
            'AI Integrated HR Tools Training',
            'Placement Assistance & Job Alerts via WhatsApp',
            'Resume Support & LinkedIn/Naukri Optimization',
            'Mock Interviews & Salary Negotiation'
        ],
        comingSoon: false,
        detailedContent: {
            schedule: 'Classes: Monday to Friday | Saturday: Assignments | Sunday: Off',
            placementSupport: 'Last 5 Days: Placement Assistance, Resume Support, LinkedIn & Naukri Optimization, Mock Interviews, Job Alerts via WhatsApp',
            weeklyBreakdown: [
                {
                    week: 'WEEK 1: HR Foundation & Corporate Basics',
                    days: [
                        'Day 1: Introduction to HR Management, HR Roles & Career Path',
                        'Day 2: Core HR Functions – Recruitment, Payroll, Training, Compliance',
                        'Day 3: Corporate Culture, Ethics & Professional Conduct',
                        'Day 4: HR Policies, SOPs & Documentation',
                        'Day 5: HR Letters – Offer, Appointment, Warning Letters',
                        'Day 6 (Saturday): Assignment – HR Policy & Documentation',
                        'Day 7 (Sunday): Off'
                    ]
                },
                {
                    week: 'WEEK 2: Recruitment & Talent Acquisition',
                    days: [
                        'Day 8: End-to-End Recruitment Lifecycle',
                        'Day 9: Job Analysis & Job Description Writing',
                        'Day 10: Sourcing Channels – Naukri, LinkedIn, Portals',
                        'Day 11: Resume Screening & ATS Basics',
                        'Day 12: Interview Scheduling & Coordination',
                        'Day 13 (Saturday): Assignment – JD & Resume Shortlisting',
                        'Day 14 (Sunday): Off'
                    ]
                },
                {
                    week: 'WEEK 3: Interviewing & Onboarding',
                    days: [
                        'Day 15: Interview Types – Telephonic, Virtual, F2F',
                        'Day 16: Behavioral & Technical Interview Techniques',
                        'Day 17: Candidate Evaluation & Feedback Process',
                        'Day 18: Offer Rollout & Salary Negotiation',
                        'Day 19: Employee Onboarding & Joining Formalities',
                        'Day 20 (Saturday): Assignment – Mock Recruitment',
                        'Day 21 (Sunday): Off'
                    ]
                },
                {
                    week: 'WEEK 4: Payroll, Labour Law & Compliance',
                    days: [
                        'Day 22: Payroll Structure – CTC, Gross & Net Salary',
                        'Day 23: Statutory Compliance – PF, ESI, PT, TDS',
                        'Day 24: Indian Labour Laws Overview',
                        'Day 25: Attendance & Leave Management',
                        'Day 26: HR MIS & Reporting',
                        'Day 27 (Saturday): Payroll & Compliance Assignment',
                        'Day 28 (Sunday): Off'
                    ]
                },
                {
                    week: 'WEEK 5: Employee Engagement & HR Operations',
                    days: [
                        'Day 29: Employee Lifecycle Management',
                        'Day 30: Employee Engagement & Retention',
                        'Day 31: Performance Management System (PMS)',
                        'Day 32: Training & Development',
                        'Day 33: Exit Process & Full & Final Settlement',
                        'Day 34 (Saturday): HR Operations Case Study',
                        'Day 35 (Sunday): Off'
                    ]
                },
                {
                    week: 'WEEK 6: AI Tools for Modern HR',
                    days: [
                        'Day 36: Introduction to AI in HR',
                        'Day 37: ChatGPT for HR – JD, Policies, Emails',
                        'Day 38: AI-Based Recruitment & Resume Screening',
                        'Day 39: ATS, HRMS & AI Tool Overview',
                        'Day 40: Excel + AI for HR Automation',
                        'Day 41 (Saturday): AI-Based HR Assignment',
                        'Day 42 (Sunday): Off'
                    ]
                },
                {
                    week: 'WEEK 7: Practical HR & Industry Exposure',
                    days: [
                        'Day 43: Handling HR Issues & Conflicts',
                        'Day 44: HR Audit & Compliance Checks',
                        'Day 45: Corporate Email Writing for HR',
                        'Day 46: HR Software & HRMS Demonstration',
                        'Day 47: HR Analytics & Metrics',
                        'Day 48 (Saturday): HR Analytics Mini Project',
                        'Day 49 (Sunday): Off'
                    ]
                },
                {
                    week: 'LAST 5 DAYS: Placement & Career Support',
                    days: [
                        'Day 50: Resume Building – ATS Friendly',
                        'Day 51: LinkedIn Profile Optimization',
                        'Day 52: Naukri Profile Optimization',
                        'Day 53: Mock Interview – Round 1',
                        'Day 54: Mock Interview – Round 2 & Salary Negotiation'
                    ]
                }
            ],
            outcomes: [
                '✔ Job-Ready HR Executive Skills',
                '✔ Hands-on HR & Recruitment Experience',
                '✔ AI Tools for Modern HR Roles',
                '✔ Placement Assistance & Job Alerts'
            ]
        }
    },
    'HR Recruiter': {
        duration: '2 Months',
        level: 'Beginner to Intermediate',
        modules: ['Talent Acquisition', 'Sourcing Strategies', 'Interview Techniques', 'Onboarding', 'HR Metrics'],
        highlights: ['Real-time Recruiting', 'Industry Tools', 'Placement Support'],
        comingSoon: false
    },
    'IT Recruiter': {
        duration: '2 Months',
        level: 'Intermediate',
        modules: ['IT Recruitment Basics', 'Technical Screening', 'Technology Stack', 'Client Coordination', 'Negotiation Skills'],
        highlights: ['IT Industry Focus', 'Technical Training', 'Career Growth'],
        comingSoon: false
    },
    'HR Admin': {
        duration: '1.5 Months',
        level: 'Beginner',
        modules: ['HR Operations', 'Documentation', 'Compliance', 'Employee Records', 'HR Systems'],
        highlights: ['Administrative Skills', 'Process Training', 'Entry Level Friendly'],
        comingSoon: false
    },
    'HR Analyst': {
        duration: '3 Months',
        level: 'Intermediate to Advanced',
        modules: ['HR Analytics', 'Data Visualization', 'Metrics & KPIs', 'Predictive Analysis', 'Reporting'],
        highlights: ['Advanced Analytics', 'Excel & Power BI', 'Strategic HR'],
        comingSoon: false
    },
    'Recruiting Coordinator': {
        duration: '1.5 Months',
        level: 'Beginner',
        modules: ['Coordination Basics', 'Scheduling', 'Communication', 'Documentation', 'Process Management'],
        highlights: ['Support Role Training', 'Communication Skills', 'Career Start'],
        comingSoon: false
    },
    'HR Coordinator': {
        duration: '2 Months',
        level: 'Beginner to Intermediate',
        modules: ['HR Coordination', 'Employee Engagement', 'Event Management', 'HR Support', 'Policy Implementation'],
        highlights: ['Multi-tasking Skills', 'Employee Interaction', 'HR Operations'],
        comingSoon: false
    },
    'HR Business Partner': {
        duration: '4 Months',
        level: 'Advanced',
        modules: ['Strategic HR', 'Business Acumen', 'Leadership Development', 'Change Management', 'HR Consulting'],
        highlights: ['Strategic Role', 'Leadership Training', 'High Impact Position'],
        comingSoon: false
    },
    'Ethical Hacking': {
        duration: '4 Months',
        level: 'Intermediate to Advanced',
        modules: ['Penetration Testing', 'Network Security', 'Web Application Security', 'Mobile Security', 'Compliance'],
        highlights: ['Hands-on Hacking', 'Industry Certifications', 'Live Projects'],
        comingSoon: false
    },
    'Cybersecurity': {
        duration: '6 Months',
        level: 'Beginner to Advanced',
        modules: ['Security Fundamentals', 'Network Defense', 'Incident Response', 'Security Architecture', 'Risk Management'],
        highlights: ['Comprehensive Security', 'Industry Cert Prep', 'Career Placement'],
        comingSoon: false
    },
    'Network Security': {
        duration: '3 Months',
        level: 'Intermediate',
        modules: ['Network Protocols', 'Firewall Configuration', 'VPN Setup', 'Intrusion Detection', 'Security Monitoring'],
        highlights: ['Network Focus', 'Practical Labs', 'Industry Tools'],
        comingSoon: false
    },
    'Information Security': {
        duration: '5 Months',
        level: 'Intermediate to Advanced',
        modules: ['InfoSec Principles', 'Data Protection', 'Security Governance', 'Risk Assessment', 'Compliance Management'],
        highlights: ['Governance Focus', 'Compliance Training', 'Strategic Security'],
        comingSoon: false
    },
    'Security Analyst': {
        duration: '4 Months',
        level: 'Intermediate',
        modules: ['Security Monitoring', 'Threat Analysis', 'Incident Response', 'Forensics Basics', 'Reporting'],
        highlights: ['SOC Operations', 'Threat Intelligence', 'Career Ready'],
        comingSoon: false
    },
    'Penetration Tester': {
        duration: '3 Months',
        level: 'Advanced',
        modules: ['Advanced Penetration Testing', 'Exploit Development', 'Security Assessment', 'Report Writing', 'Client Communication'],
        highlights: ['Offensive Security', 'Advanced Tools', 'High Demand Skill'],
        comingSoon: false
    }
};

// Auto-popup HR Executive course on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Page loaded, checking for auto-popup...');
    
    // Wait 2 seconds then auto-open HR Executive course brochure
    setTimeout(() => {
        console.log('⏰ Auto-opening HR Executive course brochure...');
        
        // Get HR Executive course details
        const courseCards = document.querySelectorAll('.course-card');
        let hrExecutiveCard = null;
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3');
            if (title && title.textContent.includes('HR Executive with AI Integrated Tools')) {
                hrExecutiveCard = card;
                console.log('✅ Found HR Executive course card!');
            }
        });
        
        if (hrExecutiveCard) {
            const courseTitle = hrExecutiveCard.querySelector('h3').textContent;
            const coursePrice = hrExecutiveCard.querySelector('.price').textContent;
            
            console.log('📚 Auto-opening:', { courseTitle, coursePrice });
            
            // Auto-open the brochure
            showCourseBrochure(courseTitle, coursePrice);
        } else {
            console.log('❌ HR Executive course card not found');
        }
    }, 2000); // 2 seconds delay
});

// Function to show course brochure
function showCourseBrochure(courseTitle, coursePrice) {
    const modal = document.getElementById('brochureModal');
    const modalTitle = document.getElementById('brochureTitle');
    const modalContent = document.getElementById('brochureContent');
    
    const brochure = courseBrochures[courseTitle];
    
    if (!brochure) {
        // Fallback for courses not in brochure data
        modalTitle.textContent = courseTitle;
        modalContent.innerHTML = `
            <div class="brochure-section">
                <span class="coming-soon-badge">Coming Soon</span>
                <h3>${courseTitle}</h3>
                <div class="brochure-price">
                    ${coursePrice}
                </div>
                <p>Course details are being updated. Please check back soon or contact us for more information.</p>
                <button class="brochure-enroll-btn coming-soon" disabled>Coming Soon</button>
            </div>
        `;
    } else {
        modalTitle.textContent = courseTitle;
        
        const comingSoonBadge = brochure.comingSoon ? '<span class="coming-soon-badge">Coming Soon</span>' : '';
        const buttonText = brochure.comingSoon ? 'Coming Soon' : 'Enroll Now';
        const buttonClass = brochure.comingSoon ? 'coming-soon' : '';
        const buttonDisabled = brochure.comingSoon ? 'disabled' : '';
        
        // Special handling for HR Executive with detailed content
        if (courseTitle === 'HR Executive with AI Integrated Tools' && brochure.detailedContent) {
            modalContent.innerHTML = `
                <div class="brochure-section">
                    ${comingSoonBadge}
                    <h3>🚀 60 Days HR Executive Job-Ready Program with AI Tools</h3>
                    <p><strong>Classes: Monday to Friday | Saturday: Assignments | Sunday: Off</strong></p>
                    <p><strong>Last 5 Days: Placement Assistance, Resume Support, LinkedIn & Naukri Optimization, Mock Interviews, Job Alerts via WhatsApp</strong></p>
                </div>
                
                <div class="brochure-section">
                    <h3>📚 Weekly Course Structure</h3>
                    ${brochure.detailedContent.weeklyBreakdown.map(week => `
                        <div class="week-card">
                            <h4>${week.week}</h4>
                            <ul>
                                ${week.days.map(day => `<li>${day}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div class="brochure-section">
                    <h3>🎯 Program Outcomes</h3>
                    <ul class="outcomes-list">
                        ${brochure.detailedContent.outcomes.map(outcome => `
                            <li>${outcome}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="brochure-section">
                    <h3>💰 Course Investment</h3>
                    <div class="brochure-price">
                        ${coursePrice}
                    </div>
                    <div style="margin: 20px 0;">
                        <button class="brochure-enroll-btn ${buttonClass}" ${buttonDisabled} onclick="processPayment('razorpay', '${courseTitle}', '${coursePrice}')">
                            🚀 Pay Now - Secure Your Seat
                        </button>
                        <button class="brochure-enroll-btn" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); margin-left: 10px;" onclick="handleBrochureEnroll('${courseTitle}')">
                            💬 Ask Questions
                        </button>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 15px;">
                        <strong>🔒 100% Secure Payment Powered by Razorpay</strong><br>
                        📞 Call: 8810696963 for payment assistance
                    </p>
                </div>
            `;
        } else {
            // Standard brochure for other courses
            modalContent.innerHTML = `
                <div class="brochure-section">
                    ${comingSoonBadge}
                    <h3>Course Overview</h3>
                    <p>${courseTitle} - Comprehensive training program designed to make you industry-ready.</p>
                </div>
                
                <div class="brochure-section">
                    <h3>Course Details</h3>
                    <ul>
                        <li><strong>Duration:</strong> ${brochure.duration}</li>
                        <li><strong>Level:</strong> ${brochure.level}</li>
                        <li><strong>Mode:</strong> Online + Live Sessions</li>
                    </ul>
                </div>
                
                <div class="brochure-section">
                    <h3>What You'll Learn</h3>
                    <ul>
                        ${brochure.modules.map(module => `<li>${module}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="brochure-section">
                    <h3>Course Highlights</h3>
                    <ul>
                        ${brochure.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="brochure-section">
                    <div class="brochure-price">
                        ${coursePrice}
                    </div>
                    <button class="brochure-enroll-btn ${buttonClass}" ${buttonDisabled} onclick="handleBrochureEnroll('${courseTitle}')">${buttonText}</button>
                </div>
            `;
        }
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Function to handle payment
function handlePayment(courseTitle) {
    // Close modal first
    const modal = document.getElementById('brochureModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Get course price
    const courseCard = document.querySelector(`.course-card h3:contains("${courseTitle}")`).closest('.course-card');
    const coursePrice = courseCard ? courseCard.querySelector('.price').textContent : '₹11,999';
    
    // Create payment modal
    const paymentModal = document.createElement('div');
    paymentModal.className = 'brochure-modal show';
    paymentModal.id = 'paymentModal';
    paymentModal.innerHTML = `
        <div class="brochure-modal-content">
            <div class="brochure-modal-header">
                <h2>🚀 Secure Payment</h2>
                <button class="brochure-close" onclick="closePaymentModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="brochure-modal-body">
                <div class="brochure-section">
                    <h3>Course: ${courseTitle}</h3>
                    <div class="brochure-price">${coursePrice}</div>
                </div>
                
                <div class="brochure-section">
                    <h3>🎯 What You Get:</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">✅ 60 Days Comprehensive Training</li>
                        <li style="margin-bottom: 10px;">✅ AI Tools Integration</li>
                        <li style="margin-bottom: 10px;">✅ Placement Assistance</li>
                        <li style="margin-bottom: 10px;">✅ Resume & LinkedIn Optimization</li>
                        <li style="margin-bottom: 10px;">✅ Mock Interviews</li>
                        <li style="margin-bottom: 10px;">✅ Lifetime Access to Materials</li>
                    </ul>
                </div>
                
                <div class="brochure-section">
                    <h3>💳 Payment Options:</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <button class="brochure-enroll-btn" onclick="processPayment('razorpay', '${courseTitle}', '${coursePrice}')">
                            � Pay Now - Secure Your Seat
                        </button>
                        <button class="brochure-enroll-btn" onclick="handleBrochureEnroll('${courseTitle}')" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%);">
                            � Ask Questions First
                        </button>
                    </div>
                </div>
                
                <div class="brochure-section">
                    <p style="font-size: 14px; color: #666; text-align: center;">
                        <strong>🔒 100% Secure Payment Powered by Razorpay</strong><br>
                        📞 Need Help? Call: 8810696963 | WhatsApp: 8810696963
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
    document.body.style.overflow = 'hidden';
}

// Function to process payment with Razorpay
function processPayment(method, courseTitle, coursePrice) {
    console.log('🚀 Pay Now button clicked!', { courseTitle, coursePrice });
    
    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
        console.error('❌ Razorpay not loaded! Opening WhatsApp fallback.');
        alert('Payment gateway is not loading. Please contact us on WhatsApp.');
        
        // WhatsApp fallback
        const whatsappNumber = '8810696963';
        const message = encodeURIComponent(
            `💳 *Payment Request - ${courseTitle}*\n\n` +
            `📚 *Course:* ${courseTitle}\n` +
            `💰 *Amount:* ${coursePrice}\n\n` +
            `👋 Hello Mindix Education!\n` +
            `I want to enroll in this course. Please send me the payment link.\n\n` +
            `Thank you! 🙏`
        );
        
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        return;
    }
    
    console.log('✅ Razorpay is loaded! Initializing payment...');
    
    // Extract numeric price
    const numericPrice = coursePrice.replace(/[^\d]/g, '');
    const priceInPaise = numericPrice * 100; // Razorpay uses paise
    
    console.log('💰 Price calculated:', { numericPrice, priceInPaise });
    
    // Initialize Razorpay
    const options = {
        key: 'rzp_live_SYZCBtmGqEsGjU', // Live Razorpay Key
        amount: priceInPaise,
        currency: 'INR',
        name: 'Mindix Education',
        description: `${courseTitle} - Course Enrollment`,
        image: 'https://mindixeducation.com/favicon.png',
        handler: function(response) {
            console.log('✅ Payment successful!', response);
            handlePaymentSuccess(response, courseTitle, coursePrice, method);
        },
        prefill: {
            name: 'Student Name', // Pre-filled name
            email: 'student@email.com', // Pre-filled email
            contact: '8810696963' // Pre-filled phone
        },
        notes: {
            course_title: courseTitle,
            payment_method: method,
            course_price: coursePrice
        },
        theme: {
            color: '#667eea'
        },
        modal: {
            ondismiss: function() {
                console.log('❌ Payment cancelled by user');
            },
            escape: true,
            handleback: true,
            confirm_close: true,
            animation: 'fade'
        }
    };
    
    try {
        const rzp = new Razorpay(options);
        console.log('✅ Razorpay instance created, opening checkout...');
        rzp.open();
    } catch (error) {
        console.error('❌ Error creating Razorpay instance:', error);
        alert('Unable to initialize payment. Please contact us directly.');
        
        // WhatsApp fallback
        const whatsappNumber = '8810696963';
        const message = encodeURIComponent(
            `💳 *Payment Request - ${courseTitle}*\n\n` +
            `📚 *Course:* ${courseTitle}\n` +
            `💰 *Amount:* ${coursePrice}\n\n` +
            `👋 Hello Mindix Education!\n` +
            `I want to enroll in this course. Please send me the payment link.\n\n` +
            `Thank you! 🙏`
        );
        
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
}

// Function to handle payment success
function handlePaymentSuccess(response, courseTitle, coursePrice, method) {
    const paymentModal = document.getElementById('paymentModal');
    const modalBody = paymentModal.querySelector('.brochure-modal-body');
    
    // Send payment data to Google Apps Script for record keeping
    const paymentData = {
        payment_id: response.razorpay_payment_id,
        course_title: courseTitle,
        course_price: coursePrice,
        payment_method: method,
        timestamp: new Date().toISOString()
    };
    
    // Send to backend (Google Apps Script)
    fetch('https://script.google.com/macros/s/AKfycbwRgfC8GlXEMzQ1nvExSMbqwaKZHRqAHrnJQnH12-DAmeO4Jby077FE_6eGe3nw1Atv/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            paymentData: JSON.stringify(paymentData)
        })
    }).then(() => {
        // Show success message
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
                <h3>Payment Successful!</h3>
                <p><strong>Payment ID:</strong> ${response.razorpay_payment_id}</p>
                <p><strong>Course:</strong> ${courseTitle}</p>
                <p><strong>Amount:</strong> ${coursePrice}</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h4 style="color: var(--primary); margin-bottom: 15px;">🎉 Next Steps:</h4>
                    <ol style="text-align: left; max-width: 400px; margin: 0 auto;">
                        <li>You'll receive a confirmation email shortly</li>
                        <li>Our team will contact you within 24 hours</li>
                        <li>Course access details will be shared via WhatsApp</li>
                        <li>Join the student community for updates</li>
                    </ol>
                </div>
                <div style="margin: 20px 0;">
                    <button class="brochure-enroll-btn" onclick="closePaymentModal()" style="margin: 5px;">
                        🎉 Start Learning Journey
                    </button>
                    <button class="brochure-enroll-btn" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); margin: 5px;" onclick="window.open('https://wa.me/8810696963?text=' + encodeURIComponent('🎉 I have successfully enrolled in ' + courseTitle + '. Payment ID: ' + response.razorpay_payment_id) + ', '_blank')">
                        💬 WhatsApp Confirmation
                    </button>
                </div>
            </div>
        `;
        
        // Close modal after 10 seconds
        setTimeout(() => {
            closePaymentModal();
        }, 10000);
    }).catch(error => {
        console.error('Error saving payment:', error);
        // Still show success to user
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
                <h3>Payment Successful!</h3>
                <p><strong>Payment ID:</strong> ${response.razorpay_payment_id}</p>
                <p><strong>Course:</strong> ${courseTitle}</p>
                <p><strong>Amount:</strong> ${coursePrice}</p>
                <p style="color: #666;">Our team will contact you soon with course details.</p>
                <button class="brochure-enroll-btn" onclick="closePaymentModal()" style="margin-top: 20px;">
                    Close
                </button>
            </div>
        `;
    });
}

// Function to close payment modal
function closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Function to handle brochure enroll button click
function handleBrochureEnroll(courseTitle) {
    // Close modal first
    const modal = document.getElementById('brochureModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Open WhatsApp with course inquiry
    const whatsappNumber = '8810696963';
    const message = encodeURIComponent(
        `🎓 *Course Enrollment Inquiry*\n\n` +
        `📚 *Course:* ${courseTitle}\n\n` +
        `👋 Hello Mindix Education!\n` +
        `I'm interested in this course. Please provide me with:\n` +
        `• Course details\n` +
        `• Batch timings\n` +
        `• Enrollment process\n\n` +
        `Thank you! 🙏`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Close brochure modal
document.getElementById('brochureClose').addEventListener('click', function() {
    const modal = document.getElementById('brochureModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal on outside click
document.getElementById('brochureModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
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
