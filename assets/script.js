document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reveals.length === 0) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav.site-nav');
  const burger = document.querySelector('.nav-burger');
  if (!nav || !burger) return;

  const closeMenu = () => {
    nav.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', closeMenu));
});

document.addEventListener('DOMContentLoaded', () => {
  const brand = document.querySelector('.brand');
  if (brand && brand.getAttribute('href') === '#top') {
    brand.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const toTop = document.querySelector('.to-top');
  const hero = document.querySelector('.hero');
  if (toTop && hero) {
    const getThreshold = () => hero.offsetTop + hero.offsetHeight;
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.scrollY > getThreshold());
    });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
