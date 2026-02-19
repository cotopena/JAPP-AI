# Tech Stack Decisions

## Current Stack
- HTML: `index.html`
- CSS: `styles.css`
- JavaScript: `script.js`
- Local preview: `python3 -m http.server 8080`

## Decision Principles
- Keep dependencies minimal unless they clearly improve speed or maintainability.
- Preserve static-host compatibility (Netlify, Vercel static, GitHub Pages, Cloudflare Pages).
- Favor progressive enhancement and graceful fallbacks.

## Constraints
- No required backend for core portfolio flows.
- Keep Lighthouse performance impact low when adding assets/scripts.
