// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const navItems = document.querySelectorAll('.nav-link');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    initTheme();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize scroll spy for navigation
    initScrollSpy();
});

// Theme Toggle Functionality
function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
    
    // Set up theme toggle button
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Toggle between menu and close icons
    const icon = menuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Back to Top Button
function initScrollAnimations() {
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Update navbar style on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Scroll to top when the button is clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Spy for Navigation
function initScrollSpy() {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll('section[id]');
    
    // Add an event listener for scroll
    window.addEventListener('scroll', () => {
        // Get current scroll position
        const scrollY = window.scrollY;
        
        // Loop through sections to get height, top and ID values
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            // If our current scroll position enters the space where current section on screen is
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove 'active' class from all navigation links
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add 'active' class to corresponding navigation link
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            }
        });
    });
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real implementation, you would send the data to a server here
        // For this demo, just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset the form
        contactForm.reset();
    });
}

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillSection = document.querySelector('.skills-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (!skillSection) return;
    
    const sectionPosition = skillSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        skillBars.forEach(bar => {
            bar.style.width = bar.style.width || '0%';
            const targetWidth = bar.getAttribute('style').split(':')[1].trim();
            
            bar.style.transition = 'width 1s ease-in-out';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 200);
        });
    }
};

// Call the animation on scroll
window.addEventListener('scroll', animateSkillBars);

// Create a typing effect for the hero section
const createTypingEffect = () => {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start the typing effect after a small delay
    setTimeout(typeWriter, 500);
};

// Call typing effect when page loads
window.addEventListener('load', createTypingEffect);

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'assets/particles-config.json');
    }
});

// Update scroll progress bar
window.addEventListener('scroll', () => {
    if (scrollProgressBar) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgressBar.style.width = `${progress}%`;
    }
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', () => {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (!testimonialTrack) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // 100%
    
    // Initialize slider width
    testimonialTrack.style.width = `${testimonialSlides.length * 100}%`;
    testimonialSlides.forEach(slide => {
        slide.style.width = `${100 / testimonialSlides.length}%`;
    });
    
    // Function to move to a specific slide
    const moveToSlide = (index) => {
        if (index < 0) index = testimonialSlides.length - 1;
        if (index >= testimonialSlides.length) index = 0;
        
        currentIndex = index;
        testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth / testimonialSlides.length}%)`;
        
        // Update active classes
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[currentIndex].classList.add('active');
        testimonialDots[currentIndex].classList.add('active');
    };
    
    // Event listeners for dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => moveToSlide(index));
    });
    
    // Event listeners for arrows
    if (prevButton) {
        prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
    }
    
    // Auto slide every 5 seconds
    setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000);
});

// Animate Tech Icons
document.addEventListener('DOMContentLoaded', () => {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.classList.add('animate');
    });
});

// Skills Filter
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (filterButtons.length === 0 || skillItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter skill items
            skillItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// Loading Screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loading-animation"></div>';
document.body.appendChild(loadingScreen);

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
});

// Enhanced Animate on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .card, .skill-item, .project-card');
    
    const checkIfInView = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    };
    
    // Check on initial load
    checkIfInView();
    
    // Check when scrolling
    window.addEventListener('scroll', checkIfInView);
});
