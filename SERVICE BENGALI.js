// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Language Switcher Functionality
const languageBtn = document.getElementById('language-btn');
const languageOptions = document.getElementById('language-options');
const currentLanguage = document.getElementById('current-language');
const languageOptionsList = document.querySelectorAll('.language-option');

// Toggle language options
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageOptions.classList.toggle('active');
});

// Select language
languageOptionsList.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        
        // Update active language
        languageOptionsList.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update current language display
        currentLanguage.textContent = option.textContent.trim();
        
        // Close language options
        languageOptions.classList.remove('active');
        
        // Change the page language
        changeLanguage(selectedLang);
    });
});

// Close language options when clicking outside
document.addEventListener('click', () => {
    languageOptions.classList.remove('active');
});

// Function to change language
function changeLanguage(lang) {
    const langNames = {
        'bn': 'বাংলা',
        'en': 'English',
        'hi': 'हिन्दी'
    };
    
    // Show loading message
    alert(`ভাষা পরিবর্তন করা হয়েছে ${langNames[lang]} এ। পৃষ্ঠাটি রিলোড হচ্ছে...`);
    
    // In a real implementation, you would:
    // 1. Redirect to the appropriate language version
    // 2. Or use AJAX to load translated content
    if (lang === 'en') {
        window.location.href = 'index-en.html';
    } else if (lang === 'hi') {
        window.location.href = 'index-hi.html';
    }
    // For Bengali, we're already on the page
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonials.length) {
        nextIndex = 0;
    }
    showTestimonial(nextIndex);
}

function prevTestimonial() {
    let prevIndex = currentTestimonial - 1;
    if (prevIndex < 0) {
        prevIndex = testimonials.length - 1;
    }
    showTestimonial(prevIndex);
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Service Card Animation on Scroll
const serviceCards = document.querySelectorAll('.service-card');

function checkScroll() {
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize service cards with hidden state
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// CTA Button Interactions
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('আপনার আগ্রহের জন্য ধন্যবাদ! আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।');
    });
});

// Service Button Interactions
const serviceButtons = document.querySelectorAll('.service-btn');
serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const serviceCard = e.target.closest('.service-card');
        const serviceTitle = serviceCard.querySelector('h3').textContent;
        
        alert(`আপনি নির্বাচন করেছেন: ${serviceTitle}। আরও বিস্তারিত তথ্য এখানে প্রদর্শিত হবে।`);
    });
});