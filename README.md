# [YOUR NAME] — portfolio

A static, zero-build personal portfolio with a Transformer / attention theme.
Pure HTML, CSS, and vanilla JavaScript. No frameworks, no dependencies, no
trackers, no build step. Everything is deployed straight from the `docs/`
folder on GitHub Pages.

**Concept — “Depth”:** the page is a forward pass through a network. The hero is
the embedding layer (L0), and each section moves one layer deeper: attention,
key/value space, the residual stream, output tokens, and the final output. The
hero has a cursor-reactive attention heatmap and a temperature slider; the
projects section has a simulated attention map that links projects to skills;
a small loss curve draws itself on scroll.

---

## Quick start

Preview locally (Python is all you need):

```bash
cd /home/om/website
python3 -m http.server 8000 --directory docs
```

Open <http://localhost:8000>.

If you have Node.js instead, either of these works:

```bash
npx serve docs
# or
npx http-server docs -p 8000
```

Stop the server with `Ctrl+C`.

---

## 1. Edit your content

**You only need to edit `docs/content.js`.** Every visible string is there,
with comments explaining each field. Replace the `[SQUARE BRACKET]` placeholders.

What lives where:

| Field | Used for |
| --- | --- |
| `meta` | Browser tab, search/social previews, name, role, location, email |
| `hero` | Headline, typed line, summary, buttons, status, temperature copy |
| `about` | Paragraphs, facts sidebar, optional pull quote |
| `projects` | Project cards, links, stack tags, and which skills each project “attends” to |
| `skills` | Grouped skill chips |
| `experience` / `education` | Timelines |
| `writing` | Optional writing list. Set `items: []` to hide the section |
| `contact` | Email and social links |
| `footer` | Model-card metadata and last-updated line |

### Important: project ↔ skill matching

The attention map connects a project to a skill when the **exact same string**
appears in both:

```js
// content.js
projects.items[0].skills: ["[SKILL 01]", "[SKILL 02]"]
skills.groups[0].items:     ["[SKILL 01]", "[SKILL 02]", "[SKILL 03]"]
```

The first skill in a project’s list gets the strongest attention weight.
The matrix shows up to 10 unique skills, labelled `S1…S10`. Hover a cell for
the full skill name; the readout below the matrix names them in full.

### Placeholder links

Links containing `[ ]` or `< >` are rendered as plain text and marked “Add link”
instead of becoming dead links. Replace them with real URLs:

```js
href: "https://github.com/your-handle/project"
```

External links open in a new tab with `rel="noopener noreferrer"`.

### Other things you may want to change

- **Default temperature:** `value="0.9"` on the range input in `docs/index.html`.
- **Default theme:** dark. The light (warm beige) theme is remembered in
  `localStorage`.
- **Colours and type:** all design tokens are at the top of
  `docs/css/styles.css` under `:root` and `html[data-theme="light"]`.
- **No external fonts:** the site uses a system sans stack and a system mono
  stack, so there are no font requests to block rendering.
- **Favicon:** `docs/assets/favicon.svg`.

---

## 2. Publish on GitHub Pages

This project is set up to deploy from the **`docs/` folder on the `main`
branch** — the simplest option for a static site with no build step.

### First-time publish

Create an empty repository on GitHub first (no README, no `.gitignore`), then:

```bash
cd /home/om/website
git init -b main
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Then in the GitHub repository:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/docs`**.
4. Click **Save**.
5. Wait for the first deploy (usually under a minute).

Your site will be at:

```
https://<username>.github.io/<repo>/
```

If you name the repository `<username>.github.io`, it will be served at
`https://<username>.github.io/` instead.

### Updating the site

```bash
cd /home/om/website
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages redeploys automatically. Hard-refresh (Ctrl/Cmd + Shift + R) if
you don’t see changes immediately.

### After the first deploy

Update `meta.siteUrl` in `docs/content.js` to your real Pages URL, and update
the placeholder `og:url` in `docs/index.html`. Commit and push again.

### Custom domain (optional)

Add a file `docs/CNAME` containing your domain (for example
`www.yourdomain.com`), configure the DNS records GitHub documents, and set the
custom domain in **Settings → Pages**.

---

## 3. Project structure

```
website/
├── README.md
├── .gitignore
└── docs/                  ← this folder is published by GitHub Pages
    ├── index.html         semantic markup + static nav
    ├── content.js         ← EDIT THIS FILE
    ├── .nojekyll          tells Pages to serve files as-is
    ├── css/
    │   └── styles.css     design tokens, layout, responsive, reduced motion
    ├── js/
    │   └── main.js        rendering, interactions, attention map, canvas
    └── assets/
        └── favicon.svg
```

There is no build step and no `node_modules`. GitHub Pages serves the files
exactly as they are.

---

## 4. How the interactions work

| Interaction | Implementation |
| --- | --- |
| Token-by-token hero typing | `setTimeout` loop in `main.js`; completed instantly for reduced motion |
| Cursor attention heatmap | Each headline token gets a `--heat` CSS variable based on cursor distance and temperature |
| Attention canvas | Canvas 2D grid, one redraw per pointer frame (no continuous loop), DPR capped at 2, paused offscreen, static first frame for reduced motion |
| Temperature slider | Changes the Gaussian spread of the token heat, canvas heatmap, and glow radius |
| Project ↔ skill attention map | Generated from matching strings in `content.js`; supports project tabs and keyboard-accessible skill buttons |
| Loss curve | SVG path with `stroke-dashoffset`, triggered once by `IntersectionObserver` |
| Scroll reveals | `IntersectionObserver` + CSS transitions; motion only under `prefers-reduced-motion: no-preference` |
| Nav progress / active section | CSS scroll timeline where supported; active nav via `IntersectionObserver` |

### Accessibility notes

- Semantic landmarks, one `h1`, labelled sections, skip link.
- All interactive controls are real buttons or links with visible focus rings.
- The attention canvas and matrix are decorative; the same relationships are
  written in text in the live readout and the project stack lists.
- `prefers-reduced-motion: reduce` removes typing, reveals, pulsing, and canvas
  pointer motion, and shows the final states immediately.
- Theme is toggleable and persisted. Colour tokens target WCAG AA contrast.
- Content is rendered with JavaScript. A `<noscript>` note explains this.

---

## 5. Lighthouse

The site ships no images, web fonts, or third-party scripts, and the JavaScript
is small. A local Chrome audit of this build measured:

- **axe-core:** 0 accessibility violations (colour contrast checked manually
  against the token palette; axe cannot resolve the decorative gradients).
- **Mobile, 4× CPU throttle + slow 4G:** LCP ≈ 0.56s, CLS ≈ 0.001, no long
  tasks after load, ~107 KB of local assets.
- **Desktop:** LCP ≈ 0.08s, no console errors, no horizontal overflow from
  360px to 1440px.

To keep the score high:

- Run Lighthouse against the **deployed HTTPS URL** (or `localhost`), in an
  incognito window with extensions disabled.
- Keep large images out of `assets/` unless necessary; if you add project
  screenshots, use WebP/AVIF, explicit `width`/`height`, and `loading="lazy"`.
- Avoid adding analytics scripts or heavy animation libraries.

---

## 6. Placeholder checklist

Search `docs/content.js` for `[` and replace:

- [ ] Name, role, location, availability, email
- [ ] Hero typed line, summary, status
- [ ] About paragraphs, facts, quote
- [ ] Project titles, descriptions, years, links, stack, skills
- [ ] Skill group names and items (keep project references matching)
- [ ] Experience and education entries
- [ ] Writing posts (or set `items: []`)
- [ ] Contact links and résumé URL
- [ ] Footer metadata and last-updated date
- [ ] `meta.siteUrl` and the `og:url` in `index.html` after deploying

---

Built with HTML, CSS, and vanilla JavaScript. No trackers.
