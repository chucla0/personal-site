<template>
  <div class="home">
    <div class="hero">
      <h1 class="title">Bienvenido a mi Portfolio</h1>
      <p class="subtitle">Desarrollador Web</p>
      <div class="cta-buttons">
        <router-link to="/portfolio" class="btn btn-primary"
          >Ver Proyectos</router-link
        >
        <router-link to="/about" class="btn btn-secondary"
          >Sobre Mí</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí puedes agregar la lógica de tu componente
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.hero {
  padding: 2rem;
  animation: fadeIn 1s ease-in;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  animation: slideDown 0.8s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: slideUp 0.8s ease-out;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1.2s ease-in;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }
}
</style>
