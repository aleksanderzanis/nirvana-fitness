// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initial Load Hero Animations
const tl = gsap.timeline();

tl.from(".hero-content h1", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.15
})
.from(".hero-content p", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.8")
.from(".hero-content .magnetic-wrap", {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.5)"
}, "-=0.5")
.from(".hero-image", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
}, "-=1.5");

// 2. Subtle Parallax for Ambient Orbs
gsap.to(".orb-1", {
    y: 300,
    x: 100,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});

gsap.to(".orb-2", {
    y: -400,
    x: -200,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

// 3. Scroll Reveal for Gallery Section
gsap.from(".gallery-header", {
    scrollTrigger: {
        trigger: "#gallery",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".gallery-item", {
    scrollTrigger: {
        trigger: ".masonry-grid",
        start: "top 75%",
    },
    y: 60,
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

// 4. Scroll Reveal for Programs Section
gsap.from(".programs-header", {
    scrollTrigger: {
        trigger: "#programs",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});



// 5. Scroll Reveal for Contact Section
gsap.from(".contact-info > *", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
    },
    x: -40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

gsap.from(".contact-map", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
    },
    x: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

// 6. Navbar Scroll Effects (Sticky Glassmorphism & Active Links)
const navbar = document.getElementById('navbar');
const navContainer = document.getElementById('nav-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Scrolled state
        navbar.classList.add('py-2');
        navbar.classList.remove('top-4');
        navbar.classList.add('top-0');
        
        navContainer.classList.add('bg-obsidian/80');
        navContainer.classList.remove('py-4');
        navContainer.classList.add('py-3');
    } else {
        // Top state
        navbar.classList.remove('py-2');
        navbar.classList.add('top-4');
        navbar.classList.remove('top-0');
        
        navContainer.classList.remove('bg-obsidian/80');
        navContainer.classList.add('py-4');
        navContainer.classList.remove('py-3');
    }
});

// Intersection Observer for highlighting active nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// 7. Magnetic Button Effect (CTA)
const magneticWrap = document.querySelector('.magnetic-wrap');
const magneticBtn = magneticWrap.querySelector('.btn-neon');

magneticWrap.addEventListener('mousemove', (e) => {
    const rect = magneticWrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(magneticBtn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: "power2.out"
    });
});

magneticWrap.addEventListener('mouseleave', () => {
    gsap.to(magneticBtn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
    });
});


// 8. Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    const isClosed = mobileMenu.classList.contains('opacity-0');
    if (isClosed) {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
    }
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
    });
});
