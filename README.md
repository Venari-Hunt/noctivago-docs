# Noctívago Docs

Public documentation site for [Noctívago](https://venar1.itch.io/noctivago), a Windows ambient
sound mixer. Plain static HTML/CSS, no build step — served via GitHub Pages from this repo's
`main` branch.

Kept separate from the app's own (private) source repo on purpose: this repo only ever holds
documentation content, so it can be public (for real search-engine indexing) without exposing
the app's source.

Live at: https://joaovenari.github.io/noctivago-docs/

## Editing

Every page is a standalone `.html` file with a shared `assets/style.css`. Add a new page by
copying an existing one's header/nav/footer structure, and:
- link it from every other page's `<nav class="site-nav">`
- add it to `sitemap.xml`
