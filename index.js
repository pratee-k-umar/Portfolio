// Animate title letters
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".animated-title");
  if (title) {
    const text = title.textContent;
    title.textContent = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      if (char === " ") {
        span.className = "space";
      } else {
        span.className = "letter";
      }
      span.textContent = char;
      title.appendChild(span);
    });
  }
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  observerOptions
);

// Observe all animated elements
document
  .querySelectorAll(
    ".section-title, .about-text, .education-box, .project-card, .skill-category, .achievement-box, .contact-container"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Smooth scroll for navigation links
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

// Hide/show navigation on scroll
let lastScroll = 0;
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    nav.classList.remove("hidden");
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-submit");
    const formData = new FormData(contactForm);

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Hide previous messages
    formMessage.classList.remove("show", "success", "error");

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Success
      formMessage.textContent =
        "Message sent successfully! I'll get back to you soon.";
      formMessage.classList.add("show", "success");
      contactForm.reset();

      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.classList.remove("show");
      }, 5000);
    }, 1500);
  });
}
