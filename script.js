/* ==========================================================================
   VELVORA IT INFRASTRUCTURE SERVICES — SCRIPT
   1. Sticky navbar scroll state
   2. Mobile nav toggle
   3. Smooth scroll + close mobile menu on link click
   4. Scroll-triggered fade-in animations
   5. Contact form validation + submission
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("5LwyEUFjpXV_eiEdt");

  /* ---------------------------------------------------------
     1. STICKY NAVBAR SCROLL STATE
  --------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function handleHeaderScroll() {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  var lastScrollPosition = 0;

window.addEventListener('scroll', function () {
  var currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
    header.classList.add('hide-navbar');
  } else {
    header.classList.remove('hide-navbar');
  }

  lastScrollPosition = currentScrollPosition;
}, { passive: true });

  /* ---------------------------------------------------------
     2. MOBILE NAV TOGGLE
  --------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var sideMenu = document.getElementById('sideMenu');
  var menuOverlay = document.getElementById('menuOverlay');
  var menuClose = document.getElementById('menuClose');

  function closeSideMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    if (window.innerWidth > 768) {
      var isSideMenuOpen = sideMenu.classList.toggle('open');
      menuOverlay.classList.toggle('open', isSideMenuOpen);
      navToggle.classList.toggle('open', isSideMenuOpen);
      navToggle.setAttribute('aria-expanded', isSideMenuOpen ? 'true' : 'false');
      return;
    }

    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menuClose.addEventListener('click', closeSideMenu);
  menuOverlay.addEventListener('click', closeSideMenu);
  sideMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeSideMenu);
  });

  /* ---------------------------------------------------------
     3. CLOSE MOBILE MENU ON LINK CLICK (smooth scroll is
        handled natively via CSS `scroll-behavior: smooth`)
  --------------------------------------------------------- */
  var allNavLinks = document.querySelectorAll('.nav-link, .nav-cta');
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  --------------------------------------------------------- */
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for very old browsers: just show everything
    fadeElements.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------------------------------------------------------
     5. CONTACT FORM VALIDATION + SUBMISSION
  --------------------------------------------------------- */
  var form = document.getElementById('contactForm');
  var successMessage = document.getElementById('formSuccess');

  var fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('error-name'),
      validate: function (value) {
        return value.trim().length >= 2 ? '' : 'Please enter your full name.';
      }
    },
    phone: {
      input: document.getElementById('phone'),
      error: document.getElementById('error-phone'),
      validate: function (value) {
        var digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 10 ? '' : 'Please enter a valid phone number.';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('error-email'),
      validate: function (value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
      }
    },
    service: {
      input: document.getElementById('service'),
      error: document.getElementById('error-service'),
      validate: function (value) {
        return value ? '' : 'Please select the service you need.';
      }
    }
  };

  function validateField(key) {
    var field = fields[key];
    var errorText = field.validate(field.input.value);
    field.error.textContent = errorText;
    field.input.closest('.form-group').classList.toggle('has-error', !!errorText);
    return errorText === '';
  }

  // Validate on blur for immediate feedback
  Object.keys(fields).forEach(function (key) {
    fields[key].input.addEventListener('blur', function () { validateField(key); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var isValid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) { isValid = false; }
    });

    if (!isValid) {
      successMessage.textContent = '';
      return;
    }

    /*
      ================= SIMULATED SUBMIT =================
      Replace this block with a real EmailJS or FormSubmit call.
      See README.md for full setup steps.

      Example using EmailJS (after including their SDK + init):

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
          name: fields.name.input.value,
          phone: fields.phone.input.value,
          email: fields.email.input.value,
          service: fields.service.input.value,
          message: document.getElementById('message').value
        }).then(function () {
          showSuccess();
          form.reset();
        }).catch(function (error) {
          console.error('EmailJS error:', error);
        });

      ======================================================
    */
    emailjs.send("service_h7coxuq", "template_t04sq5p", {
  name: document.getElementById("name").value,
  phone: document.getElementById("phone").value,
  email: document.getElementById("email").value,
  service: document.getElementById("service").value,
  message: document.getElementById("message").value
}).then(function () {
  showSuccess();
  form.reset();
});
  });

  function showSuccess() {
    successMessage.textContent = 'Thank you! Your message has been received — our team will contact you shortly.';
  }
/* ---------------------------------------------------------
   6. TRUST STATS COUNTER
--------------------------------------------------------- */

const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {

  const counterObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

      if (entry.isIntersecting) {

        counters.forEach(function(counter) {

          const target = +counter.getAttribute("data-target");
          let count = 0;

          function updateCounter() {

            const increment = target / 500;

            count += increment;

            if (count < target) {
              counter.textContent = Math.ceil(count);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }

          }

          updateCounter();

        });

        counterObserver.disconnect();

      }

    });

  });

  counterObserver.observe(document.querySelector(".trust-stats"));

}
});
