document.addEventListener('DOMContentLoaded', () => {

    // --- LOADER ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
    });

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- SMOOTH SCROLLING ---
    const navLinks = document.querySelectorAll('.nav-link, .scroll-down');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = navbar.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }
        });
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

        // --- GALLERY PAGE LOGIC ---
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Filter logic
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });

        // Lightbox logic
        const lightbox = document.getElementById('lightbox-overlay');
        const lightboxImg = document.getElementById('lightbox-image');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');
        let currentImageIndex;

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                lightbox.classList.remove('hidden');
                lightboxImg.src = item.href;
                currentImageIndex = index;
            });
        });

        const changeImage = (direction) => {
            currentImageIndex += direction;
            const numImages = galleryItems.length;
            if (currentImageIndex >= numImages) currentImageIndex = 0;
            if (currentImageIndex < 0) currentImageIndex = numImages - 1;

            // Skip over hidden images
            while (galleryItems[currentImageIndex].classList.contains('hidden')) {
                currentImageIndex += direction;
                if (currentImageIndex >= numImages) currentImageIndex = 0;
                if (currentImageIndex < 0) currentImageIndex = numImages - 1;
            }

            lightboxImg.src = galleryItems[currentImageIndex].href;
        };

        if (lightbox) {
            lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
            lightboxPrev.addEventListener('click', () => changeImage(-1));
            lightboxNext.addEventListener('click', () => changeImage(1));
        }
    }

        // --- MOBILE MENU ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    // We select ONLY the links inside the mobile menu for this job.
    const linksInMenu = document.querySelectorAll(".nav-menu .nav-link"); 

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", toggleMenu);

        // Close menu when a link is clicked
        linksInMenu.forEach(link => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("active")) {
                    // We add a small delay to allow the user to see the link click
                    setTimeout(toggleMenu, 150);
                }
            });
        });
    }

});