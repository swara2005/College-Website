// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'This field is required';
            }
        } else {
            input.classList.remove('error');
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'none';
            }
        }
    });

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
            const errorMessage = emailInput.parentElement.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Please enter a valid email address';
            }
        }
    }

    // Password validation
    const passwordInput = form.querySelector('input[type="password"]');
    if (passwordInput && passwordInput.value) {
        if (passwordInput.value.length < 8) {
            isValid = false;
            passwordInput.classList.add('error');
            const errorMessage = passwordInput.parentElement.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Password must be at least 8 characters long';
            }
        }
    }

    return isValid;
}

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form.id)) {
                // Show success message
                const successMessage = form.querySelector('.success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // For login form, redirect to home page after 2 seconds
                    if (form.id === 'loginForm') {
                        // Show loading spinner on button
                        const btnText = form.querySelector('.btn-text');
                        const btnLoader = form.querySelector('.btn-loader');
                        
                        if (btnText && btnLoader) {
                            btnText.style.display = 'none';
                            btnLoader.style.display = 'inline-block';
                        }
                        
                        // Store login status in localStorage
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userName', document.getElementById('email').value.split('@')[0]);
                        
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 2000);
                    }
                    
                    // For registration form, redirect to login after 2 seconds
                    if (form.id === 'registerForm') {
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 2000);
                    }
                }
                // Reset form
                form.reset();
            }
        });
    });
});

// Password Toggle Visibility
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordField = button.previousElementSibling;
            
            // Toggle password visibility
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                button.classList.remove('fa-eye-slash');
                button.classList.add('fa-eye');
                
                // Focus back on the input for better user experience
                passwordField.focus();
            } else {
                passwordField.type = 'password';
                button.classList.remove('fa-eye');
                button.classList.add('fa-eye-slash');
                
                // Focus back on the input
                passwordField.focus();
            }
        });
        
        // Add keyboard accessibility
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
});

// Form Input Animations
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add focus class when input is focused
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Remove focus class when input loses focus
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has a value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation link
const currentLocation = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentLocation.split('/').pop()) {
        link.classList.add('active');
    }
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.setAttribute('title', 'Scroll to top');
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Form Validation Functions
function validateLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return true;
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Email validation
    if (email && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (password && !validatePassword(password.value)) {
        showError(password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Name validation
    if (name && !validateName(name.value)) {
        showError(name, 'Please enter a valid name (only letters and spaces)');
        isValid = false;
    }
    
    // Email validation
    if (email && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    if (phone && !validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Password validation
    if (password && !validatePassword(password.value)) {
        showError(password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    // Confirm password validation
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    return isValid;
}

// Validation helper functions
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Error handling functions
function showError(input, message) {
    input.classList.add('error');
    const errorElement = input.parentElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
    
    // Animate links for smooth page transitions
    const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if modifier keys are pressed
            if (e.metaKey || e.ctrlKey) return;
            
            // Skip for external links
            if (this.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Fade out
            document.body.classList.remove('fade-in');
            document.body.classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Handle browser back button
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from cache (back button)
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');
        }
    });
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm('contactForm')) {
                const successMessage = contactForm.querySelector('.success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Reset form after successful submission
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
});

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize dashboard if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        initializeDashboard();
    }
    
    // Update navigation based on login status
    updateNavigation();
});

// Check if user is logged in (simulation)
function checkLoginStatus() {
    // This is a simplified simulation. In a real application, 
    // you would check a session or token from your backend
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Redirect to login if trying to access dashboard while not logged in
    if (window.location.pathname.includes('dashboard.html') && !isLoggedIn) {
        window.location.href = 'login.html?error=unauthorized';
    }
}

// Initialize dashboard elements
function initializeDashboard() {
    // Display user name (simulation)
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        const storedName = localStorage.getItem('userName') || 'Student';
        userNameElement.textContent = storedName;
    }
    
    // Handle logout button
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            
            // Redirect to login page
            window.location.href = 'login.html?message=logged_out';
        });
    }
}

// Update navigation based on login status
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLink = document.querySelector('.nav-links a.login-btn');
    
    if (isLoggedIn && loginLink) {
        const userName = localStorage.getItem('userName') || 'User';
        
        // Create profile button
        const profileButton = document.createElement('div');
        profileButton.className = 'profile-button';
        profileButton.innerHTML = `
            <span class="user-name">${userName}</span>
            <div class="dropdown-menu">
                <a href="#" class="logout">Logout</a>
            </div>
        `;
        
        // Replace login button with profile button
        loginLink.parentNode.replaceChild(profileButton, loginLink);
        
        // Add event listener to logout button
        const logoutBtn = document.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Clear login status
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userName');
                localStorage.removeItem('currentUser');
                
                // Redirect to login page
                window.location.href = 'login.html?message=logged_out';
            });
        }
        
        // Toggle dropdown menu on click
        profileButton.addEventListener('click', () => {
            profileButton.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileButton.contains(e.target)) {
                profileButton.classList.remove('active');
            }
        });
    }
}

// Application Form Validation
function validateApplicationForm() {
    const form = document.getElementById('applicationForm');
    if (!form) return true;
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Validate name (only letters and spaces)
    const name = document.getElementById('name');
    if (name && !validateName(name.value)) {
        showError(name, 'Please enter a valid name (only letters and spaces)');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    if (email && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (10 digits)
    const phone = document.getElementById('phone');
    if (phone && !validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Validate program selection
    const program = document.getElementById('program');
    if (program && program.value === '') {
        showError(program, 'Please select a program');
        isValid = false;
    }
    
    // If valid, show success message and loading indicator
    if (isValid) {
        const btnText = form.querySelector('.btn-text');
        const btnLoader = form.querySelector('.btn-loader');
        const successMessage = form.querySelector('.success-message');
        
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        }
        
        // Simulate form submission (you would replace this with actual AJAX in production)
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            if (btnText && btnLoader) {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
            }
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }, 2000);
    }
    
    return false; // Prevent actual form submission
} 