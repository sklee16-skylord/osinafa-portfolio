// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real application, you would send the form data to a server here
        // For now, we'll just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        contactForm.reset();
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .info-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .info-item');

    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
// Track resume downloads
const downloadBtn = document.querySelector('a[download]');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Resume download initiated');
        // For Google Analytics: gtag('event', 'download', {'event_category': 'Resume'});
    });
}
// GitHub repository setup guide
document.addEventListener('DOMContentLoaded', function() {
    const repoLinks = document.querySelectorAll('.project-links a[href*="github.com"]');

    repoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const repoName = this.href.split('/').pop();

            // Check if repository exists (simple client-side check)
            fetch(this.href)
                .then(response => {
                    if (!response.ok) {
                        e.preventDefault();
                        const createRepo = confirm(`The repository "${repoName}" doesn't exist yet. Would you like to create it on GitHub?`);

                        if (createRepo) {
                            // Redirect to GitHub repository creation
                            window.open('https://github.com/new', '_blank');

                            // Provide guidance
                            alert(`Please create a repository named "${repoName}".\n\nAfter creating it, your GitHub button will work automatically.`);
                        }
                    }
                })
                .catch(() => {
                    // If fetch fails, assume repository doesn't exist
                    e.preventDefault();
                    const createRepo = confirm(`The repository "${repoName}" doesn't exist yet. Would you like to create it on GitHub?`);

                    if (createRepo) {
                        window.open('https://github.com/new', '_blank');
                        alert(`Please create a repository named "${repoName}".\n\nAfter creating it, your GitHub button will work automatically.`);
                    }
                });
        });
    });
});