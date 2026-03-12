(() => {
  "use strict";

  /* ──────────────────────────────────────
     1. THEME TOGGLE
  ────────────────────────────────────── */
  const html = document.documentElement;
  const themeBtn = document.getElementById("theme-btn");
  const themeIcon = document.getElementById("theme-icon");
  const DARK = "dark",
    LIGHT = "light";

  const savedTheme = localStorage.getItem("zabed-theme") || DARK;
  applyTheme(savedTheme);

  themeBtn.addEventListener("click", () => {
    const next = html.dataset.theme === DARK ? LIGHT : DARK;
    applyTheme(next);
    localStorage.setItem("zabed-theme", next);
  });

  function applyTheme(t) {
    html.dataset.theme = t;
    themeIcon.className = t === DARK ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  /* ──────────────────────────────────────
     2. MOBILE MENU
  ────────────────────────────────────── */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  /* ──────────────────────────────────────
     3. ACTIVE NAV HIGHLIGHT
  ────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navAs = navLinks.querySelectorAll("a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navAs.forEach((a) => a.classList.remove("active"));
          const link = navLinks.querySelector(`a[href="#${e.target.id}"]`);
          if (link) link.classList.add("active");
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ──────────────────────────────────────
     4. READ PROGRESS BAR
  ────────────────────────────────────── */
  const progressBar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = pct + "%";
  });

  /* ──────────────────────────────────────
     5. SCROLL REVEAL
  ────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 60);
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ──────────────────────────────────────
     6. COUNTER ANIMATION
  ────────────────────────────────────── */
  const counters = document.querySelectorAll("[data-count]");
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = parseInt(el.dataset.count);
        const dur = end > 100 ? 1600 : 900;
        const step = end / (dur / 16);
        let cur = 0;
        const tick = () => {
          cur = Math.min(cur + step, end);
          el.textContent = Math.round(cur);
          if (cur < end) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => counterObs.observe(c));

  /* ──────────────────────────────────────
     7. TYPING EFFECT (hero)
     EDIT: Change the lines array below
  ────────────────────────────────────── */
  const lines = [
    "// Quantum Mechanics student",
    "// Building physics simulations",
    "// F = ma | ĤΨ = EΨ | E = mc²",
    "// Exploring the universe with code",
    '// print("Hello, Universe!")',
  ];
  const typedEl = document.getElementById("typed-text");
  let li = 0,
    ci = 0,
    deleting = false;

  function typeStep() {
    const line = lines[li];
    if (!deleting) {
      typedEl.textContent = line.slice(0, ++ci);
      if (ci === line.length) {
        deleting = true;
        setTimeout(typeStep, 1800);
        return;
      }
      setTimeout(typeStep, 45);
    } else {
      typedEl.textContent = line.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;
        setTimeout(typeStep, 400);
        return;
      }
      setTimeout(typeStep, 22);
    }
  }
  setTimeout(typeStep, 1200);

  /* ──────────────────────────────────────
     8. CUSTOM CURSOR
     Lerp value 0.35 = snappy but smooth
     Increase toward 1.0 for faster ring
  ────────────────────────────────────── */
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animCursor() {
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
    rx +=
      (mx - rx) * 0.35; /* ← EDIT: cursor ring speed (0.1 slow → 1.0 instant) */
    ry += (my - ry) * 0.35;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animCursor);
  }
  animCursor();

  /* ──────────────────────────────────────
     9. PARTICLE CANVAS
  ────────────────────────────────────── */
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let W,
    H,
    pts = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const isDark = () => html.dataset.theme === DARK;

  class Pt {
    constructor() {
      this.init();
    }
    init() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.r = Math.random() * 1.8 + 0.4;
      this.a = Math.random() * 0.55 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.init();
    }
    draw() {
      const c = isDark()
        ? `rgba(56,189,248,${this.a})`
        : `rgba(14,100,185,${this.a * 0.7})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) pts.push(new Pt());

  function drawLines() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          const alpha = (1 - d / 110) * (isDark() ? 0.07 : 0.05);
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = isDark()
            ? `rgba(56,189,248,${alpha})`
            : `rgba(14,100,185,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p) => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();

  /* ──────────────────────────────────────
     10. FORM — UX feedback
         (FormSubmit handles delivery)
  ────────────────────────────────────── */
  const form = document.getElementById("contact-form");
  const btnSub = form.querySelector(".btn-submit");
  const success = document.getElementById("form-success");

  if (window.location.search.includes("sent=1")) {
    success.classList.add("show");
  }

  form.addEventListener("submit", () => {
    btnSub.innerHTML =
      '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
    btnSub.disabled = true;
  });

  /* ──────────────────────────────────────
     11. NAV SHRINK ON SCROLL
  ────────────────────────────────────── */
  const mainNav = document.getElementById("main-nav");
  window.addEventListener("scroll", () => {
    mainNav.style.height = window.scrollY > 60 ? "56px" : "68px";
  });

  /* ──────────────────────────────────────
     12. CARD TILT ON HOVER
  ────────────────────────────────────── */
  document.querySelectorAll(".field-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.4s ease";
    });
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease, border-color 0.3s";
    });
  });
})();
