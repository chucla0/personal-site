<template>
  <div class="skills">
    <div class="skills-container">
      <div class="section-header">
        <span class="prompt">~$</span>
        <span class="command">cat skills.config</span>
      </div>

      <div class="skills-grid">
        <!-- Programming Languages -->
        <div class="skill-category">
          <div class="category-header">
            <span class="bracket">[</span>
            <span class="category-name">{{ $t("skills.languages") }}</span>
            <span class="bracket">]</span>
          </div>
          <div class="skill-list">
            <div
              class="skill-item"
              v-for="skill in languages"
              :key="skill.name"
            >
              <span class="bullet">•</span>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Frameworks & Libraries -->
        <div class="skill-category">
          <div class="category-header">
            <span class="bracket">[</span>
            <span class="category-name">{{ $t("skills.frameworks") }}</span>
            <span class="bracket">]</span>
          </div>
          <div class="skill-list">
            <div
              class="skill-item"
              v-for="skill in frameworks"
              :key="skill.name"
            >
              <span class="bullet">•</span>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Tools & Technologies -->
        <div class="skill-category">
          <div class="category-header">
            <span class="bracket">[</span>
            <span class="category-name">{{ $t("skills.tools") }}</span>
            <span class="bracket">]</span>
          </div>
          <div class="skill-list">
            <div class="skill-item" v-for="skill in tools" :key="skill.name">
              <span class="bullet">•</span>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Databases -->
        <div class="skill-category">
          <div class="category-header">
            <span class="bracket">[</span>
            <span class="category-name">{{ $t("skills.databases") }}</span>
            <span class="bracket">]</span>
          </div>
          <div class="skill-list">
            <div
              class="skill-item"
              v-for="skill in databases"
              :key="skill.name"
            >
              <span class="bullet">•</span>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const languages = ref([
  { name: "Java" },
  { name: "C#" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "HTML/CSS" },
]);

const frameworks = ref([
  { name: "Vue.js" },
  { name: "Node.js" },
  { name: "Unity" },
  { name: "Android SDK" },
]);

const tools = ref([
  { name: "Git" },
  { name: "VS Code" },
  { name: "IntelliJ IDEA" },
  { name: "Postman" },
]);

const databases = ref([
  { name: "MySQL" },
  { name: "SQLite" },
  { name: "MongoDB" },
]);
</script>

<style scoped>
.skills {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 6rem 2rem;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  font-family: "JetBrains Mono", monospace;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4rem;
  animation: fadeInDown 0.6s ease-out;
}

.prompt {
  color: var(--accent-cyan);
  margin-right: 0.5rem;
}

.command {
  color: var(--accent-pink);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.skill-category:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 8px 30px rgba(var(--accent-hover-rgb), 0.3);
  transform: translateY(-5px);
}

.category-header {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.bracket {
  color: var(--accent-yellow);
}

.category-name {
  color: var(--accent-cyan);
  margin: 0 0.5rem;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-item {
  font-family: "JetBrains Mono", monospace;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.skill-item:hover {
  background: var(--bg-tertiary);
  padding-left: 1rem;
}

.bullet {
  color: var(--accent-pink);
  font-size: 1.2rem;
}

.skill-name {
  color: var(--text-primary);
  flex: 1;
  font-size: 0.95rem;
}

.skill-icon {
  font-size: 1.3rem;
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
  .section-header {
    font-size: 1.5rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
