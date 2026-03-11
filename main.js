// ============================================
// NICHOLAS BILLITTERI — PORTFOLIO JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // --- Smooth active nav highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--teal)' : '';
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observerNav.observe(s));

  // --- Scroll-reveal timeline items ---
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observerTimeline = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.index || 0) * 120;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observerTimeline.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => observerTimeline.observe(item));

  // --- Scroll-reveal for stat cards and skill groups ---
  const fadeEls = document.querySelectorAll('.stat-card, .skill-group, .edu-card, .contact-card');

  const observerFade = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observerFade.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observerFade.observe(el);
  });

  // --- Hero photo graceful load ---
  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    if (heroPhoto.complete) {
      heroPhoto.style.opacity = '1';
    } else {
      heroPhoto.style.opacity = '0';
      heroPhoto.style.transition = 'opacity 0.6s ease';
      heroPhoto.addEventListener('load', () => {
        heroPhoto.style.opacity = '1';
      });
      heroPhoto.addEventListener('error', () => {
        // Graceful fallback if image not found
        heroPhoto.style.display = 'none';
        const wrap = heroPhoto.parentElement;
        const fallback = document.createElement('div');
        fallback.style.cssText = `
          width: 260px; height: 260px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal-pale), var(--teal-light));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-size: 5rem; color: var(--teal-dark);
          font-weight: 700; box-shadow: 0 20px 60px rgba(13,148,136,0.2);
        `;
        fallback.textContent = 'NB';
        wrap.appendChild(fallback);
      });
    }
  }

});
