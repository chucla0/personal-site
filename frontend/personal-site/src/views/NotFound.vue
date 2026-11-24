<template>
  <main class="not-found">
    <h1 class="big">{{ $t('not_found.title') }}</h1>
    <p>{{ $t('not_found.message') }}</p>
    <router-link to="/" class="pill">{{ $t('not_found.back_home') }}</router-link>
  </main>
</template>

<style scoped>
.not-found { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 22px; padding: 24px clamp(18px, 5vw, 80px); background: var(--w2); color: var(--k2); }
.big { font-size: clamp(46px, 9vw, 150px); white-space: normal; }
.pill { text-decoration: none; background: var(--k2); color: var(--w2); }
:focus-visible { outline-color: var(--k2); }
</style>
