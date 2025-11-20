<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const mobileMenuOpen = ref(false);
const languageMenuOpen = ref(false);
const isDark = ref(true);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  languageMenuOpen.value = false;
};

const toggleLanguageMenu = () => {
  languageMenuOpen.value = !languageMenuOpen.value;
};

const changeLanguage = (lang) => {
  locale.value = lang;
  languageMenuOpen.value = false;
  mobileMenuOpen.value = false;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  applyTheme();
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }
  applyTheme();
});

const languages = {
  es: "ES",
  ca: "CA",
  en: "EN",
};

const langKeys = Object.keys(languages);

const cycleLanguage = () => {
  const currentIndex = langKeys.indexOf(locale.value);
  const nextIndex = (currentIndex + 1) % langKeys.length;
  locale.value = langKeys[nextIndex];
};
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="prompt">~$</span>
          <span class="logo-name">izan.dev</span>
        </router-link>

        <div class="mobile-controls">
          <button class="theme-toggle" @click="toggleTheme">
            <span v-if="isDark" class="theme-icon">☀️</span>
            <span v-else class="theme-icon">🌙</span>
          </button>
          <div class="language-selector">
            <button class="language-btn" @click="cycleLanguage">
              <span class="lang-icon">&gt;_</span> {{ languages[locale] }}
            </button>
          </div>
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <span class="terminal-icon">|||</span>
          </button>
        </div>

        <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" @click="mobileMenuOpen = false">
            <span class="link-prefix">./</span>{{ $t("nav.home") }}
          </router-link>
          <router-link to="/about" @click="mobileMenuOpen = false">
            <span class="link-prefix">./</span>{{ $t("nav.about") }}
          </router-link>
          <router-link to="/projects" @click="mobileMenuOpen = false">
            <span class="link-prefix">./</span>{{ $t("nav.projects") }}
          </router-link>
          <router-link to="/skills" @click="mobileMenuOpen = false">
            <span class="link-prefix">./</span>{{ $t("nav.skills") }}
          </router-link>
          <router-link to="/contact" @click="mobileMenuOpen = false">
            <span class="link-prefix">./</span>{{ $t("nav.contact") }}
          </router-link>

          <div class="desktop-controls">
            <button class="theme-toggle" @click="toggleTheme">
              <span v-if="isDark" class="theme-icon">☀️</span>
              <span v-else class="theme-icon">🌙</span>
            </button>

            <div class="language-selector">
              <button class="language-btn" @click="toggleLanguageMenu">
                <span class="lang-icon">&gt;_</span> {{ languages[locale] }}
              </button>
              <div
                class="language-dropdown"
                :class="{ show: languageMenuOpen }"
              >
                <button
                  @click="changeLanguage('es')"
                  :class="{ active: locale === 'es' }"
                >
                  <span class="lang-code">ES</span> Español
                </button>
                <button
                  @click="changeLanguage('ca')"
                  :class="{ active: locale === 'ca' }"
                >
                  <span class="lang-code">CA</span> Català
                </button>
                <button
                  @click="changeLanguage('en')"
                  :class="{ active: locale === 'en' }"
                >
                  <span class="lang-code">EN</span> English
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
/* IDE Theme - Color Palette */
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --bg-tertiary: #21262d;
  --border-color: #30363d;
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
  --accent-cyan: #58d1eb;
  --accent-pink: #ff6ac1;
  --accent-yellow: #f1fa8c;
  --accent-green: #50fa7b;
  --accent-purple: #bd93f9;
  --accent-cyan-rgb: 88, 209, 235;
  --accent-yellow-rgb: 241, 250, 140;
  --accent-hover: var(--accent-cyan);
  --accent-hover-rgb: var(--accent-cyan-rgb);
}

/* Light Mode - Warm Beige/Brown */
:root.light {
  --bg-primary: #f5f1e8;
  --bg-secondary: #ebe4d7;
  --bg-tertiary: #e0d8c9;
  --border-color: #c9bdaa;
  --text-primary: #3d3428;
  --text-secondary: #6b5f4d;
  --accent-cyan: #2b7a78;
  --accent-pink: #b85042;
  --accent-yellow: #c98547;
  --accent-green: #6b8e23;
  --accent-purple: #8b5a8e;
  --accent-cyan-rgb: 43, 122, 120;
  --accent-yellow-rgb: 201, 133, 71;
  --accent-hover: var(--accent-yellow);
  --accent-hover-rgb: var(--accent-yellow-rgb);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--bg-primary);
  color: var(--text-primary);
}

#app {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Terminal-style Navbar */
.navbar {
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.prompt {
  color: var(--accent-cyan);
  font-weight: 800;
}

.logo-name {
  color: var(--accent-pink);
  position: relative;
}

.logo-name::after {
  content: "█";
  color: var(--accent-cyan);
  animation: blink 1s infinite;
  margin-left: 2px;
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

.logo:hover {
  transform: translateX(3px);
}

.logo:hover .prompt {
  color: var(--accent-yellow);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: 2px solid var(--accent-cyan);
  font-family: "JetBrains Mono", monospace;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--accent-cyan);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.terminal-icon {
  font-weight: 700;
}

.mobile-menu-btn:hover {
  background: var(--accent-hover);
  color: var(--bg-primary);
  box-shadow: 0 0 15px var(--accent-hover);
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-links a {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.6rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
}

.link-prefix {
  color: var(--accent-cyan);
  margin-right: 2px;
}

.nav-links a:hover {
  color: var(--accent-hover);
  background: rgba(var(--accent-hover-rgb), 0.1);
  border-color: var(--accent-hover);
  box-shadow: 0 0 10px rgba(var(--accent-hover-rgb), 0.3);
}

.nav-links a.router-link-active {
  color: var(--accent-pink);
  background: rgba(255, 106, 193, 0.1);
  border-color: var(--accent-pink);
}

.nav-links a.router-link-active .link-prefix {
  color: var(--accent-pink);
}

.theme-toggle {
  font-family: "JetBrains Mono", monospace;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 0 10px rgba(var(--accent-hover-rgb), 0.3);
  transform: translateY(-2px);
}

.theme-icon {
  filter: grayscale(0.2);
  transition: filter 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  filter: grayscale(0);
}

.language-selector {
  position: relative;
  margin-left: 1rem;
}

.language-btn {
  font-family: "JetBrains Mono", monospace;
  background: var(--bg-tertiary);
  color: var(--accent-yellow);
  border: 1px solid var(--accent-yellow);
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-icon {
  color: var(--accent-cyan);
}

.language-btn:hover {
  background: var(--accent-yellow);
  color: var(--bg-primary);
  box-shadow: 0 0 15px rgba(241, 250, 140, 0.5);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--bg-secondary);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  min-width: 160px;
}

.language-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-dropdown button {
  font-family: "JetBrains Mono", monospace;
  width: 100%;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.language-dropdown button:last-child {
  border-bottom: none;
}

.lang-code {
  color: var(--accent-cyan);
  font-weight: 700;
}

.language-dropdown button:hover {
  background: var(--bg-tertiary);
  color: var(--accent-hover);
}

.language-dropdown button.active {
  background: rgba(var(--accent-hover-rgb), 0.1);
  color: var(--accent-hover);
  border-left: 3px solid var(--accent-hover);
}

.desktop-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-controls {
  display: none;
  align-items: center;
  gap: 0.5rem;
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
    background: var(--bg-secondary);
    backdrop-filter: blur(10px);
    flex-direction: column;
    gap: 0;
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    border-bottom: 2px solid var(--border-color);
  }

  .nav-links.mobile-open {
    max-height: 500px;
    padding: 1rem 0;
  }

  .nav-links a {
    padding: 1rem 2rem;
    display: block;
    border: none;
    border-bottom: 1px solid var(--border-color);
    border-radius: 0;
  }

  .desktop-controls {
    display: none;
  }

  .mobile-controls {
    display: flex;
  }

  .mobile-controls .theme-toggle {
    padding: 0.5rem;
    font-size: 1rem;
  }

  .mobile-controls .language-btn {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .mobile-controls .language-selector {
    margin-left: 0;
  }

  .mobile-controls .language-dropdown {
    right: auto;
    left: 0;
  }
}
</style>
