# [YOUR NAME] — portfolio

A static, zero-build personal portfolio: HTML, CSS, and vanilla JavaScript,
deployed straight from `docs/` on GitHub Pages. No frameworks, no bundler,
no trackers.

The page uses a warm editorial layout on a grid-paper background image. The
top navigation has three tabs: **about**, **projects**, and **writing**.
Clicking a project title opens a side drawer with the long description, media,
tags, and links.

---

## Quick start

Preview locally (Python is all you need):

```bash
cd /home/om/website
python3 -m http.server 8000 --directory docs
```

Open <http://localhost:8000>. Stop the server with `Ctrl+C`.

With Node.js instead:

```bash
npx serve docs
# or
npx http-server docs -p 8000
```

---

## 1. Edit your content

**You only need to edit `docs/content.js`.** Every visible string is there,
with comments explaining each field. Replace the `[SQUARE BRACKET]` placeholders.

| Field | Used on the page |
| --- | --- |
| `meta` | Browser tab, description, name, role, location, optional avatar |
| `hero` | Headline, typed line, summary |
| `about` | Paragraphs, fact list, and optional portrait photo |
| `projects` | Project list and the side drawer |
| `writing` | Writing list |
| `footer` | Small footer line |

`skills`, `experience`, `education`, and `contact` are still in `content.js`
but are not rendered while the navigation is limited to about / projects /
writing. Set `writing.items: []` to hide the writing section and its tab.

### Add your photo

Put the image in `docs/assets/` (for example `docs/assets/me.jpg`), then set
the `photo` field inside `about` in `docs/content.js`:

```js
photo: "assets/me.jpg",
photoAlt: "Portrait of Your Name",
photoCaption: "", // optional line under the photo
```

The photo appears below the About text and above Projects. It is capped at
340px wide, keeps its aspect ratio, and scales down on mobile. Leave `photo`
empty to hide it.

### Project drawer fields

Each project can include:

```js
{
  title: "Project name",
  year: "2026",
  description: "Short line shown in the list.",
  longDescription: "Longer text shown inside the drawer.",
  skills: ["Skill A", "Skill B"],      // shown as tags
  media: "assets/project.jpg",          // optional image, or .mp4/.webm/.ogg
  href: "https://example.com",          // live demo
  repo: "https://github.com/...",       // source
  linkLabel: "visit site"
}
```

Links containing `[ ]` or `< >` are rendered as plain text marked “pending”
instead of dead links. External links open in a new tab.

### Background image

The page background is `docs/assets/grid-bg.jpg`, applied in `docs/styles.css`:

```css
background-image:
  linear-gradient(var(--veil), var(--veil)),
  url("assets/grid-bg.jpg");
```

`--veil` is a translucent cream layer that keeps the grid and pink stripe
visible while preserving text contrast. Adjust it at the top of
`docs/styles.css` if you swap in a different image.

### Other things to change

- **Colours and type:** design tokens at the top of `docs/styles.css` (`:root`).
- **Fonts:** IBM Plex Mono is loaded from Google Fonts in `docs/index.html`.
  Remove those three `<link>` tags to fall back to the system mono stack.
- **Favicon:** `docs/assets/favicon.svg`.
- **Page title and description:** also set from `content.js` at load time.

---

## 2. Publish on GitHub Pages

This project deploys from the **`docs/` folder on `main`**.

### First-time publish

Create an empty repository on GitHub first, then:

```bash
cd /home/om/website
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Then in the repository:

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` — **Folder:** `/docs`
4. **Save**

The site appears at `https://<username>.github.io/<repo>/`. If the repository
is named `<username>.github.io`, it is served at the root domain instead.

### Updating

```bash
cd /home/om/website
git add .
git commit -m "Update portfolio"
git push
```

Hard-refresh (Ctrl/Cmd + Shift + R) if changes do not appear immediately.

### Custom domain (optional)

Add `docs/CNAME` containing your domain, configure the DNS records GitHub
documents, and set the domain under **Settings → Pages**.

---

## 3. Project structure

```
website/
├── README.md
├── .gitignore
└── docs/                  ← published by GitHub Pages
    ├── index.html         page shell and drawer markup
    ├── content.js         ← EDIT THIS FILE
    ├── main.js            renders sections, nav, and project drawer
    ├── styles.css         theme, grid-paper background, responsive rules
    ├── .nojekyll          serve files as-is
    └── assets/
        ├── grid-bg.jpg    page background
        └── favicon.svg
```

There is no build step and no `node_modules`.

---

## 4. Accessibility notes

- Semantic `header` / `main` / `footer`, one `h1`, labelled nav, skip link.
- Project titles are real buttons; the drawer traps nothing but closes with
  Escape and returns focus to the project title.
- The closed drawer uses `aria-hidden` plus `inert`, so its controls are not
  focusable until opened.
- Colour tokens target WCAG AA contrast over the veiled background.
- Content is rendered with JavaScript; a `<noscript>` note explains this.
- The page respects `prefers-reduced-motion` for the smooth scrolling.

A Chrome + axe-core check of the current build reports **0 violations**.

---

## 5. Placeholder checklist

Search `docs/content.js` for `[` and replace:

- [ ] Name, role, location, email
- [ ] Hero line and summary
- [ ] About paragraphs and facts
- [ ] Project titles, descriptions, years, tags, links and media
- [ ] Writing posts (or set `items: []`)
- [ ] Footer line

---

Built with HTML, CSS, and vanilla JavaScript. No trackers.
