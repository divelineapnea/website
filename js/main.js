/* =============================================================
   DIVELINE APNEA SCHOOL — main.js
   ============================================================ */

// Custom Cursor
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
});
(function loop() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
})();

// Cursor enlarge on links/buttons
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.8)');
    el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
});

// Mobile Menu
function toggleMenu() {
    const links = document.getElementById('nav-links');
    const hamb  = document.getElementById('hamb');
    links.classList.toggle('open');
    hamb.classList.toggle('active');
}
function closeMenu() {
    document.getElementById('nav-links')?.classList.remove('open');
    document.getElementById('hamb')?.classList.remove('active');
}

// Close menu on outside click
document.addEventListener('click', e => {
    const nav  = document.getElementById('nav-links');
    const hamb = document.getElementById('hamb');
    if (nav && !nav.contains(e.target) && !hamb.contains(e.target)) {
        closeMenu();
    }
});

// Nav Scroll + Back to Top
window.addEventListener('scroll', () => {
    document.getElementById('nav')?.classList.toggle('stuck', window.scrollY > 60);
    document.getElementById('back-top')?.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

// Bubble Canvas
(function () {
    const c   = document.getElementById('bcanvas');
    const ctx = c.getContext('2d');
    let W, H;

    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const bubbles = Array.from({ length: 28 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight + window.innerHeight,
        r: Math.random() * 4 + 1.5,
        s: Math.random() * .45 + .08,
        o: Math.random() * .18 + .04
    }));

    (function draw() {
        ctx.clearRect(0, 0, W, H);
        bubbles.forEach(b => {
            b.y -= b.s;
            if (b.y < -20) { b.y = H + 20; b.x = Math.random() * W; }
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(26,159,170,${b.o})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        requestAnimationFrame(draw);
    })();
})();

// Intersection Observer — reveal on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.08 });

document.querySelectorAll('.rv').forEach(el => observer.observe(el));
