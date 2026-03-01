// Chatbot JavaScript
class MindixChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-toggle" id="chatbotToggle">
                    <i class="fas fa-comments"></i>
                </button>
                
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <h3>
                            <i class="fas fa-graduation-cap"></i>
                            Mindix Assistant
                            <span class="chatbot-status"></span>
                        </h3>
                        <button class="chatbot-toggle" id="chatbotClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages">
                        <div class="typing-indicator" id="typingIndicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                    
                    <div class="chatbot-input">
                        <input type="text" id="chatbotInput" placeholder="Type your message..." />
                        <button id="chatbotSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const close = document.getElementById('chatbotClose');
        const send = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    closeChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        this.isOpen = false;
        window.classList.remove('active');
        toggle.classList.remove('active');
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage('👋 Hello! Welcome to Mindix Education! I\'m here to help you find the perfect course for your career goals. How can I assist you today?');
            this.showQuickActions();
        }, 500);
    }

    showQuickActions() {
        const quickActions = [
            '📚 Browse Courses',
            '💰 Course Fees',
            '🎯 Career Guidance',
            '📞 Contact Support'
        ];

        const quickActionsHTML = quickActions.map(action => 
            `<button class="quick-action-btn" onclick="chatbot.handleQuickAction('${action}')">${action}</button>`
        ).join('');

        this.addBotMessage(`
            <div class="quick-actions">
                ${quickActionsHTML}
            </div>
        `, false);
    }

    handleQuickAction(action) {
        const input = document.getElementById('chatbotInput');
        
        switch(action) {
            case '📚 Browse Courses':
                input.value = 'Show me all available courses';
                break;
            case '💰 Course Fees':
                input.value = 'What are the course fees?';
                break;
            case '🎯 Career Guidance':
                input.value = 'I need career guidance';
                break;
            case '📞 Contact Support':
                input.value = 'How can I contact support?';
                break;
        }
        
        this.sendMessage();
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        this.showTypingIndicator();
        this.isTyping = true;
        
        // Simulate bot response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateBotResponse(message);
            this.isTyping = false;
        }, 1000 + Math.random() * 1000);
    }

    addUserMessage(message) {
        this.addMessage(message, 'user');
    }

    addBotMessage(message, addToHistory = true) {
        this.addMessage(message, 'bot', addToHistory);
    }

    addMessage(message, sender, addToHistory = true) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        if (addToHistory) {
            this.messages.push({ message, sender, timestamp: new Date() });
        }
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.add('active');
        
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.remove('active');
    }

    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check if user wants to enroll or needs help
        if (message.includes('enroll') || message.includes('admission') || message.includes('join') || message.includes('register')) {
            this.askForCustomerDetails();
            return;
        }
        
        // Course related queries
        if (message.includes('course') || message.includes('program')) {
            if (message.includes('marketing')) {
                this.addBotMessage('🎨 We offer excellent Marketing courses:\n\n• Digital Marketing + AI Tools (6 Weeks) - ₹12,999\n• Video Editing + AI Tools (6 Weeks) - ₹11,999\n• Graphics Designing + AI Tools (6 Weeks) - ₹10,999\n\nAll courses include placement assistance! Would you like details about any specific course?');
            } else if (message.includes('hr') || message.includes('human resource')) {
                this.addBotMessage('👥 Our HR courses are very popular:\n\n• US IT Recruiter + AI Tools (45 Days) - ₹11,999\n• HR Executive + AI Tools (6 Weeks) - ₹9,999\n• HR Recruiter + AI Tools (45 Days) - ₹10,999\n• And 5 more specialized HR courses!\n\nWhich HR role interests you most?');
            } else if (message.includes('it') || message.includes('developer') || message.includes('programming')) {
                this.addBotMessage('💻 Our IT courses will boost your tech career:\n\n• Full Stack + AI Tools (4 Months) - ₹24,999\n• Android Developer + AI Tools (4 Months) - ₹23,999\n• DevOps + AI Tools (4 Months) - ₹24,999\n• Front-End + AI Tools (4 Months) - ₹19,999\n\nAll include hands-on projects and AI tools! Which technology interests you?');
            } else if (message.includes('business')) {
                this.addBotMessage('🚀 Grow your business skills with:\n\n• Entrepreneurship Program (4 Months) - ₹18,999\n• Business Development + AI Tools (6 Weeks) - ₹10,000\n\nPerfect for aspiring entrepreneurs and business professionals!');
            } else {
                this.addBotMessage('📚 We offer courses in 4 categories:\n\n🎨 **Marketing** (3 courses)\n👥 **HR** (8 courses)\n💻 **IT** (10 courses)\n🚀 **Business** (2 courses)\n\nWhich category interests you? I can show you detailed course information!');
            }
        }
        
        // Fee related queries
        else if (message.includes('fee') || message.includes('price') || message.includes('cost') || message.includes('₹')) {
            this.addBotMessage('💰 Our course fees are very affordable:\n\n• **HR Courses**: ₹8,999 - ₹11,999\n• **Marketing Courses**: ₹10,999 - ₹12,999\n• **IT Courses**: ₹14,999 - ₹24,999\n• **Business Courses**: ₹10,000 - ₹18,999\n\nAll courses include:\n✅ Placement assistance\n✅ AI tools training\n✅ Corporate certification\n✅ Interview preparation\n\nEMI options available! Which course would you like to know more about?');
        }
        
        // Career guidance queries
        else if (message.includes('career') || message.includes('guidance') || message.includes('guidance') || message.includes('help')) {
            this.addBotMessage('🎯 I\'d be happy to help with career guidance!\n\n**Popular Career Paths:**\n• **Digital Marketing** - High demand, creative field\n• **HR Recruiter** - Stable corporate career\n• **Full Stack Developer** - Tech industry growth\n• **Business Analyst** - Bridge between tech and business\n\n**Questions to help you decide:**\n1. Are you more creative or analytical?\n2. Do you prefer working with people or technology?\n3. What\'s your current education background?\n\nTell me about yourself and I\'ll recommend the perfect course!');
        }
        
        // Contact/support queries
        else if (message.includes('contact') || message.includes('support') || message.includes('phone') || message.includes('email')) {
            this.addBotMessage('📞 Here\'s how you can reach us:\n\n**📱 Phone**: +91 98765 43210\n**📧 Email**: info@mindixeducation.in\n**📍 Address**: Delhi, India\n\n**🎓 Free Career Counseling**:\nTalk to our expert counselors for 10 minutes - completely free!\n\n• Aman Sharma - Course Guidance\n• Shakshi - Career & Resume Guidance\n• Ritik - Job Search Strategies\n• Swati Shandilya - Career Switch Guidance\n\nWould you like me to connect you with a counselor?');
        }
        
        // Placement related queries
        else if (message.includes('placement') || message.includes('job') || message.includes('career')) {
            this.addBotMessage('🎯 Our placement record is excellent - **95% placement rate**!\n\n**Placement Support Includes:**\n✅ Resume building workshops\n✅ Mock interview sessions\n✅ LinkedIn profile optimization\n✅ Job search strategies\n✅ 100+ partnered companies\n\n**Top Companies Hiring Our Students:**\n• IT MNCs\n• Leading Startups\n• Corporate Houses\n• Digital Agencies\n\n500+ students placed this year! Would you like placement details for a specific course?');
        }
        
        // Duration related queries
        else if (message.includes('duration') || message.includes('time') || message.includes('long') || message.includes('weeks') || message.includes('months')) {
            this.addBotMessage('⏰ Course durations vary by category:\n\n**📅 Short Courses (6 Weeks):**\n• Marketing courses\n• Business Development\n• HR Executive\n\n**📅 Medium Courses (45 Days):**\n• Most HR courses\n• Business Analyst\n\n**📅 Long Courses (3-4 Months):**\n• All IT courses\n• Entrepreneurship Program\n\n**Flexible batch timings** available for working professionals! Which duration works best for you?');
        }
        
        // Greeting messages
        else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            this.addBotMessage('👋 Hello! Great to see you here!\n\nI can help you with:\n📚 Finding the right course\n💰 Understanding fees and payment\n🎯 Career guidance\n📞 Connecting with counselors\n📋 Placement information\n\nWhat would you like to know about?');
        }
        
        // Thank you messages
        else if (message.includes('thank') || message.includes('thanks')) {
            this.addBotMessage('😊 You\'re welcome! I\'m here to help you succeed in your career journey.\n\n**Ready to take the next step?**\nIf you\'d like to enroll or speak with a counselor, I can collect your details and our team will contact you immediately!\n\nJust say "I want to enroll" or "Connect me with counselor"');
        }
        
        // Ready to enroll messages
        else if (message.includes('enroll') || message.includes('join') || message.includes('admission') || message.includes('ready') || message.includes('interested')) {
            this.askForCustomerDetails();
        }
        
        // Default response
        else {
            this.addBotMessage(`🤔 I understand you're asking about "${userMessage}". Let me help you better!\n\n**I can assist with:**\n📚 Course information and recommendations\n💰 Fee details and payment options\n🎯 Career guidance and counseling\n📞 Contact information and support\n📋 Placement assistance details\n\nTry asking about:\n• "Show me marketing courses"\n• "What are the fees?"\n• "I need career guidance"\n• "How to contact counselors"\n• "I want to enroll"\n\nWhat specific information would you like?`);
        }
    }

    askForCustomerDetails() {
        this.addBotMessage('🎉 Great choice! To help you with enrollment and connect you with our team, I need some details:');
        
        setTimeout(() => {
            this.addBotMessage('📝 **Please provide:**\n\n1️⃣ **Full Name**\n2️⃣ **Phone Number**\n3️⃣ **Email Address**\n4️⃣ **Course Interested**\n\nExample: "My name is Rahul Kumar, phone is 9876543210, email is rahul@email.com, and I\'m interested in Digital Marketing course"\n\n📞 Our counselor will call you within 30 minutes!');
        }, 1000);
        
        setTimeout(() => {
            this.addBotMessage('⚡ **Quick Enrollment Tip:**\nJust type your details in this format:\n\n**Name: [Your Name]**\n**Phone: [Your Number]**\n**Email: [Your Email]**\n**Course: [Course Name]**\n\nExample:\nName: Priya Sharma\nPhone: 9876543210\nEmail: priya@email.com\nCourse: HR Executive\n\n🚀 Our team will contact you immediately!');
        }, 2500);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new MindixChatbot();
});
