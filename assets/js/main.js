/* ==========================================================================
   VELOCE MOTORS - INTERACTIVE JAVASCRIPT
   Handles dynamic animations, gallery filter, dashboard section navigation,
   form submissions, count-up counters, and back-to-top scroll logic.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Back to Top Button Logic
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Animated Stats Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    let animated = false;
    const animateStats = () => {
      const triggerPoint = window.innerHeight * 0.85;
      statNumbers.forEach(stat => {
        const top = stat.getBoundingClientRect().top;
        if (top < triggerPoint && !animated) {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const prefix = stat.getAttribute('data-prefix') || '';
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const step = Math.max(1, Math.floor(target / 50));
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = prefix + count.toLocaleString() + suffix;
          }, 30);
        }
      });
      if (statNumbers[0].getBoundingClientRect().top < triggerPoint) {
        animated = true;
      }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on load if already in view
  }

  // 3. Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-col');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 4. Live FAQ Search Filter
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqAccordionItems = document.querySelectorAll('#faqAccordion .accordion-item');

  if (faqSearchInput && faqAccordionItems.length > 0) {
    faqSearchInput.addEventListener('keyup', () => {
      const query = faqSearchInput.value.toLowerCase().trim();
      faqAccordionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 5. Dashboard Tab Switching
  const dashNavLinks = document.querySelectorAll('.dash-nav-link[data-tab]');
  const dashSections = document.querySelectorAll('.dash-tab-section');

  if (dashNavLinks.length > 0 && dashSections.length > 0) {
    dashNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');

        dashNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        dashSections.forEach(sec => {
          if (sec.id === tabId) {
            sec.classList.remove('d-none');
          } else {
            sec.classList.add('d-none');
          }
        });
      });
    });
  }

  // 6. Interactive Contact Form Submission Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Transmitting...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i> Message Transmitted!';
        submitBtn.classList.remove('btn-accent');
        submitBtn.classList.add('btn-success');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-accent');
        }, 4000);
      }, 1200);
    });
  }

  // 7. Newsletter Subscription Simulation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (input && input.value) {
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Subscribed!';
        btn.classList.add('bg-success');
        input.value = '';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.classList.remove('bg-success');
        }, 3000);
      }
    });
  });

  // 8. Password Visibility Toggles
  const setupPasswordToggle = (toggleBtnId, passwordInputId) => {
    const toggleBtn = document.getElementById(toggleBtnId);
    const passwordInput = document.getElementById(passwordInputId);
    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
        }
      });
    }
  };

  setupPasswordToggle('toggleSignupPassword', 'signupPassword');
  setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
  setupPasswordToggle('toggleLoginPassword', 'loginPassword');

  // Helper: Display Alert Message
  const showAlert = (alertEl, message, type = 'danger') => {
    if (!alertEl) return;
    alertEl.className = `alert alert-${type} mb-4 d-flex align-items-center justify-content-between`;
    alertEl.innerHTML = `<div>${message}</div><button type="button" class="btn-close btn-close-white ms-2" onclick="this.parentElement.classList.add('d-none')"></button>`;
    alertEl.classList.remove('d-none');
  };

  // 9. Interactive Signup Form Processing
  const signupForm = document.getElementById('signupForm');
  const signupAlert = document.getElementById('signupAlert');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName')?.value.trim();
      const lastName = document.getElementById('lastName')?.value.trim();
      const email = document.getElementById('signupEmail')?.value.trim();
      const vehicle = document.getElementById('vehicleMake')?.value.trim();
      const password = document.getElementById('signupPassword')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value;
      const termsCheck = document.getElementById('termsCheck')?.checked;
      const submitBtn = document.getElementById('signupSubmitBtn');

      // Validation Checks
      if (!firstName || !lastName) {
        showAlert(signupAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please provide both your First and Last Name.');
        return;
      }
      if (!email || !email.includes('@')) {
        showAlert(signupAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please enter a valid email address.');
        return;
      }
      if (!vehicle) {
        showAlert(signupAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please enter your primary vehicle make/model.');
        return;
      }
      if (!password || password.length < 8) {
        showAlert(signupAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        showAlert(signupAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Passwords do not match. Please verify both fields.');
        return;
      }
      if (!termsCheck) {
        showAlert(signupAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> You must agree to the Terms of Service to register.');
        return;
      }

      // Success Registration Handling
      const fullName = `${firstName} ${lastName}`;
      const userData = {
        name: fullName,
        email: email,
        vehicle: vehicle,
        role: 'Client VIP Member'
      };

      localStorage.setItem('veloceUser', JSON.stringify(userData));

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Creating Account...';
      }

      showAlert(signupAlert, `<i class="bi bi-check-circle-fill me-2"></i> Registration successful! Welcome, ${firstName}! Redirecting to Client Portal...`, 'success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

  // 10. Interactive Login Form Processing
  const loginForm = document.getElementById('loginForm');
  const loginAlert = document.getElementById('loginAlert');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;
      const submitBtn = document.getElementById('loginSubmitBtn');

      if (!email || !email.includes('@')) {
        showAlert(loginAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please enter a valid account email.');
        return;
      }
      if (!password) {
        showAlert(loginAlert, '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please enter your password.');
        return;
      }

      // Existing user or default login
      let userObj = {
        name: 'Enzo Veloce',
        email: email,
        role: 'Master Administrator'
      };

      const existingData = localStorage.getItem('veloceUser');
      if (existingData) {
        try {
          const parsed = JSON.parse(existingData);
          if (parsed.email === email) {
            userObj = parsed;
          }
        } catch (err) {
          // fallback default
        }
      }

      localStorage.setItem('veloceUser', JSON.stringify(userObj));

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Authenticating...';
      }

      showAlert(loginAlert, '<i class="bi bi-check-circle-fill me-2"></i> Authentication successful! Launching Portal...', 'success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }

  // 11. Social Login Simulation Buttons
  const socialBtns = document.querySelectorAll('.social-login-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.textContent.trim();
      const targetAlert = signupAlert || loginAlert;
      if (targetAlert) {
        showAlert(targetAlert, `<i class="bi bi-shield-check me-2"></i> ${provider} OAuth authentication connected! Redirecting...`, 'success');
        const defaultUser = {
          name: provider + ' User',
          email: 'user@' + provider.toLowerCase().replace(/\s+/g, '') + '.com',
          role: 'Verified Client'
        };
        localStorage.setItem('veloceUser', JSON.stringify(defaultUser));
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1200);
      }
    });
  });

  // 12. Dashboard LocalStorage User Sync
  const dashUserName = document.getElementById('dashUserName');
  const dashUserRole = document.getElementById('dashUserRole');
  if (dashUserName) {
    const savedUser = localStorage.getItem('veloceUser');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) dashUserName.textContent = parsed.name;
        if (parsed.role && dashUserRole) dashUserRole.textContent = parsed.role;
      } catch (err) {
        // ignore
      }
    }
  }

  // Logout / Exit Portal handler
  const exitPortalBtn = document.getElementById('exitPortalBtn');
  if (exitPortalBtn) {
    exitPortalBtn.addEventListener('click', () => {
      localStorage.removeItem('veloceUser');
    });
  }
});

