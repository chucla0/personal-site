// Runs after the build: writes readable HTML for each page, plus robots.txt and sitemap.xml
import fs from 'node:fs'
import { pages } from '../dist-ssr/entry-server.js'

const SITE = 'https://izandelacruz.dev.ar'
const template = fs.readFileSync('dist/index.html', 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const swap = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in index.html`)
  return html.replace(pattern, () => value)
}

const list = await pages()
for (const page of list) {
  const url = SITE + page.path
  let html = swap(template, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`)
  html = swap(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(page.description)}">\n    <link rel="canonical" href="${url}">`)
  html = swap(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(page.title)}">`)
  html = swap(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(page.description)}">`)
  html = swap(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`)
  html = swap(html, /<div id="app"><\/div>/, `<div id="app">${page.html}</div>`)
  fs.writeFileSync(page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`, html)
}
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`)
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list.map((p) => `  <url><loc>${SITE}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`)
console.log(`prerendered ${list.length} pages`)
