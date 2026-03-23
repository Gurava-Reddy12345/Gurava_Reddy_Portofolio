/* ═══════════════════════════════════════════════════
   PORTFOLIO — script.js
   Gurava Reddy · Data Science & ML Engineer
═══════════════════════════════════════════════════ */

/* ── 1. ANIMATED CANVAS BACKGROUND ── */
(function () {
  const C = document.getElementById('BG');
  const ctx = C.getContext('2d');
  let W, H;
  const pts = [];
  const COLORS = ['rgba(255,92,0,', 'rgba(255,140,64,', 'rgba(255,92,0,'];

  function resize() {
    W = C.width  = window.innerWidth;
    H = C.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (let i = 0; i < 55; i++) {
    pts.push({
      x:  Math.random() * 2000,
      y:  Math.random() * 1200,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r:  Math.random() * 1.5 + .5,
      c:  COLORS[Math.floor(Math.random() * 3)],
      o:  Math.random() * .4 + .1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.o + ')';
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(255,92,0,' + (.06 * (1 - d / 130)) + ')';
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 2. CUSTOM CURSOR ── */
(function () {
  const dot  = document.getElementById('CUR');
  const ring = document.getElementById('CUR2');
  let mx = 0, my = 0, rx = 0, ry = 0;

  // Disable on touch devices
  if ('ontouchstart' in window) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }, { passive: true });

  (function loop() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverTargets = 'a,button,.sk-card,.proj-card,.cert-card,.ach-card,.ic,.qs,.exp-card,.soc,.c-link,.pa,.cert-btn';
  document.querySelectorAll(hoverTargets).forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('ch'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('ch'); });
  });

  document.addEventListener('mousedown', function () { document.body.classList.add('cm'); });
  document.addEventListener('mouseup',   function () { document.body.classList.remove('cm'); });
})();

/* ── 3. PHOTO FALLBACK ── */
(function () {
  const img = document.getElementById('PHOTO');
  const fb  = document.getElementById('PHOTO_FB');

  function show() { img.style.display = 'block'; fb.style.display = 'none'; }
  function hide() { img.style.display = 'none';  fb.style.display = ''; }

  img.addEventListener('load',  show);
  img.addEventListener('error', hide);
  if (img.complete) {
    img.naturalWidth > 0 ? show() : hide();
  }
})();

/* ── 4. NAV SCROLL EFFECT ── */
var NAV = document.getElementById('NAV');
window.addEventListener('scroll', function () {
  NAV.classList.toggle('sc', window.scrollY > 20);
}, { passive: true });

/* ── 5. MOBILE MENU ── */
var HAM = document.getElementById('HAM');
var MOB = document.getElementById('MOB');

HAM.addEventListener('click', function () {
  var isOpen = MOB.classList.toggle('open');
  HAM.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeM() {
  MOB.classList.remove('open');
  HAM.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeM();
});

/* ── 6. SCROLL REVEAL ── */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .07, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.rv').forEach(function (el) {
  revealObserver.observe(el);
});

/* ── 7. ACTIVE NAV LINK ── */
var sections = document.querySelectorAll('[id]');
var navLinks = document.querySelectorAll('.n-list a');

var activeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (a) { a.classList.remove('on'); });
      var link = document.querySelector('.n-list a[href="#' + entry.target.id + '"]');
      if (link) link.classList.add('on');
    }
  });
}, { rootMargin: '-42% 0px -54% 0px' });

sections.forEach(function (s) { activeObserver.observe(s); });

/* ── 8. CONTACT FORM ── */
function handleForm(e) {
  e.preventDefault();

  var name  = document.getElementById('FN').value.trim();
  var email = document.getElementById('FE').value.trim();
  var msg   = document.getElementById('FM').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in Name, Email, and Message.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  window.location.href =
    'mailto:lokireddyguravareddy2@gmail.com' +
    '?subject=' + encodeURIComponent('Hiring Enquiry from ' + name) +
    '&body='    + encodeURIComponent('Hi Gurava Reddy,\n\nName: ' + name + '\nEmail: ' + email + '\n\n' + msg);
}

/* ── 9. REDUCED MOTION ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.rv').forEach(function (el) {
    el.style.opacity    = 1;
    el.style.transform  = 'none';
    el.style.transition = 'none';
  });
}
const texts = [
  "Data Science & ML Engineer",
  "Python & Analytics Specialist",
  "Oracle OCI Certified Professional",
  "Open to Data Science, Machine Learning & AI Opportunities"
];

let index = 0;
const textElement = document.getElementById("dynamic-text");

function changeText() {
  textElement.style.opacity = 0;

  setTimeout(() => {
    textElement.textContent = texts[index];
    textElement.style.opacity = 1;
    index = (index + 1) % texts.length;
  }, 300);
}

// initial text
changeText();

// change every 2 seconds
setInterval(changeText, 2000);