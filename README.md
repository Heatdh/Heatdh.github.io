# Rayen Dhahri — Personal Website

A modern, anime-dark themed personal website built with pure HTML, CSS, and JavaScript. No build tools or static site generators required.

## Features

- **Pure static site** — no Jekyll, Hugo, or any SSG. Just HTML/CSS/JS.
- **Anime-dark aesthetic** — deep dark backgrounds, neon accents, glassmorphism, particle effects.
- **Fully responsive** — works on mobile, tablet, and desktop.
- **GitHub Pages ready** — just push and it works.
- **Sections:** Home, About, Projects (with filters), Publications, Blog, CV.
- **Interactive effects:** Particle background, scroll reveal animations, typing effect, category filters.

## Structure

```
├── index.html          # Landing page
├── about.html          # About me
├── projects.html       # Projects (with category filter)
├── publications.html   # Research publications
├── blog.html           # Blog listing
├── cv.html             # CV / Resume
├── 404.html            # Custom 404 page
├── blog/
│   └── *.html          # Individual blog posts
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # Main JavaScript
└── assets/
    └── img/            # Images
```

## Deployment

1. Push this folder to a GitHub repository (e.g., `username.github.io`)
2. Go to Settings → Pages → Source: Deploy from branch → `main` / `root`
3. Your site will be live at `https://username.github.io`

## Adding a Blog Post

1. Create a new HTML file in `blog/` (e.g., `blog/2026-03-01-my-post.html`)
2. Copy the structure from an existing post
3. Add a card linking to it in `blog.html` and optionally in `index.html`

## Adding Your Photo

Replace the placeholder in `index.html` and `about.html`:
- Place your image in `assets/img/`
- Replace `<div class="hero-avatar-placeholder">⚡</div>` with `<img src="assets/img/your-photo.jpg" alt="Rayen Dhahri" class="hero-avatar">`

## Customization

- **Colors:** Edit CSS variables in `:root` at the top of `css/style.css`
- **Fonts:** Change the Google Fonts import and `--font-*` variables
- **Particles:** Adjust `PARTICLE_COUNT` and `CONNECTION_DIST` in `js/main.js`
- **Typing effect:** Edit the `strings` array in `js/main.js`

## License

Feel free to use and modify for your personal site.
