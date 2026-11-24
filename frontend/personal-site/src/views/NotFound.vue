<template>
  <div class="not-found">
    <div class="container">
      <h1 class="sr-only">{{ $t("not_found.title") }}</h1>
      <div class="section-header" aria-hidden="true">
        <span class="prompt">~$</span>
        <span class="command">cd {{ $route.path }}</span>
      </div>
      <p class="message">{{ $t("not_found.message") }}</p>
      <router-link to="/" class="home-link">
        <span aria-hidden="true">cd ~</span> {{ $t("not_found.back_home") }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--bg-primary);
  font-family: "JetBrains Mono", monospace;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  overflow-wrap: anywhere;
}

.prompt {
  color: var(--accent-cyan);
  margin-right: 0.5rem;
}

.command {
  color: var(--accent-pink);
}

.message {
  color: var(--text-primary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  background: var(--bg-tertiary);
  color: var(--accent-cyan);
  border: 2px solid var(--accent-cyan);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
}

.home-link:hover {
  background: var(--accent-hover);
  color: var(--bg-primary);
}

@media (max-width: 768px) {
  .section-header {
    font-size: 1.5rem;
  }
}
</style>
