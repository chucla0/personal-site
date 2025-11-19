<template>
  <div class="portfolio">
    <div class="container">
      <h1 class="page-title">Mi Portfolio</h1>
      <p class="subtitle">Proyectos en los que he trabajado</p>

      <div class="projects-grid">
        <div class="project-card" v-for="project in projects" :key="project.id">
          <div class="project-image">
            <div class="placeholder">{{ project.icon }}</div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="tags">
              <span class="tag" v-for="tag in project.tags" :key="tag">{{
                tag
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const projects = ref([
  {
    id: 1,
    title: "Proyecto E-commerce",
    description:
      "Tienda online completa con carrito de compras y pasarela de pago.",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    icon: "🛒",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Panel de control con gráficos y estadísticas en tiempo real.",
    tags: ["React", "D3.js", "Firebase"],
    icon: "📊",
  },
  {
    id: 3,
    title: "App de Tareas",
    description:
      "Aplicación para gestionar tareas diarias con sincronización en la nube.",
    tags: ["Vue.js", "Vuex", "API REST"],
    icon: "✅",
  },
  {
    id: 4,
    title: "Blog Personal",
    description: "Blog con sistema de comentarios y categorías.",
    tags: ["Vue.js", "Markdown", "SEO"],
    icon: "📝",
  },
]);
</script>

<style scoped>
.portfolio {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
  animation: fadeIn 0.8s ease-in;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  animation: slideUp 1s ease-out;
}

.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.project-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.project-card:hover .project-image {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.placeholder {
  font-size: 5rem;
  animation: float 3s ease-in-out infinite;
}

.project-content {
  padding: 2rem;
}

.project-content h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #e8eaf6;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #667eea;
  color: white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
