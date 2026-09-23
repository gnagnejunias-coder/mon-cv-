document.addEventListener('DOMContentLoaded', () => {
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

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
            alert('Merci ! Votre message a bien été envoyé.');
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
