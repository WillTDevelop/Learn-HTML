# HTML Atlas

HTML Atlas is a static website that teaches people the basics of HTML in a visual, beginner-friendly way.

It includes short lessons on HTML structure, common tags, semantic HTML, forms, and an interactive playground where users can type their own HTML and see the result instantly.

## What This Website Includes

- A landing page that explains what HTML is and why it matters
- Beginner lessons covering the core building blocks of HTML
- A cheat sheet for common tags and page structure
- An interactive HTML playground with live preview
- Editor-style features in the playground:
  - Auto-closing tags like `<h1></h1>`
  - `Tab` inserts spaces for indentation
  - Typing `!` and pressing `Enter` expands a full HTML starter template

## Project Files

- `index.html` - the main website content
- `styles.css` - all visual styling and responsive layout rules
- `script.js` - playground behavior and editor-like interactions

## How To Run Locally

Because this is a static website, there is no build step or dependency install.

### Option 1: Open the file directly

Open `index.html` in your browser.

### Option 2: Run a simple local server

If you want to serve it locally in a more typical web-dev setup, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Who This Is For

This project is for:

- Beginners learning HTML for the first time
- People who want a simple static teaching site
- Anyone who wants to experiment with HTML in a lightweight browser playground

## Notes

- This project uses plain HTML, CSS, and JavaScript
- No framework or package manager is required
- The site is designed to work as a fully static project
