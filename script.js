document.addEventListener('DOMContentLoaded', () => {
    // ===== Theme Toggle (Dark / Light Mode) =====
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Appliquer le thème sauvegardé
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target with an offset for the sticky header
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for fade-in animations on scroll
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Modal Logic
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("openContactModal");
    const span = document.querySelector(".close-modal");
    const form = document.getElementById("contactForm");

    if (btn && modal && span) {
        btn.onclick = function() {
            modal.classList.add("show");
        }

        span.onclick = function() {
            modal.classList.remove("show");
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.classList.remove("show");
            }
        }
    }

    // ===== Lightbox Photo Modal Logic =====
    const photoModal = document.getElementById("photoLightboxModal");
    const openPhotoBtn = document.getElementById("openPhotoModal");
    const closePhotoBtn = document.getElementById("closePhotoModal");
    const photoBackdrop = document.getElementById("photoLightboxBackdrop");

    function openPhoto() {
        if (photoModal) {
            photoModal.classList.add("show");
            document.body.style.overflow = "hidden"; // Empêche le défilement en arrière-plan
        }
    }

    function closePhoto() {
        if (photoModal) {
            photoModal.classList.remove("show");
            document.body.style.overflow = "";
        }
    }

    if (openPhotoBtn) {
        openPhotoBtn.addEventListener("click", openPhoto);
        openPhotoBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPhoto();
            }
        });
    }

    if (closePhotoBtn) {
        closePhotoBtn.addEventListener("click", closePhoto);
    }

    if (photoBackdrop) {
        photoBackdrop.addEventListener("click", closePhoto);
    }

    // Fermeture avec la touche Échap (Escape)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closePhoto();
            if (modal) modal.classList.remove("show");
        }
    });

    // ===== Formulaire de contact -> WhatsApp Direct =====
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const company = document.getElementById('companyName').value.trim();
            const mission = document.getElementById('mission').value.trim();
            const budget = document.getElementById('budget').value.trim();

            let message = `Bonjour Ange Junias,\n\n`;
            message += `Je vous contacte depuis votre site web pour un projet :\n\n`;
            message += `👤 *Nom / Entreprise :* ${company}\n`;
            message += `📋 *Mission / Projet :* ${mission}\n`;
            if (budget) {
                message += `💰 *Budget estimé :* ${budget}\n`;
            }

            const phoneNumber = "2250500968284";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Ouvrir WhatsApp
            window.open(whatsappUrl, '_blank');

            // Fermer la modal et réinitialiser
            modal.classList.remove("show");
            form.reset();
        });
    }

    // Back to top button logic
    const backToTopBtn = document.getElementById("backToTop");
    
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
