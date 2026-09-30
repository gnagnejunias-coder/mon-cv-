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

    // Initialisation EmailJS — REMPLACER par votre clé publique
    emailjs.init("YOUR_PUBLIC_KEY");

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // REMPLACER YOUR_SERVICE_ID et YOUR_TEMPLATE_ID par vos identifiants EmailJS
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                from_name: document.getElementById('companyName').value,
                mission: document.getElementById('mission').value,
                budget: document.getElementById('budget').value,
            }).then(function() {
                alert('✅ Merci ! Votre message a bien été envoyé.');
                modal.classList.remove("show");
                form.reset();
            }, function(error) {
                alert('❌ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement.');
                console.error('EmailJS Error:', error);
            }).finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
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
