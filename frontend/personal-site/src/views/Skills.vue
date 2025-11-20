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
            <a
              v-for="skill in languages"
              :key="skill.name"
              :href="skill.link"
              target="_blank"
              class="skill-item"
            >
              <i :class="skill.icon" class="skill-icon"></i>
              <span class="skill-name">{{ skill.name }}</span>
            </a>
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
            <a
              v-for="skill in frameworks"
              :key="skill.name"
              :href="skill.link"
              target="_blank"
              class="skill-item"
            >
              <i :class="skill.icon" class="skill-icon"></i>
              <span class="skill-name">{{ skill.name }}</span>
            </a>
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
            <a
              v-for="skill in tools"
              :key="skill.name"
              :href="skill.link"
              target="_blank"
              class="skill-item"
            >
              <i :class="skill.icon" class="skill-icon"></i>
              <span class="skill-name">{{ skill.name }}</span>
            </a>
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
            <a
              v-for="skill in databases"
              :key="skill.name"
              :href="skill.link"
              target="_blank"
              class="skill-item"
            >
              <i :class="skill.icon" class="skill-icon"></i>
              <span class="skill-name">{{ skill.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const languages = ref([
  { name: "Java", icon: "devicon-java-plain", link: "https://www.java.com/" },
  { name: "C#", icon: "devicon-csharp-plain", link: "https://docs.microsoft.com/en-us/dotnet/csharp/" },
  { name: "JavaScript", icon: "devicon-javascript-plain", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Python", icon: "devicon-python-plain", link: "https://www.python.org/" },
  { name: "HTML/CSS", icon: "devicon-html5-plain-wordmark", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
]);

const frameworks = ref([
  { name: "Vue.js", icon: "devicon-vuejs-plain", link: "https://vuejs.org/" },
  { name: "Node.js", icon: "devicon-nodejs-plain", link: "https://nodejs.org/" },
  { name: "Unity", icon: "devicon-unity-original", link: "https://unity.com/" },
  { name: "Unity WebGL", icon: "devicon-html5-plain", link: "https://unity.com/solutions/webgl" },
  { name: "Mirror", icon: "devicon-github-original", link: "https://mirror-networking.com/" },
  { name: "Android SDK", icon: "devicon-android-plain", link: "https://developer.android.com/" },
  { name: "API REST", icon: "fas fa-cogs", link: "#" },
  { name: "Microservices", icon: "fas fa-network-wired", link: "#" },
  { name: "Sequelize", icon: "devicon-sequelize-plain", link: "https://sequelize.org/" },
]);

const tools = ref([
  { name: "Git", icon: "devicon-git-plain", link: "https://git-scm.com/" },
  { name: "VS Code", icon: "devicon-visualstudio-plain", link: "https://code.visualstudio.com/" },
  { name: "Docker", icon: "devicon-docker-plain", link: "https://www.docker.com/" },
  { name: "ThunderClient", icon: "fas fa-bolt", link: "https://www.thunderclient.com/" },
  { name: "GitHub Actions", icon: "devicon-github-original", link: "https://github.com/features/actions" },
  { name: "Adminer", icon: "fas fa-database", link: "https://www.adminer.org/" },
  { name: "Mongo Express", icon: "devicon-mongodb-plain", link: "https://github.com/mongo-express/mongo-express" },
  { name: "Steamworks", icon: "fab fa-steam", link: "https://partner.steamgames.com/" },
]);

const databases = ref([
  { name: "MySQL", icon: "devicon-mysql-plain", link: "https://www.mysql.com/" },
  { name: "SQLite", icon: "devicon-sqlite-plain", link: "https://www.sqlite.org/index.html" },
  { name: "MongoDB", icon: "devicon-mongodb-plain", link: "https://www.mongodb.com/" },
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
  color: var(--text-primary);
  text-decoration: none;
}

.skill-item:hover {
  background: var(--bg-tertiary);
  padding-left: 1rem;
}

.skill-icon {
  font-size: 1.5rem;
  color: var(--accent-cyan);
  width: 25px;
  text-align: center;
}

.skill-name {
  flex: 1;
  font-size: 0.95rem;
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
