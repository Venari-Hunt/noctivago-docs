# Noctívago Docs

Public documentation site for [Noctívago](https://venar1.itch.io/noctivago), a Windows ambient
sound mixer. Plain static HTML/CSS, no build step — served via GitHub Pages from this repo's
`main` branch.

Kept in a separate repo from the app's own source ([Venari-Hunt/Noctivago](https://github.com/Venari-Hunt/Noctivago), also public) on purpose: this repo only ever holds documentation content.

Live at: https://venari-hunt.github.io/noctivago-docs/

## Editing

Every page is a standalone `.html` file with a shared `assets/style.css`. Add a new page by
copying an existing one's header/nav/footer structure, and:
- link it from every other page's `<nav class="site-nav">`
- add it to `sitemap.xml`

## What's new page

`changelog.html` is generated from the app repo's `CHANGELOG.md` (newest 15 releases). After each
app release, regenerate it and commit:

```
node tools/build-changelog.mjs <path to the app repo>/CHANGELOG.md
```

It copies the header/nav/footer from `faq.html`, so update the nav there first when adding a page.
