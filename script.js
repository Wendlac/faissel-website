document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            const isOpen = nav.classList.contains('is-open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animateElements = document.querySelectorAll('.hero__title, .hero__text, .feature__image-wrapper, .feature__content, .contact__container');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // Initial state
        el.style.transform = 'translateY(20px)'; // Initial state
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add fade-in class style dynamically if not present (or rely on CSS class)
    // In this case, we are manually setting styles in JS for the initial state 
    // and letting the class 'fade-in' (defined in CSS) take over, 
    // OR we can just toggle the class and let CSS handle everything.
    // Let's refine the observer to just toggle the class and let CSS handle the transition.
    // Re-setting initial styles here to ensure they are hidden before JS loads if CSS didn't hide them.
    // But better to rely on CSS class 'fade-in' which we defined in style.css.

    // Actually, let's stick to the CSS class approach for cleaner separation.
    // The CSS 'fade-in' animation keyframes handle the from/to.
    // We just need to ensure elements are hidden initially if we want no FOUC, 
    // but for simplicity, we'll just add the class.

    // Wait, the CSS keyframes 'fadeIn' starts from opacity 0. 
    // So we just need to add the class.
    // However, elements are visible by default. 
    // So we should add a utility class or inline style to hide them initially 
    // ONLY if JS is enabled.

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.animationFillMode = 'forwards'; // Ensure it stays visible after animation
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const desc = card.querySelector('.product-desc').textContent.toLowerCase();

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
});
