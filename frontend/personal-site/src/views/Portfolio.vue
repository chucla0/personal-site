<template>
  <div class="portfolio">
    <div class="container">
      <div class="section-header">
        <span class="prompt">~$</span>
        <span class="command">ls -la ./projects/</span>
      </div>

      <div class="projects-grid">
        <div class="project-card" v-for="project in projects" :key="project.id">
          <div class="file-header">
            <span class="file-type">{{ project.type }}</span>
            <span class="file-name">{{ $t(project.titleKey) }}</span>
          </div>
          <div class="file-content">
            <div class="code-preview">
              <span class="comment">// {{ $t(project.descKey) }}</span>
            </div>
            <div class="file-meta">
              <span class="meta-label">stack:</span>
              <div class="tech-tags">
                <span
                  class="tech-tag"
                  v-for="tag in project.tags.split(', ')"
                  :key="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="file-actions">
              <a href="#" class="action-link">
                <Code :size="16" /> {{ $t("projects.view_code") }}
              </a>
              <a href="#" class="action-link secondary">
                <Rocket :size="16" /> {{ $t("projects.view_demo") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Code, Rocket } from "lucide-vue-next";

const { t } = useI18n();

const projects = ref([
  {
    id: 1,
    type: ".unity",
    titleKey: "projects.project1_name",
    descKey: "projects.project1_desc",
    tags: t("projects.project1_tech"),
  },
  {
    id: 2,
    type: ".vue",
    titleKey: "projects.project2_name",
    descKey: "projects.project2_desc",
    tags: t("projects.project2_tech"),
  },
  {
    id: 3,
    type: ".java",
    titleKey: "projects.project3_name",
    descKey: "projects.project3_desc",
    tags: t("projects.project3_tech"),
  },
]);
</script>

<style scoped>
.portfolio {
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--bg-primary);
}

.container {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.project-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.project-card:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 8px 30px rgba(var(--accent-hover-rgb), 0.3);
  transform: translateY(-5px);
}

.file-header {
  background: var(--bg-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border-color);
  font-family: "JetBrains Mono", monospace;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-type {
  color: var(--accent-yellow);
  font-weight: 700;
  font-size: 0.85rem;
}

.file-name {
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
}

.file-content {
  padding: 1.5rem;
  font-family: "JetBrains Mono", monospace;
}

.code-preview {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-left: 3px solid var(--accent-pink);
  border-radius: 4px;
}

.comment {
  color: var(--text-secondary);
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.6;
}

.file-meta {
  margin-bottom: 1.5rem;
}

.meta-label {
  color: var(--accent-cyan);
  font-size: 0.85rem;
  display: block;
  margin-bottom: 0.75rem;
}

.tech-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  background: var(--bg-tertiary);
  color: var(--accent-yellow);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.tech-tag:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 0 10px rgba(var(--accent-hover-rgb), 0.3);
}

.file-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.action-link {
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  color: var(--accent-cyan);
  text-decoration: none;
  border: 2px solid var(--accent-cyan);
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-link:hover {
  background: var(--accent-hover);
  color: var(--bg-primary);
  box-shadow: 0 0 15px rgba(var(--accent-hover-rgb), 0.5);
}

.action-link.secondary {
  border-color: var(--accent-pink);
  color: var(--accent-pink);
}

.action-link.secondary:hover {
  background: var(--accent-pink);
  box-shadow: 0 0 15px rgba(255, 106, 193, 0.5);
}

.icon {
  font-size: 1rem;
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

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .file-actions {
    flex-direction: column;
  }
}
</style>
