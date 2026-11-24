<template>
  <div class="overview">
    <PageBar />
    <main>
      <h1 class="big">Izan de la Cruz</h1>
      <p class="lead">{{ $t('hero.role') }}</p>
      <div class="links">
        <a href="mailto:iizan.cruzz@gmail.com">iizan.cruzz@gmail.com</a>
        <a href="https://linkedin.com/in/iizancruzz" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/chucla0" target="_blank" rel="noopener">GitHub</a>
      </div>

      <section aria-labelledby="o-projects">
        <h2 id="o-projects">{{ $t('nav.projects') }}</h2>
        <article v-for="p in projects" :key="p.key">
          <router-link :to="`/${p.key}`" tabindex="-1" aria-hidden="true"><img :src="`/shots/${p.shots[0]}.webp`" width="1280" height="800" alt="" loading="lazy" /></router-link>
          <div>
            <h3><router-link :to="`/${p.key}`">{{ $t(`projects.${p.key}_name`) }}</router-link></h3>
            <p>{{ $t(`projects.${p.key}_desc`) }}</p>
            <p>{{ p.tech }}</p>
            <div class="links">
              <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener" :aria-label="`${$t('projects.view_demo')}: ${$t(`projects.${p.key}_name`)}`">{{ $t('projects.view_demo') }}</a>
              <a v-if="p.code" :href="p.code" target="_blank" rel="noopener" :aria-label="`${$t('projects.view_code')}: ${$t(`projects.${p.key}_name`)}`">{{ $t('projects.view_code') }}</a>
            </div>
          </div>
        </article>
      </section>

      <section aria-labelledby="o-about">
        <h2 id="o-about">{{ $t('about.title') }}</h2>
        <div class="facts">
          <p v-for="f in ['study', 'work', 'also']" :key="f"><strong>{{ $t(`about.${f}_title`) }}</strong> {{ $t(`about.${f}`) }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import PageBar from '@/components/PageBar.vue'
import { projects } from '@/projects'
</script>

<style scoped>
.overview { min-height: 100vh; padding: 0 clamp(18px, 3.2vw, 52px) 60px; background: var(--paper); color: var(--ink); }
h1 { font-size: clamp(44px, 9vw, 150px); margin: 2vh 0 0.2em; white-space: normal; }
.lead { max-width: 34ch; font-size: clamp(20px, 2vw, 32px); line-height: 1.25; font-weight: 700; }
main > .links { margin: 1em 0 2.4em; }
h2 { font: 400 clamp(32px, 4.4vw, 70px)/1 "Bagel Fat One", system-ui, sans-serif; margin: 1.2em 0 0.6em; }
article { display: grid; grid-template-columns: minmax(0, 30vw) minmax(0, 56ch); gap: 20px clamp(20px, 4vw, 64px); margin-bottom: clamp(28px, 4vw, 56px); }
article img { display: block; width: 100%; height: auto; border-radius: clamp(10px, 1.2vw, 20px); }
h3 { font-size: 1.4em; margin: 0 0 0.3em; }
article p { margin-bottom: 0.5em; }
.facts { display: grid; grid-template-columns: repeat(3, minmax(0, 34ch)); gap: 1.4em 4vw; }
.facts strong { display: block; }
@media (max-width: 760px) {
  article, .facts { grid-template-columns: minmax(0, 1fr); }
}
</style>
