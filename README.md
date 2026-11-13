# Om Sontakke — portfolio

A static, zero-build personal portfolio: HTML, CSS, and vanilla JavaScript,
deployed straight from `docs/` on GitHub Pages. No frameworks, no bundler,
no trackers.

The site is split into three pages with a warm editorial layout on a
grid-paper background image. The top-right navigation has three tabs:
**about**, **projects**, and **writing**. Landing text lives on the About
page, while projects (with optional images and videos on the right) and
writing each have their own page.

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
| `hero` | Headline, typed line, summary (About page) |
| `about` | Paragraphs, fact list, and optional portrait photo (About page) |
| `projects` | Project list on `projects.html` |
| `writing` | Writing list on `writing.html` |

### Add your photo

Put the image in `docs/assets/` (for example `docs/assets/me.jpg`), then set
the `photo` field inside `about` in `docs/content.js`:

```js
photo: "assets/me.jpg",
photoAlt: "Portrait of Your Name",
photoCaption: "", // optional line under the photo
```

The photo appears below the About text. It is capped at 340px wide, keeps its
aspect ratio, and scales down on mobile. Leave `photo` empty to hide it.

### Connect links

At the end of the About section, a horizontal line is followed by your social
links. Edit `about.connect` in `docs/content.js`:

```js
connect: [
  { label: "email", href: "mailto:you@example.com" },
  { label: "github", href: "https://github.com/your-handle" },
  { label: "linkedin", href: "https://linkedin.com/in/your-handle" },
  { label: "x", href: "https://x.com/your-handle" },
],
```

Set `connect: []` to hide the line and links entirely.

### Projects and media

Each project on `projects.html` can include text on the left and media on the
right. Set `media` to an array of files placed in `docs/assets/`. Images are
displayed as `<img>`; `.mp4`, `.webm`, and `.ogg` files render as muted,
looping `<video>` players.

```js
{
  title: "Project name",
  year: "2026",
  description: "Short line shown in the list.",
  longDescription: "Longer text shown on the project page.",
  skills: ["Skill A", "Skill B"],                 // shown as tags
  media: ["assets/project-01.jpg", "assets/demo.mp4"],
  mediaAlt: "Screenshot of Project name",         // alt text for images
  mediaCaption: "",                               // optional line under media
  href: "https://example.com",                    // live demo
  repo: "https://github.com/...",                 // source
  linkLabel: "visit site"
}
```

On desktop the copy sits left of the media; under 900px the media stacks below
the text. Leave `media: []` to show text only.

Links containing `[ ]` or `< >` are rendered as plain text marked “pending”
instead of dead links. External links open in a new tab.

### Writing

Add posts to `writing.items`:

```js
{
  date: "Month Year",
  title: "Post title",
  summary: "One sentence about the post.",
  href: "https://example.com/post"
}
```

Set `writing.items: []` and the page shows `writing.empty`, which defaults to
`"stay tuned :)"`.

### Background

The page uses a solid beige background (`--bg: #f2e7d3`) with a faint CSS
grid drawn by repeating gradients in `docs/styles.css`:

```css
background-color: var(--bg);
background-image:
  linear-gradient(rgba(38, 35, 31, 0.045) 1px, transparent 1px),
  linear-gradient(90deg, rgba(38, 35, 31, 0.045) 1px, transparent 1px);
background-size: 80px 80px, 80px 80px;
```

Change `--bg` for a different base colour, adjust the alpha for a stronger or
fainter grid, or change `80px` for a larger/smaller cell size. The old
`docs/assets/grid-bg.jpg` image is no longer used.

### Other things to change

- **Colours and type:** design tokens at the top of `docs/styles.css` (`:root`).
- **About typography:** `body[data-page="about"]` rules in `docs/styles.css`.
- **Fonts:** IBM Plex Mono is loaded from Google Fonts in each HTML page.
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
    ├── index.html         About page (hero + about)
    ├── projects.html      Projects page
    ├── writing.html       Writing page
    ├── content.js         ← EDIT THIS FILE
    ├── main.js            renders nav and page sections
    ├── styles.css         theme, grid-paper background, responsive rules
    ├── .nojekyll          serve files as-is
    └── assets/
        ├── grid-bg.jpg    page background
        └── favicon.svg
```

There is no build step and no `node_modules`.

---

## 4. Accessibility notes

- Semantic `header` / `main`, one `h1` per page, labelled nav, skip link.
- The current page is marked with `aria-current="page"` in the nav.
- Colour tokens target WCAG AA contrast over the veiled background.
- Content is rendered with JavaScript; a `<noscript>` note explains this.
- The site respects `prefers-reduced-motion` for smooth scrolling.

---

## 5. Placeholder checklist

Search `docs/content.js` for `[` and replace:

- [ ] Name, role, location, email
- [ ] Hero line and summary
- [ ] About paragraphs and facts
- [ ] Project titles, descriptions, years, tags, links and media
- [ ] Writing posts (or set `items: []`)

---

Built with HTML, CSS, and vanilla JavaScript. No trackers.
