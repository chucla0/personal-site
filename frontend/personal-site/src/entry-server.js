// Renders the plain pages to HTML at build time (see scripts/prerender.mjs)
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import i18n from './i18n'
import { projects } from './projects'
import Overview from './views/Overview.vue'
import Project from './views/Project.vue'

const empty = { render: () => null }

export async function pages() {
  const t = i18n.global.t
  const list = [
    { path: '/', view: Overview, title: t('meta.title'), description: t('meta.description') },
    { path: '/resumen', view: Overview, title: `${t('nav.overview')} | Izan de la Cruz`, description: t('meta.description') },
    ...projects.map((p) => ({ path: `/${p.key}`, view: Project, props: { slug: p.key }, title: `${t(`projects.${p.key}_name`)} | Izan de la Cruz`, description: t(`projects.${p.key}_desc`) }))
  ]
  for (const page of list) {
    const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:any(.*)*', component: empty }] })
    await router.push(page.path)
    page.html = await renderToString(createSSRApp({ render: () => h(page.view, page.props) }).use(router).use(i18n))
  }
  return list
}
