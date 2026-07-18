# rayendhahri.com

Personal website and blog — static HTML/CSS/JS, hosted on GitHub Pages at [rayendhahri.com](https://rayendhahri.com).

## Structure

```
index.html          Home (hero, highlights, latest posts)
about.html          Bio, experience highlights, certifications
projects.html       Featured research + filterable project grid
publications.html   Papers & academic service
cv.html             Experience timeline, education, skills
blog.html           Blog index (filterable by topic)
blog/               Individual posts (one HTML file per post)
feed.xml            RSS feed
sitemap.xml         Sitemap for search engines
css/style.css       Single stylesheet (dark glass theme)
js/main.js          Particles, scroll reveal, nav, typing, filters
```

## Publishing a blog post

1. Copy `blog/_post-template.html` to `blog/YYYY-MM-DD-slug.html` and fill in every `{{PLACEHOLDER}}`.
2. Add a post card at the **top** of the grid in `blog.html` (a ready-to-copy card is in a comment there). Choose a `data-category` from: `efficient-ai`, `llm`, `deployment`, `research`.
3. Update the "Latest Posts" card on `index.html`.
4. Add an `<item>` to `feed.xml` (newest first) and a `<url>` to `sitemap.xml`.
5. Commit and push to `main` — GitHub Pages deploys automatically.

## Notes

- No build step, no dependencies — everything is hand-rolled and served statically.
- The `.stagger-children` / `.reveal` classes handle scroll animations; new cards get them for free inside existing grids.
- **Dark/light theme**: toggled from the navbar, persisted in `localStorage`, defaults to the visitor's OS preference. Every page needs the small inline theme script in `<head>` (copy it from any existing page — the post template already has it).
- **Motion & no-JS**: animations respect `prefers-reduced-motion`, and a `<noscript>` block keeps content visible when JavaScript is off.
