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

  // Safety net: a reveal element that never intersects (stuck opacity:0 for
  // any reason — odd viewport height, an observer that never fires) still
  // takes up its normal layout space, which reads as a large blank gap
  // between the sections around it. Force everything visible after a beat
  // regardless of scroll/intersection state.
  setTimeout(() => reveals.forEach((el) => el.classList.add('is-visible')), 1500);
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

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav-open')) return;
    if (nav.contains(e.target)) return;
    closeMenu();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Native smooth scroll (both the CSS `scroll-behavior: smooth` and the
  // `behavior: 'smooth'` option below) can get interrupted mid-animation on
  // iOS Safari and stall short of the target. Snap-correct to the exact
  // destination once the animation should be done, so "scroll to top" always
  // actually lands at 0 instead of wherever it happened to stop.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    }, 700);
  };

  const brand = document.querySelector('.brand');
  if (brand && brand.getAttribute('href') === '#top') {
    brand.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTop();
    });
  }

  const toTop = document.querySelector('.to-top');
  const hero = document.querySelector('.hero');
  if (toTop && hero) {
    const getThreshold = () => hero.offsetTop + hero.offsetHeight;
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.scrollY > getThreshold());
    });
    toTop.addEventListener('click', scrollToTop);
  }
});
