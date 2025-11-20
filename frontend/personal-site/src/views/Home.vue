<template>
  <div class="home">
    <div class="terminal-container">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn red"></span>
          <span class="btn yellow"></span>
          <span class="btn green"></span>
        </div>
        <div class="terminal-title">izan@personal-site:~</div>
      </div>
      <div class="terminal-body">
        <div class="command-line">
          <span class="prompt">~$</span>
          <span class="command">whoami</span>
        </div>
        <div class="output">
          <h1 class="typing-text">{{ displayedName }}</h1>
          <p class="role">{{ $t("hero.title") }}</p>
          <p class="subtitle">{{ $t("hero.subtitle") }}</p>
        </div>
        <div class="command-line">
          <span class="prompt">~$</span>
          <span class="command">ls -la ./actions</span>
        </div>
        <div class="action-buttons">
          <router-link to="/projects" class="terminal-btn">
            <FolderOpen :size="20" />
            {{ $t("hero.cta_projects") }}
          </router-link>
          <router-link to="/contact" class="terminal-btn">
            <Mail :size="20" />
            {{ $t("hero.cta_contact") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { FolderOpen, Mail } from "lucide-vue-next";

const { t } = useI18n();
const displayedName = ref("");
const fullName = ref("");

onMounted(() => {
  fullName.value = t("hero.name");
  typeText();
});

const typeText = () => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < fullName.value.length) {
      displayedName.value += fullName.value.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 100);
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 2rem;
}

.terminal-container {
  width: 100%;
  max-width: 900px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(88, 209, 235, 0.1);
  animation: fadeIn 0.8s ease-out;
}

.terminal-header {
  background: var(--bg-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 6px 6px 0 0;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.btn.red {
  background: #ff5f56;
  box-shadow: 0 0 5px rgba(255, 95, 86, 0.5);
}

.btn.yellow {
  background: #ffbd2e;
  box-shadow: 0 0 5px rgba(255, 189, 46, 0.5);
}

.btn.green {
  background: #27c93f;
  box-shadow: 0 0 5px rgba(39, 201, 63, 0.5);
}

.terminal-title {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.terminal-body {
  padding: 2.5rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

.command-line {
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.prompt {
  color: var(--accent-cyan);
  font-weight: 700;
  margin-right: 0.5rem;
}

.command {
  color: var(--accent-yellow);
}

.output {
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.typing-text {
  font-size: 3rem;
  font-weight: 800;
  color: var(--accent-pink);
  margin-bottom: 1rem;
  font-family: "JetBrains Mono", monospace;
}

.typing-text::after {
  content: "█";
  color: var(--accent-cyan);
  animation: blink 1s infinite;
  margin-left: 4px;
}

.role {
  font-size: 1.4rem;
  color: var(--accent-cyan);
  margin-bottom: 0.75rem;
}

.subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 700px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  padding-left: 1.5rem;
  flex-wrap: wrap;
}

.terminal-btn {
  font-family: "JetBrains Mono", monospace;
  background: var(--bg-tertiary);
  color: var(--accent-cyan);
  border: 2px solid var(--accent-cyan);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.2rem;
}

.terminal-btn:hover {
  background: var(--accent-hover);
  color: var(--bg-primary);
  box-shadow: 0 0 20px rgba(var(--accent-hover-rgb), 0.6);
  transform: translateY(-2px);
}

.terminal-btn:nth-child(2) {
  border-color: var(--accent-pink);
  color: var(--accent-pink);
}

.terminal-btn:nth-child(2):hover {
  background: var(--accent-pink);
  box-shadow: 0 0 20px rgba(255, 106, 193, 0.6);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .terminal-body {
    padding: 1.5rem;
  }

  .typing-text {
    font-size: 2rem;
  }

  .role {
    font-size: 1.1rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .terminal-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
