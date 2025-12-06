// Civil Engineer Portfolio - JavaScript

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const projectViewLinks = document.querySelectorAll('.project-view');
const closeModalBtn = document.querySelector('.close-button');
const modalCloseBtn = document.querySelector('.modal-close-button');
const modalOverlay = document.getElementById('projectModal');
const modalContactBtn = document.querySelector('.modal-contact-button');
const currentYearSpan = document.getElementById('currentYear');

// Project Data for Modal
const projectsData = {
    'commercial-project-1': {
        name: 'Skyline Tower',
        description: '45-story sustainable office building with LEED Platinum certification. This project involved innovative structural design to withstand high wind loads and seismic activity while maintaining energy efficiency.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        category: 'Commercial',
        year: '2023',
        role: 'Lead Structural Engineer',
        features: ['LEED Platinum Certified', '45 Stories', 'Wind-resistant Design', 'Energy Efficient']
    },
    'infrastructure-project-1': {
        name: 'Green Valley Bridge',
        description: '2.5km suspension bridge with advanced seismic protection systems. Designed to withstand earthquakes up to 8.0 magnitude while maintaining structural integrity.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        category: 'Infrastructure',
        year: '2022',
        role: 'Project Manager',
        features: ['Seismic Protection', '2.5km Span', 'Advanced Materials', 'Safety Certified']
    },
    'residential-project-1': {
        name: 'Urban Residence Complex',
        description: 'Modern residential complex with sustainable design features including solar panels, rainwater harvesting, and green roofs for urban sustainability.',
        image: 'https://images.unsplash.com/photo-1600585154340-043788447eb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        category: 'Residential',
        year: '2023',
        role: 'Lead Designer',
        features: ['Solar Integration', 'Rainwater Harvesting', 'Green Roofs', 'Sustainable Materials']
    },
    'commercial-project-2': {
        name: 'Metro Business Center',
        description: 'Mixed-use commercial complex with smart building technology, featuring automated systems for energy management and security.',
        image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        category: 'Commercial',
        year: '2022',
        role: 'Senior Engineer',
        features: ['Smart Building Tech', 'Mixed-use Design', 'Automated Systems', 'Modern Architecture']
    }
};

// Initialize the Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize contact form
    if (contactForm) {
        initContactForm();
    }
    
    // Initialize project modal
    initProjectModal();
    
    // Add active class to nav link based on scroll position
    initActiveNavOnScroll();
    
    // Add hover effects to project cards
    initProjectCardHover();
});

// Mobile Menu Functionality
function initMobileMenu() {
    if (!menuToggle || !navList) return;
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Update active state
            updateActiveNavLink(this);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-list') && !event.target.closest('.menu-toggle')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Project Filtering Functionality
function initProjectFiltering() {
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            
            // Add fade-in animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (validateForm(formData)) {
            // In a real application, you would send this data to a server
            // For now, we'll simulate a successful submission
            
            // Show success message
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // You could also send the data to an email service or backend here
            console.log('Form submitted:', formData);
        }
    });
}

function validateForm(formData) {
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('Please fill in all fields.', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

function showMessage(text, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = text;
    
    // Add styles
    messageElement.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
        text-align: center;
        font-weight: 500;
        animation: fadeIn 0.3s ease;
    `;
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.border = '1px solid #c3e6cb';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.border = '1px solid #f5c6cb';
    }
    
    // Insert after the form
    contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.transition = 'opacity 0.5s ease';
            messageElement.style.opacity = '0';
            
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, 500);
        }
    }, 5000);
}

// Project Modal Functionality
function initProjectModal() {
    // Open modal when clicking project view button
    projectViewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project card
            const projectCard = this.closest('.project-card');
            const category = projectCard.getAttribute('data-category');
            const projectName = projectCard.querySelector('h3').textContent;
            
            // Find project data
            const projectKey = Object.keys(projectsData).find(key => 
                projectsData[key].name === projectName
            );
            
            if (projectKey) {
                openProjectModal(projectsData[projectKey]);
            } else {
                // Fallback: create basic project data
                const fallbackProject = {
                    name: projectName,
                    description: projectCard.querySelector('p').textContent,
                    image: this.getAttribute('href'),
                    category: projectCard.querySelector('.project-category').textContent,
                    year: projectCard.querySelector('.project-year').textContent,
                    role: 'Lead Engineer'
                };
                openProjectModal(fallbackProject);
            }
        });
    });
    
    // Open modal when clicking project link
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project card
            const projectCard = this.closest('.project-card');
            const category = projectCard.getAttribute('data-category');
            const projectName = projectCard.querySelector('h3').textContent;
            
            // Find project data
            const projectKey = Object.keys(projectsData).find(key => 
                projectsData[key].name === projectName
            );
            
            if (projectKey) {
                openProjectModal(projectsData[projectKey]);
            }
        });
    });
    
    // Close modal functions
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProjectModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }
    
    if (modalContactBtn) {
        modalContactBtn.addEventListener('click', function() {
            closeProjectModal();
            // Scroll to contact section
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectData) {
    // Populate modal with project data
    document.getElementById('modalProjectImage').src = projectData.image;
    document.getElementById('modalProjectImage').alt = projectData.name;
    document.getElementById('modalProjectName').textContent = projectData.name;
    document.getElementById('modalProjectDescription').textContent = projectData.description;
    document.getElementById('modalProjectCategory').textContent = projectData.category;
    document.getElementById('modalProjectYear').textContent = projectData.year;
    
    // Show modal
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add animation
    modalOverlay.style.opacity = '0';
    const modalContent = modalOverlay.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        modalOverlay.style.transition = 'opacity 0.3s ease';
        modalOverlay.style.opacity = '1';
        
        modalContent.style.transition = 'transform 0.3s ease';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
}

function closeProjectModal() {
    // Hide modal
    const modalContent = modalOverlay.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    modalOverlay.style.opacity = '0';
    
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
    }, 300);
}

// Active Navigation on Scroll
function initActiveNavOnScroll() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Function to update active nav link
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial update
    updateActiveNav();
}

// Update active nav link
function updateActiveNavLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Project Card Hover Effects
function initProjectCardHover() {
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Responsive Adjustments
function handleResponsive() {
    const width = window.innerWidth;
    
    // Adjust hero section layout for mobile
    const heroSection = document.querySelector('.hero-section .main-content');
    if (heroSection) {
        if (width <= 768) {
            heroSection.style.gridTemplateColumns = '1fr';
            heroSection.style.gap = '40px';
        } else {
            heroSection.style.gridTemplateColumns = '1fr 1fr';
            heroSection.style.gap = '50px';
        }
    }
    
    // Adjust about section layout for mobile
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        if (width <= 768) {
            aboutContent.style.gridTemplateColumns = '1fr';
        } else {
            aboutContent.style.gridTemplateColumns = '1fr 1fr';
        }
    }
    
    // Adjust contact section layout for mobile
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        if (width <= 768) {
            contactContent.style.gridTemplateColumns = '1fr';
        } else {
            contactContent.style.gridTemplateColumns = '1fr 1fr';
        }
    }
    
    // Close mobile menu on desktop
    if (width > 768 && navList) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Reset icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Listen for window resize
window.addEventListener('resize', handleResponsive);

// Initial responsive adjustments
handleResponsive();

// Add CSS animation for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-list {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        
        .nav-list.active {
            transform: translateX(0);
            animation: slideIn 0.3s ease;
        }
        
        .nav-list li {
            width: 100%;
            text-align: center;
        }
        
        .nav-link {
            display: block;
            padding: 15px 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .menu-toggle {
            display: block;
        }
        
        .menu-toggle.active {
            color: var(--secondary-color);
        }
    }
    
    /* Modal responsive styles */
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 20px auto;
            padding: 20px;
        }
        
        .project-details {
            flex-direction: column;
            gap: 15px;
        }
        
        .modal-actions {
            flex-direction: column;
            gap: 10px;
        }
        
        .modal-contact-button,
        .modal-close-button {
            width: 100%;
            text-align: center;
        }
    }
`;
document.head.appendChild(style);