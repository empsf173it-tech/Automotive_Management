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
});
