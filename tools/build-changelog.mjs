// Regenerates changelog.html from the app repo's CHANGELOG.md.
// Usage (from this repo's root):
//   node tools/build-changelog.mjs ../Noctivago/CHANGELOG.md
// Shows the newest RECENT_COUNT releases in full and links to the rest.
import fs from 'node:fs'

const RECENT_COUNT = 15
const FULL_URL = 'https://github.com/Venari-Hunt/Noctivago/blob/master/CHANGELOG.md'

const source = process.argv[2]
if (!source) throw new Error('Pass the path to the app repo\'s CHANGELOG.md')
const md = fs.readFileSync(source, 'utf8')

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const inline = (s) =>
  escape(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

const releases = []
for (const line of md.split(/\r?\n/)) {
  const head = line.match(/^## (v\d+\.\d+\.\d+)\s*[—-]\s*(.*)$/)
  if (head) {
    releases.push({ version: head[1], title: head[2], bullets: [] })
  } else if (releases.length && line.startsWith('- ')) {
    releases[releases.length - 1].bullets.push(line.slice(2))
  }
}
if (releases.length === 0) throw new Error('No releases found in ' + source)

const recent = releases.slice(0, RECENT_COUNT)
const body = recent
  .map((r) => `    <h2 id="${r.version}">${r.version} — ${inline(r.title)}</h2>
    <ul>
${r.bullets.map((b) => `      <li>${inline(b)}</li>`).join('\n')}
    </ul>`)
  .join('\n\n')

// Page shell (header/nav/footer) comes from faq.html so the nav stays in sync.
const faq = fs.readFileSync('faq.html', 'utf8')
const head = faq
  .slice(0, faq.indexOf('<main>'))
  .replace(/<title>[^<]*<\/title>/, '<title>What\'s New — Noctívago Docs</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Recent Noctívago releases: new features and fixes, newest first.">')
  .replace('/faq.html">', '/changelog.html">')
  .replace('<a href="faq.html" class="active">FAQ</a>', '<a href="faq.html">FAQ</a>')
  .replace('<a href="changelog.html">', '<a href="changelog.html" class="active">')
const tail = faq.slice(faq.indexOf('</main>'))

const html = `${head}<main>
  <div class="wrap">
    <h1>What's new</h1>
    <p class="subtitle">The ${recent.length} most recent releases, newest first. The app updates itself; see the <a href="${FULL_URL}">full changelog</a> for every release since the first one.</p>

${body}

    <p><a href="${FULL_URL}">Older releases →</a></p>
  </div>
</main>

${tail}`
fs.writeFileSync('changelog.html', html)
console.log(`changelog.html: ${recent.length} of ${releases.length} releases (newest ${recent[0].version})`)
