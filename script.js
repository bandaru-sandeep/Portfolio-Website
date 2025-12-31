// Project Data
const projects = [
    {
        title: "AI Personal Finance Advisor",
        description: "MERN stack application for tracking finances with transaction analysis, budget suggestions, and visualized spending patterns.",
        tags: ["MERN Stack", "Data Visualization", "Finance"],
        category: "web",
        link: "https://github.com/bandaru-sandeep/Reaidy.ioMERN"
    },
    {
        title: "Loan Approval Prediction API",
        description: "Production-ready ML serving pipeline using FastAPI and Docker. Deploys Random Forest model as a RESTful API.",
        tags: ["FastAPI", "Docker", "MLOps"],
        category: "ml",
        link: "https://github.com/bandaru-sandeep/Reaidy.io.Ml"
    },
    {
        title: "UAV-based Stampede Detection",
        description: "UROP Project. A multi-mode, real-time proactive stampede detection system using Deep Learning. Integrates UAV visual screening with perceptual hashing, sensor fusion, and entropy-based validation to identify crowd anomalies and prevent disasters.",
        tags: ["Computer Vision", "OpenCV", "Research"],
        category: "ml",
        link: "project-uav.html"
    },
    {
        title: "Online Quiz System",
        description: "Responsive quiz platform supporting concurrent users with secure session management and dynamic question randomization.",
        tags: ["PHP", "JavaScript", "MySQL"],
        category: "web",
        link: "https://github.com/bandaru-sandeep/Online-Quiz-Management-System"
    },
    {
        title: "Bank Management System",
        description: "C++ application using OOP principles for secure account management, transaction processing, and user authentication.",
        tags: ["C++", "OOP", "Console App"],
        category: "other",
        link: "https://github.com/bandaru-sandeep/Bank-Management-System"
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navbar = document.querySelector('.navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimation();
    renderProjects('all');
    setupSmoothScroll();
});

// Render Projects
function renderProjects(filter) {
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        if (filter === 'all' || project.category === filter) {
            const hasLink = project.link && project.link.length > 0;
            const card = document.createElement(hasLink ? 'a' : 'div');
            card.className = 'project-card fade-in-up';

            if (hasLink) {
                card.href = project.link;
                card.target = "_blank";
                card.style.textDecoration = 'none';
                card.style.color = 'inherit';
                card.style.display = 'block';
            }

            const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tags">${tagsHtml}</div>
                    <p class="project-desc">${project.description}</p>
                </div>
            `;

            projectsGrid.appendChild(card);
        }
    });

    // Re-trigger animation observer for new elements
    observeElements();
}


// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        renderProjects(btn.getAttribute('data-filter'));
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animation Observer
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    document.querySelectorAll('.timeline-item').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    document.querySelectorAll('.skill-category').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Global observer function reference
    window.observeElements = () => {
        document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
    };

    window.observeElements(); // Initial call
}

// Smooth Scroll for setup
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;

    btn.innerText = 'Sending...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        btn.innerText = 'Message Sent!';
        btn.style.backgroundColor = '#10b981'; // Green success
        e.target.reset();

        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
        }, 3000);
    }, 1500);
});
