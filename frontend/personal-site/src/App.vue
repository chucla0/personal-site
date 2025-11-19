<script setup>
import { ref } from "vue";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">Mi Portfolio</router-link>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>

        <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" @click="mobileMenuOpen = false"
            >Inicio</router-link
          >
          <router-link to="/about" @click="mobileMenuOpen = false"
            >Sobre Mí</router-link
          >
          <router-link to="/portfolio" @click="mobileMenuOpen = false"
            >Portfolio</router-link
          >
        </div>
      </div>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #764ba2;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #667eea;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-links a:hover {
  color: #667eea;
}

.nav-links a.router-link-active {
  color: #667eea;
}

main {
  width: 100%;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-links.mobile-open {
    max-height: 300px;
    padding: 1rem 0;
  }

  .nav-links a {
    padding: 1rem 2rem;
    display: block;
  }

  .nav-links a::after {
    display: none;
  }
}
</style>
