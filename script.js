// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .section-header, .about-text, .about-image, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Contact Form Handler =====
// Form submissions are handled by FormSubmit.co
// Emails are sent to dfchitengu@critical-path-global-logistics-zimbabwe.com

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Parallax Effect for Hero (Optional) =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            hero.style.setProperty('--scroll', scrolled * 0.5 + 'px');
        }
    }
});

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial nav highlight
    highlightNavLink();

    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');

    // ===== Image Slider =====
    initSlider();
});

function initSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.slider-dots');

    if (!prevBtn || !nextBtn || slides.length === 0) {
        console.log('Slider elements not found');
        return;
    }

    let current = 0;
    let autoPlay = null;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('type', 'button');
        dot.addEventListener('click', function() {
            goTo(i);
            resetAuto();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide() {
        goTo(current + 1);
    }

    function prevSlide() {
        goTo(current - 1);
    }

    function startAuto() {
        if (autoPlay) clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, 4000);
    }

    function stopAuto() {
        if (autoPlay) {
            clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    function resetAuto() {
        stopAuto();
        startAuto();
    }

    // Button click handlers
    prevBtn.setAttribute('type', 'button');
    nextBtn.setAttribute('type', 'button');

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
        resetAuto();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
        resetAuto();
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // Start autoplay
    startAuto();
}
