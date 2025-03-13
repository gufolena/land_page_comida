document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    mobileBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileBtn.querySelector('i').classList.toggle('fa-x');
    });

    function handleScroll() {
        const scrollPosition = window.scrollY - header.offsetHeight;
        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '5px 1px 5px rgba(0, 0, 0, 0.1)';
        }

        sections.forEach(function(section, i) {
            const sectionTop = section.offsetTop - 96;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
            }
        });

        navItems.forEach(function(navItem) {
            navItem.classList.remove('active');
        });

        navItems[activeSectionIndex].classList.add('active');
    }

    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    window.addEventListener('scroll', debounce(handleScroll, 100));

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });



    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("Service Worker registrado com sucesso!"))
            .catch(err => console.log("Erro ao registrar Service Worker:", err));
        });
      }
});