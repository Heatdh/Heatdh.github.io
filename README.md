# rayendhahri.com

Rayen Dhahri's research website. Static HTML, CSS, and JavaScript hosted on GitHub Pages at [rayendhahri.com](https://rayendhahri.com). No build step or package installation is required.

## Structure

```text
index.html          Research introduction, selected papers, current work
publications.html   Paper summaries, authors, figures, and resources
about.html          Biography, background, and certifications
projects.html       Research links and filterable engineering archive
cv.html             Experience, education, skills, and printable CV
blog.html           Research and engineering notes
blog/               Individual posts and authoring template
assets/img/         Original paper figures, generated avatar, and landscape
assets/papers/      Papers approved for public distribution
css/style.css       Archive layouts and base styles
css/research.css    Shared editorial theme and responsive research layouts
css/atmosphere.css  Generated landscape, ivory/jade palette, and surface styling
js/main.js          Themes, mobile navigation, filters, and CV printing
feed.xml            RSS feed
sitemap.xml         Search-engine sitemap
```

## Local preview

From the repository directory, run `python -m http.server 8000 --bind 127.0.0.1`, then visit `http://127.0.0.1:8000`. A static server is sufficient.

## Research updates

- The homepage highlights PhysDNet, Quant-Trim, and Shaving Weights. Detailed entries live on `publications.html` with stable anchors.
- Use exact author lists, years, and venue distinctions. Quant-Trim is a EurIPS 2025 **workshop** paper.
- The PhysDNet emergency-response image is an application illustration. Its caption distinguishes that potential application from reported benchmark results.
- Quant-Trim and SpaM use original Figure 1 images extracted from the supplied public papers. All three featured papers have directly accessible PDF files.
- Keep anonymous and unpublished submissions out of the repository, including PDFs, figures, titles, method names, distinctive results, and source notes. Mention ongoing research only in general terms until disclosure is authorized.

## Publishing a note

1. Copy `blog/_post-template.html` to `blog/YYYY-MM-DD-slug.html` and fill every placeholder.
2. Add a card at the top of `blog.html`, using a supported category: `efficient-ai`, `llm`, `deployment`, or `research`.
3. Add the item to `feed.xml` and its URL to `sitemap.xml`.
4. Commit and push to the deployment branch when ready. GitHub Pages publishes the static files.

## Shared design

Every page loads all three stylesheets. The generated landscape coordinates with the Goku-on-Nimbus illustration; original scientific figures remain on clear white surfaces. The light theme is the default; the navigation toggle persists the visitor's choice when storage is available. Content remains visible without JavaScript. Mobile navigation and archive filters use accessible buttons. The CV supports the browser's print/save-as-PDF flow with a dedicated print layout.
