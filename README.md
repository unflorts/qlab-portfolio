# ⚛ Zabed — Quantum Lab Portfolio

> Physics Student · Programmer · Exploring the universe with code

Live site: [zabed.netlify.app](https://zabed.netlify.app)  
GitHub: [github.com/unflorts](https://github.com/unflorts)

---

## 🗂 File Structure

```
qlab-portfolio/
├── index.html    ← all content and structure
├── styles.css    ← all design, colors, dark/light theme
├── script.js     ← all interactions and animations
└── README.md     ← this file
```

---

## ✏️ How to Edit Content

| What to change | File | What to look for |
|---|---|---|
| Name, headline, bio | `index.html` | `<!-- EDIT -->` comments |
| Add a new project | `index.html` | `#projects` section, copy the template block |
| Add a social link | `index.html` | `contact-social-links` div |
| Typing phrases (hero) | `script.js` | `const lines = [...]` near the top |
| Accent color | `styles.css` | `--accent` inside `[data-theme]` blocks |
| Cursor ring speed | `script.js` | `rx += (mx - rx) * 0.35` — increase for faster |
| Form recipient email | `index.html` | `action="https://formsubmit.co/YOUR_EMAIL"` |

---

## ➕ Adding a New Project

Copy this block inside the `#projects` section in `index.html`:

```html
<a href="https://github.com/unflorts/YOUR-REPO" target="_blank" class="project-card reveal">
  <div>
    <div class="project-badge"><i class="fa-solid fa-code"></i> Python</div>
    <div class="project-name">your-project-name</div>
    <div class="project-desc">What the project does in 1–2 sentences.</div>
    <div class="project-langs">
      <span class="lang-tag">Python</span>
    </div>
  </div>
  <div class="project-link-icon">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </div>
</a>
```

---

## ➕ Adding a Social Link

Copy this block inside the `contact-social-links` div in `index.html`:

```html
<a href="https://t.me/YOUR_USERNAME" target="_blank" class="social-row">
  <div class="social-icon"><i class="fa-brands fa-telegram"></i></div>
  <div class="social-meta">
    <div class="social-platform">Telegram</div>
    <div class="social-handle">@yourusername</div>
  </div>
</a>
```

**Available Font Awesome icons:**  
`fa-telegram` · `fa-x-twitter` · `fa-linkedin` · `fa-discord` · `fa-whatsapp` · `fa-youtube`

---

## 🚀 Deploying Updates

After any change, run these 3 commands in your terminal:

```bash
git add .
git commit -m "describe what you changed"
git push
```

Netlify detects the push and updates your live site automatically in ~10 seconds.

---

## 📬 Contact Form (FormSubmit)

The form uses [formsubmit.co](https://formsubmit.co) — no backend needed.  
On first submission, check your email for a **verification email** and click the link.  
After that, all messages arrive directly in your inbox.

---

## ⚙️ Features

- Dark / Light mode toggle (saved to localStorage)
- Particle network background (canvas)
- Custom cursor with smooth ring
- Typing animation in hero
- Scroll reveal animations
- 3D card tilt on hover
- Animated stat counters
- Reading progress bar
- Active nav link highlight on scroll
- Mobile responsive + hamburger menu
- FormSubmit contact form

---

## 🛠 Built With

- HTML5 · CSS3 · Vanilla JavaScript
- [Archivo Black](https://fonts.google.com/specimen/Archivo+Black) — headings
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — body text
- [Fira Code](https://fonts.google.com/specimen/Fira+Code) — monospace labels
- [Font Awesome 6](https://fontawesome.com) — icons
- [FormSubmit](https://formsubmit.co) — contact form backend

---

*Built with ⚛ Physics and code · © 2026 Zabed*
