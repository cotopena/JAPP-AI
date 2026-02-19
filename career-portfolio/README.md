# Career Portfolio Site

This folder is a self-contained personal portfolio website. It does not depend on any scripts, templates, or workflows in the rest of this repository.

## Files

- `index.html`: Page structure and content sections.
- `styles.css`: Visual style, layout, and responsive behavior.
- `script.js`: Interactive timeline, project filtering, and section reveals.

## Run Locally

From this folder:

```bash
cd "/Users/coto/Documents/Job Application AI/career-portfolio"
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Customize Quickly

- Update timeline milestones in `script.js` (`timelineData`).
- Update project cards in `script.js` (`projectData`).
- Replace placeholder links (`repoUrl`, `demoUrl`) with your real links.
- Update contact links in `index.html` footer.

## Deployment

You can deploy this folder independently as:

- a subdomain (`career.yourdomain.com`), or
- a path-based app (`yourdomain.com/career`).

Because this is static HTML/CSS/JS, it works on Netlify, Vercel static hosting, GitHub Pages, Cloudflare Pages, or any simple web server.
