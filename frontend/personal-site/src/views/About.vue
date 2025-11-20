<template>
  <div class="about">
    <div class="container">
      <div class="section-header">
        <div class="command-line">
          <span class="prompt">~$</span>
          <span class="command">cat about.md</span>
        </div>
      </div>

      <div class="content-grid">
        <!-- Education Section -->
        <div class="code-block">
          <div class="block-header">
            <GraduationCap :size="20" class="file-icon" />
            <span class="file-name">education.json</span>
          </div>
          <div class="block-content">
            <pre><code>{
  <span class="key">"studies"</span>: [
    {
      <span class="key">"degree"</span>: <span class="string">"DAM"</span>,
      <span class="key">"description"</span>: <span class="string">"{{ $t('about.education_dam') }}"</span>
    },
    {
      <span class="key">"degree"</span>: <span class="string">"DAW"</span>,
      <span class="key">"description"</span>: <span class="string">"{{ $t('about.education_daw') }}"</span>
    }
  ]
}</code></pre>
          </div>
        </div>

        <!-- Experience Section -->
        <div class="code-block">
          <div class="block-header">
            <Briefcase :size="20" class="file-icon" />
            <span class="file-name">experience.ts</span>
          </div>
          <div class="block-content">
            <pre><code><span class="keyword">const</span> <span class="variable">experience</span> = {
  <span class="key">description</span>: <span class="string">"{{ $t('about.experience_text') }}"</span>,
  <span class="key">technologies</span>: [<span class="string">"Unity"</span>, <span class="string">"C#"</span>, <span class="string">"Vue.js"</span>]
};</code></pre>
          </div>
        </div>

        <!-- Interests Section -->
        <div class="code-block">
          <div class="block-header">
            <Rocket :size="20" class="file-icon" />
            <span class="file-name">interests.py</span>
          </div>
          <div class="block-content">
            <pre><code><span class="keyword">def</span> <span class="function">my_interests</span>():
    <span class="keyword">return</span> <span class="string">"""
    {{ $t('about.interests_text') }}
    """</span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GraduationCap, Briefcase, Rocket } from "lucide-vue-next";
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--bg-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease-out;
}

.command-line {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.5rem;
  font-weight: 700;
}

.prompt {
  color: var(--accent-cyan);
  margin-right: 0.5rem;
}

.command {
  color: var(--accent-pink);
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.code-block {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.code-block:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 8px 30px rgba(var(--accent-hover-rgb), 0.3);
  transform: translateY(-5px);
}

.block-header {
  background: var(--bg-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "JetBrains Mono", monospace;
}

.file-icon {
  color: var(--accent-cyan);
  flex-shrink: 0;
}

.file-name {
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
}

.block-content {
  padding: 1.5rem;
  overflow-x: auto;
}

.block-content pre {
  margin: 0;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--text-primary);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.block-content code {
  display: block;
}

.key {
  color: var(--accent-cyan);
}

.string {
  color: var(--accent-yellow);
}

.keyword {
  color: var(--accent-pink);
  font-weight: 600;
}

.variable {
  color: var(--accent-purple);
}

.function {
  color: var(--accent-green);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .command-line {
    font-size: 1.2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .block-content pre {
    font-size: 0.8rem;
  }
}
</style>
