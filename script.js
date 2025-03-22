// DOM Elements
const cursor = document.querySelector('.cursor');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.progress');

// Custom cursor
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    }
});

document.addEventListener('click', () => {
    if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    }
});

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    // Header background on scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Reveal elements on scroll
    revealElements();
});

// Mobile nav toggle
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile nav when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 400);
            }
        });
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Form validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulating form submission
        showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    // Check if a message already exists
    let messageElement = document.querySelector('.form-message');
    
    // If not, create one
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
    }
    
    // Set the message and type
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Reveal elements on scroll
function revealElements() {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Initialize skill bars animation
function initSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        
        // Reset width to 0
        bar.style.width = '0';
        
        // Set timeout to animate
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Apply syntax highlighting to code
function applySyntaxHighlighting() {
    const codeElement = document.querySelector('.code-container code');
    
    if (codeElement) {
        let content = codeElement.innerHTML;
        
        // Highlight keywords
        const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'true', 'false'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            content = content.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        content = content.replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
        content = content.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
        
        // Highlight comments
        content = content.replace(/\/\/(.*)/g, '<span class="comment">\/\/$1</span>');
        
        codeElement.innerHTML = content;
    }
}

// Animate code typing effect in hero section
function typeCodeEffect() {
    const codeElement = document.querySelector('.code-container code');
    
    if (codeElement) {
        const text = codeElement.innerHTML;
        codeElement.innerHTML = '';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                codeElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, 10); // Speed up typing animation
            } else {
                // Apply syntax highlighting after typing is complete
                applySyntaxHighlighting();
            }
        };
        
        setTimeout(() => {
            typeChar();
        }, 800);
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add reveal class to elements
    sections.forEach(section => {
        section.querySelectorAll('h2, h3, p, .btn, .skill-category, .project-card').forEach(el => {
            el.classList.add('reveal');
        });
    });
    
    // Reveal header elements immediately
    document.querySelectorAll('.hero h1, .hero h2, .hero p, .hero .cta-buttons, .hero .social-icons').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Animate code typing
    typeCodeEffect();
    
    // Reveal elements on page load
    setTimeout(() => {
        revealElements();
    }, 100);
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Handle GitHub profile image loading
document.addEventListener('DOMContentLoaded', function() {
    const hexagon = document.querySelector('.hexagon');
    
    if (hexagon) {
        // Add loading state
        hexagon.classList.add('loading');
        
        // Create new image to test loading
        const img = new Image();
        img.src = 'https://github.com/MohitJanotiya.png';
        
        img.onload = function() {
            // Remove loading state when image is loaded
            hexagon.classList.remove('loading');
        };
        
        img.onerror = function() {
            // If image fails to load, add error class and use backup image
            hexagon.classList.remove('loading');
            hexagon.classList.add('error');
            hexagon.style.backgroundImage = "url('https://via.placeholder.com/500x500/111/333')";
        };
    }
}); 