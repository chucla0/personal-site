<template>
  <div class="about">
    <div class="container">
      <h1 class="page-title">Sobre Mí</h1>
      <div class="content">
        <div class="profile-section">
          <div class="profile-image">
            <div class="avatar">👨‍💻</div>
          </div>
          <div class="profile-info">
            <h2>Desarrollador Web</h2>
            <p class="description">
              ¡Hola! Soy un desarrollador apasionado por crear experiencias web
              increíbles. Me especializo en tecnologías modernas como Vue.js,
              React, y Node.js.
            </p>
          </div>
        </div>

        <div class="skills">
          <h3>Habilidades</h3>
          <div class="skills-grid">
            <div class="skill-card">Vue.js</div>
            <div class="skill-card">JavaScript</div>
            <div class="skill-card">HTML/CSS</div>
            <div class="skill-card">Node.js</div>
            <div class="skill-card">Git</div>
            <div class="skill-card">Responsive Design</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Lógica del componente About
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeIn 0.8s ease-in;
}

.content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: slideUp 1s ease-out;
}

.profile-section {
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: center;
  flex-wrap: wrap;
}

.profile-image {
  flex-shrink: 0;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1) rotate(5deg);
}

.profile-info {
  flex: 1;
  min-width: 300px;
}

.profile-info h2 {
  color: #667eea;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

.skills h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.skill-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
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

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .content {
    padding: 2rem;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
  }
}
</style>
