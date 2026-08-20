/**
 * Portfolio Template — Interactions & Animations
 */

(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".navbar-toggler");
  const navCollapse = document.getElementById("navCollapse");
  const revealElements = document.querySelectorAll(".reveal-up");
  const yearSpan = document.getElementById("year");

  // Update copyright year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Navbar scroll effect
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  if (navToggle && navCollapse) {
    navToggle.addEventListener("click", () => {
      const isOpen = navCollapse.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("mobile-nav-open", isOpen);
    });
  }

  // Intersection Observer for reveal animations
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.12,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // Smooth scroll for anchor links without Bootstrap's jumpy spy
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu after click
        if (navCollapse && navCollapse.classList.contains("show")) {
          navCollapse.classList.remove("show");
          document.body.classList.remove("mobile-nav-open");
          if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Typing effect for hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const finalText = heroSubtitle.textContent;
    heroSubtitle.textContent = "";
    heroSubtitle.style.opacity = "1";

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < finalText.length) {
        heroSubtitle.textContent += finalText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 45);
  }

  const skillTags = document.querySelectorAll(".skill-tag");
  
  skillTags.forEach((tag) => {
    tag.addEventListener("mousemove", (e) => {
      // Get the tag's size and position relative to the viewport
      const rect = tag.getBoundingClientRect();
      
      // Calculate mouse position relative to the tag itself
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Pass the coordinates to CSS
      tag.style.setProperty("--mouse-x", `${x}px`);
      tag.style.setProperty("--mouse-y", `${y}px`);
    });
  });
})();
