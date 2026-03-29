# HTML Atlas

HTML Atlas is a static website that teaches HTML fundamentals with guided lessons, a quiz, and a separate full-page playground for hands-on practice.
Visit https://willtdevelop.github.io/Learn-HTML/ to view the site!
## What The Project Includes

- A lesson-based homepage in `index.html`
- A 10-question quiz tied directly to the lesson content
- A dedicated playground page in `playground.html`
- Shared light and dark mode across the whole site
- Live editing for HTML, CSS, and JavaScript in separate tabs
- Autosave with `localStorage`
- Starter templates, challenges, hints, and progress tracking

## Playground Features

The playground includes:

- Live preview inside a sandboxed `<iframe>`
- HTML, CSS, and JavaScript tabs
- Run, reset, undo, redo, copy, format, and download actions
- Starter templates
- Device preview modes for desktop, tablet, and mobile
- Syntax highlighting and line numbers through CodeMirror
- Simple autocomplete support
- Shortcut helpers like `!` for boilerplate and `ul>li*3`
- Basic issue detection for common beginner mistakes
- Challenges, XP, badges, and unlockable templates

## Project Files

- `index.html` - the lesson homepage
- `playground.html` - the dedicated editor experience
- `styles.css` - shared styling for the homepage and playground
- `script.js` - homepage quiz logic
- `playground.js` - playground editor logic
- `theme.js` - shared theme mode logic

## How To Run Locally

This project is fully static, so there is no package install or build step.

### Option 1

Open `index.html` or `playground.html` directly in your browser.

### Option 2

Run a local static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The playground uses CodeMirror assets from a CDN for syntax highlighting and editor behavior
- Theme mode is shared across pages with `localStorage`
- Progress and playground code are saved locally in the browser
