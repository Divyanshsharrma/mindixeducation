// Steps Section JavaScript
class StepsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.cards = [];
        this.wrapper = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.init();
    }

    init() {
        this.wrapper = document.querySelector('.steps-wrapper');
        this.cards = document.querySelectorAll('.step-card');
        this.prevBtn = document.querySelector('.step-nav-btn.prev');
        this.nextBtn = document.querySelector('.step-nav-btn.next');

        if (this.wrapper && this.cards.length > 0) {
            this.bindEvents();
            this.updateButtons();
            this.createDots();
        }
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Touch events for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            this.wrapper.style.cursor = 'grabbing';
        });

        this.wrapper.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
                isDragging = false;
            }
        });

        this.wrapper.addEventListener('mouseup', () => {
            isDragging = false;
            this.wrapper.style.cursor = 'grab';
        });

        this.wrapper.addEventListener('mouseleave', () => {
            isDragging = false;
            this.wrapper.style.cursor = 'grab';
        });

        // Touch events for mobile
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.wrapper.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
                startX = currentX;
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Auto-scroll on hover
        this.cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.scrollToCard(index);
            });
        });
    }

    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'steps-dots';
        
        for (let i = 0; i < this.cards.length; i++) {
            const dot = document.createElement('button');
            dot.className = 'step-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                this.currentIndex = i;
                this.scrollToCard(i);
                this.updateButtons();
                this.updateDots();
            });
            dotsContainer.appendChild(dot);
        }

        this.wrapper.parentElement.appendChild(dotsContainer);
    }

    updateDots() {
        const dots = document.querySelectorAll('.step-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scrollToCard(this.currentIndex);
            this.updateButtons();
            this.updateDots();
        }
    }

    next() {
        const maxIndex = Math.max(0, this.cards.length - this.getVisibleCards());
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.scrollToCard(this.currentIndex);
            this.updateButtons();
            this.updateDots();
        }
    }

    scrollToCard(index) {
        const card = this.cards[index];
        if (card) {
            const cardLeft = card.offsetLeft;
            const wrapperWidth = this.wrapper.offsetWidth;
            const scrollLeft = cardLeft - (wrapperWidth / 2) + (card.offsetWidth / 2);
            
            this.wrapper.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }

    getVisibleCards() {
        const wrapperWidth = this.wrapper.offsetWidth;
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 24; // 1.5rem in pixels
        return Math.floor((wrapperWidth + gap) / (cardWidth + gap));
    }

    updateButtons() {
        const maxIndex = Math.max(0, this.cards.length - this.getVisibleCards());
        
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }

    // Auto-scroll functionality (optional)
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            const maxIndex = Math.max(0, this.cards.length - this.getVisibleCards());
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.scrollToCard(this.currentIndex);
            this.updateButtons();
            this.updateDots();
        }, 5000);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
}

// Initialize steps carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.stepsCarousel = new StepsCarousel();
    
    // Optional: Start auto-scroll and stop on user interaction
    // window.stepsCarousel.startAutoScroll();
    
    // Stop auto-scroll on user interaction
    const wrapper = document.querySelector('.steps-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => {
            // window.stepsCarousel.stopAutoScroll();
        });
        
        wrapper.addEventListener('click', () => {
            // window.stepsCarousel.stopAutoScroll();
        });
    }
});
