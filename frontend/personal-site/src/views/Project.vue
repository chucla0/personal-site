<template>
  <div class="project" :style="`--w:var(--w${index + 1});--k:var(--k${index + 1})`">
    <PageBar overview />
    <main>
      <h1 class="big">{{ p.word }}</h1>
      <p class="lead">{{ $t(`projects.${p.key}_desc`) }}</p>
      <div class="links">
        <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener">{{ $t('projects.view_demo') }}</a>
        <a v-if="p.code" :href="p.code" target="_blank" rel="noopener">{{ $t('projects.view_code') }}</a>
      </div>

      <figure>
        <img :src="`/shots/${p.shots[0]}.webp`" width="1280" height="800" :alt="$t('projects.shot_alt', { name: $t(`projects.${p.key}_name`) })" />
        <figcaption v-if="p.sample">{{ $t('projects.sample') }}</figcaption>
      </figure>

      <dl>
        <div v-for="n in p.notes" :key="n">
          <dt>{{ $t(`projects.label_${n}`) }}</dt>
          <dd>{{ $t(`projects.${p.key}_${n}`) }}</dd>
        </div>
        <div>
          <dt>{{ $t('projects.label_tech') }}</dt>
          <dd>{{ p.tech }}</dd>
        </div>
      </dl>

      <figure v-if="p.shots[1]">
        <img :src="`/shots/${p.shots[1]}.webp`" width="1280" height="800" loading="lazy" :alt="$t('projects.shot_alt', { name: $t(`projects.${p.key}_name`) })" />
      </figure>
    </main>
    <footer>
      <router-link :to="`/${next.key}`" class="next">{{ $t('projects.next') }} <span class="big">{{ next.word }}</span></router-link>
      <router-link to="/#contact">{{ $t('nav.contact') }}</router-link>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageBar from '@/components/PageBar.vue'
import { projects } from '@/projects'

const props = defineProps({ slug: { type: String, required: true } })
const index = computed(() => projects.findIndex((x) => x.key === props.slug))
const p = computed(() => projects[index.value])
const next = computed(() => projects[(index.value + 1) % projects.length])
</script>

<style scoped>
.project { min-height: 100vh; padding: 0 clamp(18px, 3.2vw, 52px) 48px; background: var(--w); color: var(--k); }
h1 { font-size: clamp(64px, 17vw, 300px); margin: 2vh 0 0.24em; }
.lead { max-width: 30ch; font-size: clamp(22px, 2.5vw, 40px); line-height: 1.22; font-weight: 700; letter-spacing: -0.015em; }
.links { margin: 1.4em 0 2.4em; }
figure { margin: 0 0 clamp(36px, 6vw, 88px); }
img { display: block; width: 100%; height: auto; border-radius: clamp(12px, 2vw, 34px); }
figcaption { margin-top: 12px; }
dl { display: grid; grid-template-columns: repeat(2, minmax(0, 46ch)); gap: 2.2em 6vw; margin: 0 0 clamp(36px, 6vw, 88px); }
dt { font-weight: 700; font-size: 1.25em; margin-bottom: 0.3em; }
dd { margin: 0; }
footer { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 20px; font-weight: 700; }
.next { text-decoration: none; }
.next .big { display: block; font-size: clamp(44px, 8vw, 130px); }
.next:hover .big { text-decoration: underline; text-decoration-thickness: 0.06em; }
.project :focus-visible { outline-color: currentColor; }
@media (max-width: 760px) { dl { grid-template-columns: minmax(0, 1fr); } }
</style>
