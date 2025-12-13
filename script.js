// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Navigation click handler - smooth scroll to section
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach((l) => l.classList.remove("active"));

            // Add active class to clicked link
            this.classList.add("active");

            // Close mobile menu
            if (hamburger && navMenu) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }

            // Smooth scroll to target section
            const targetId = this.getAttribute("data-section");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("data-section") === current) {
                link.classList.add("active");
            }
        });
    });

    // Modern Scroll Animations - Enhanced
    const scrollAnimationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                    console.log("Animating:", entry.target.className);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    // Helper function to add animation
    function addScrollAnimation(selector, animationClass, useStagger = false) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(animationClass);
            if (useStagger) {
                el.classList.add(`stagger-${(index % 6) + 1}`);
            }
            scrollAnimationObserver.observe(el);
        });
        console.log(
            `Added ${animationClass} to ${elements.length} elements matching ${selector}`
        );
    }

    // Apply animations to all sections
    console.log("Initializing scroll animations...");

    // Wait for DOM to fully load
    setTimeout(() => {
        // Home section
        addScrollAnimation(".home-title", "scroll-animate");
        addScrollAnimation(".home-subtitle", "scroll-slide-left");
        addScrollAnimation(".cta-button", "scroll-scale");
        addScrollAnimation(".contact-info", "scroll-animate");
        addScrollAnimation(".home-image", "scroll-slide-right");

        // Section headers
        addScrollAnimation(".section-title", "scroll-animate");
        addScrollAnimation(".section-label", "scroll-slide-left");

        // About section
        addScrollAnimation(".profile-card", "scroll-rotate");
        addScrollAnimation(".info-item", "scroll-animate", true);
        addScrollAnimation(".stat-item", "scroll-scale", true);
        addScrollAnimation(".about-text", "scroll-animate");
        addScrollAnimation(".quote-box", "scroll-slide-left");

        // Services section
        addScrollAnimation(".service-item", "scroll-slide-right", true);

        // Works section - alternate from left and right
        const projectCards = document.querySelectorAll(".project-card");
        console.log("Found project cards:", projectCards.length);
        projectCards.forEach((card, index) => {
            // Odd cards (1st, 3rd, 5th) come from left, even (2nd, 4th, 6th) from right
            const animationClass =
                index % 2 === 0 ? "project-slide-left" : "project-slide-right";
            card.classList.add(animationClass);
            card.classList.add(`stagger-${(index % 6) + 1}`);
            scrollAnimationObserver.observe(card);
            console.log(`Card ${index + 1}: ${animationClass}`);
        });

        // Contact section
        addScrollAnimation(".contact-left", "scroll-slide-left");
        addScrollAnimation(".contact-right", "scroll-slide-right");
        addScrollAnimation(".contact-link", "scroll-animate", true);
        addScrollAnimation(".social-links-contact", "scroll-animate");

        console.log("Scroll animations initialized!");

        // Force initial check
        window.dispatchEvent(new Event("scroll"));
    }, 100);

    // Parallax scroll effect for sections
    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const scrolled = window.pageYOffset;

                // Parallax for geometric shapes
                const shapes = document.querySelectorAll(".shape");
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.05;
                    const yPos = -(scrolled * speed);
                    shape.style.transform = `translateY(${yPos}px)`;
                });

                // Parallax for home image - DISABLED for static image
                // const homeImage = document.querySelector(".home-image");
                // if (homeImage) {
                //     const yPos = scrolled * 0.3;
                //     homeImage.style.transform = `translateY(${yPos}px)`;
                // }

                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth reveal for text elements
    const textReveal = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    entry.target.textContent = "";
                    entry.target.style.opacity = "1";

                    let index = 0;
                    const interval = setInterval(() => {
                        if (index < text.length) {
                            entry.target.textContent += text[index];
                            index++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 30);

                    textReveal.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    // Apply text reveal to headings
    document.querySelectorAll(".home-subtitle").forEach((el) => {
        textReveal.observe(el);
    });

    // Magnetic effect on buttons
    const magneticButtons = document.querySelectorAll(
        ".cta-button, .download-cv, .submit-btn, .load-more"
    );
    magneticButtons.forEach((button) => {
        button.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "translate(0, 0)";
        });
    });

    // Service item expand/collapse functionality
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
        const header = item.querySelector(".service-header");
        const expandBtn = item.querySelector(".expand-btn");
        const plusIcon = expandBtn.querySelector(".plus-icon");

        header.addEventListener("click", function () {
            // Close all other items
            serviceItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("expanded");
                    const otherIcon = otherItem.querySelector(".plus-icon");
                    otherIcon.textContent = "+";
                }
            });

            // Toggle current item
            item.classList.toggle("expanded");

            // Update icon
            if (item.classList.contains("expanded")) {
                plusIcon.textContent = "−";
            } else {
                plusIcon.textContent = "+";
            }
        });
    });

    // Animated text reveal on load
    const titleLines = document.querySelectorAll(".title-line");
    titleLines.forEach((line, index) => {
        line.style.opacity = "0";
        line.style.transform = "translateY(50px)";

        setTimeout(() => {
            line.style.transition = "all 0.8s ease";
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
        }, index * 200);
    });

    // Contact form submission
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Show success message (you can customize this)
            alert("Thank you for your message! I will get back to you soon.");

            // Reset form
            this.reset();
        });
    }

    // Parallax effect for geometric shapes
    document.addEventListener("mousemove", function (e) {
        const shapes = document.querySelectorAll(".shape");
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease";
        observer.observe(card);
    });

    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll(
        ".cta-button, .download-cv, .submit-btn"
    );
    ctaButtons.forEach((button) => {
        button.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px) scale(1.05)";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Stats counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + "+";
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + "+";
            }
        }, 16);
    }

    const statNumbers = document.querySelectorAll(".stat-number");
    const statsObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    !entry.target.classList.contains("animated")
                ) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                    entry.target.classList.add("animated");
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => {
        statsObserver.observe(stat);
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add("ripple");

        const rippleEffect = button.getElementsByClassName("ripple")[0];
        if (rippleEffect) {
            rippleEffect.remove();
        }

        button.appendChild(ripple);
    }

    // Add ripple CSS
    const style = document.createElement("style");
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Apply ripple to all buttons
    const allButtons = document.querySelectorAll("button, .cta-button");
    allButtons.forEach((button) => {
        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.addEventListener("click", createRipple);
    });

    // Loading animation
    const homeSection = document.querySelector(".home-section");
    if (homeSection) {
        setTimeout(() => {
            homeSection.style.opacity = "1";
        }, 100);
    }

    // Typing effect for subtitle
    const subtitle = document.querySelector(".home-subtitle");
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = "";
        let i = 0;

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 1000);
    }

    // File upload interaction
    const fileUpload = document.querySelector(".file-upload");
    if (fileUpload) {
        fileUpload.addEventListener("click", function () {
            // Create a file input
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*,.pdf,.doc,.docx";

            input.addEventListener("change", function () {
                if (this.files && this.files[0]) {
                    fileUpload.querySelector("span").textContent =
                        this.files[0].name;
                }
            });

            input.click();
        });
    }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Add active state transitions
document.addEventListener("DOMContentLoaded", function () {
    const quote = document.querySelector(".quote");
    const author = document.querySelector(".author");
    const position = document.querySelector(".position");

    if (quote) quote.style.transition = "opacity 0.3s ease";
    if (author) author.style.transition = "opacity 0.3s ease";
    if (position) position.style.transition = "opacity 0.3s ease";
});

// EmailJS Contact Form Integration
(function () {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
            formStatus.textContent = "";
            formStatus.className = "form-status";

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
                function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    formStatus.textContent = "✓ Message sent successfully!";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                    submitBtn.textContent = "Submit now";
                    submitBtn.disabled = false;

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = "";
                        formStatus.className = "form-status";
                    }, 5000);
                },
                function (error) {
                    console.log("FAILED...", error);
                    formStatus.textContent =
                        "✗ Failed to send message. Please try again.";
                    formStatus.className = "form-status error";
                    submitBtn.textContent = "Submit now";
                    submitBtn.disabled = false;
                }
            );
        });
    }
})();

// Automatic Age Calculator
function calculateAge() {
    const birthDate = new Date("2004-11-26");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if birthday hasn't occurred yet this year
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    const ageElement = document.getElementById("age");
    if (ageElement) {
        ageElement.textContent = age + " yrs";
    }
}

// Calculate age on page load
calculateAge();

// Automatic Age Calculator
function calculateAge() {
    const birthDate = new Date("2004-11-26");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if birthday hasn't occurred yet this year
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    const ageElement = document.getElementById("age");
    if (ageElement) {
        ageElement.textContent = age + " yrs";
    }
}

// Calculate age on page load
calculateAge();
