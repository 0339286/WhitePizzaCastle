// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "linear-gradient(135deg, #000 0%, #333 100%)";
    header.style.backdropFilter = "none";
  }
});

// Smooth Scroll Animations with Better Performance
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.getAttribute("data-animation");

        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
          element.classList.add(animationType);
          element.classList.add("animate");

          // Clean up will-change after animation completes
          setTimeout(() => {
            element.style.willChange = "auto";
          }, 1600); // Max animation duration + buffer
        });

        // Stop observing this element once animated
        animationObserver.unobserve(element);
      }
    });
  },
  {
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px 0px -30px 0px", // Better timing
  }
);

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate-element");
  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
});

// Smooth staggered animations for containers
function addStaggeredAnimations() {
  const containers = [
    { selector: ".deals-grid", delay: 0.15 },
    { selector: ".midnight-grid", delay: 0.12 },
    { selector: ".masti-grid", delay: 0.1 },
  ];

  containers.forEach(({ selector, delay }) => {
    const container = document.querySelector(selector);
    if (container) {
      const elements = container.querySelectorAll(".animate-element");
      elements.forEach((el, index) => {
        // Progressive delay with smooth curve
        el.style.animationDelay = `${index * delay}s`;

        // Add slight randomness for natural feel
        const randomOffset = (Math.random() - 0.5) * 0.05;
        el.style.animationDelay = `${index * delay + randomOffset}s`;
      });
    }
  });
}

// Smooth menu animations when categories expand
function addMenuStaggeredAnimations(categoryId) {
  const container = document.getElementById(categoryId);
  if (container) {
    const menuItems = container.querySelectorAll(".animate-element");

    menuItems.forEach((item, index) => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          const animationType = item.getAttribute("data-animation");
          if (animationType && !item.classList.contains("animate")) {
            item.classList.add(animationType);
            item.classList.add("animate");

            // Clean up will-change after animation
            setTimeout(() => {
              item.style.willChange = "auto";
            }, 1600);
          }
        }, index * 80); // Faster, smoother stagger
      });
    });
  }
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Phone number click to call
document.addEventListener("DOMContentLoaded", () => {
  const phoneNumbers = document.querySelectorAll('p:contains("+92")');
  phoneNumbers.forEach((phone) => {
    phone.style.cursor = "pointer";
    phone.addEventListener("click", () => {
      window.location.href = `tel:${phone.textContent.replace(/\s+/g, "")}`;
    });
  });
});

// WhatsApp click to message
document.addEventListener("DOMContentLoaded", () => {
  const whatsappNumbers = document.querySelectorAll('p:contains("0307")');
  whatsappNumbers.forEach((whatsapp) => {
    whatsapp.style.cursor = "pointer";
    whatsapp.addEventListener("click", () => {
      const number = whatsapp.textContent.replace(/\s+/g, "").replace(/-/g, "");
      window.open(`https://wa.me/92${number.substring(1)}`, "_blank");
    });
  });
});

// Add hover effects to menu items
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-5px) scale(1.02)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effect to deal cards
document.querySelectorAll(".deal-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Add pulse effect
    card.style.animation = "pulse 0.6s";
    setTimeout(() => {
      card.style.animation = "";
    }, 600);
  });
});

// CSS for pulse animation (injected via JavaScript)
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Center active tab function
function centerActiveTab(activeTab) {
  const tabsContainer = document.querySelector(".nav-tabs-container");
  const tabsWrapper = document.querySelector(".nav-tabs");

  if (window.innerWidth <= 768) {
    // Only center on mobile/tablet
    const containerWidth = tabsContainer.clientWidth;
    const tabLeft = activeTab.offsetLeft;
    const tabWidth = activeTab.clientWidth;
    const tabCenter = tabLeft + tabWidth / 2;

    // Calculate scroll position to center the tab
    let scrollPosition = tabCenter - containerWidth / 2;

    // Prevent scrolling too far left or right
    const maxScroll = tabsWrapper.scrollWidth - containerWidth;
    scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

    // Add some padding so tab isn't exactly centered (prevents white space)
    const padding = containerWidth * 0.1; // 10% padding
    if (scrollPosition < padding) {
      scrollPosition = 0;
    } else if (scrollPosition > maxScroll - padding) {
      scrollPosition = maxScroll;
    }

    // Smooth scroll to position
    tabsContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
}

// Quick Navigation Tabs Functionality
function initQuickNavTabs() {
  const navTabs = document.querySelectorAll(".nav-tab");
  const sections = ["deals", "midnight-deals", "masti-deals", "menu"];

  // Handle tab clicks
  navTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all tabs
      navTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Center the active tab in mobile view
      centerActiveTab(tab);

      // Smooth scroll to target
      const target = tab.getAttribute("href");
      const targetElement = document.querySelector(target);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 150; // Account for sticky headers
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Track scroll position and update active tab
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-150px 0px -50% 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;

        // Update active tab
        navTabs.forEach((tab) => {
          tab.classList.remove("active");
          if (tab.getAttribute("data-target") === sectionId) {
            tab.classList.add("active");
            // Center the active tab when scrolling
            centerActiveTab(tab);
          }
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      sectionObserver.observe(section);
    }
  });
}

// Menu Category Expand/Collapse Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get all menu category headers
  const menuHeaders = document.querySelectorAll(".menu-category-header");

  menuHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const categoryId = header.getAttribute("data-category");
      const container = document.getElementById(categoryId);
      const arrow = header.querySelector(".category-arrow");

      // Toggle active class on header
      header.classList.toggle("active");

      // Toggle active class on container
      container.classList.toggle("active");

      // Add smooth animation effect
      if (container.classList.contains("active")) {
        container.style.maxHeight = container.scrollHeight + "px";
        // Trigger staggered animations for menu items when category opens
        setTimeout(() => {
          addMenuStaggeredAnimations(categoryId);
        }, 200);
      } else {
        container.style.maxHeight = "0";
      }
    });
  });

  // Initialize Quick Navigation Tabs
  initQuickNavTabs();

  // Initialize staggered animations for deals
  addStaggeredAnimations();

  // Set body opacity to 1 after load
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
