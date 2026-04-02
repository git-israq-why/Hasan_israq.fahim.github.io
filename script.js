/* =====================
   CUSTOM CURSOR
   ===================== */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = (mx - 6) + 'px';
  cursor.style.top  = (my - 6) + 'px';
});

function animateRing() {
  rx += (mx - rx - 18) * 0.15;
  ry += (my - ry - 18) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* Scale cursor on hover over links/buttons */
document.querySelectorAll('a, button, .skill-card, .activity-card, .edu-item').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.transform = 'scale(2.5)';
    ring.style.transform   = 'scale(1.4)';
  });
  el.addEventListener('mouseleave', function() {
    cursor.style.transform = 'scale(1)';
    ring.style.transform   = 'scale(1)';
  });
});

/* =====================
   SCROLL FADE-IN
   ===================== */
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(function(el) {
  observer.observe(el);
});

/* =====================
   ACTIVE NAV LINK
   ===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function(link) {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent)';
    }
  });
});

/* =====================
   SMOOTH SCROLL FOR NAV
   ===================== */
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
