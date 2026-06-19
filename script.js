document.addEventListener('DOMContentLoaded', () => {

    // === Header scroll effect ===
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 20);
    });

    // === Mobile Menu Toggle ===
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            mobileToggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // === Scroll Entry Animations ===
    const animationMap = [
        { selector: '.hero__title',           delay: 0   },
        { selector: '.hero__text',            delay: 120 },
        { selector: '.hero__actions',         delay: 240 },
        { selector: '.badge',                 delay: 0   },
        { selector: '.feature__title',        delay: 100 },
        { selector: '.feature__content > p',  delay: 180 },
        { selector: '.feature__list',         delay: 180 },
        { selector: '.contact__title',        delay: 100 },
        { selector: '.contact__info',         delay: 180 },
        { selector: '.contact__form',         delay: 240 },
        { selector: '.feature__image-wrapper',delay: 60, scale: true },
        { selector: '.contact__image-wrapper',delay: 60, scale: true },
    ];

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate--visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    animationMap.forEach(({ selector, delay, scale }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate');
            if (scale) el.classList.add('animate--scale');
            el.style.transitionDelay = `${delay}ms`;
            scrollObserver.observe(el);
        });
    });

    // === Counter Animation ===
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const text = el.textContent.trim();
            const target = parseInt(text);
            const suffix = text.replace(/[0-9]/g, '');
            const duration = 1600;
            const start = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.stat__number').forEach(el => counterObserver.observe(el));

    // === Active nav link on scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('nav__link--active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // === Boutons devis → WhatsApp ===
    document.querySelectorAll('.product-card').forEach(card => {
        const btn = card.querySelector('.btn');
        const title = card.querySelector('.product-title');
        if (!btn || !title) return;

        const message = `Bonjour, je souhaite demander un devis pour le produit suivant : *${title.textContent.trim()}*. Pouvez-vous me donner plus d'informations ?`;
        btn.href = `https://wa.me/22676441084?text=${encodeURIComponent(message)}`;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
    });

    // === Search Functionality ===
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const desc = card.querySelector('.product-desc').textContent.toLowerCase();
                card.classList.toggle('hidden', !title.includes(term) && !desc.includes(term));
            });
        });
    }

});
