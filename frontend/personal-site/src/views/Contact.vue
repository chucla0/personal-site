<template>
  <div class="contact">
    <div class="contact-container">
      <div class="section-header">
        <span class="prompt">~$</span>
        <span class="command">contact --mode interactive</span>
      </div>

      <div class="contact-grid">
        <!-- Social Links Terminal -->
        <div class="terminal-block">
          <div class="terminal-header">
            <span class="header-text">&gt;_ social_links.sh</span>
          </div>
          <div class="terminal-content">
            <div class="link-line">
              <span class="link-prompt">$</span>
              <span class="link-command">echo $EMAIL</span>
            </div>
            <a href="mailto:your@email.com" class="link-output">
              <Mail :size="18" /> your@email.com
            </a>

            <div class="link-line">
              <span class="link-prompt">$</span>
              <span class="link-command">echo $LINKEDIN</span>
            </div>
            <a
              href="https://linkedin.com/in/yourprofile"
              class="link-output"
              target="_blank"
            >
              <Linkedin :size="18" /> /in/yourprofile
            </a>

            <div class="link-line">
              <span class="link-prompt">$</span>
              <span class="link-command">echo $GITHUB</span>
            </div>
            <a
              href="https://github.com/chucla0"
              class="link-output"
              target="_blank"
            >
              <Github :size="18" /> @chucla0
            </a>
          </div>
        </div>

        <!-- Contact Form Terminal -->
        <div class="terminal-block">
          <div class="terminal-header">
            <span class="header-text">&gt;_ send_message.sh</span>
          </div>
          <div class="terminal-content">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label>
                  <span class="var-symbol">$</span>
                  <span class="var-name">NAME</span>
                  <span class="equals">=</span>
                </label>
                <input
                  type="text"
                  v-model="formData.name"
                  :placeholder="$t('contact.form_name_placeholder')"
                  required
                />
              </div>

              <div class="form-group">
                <label>
                  <span class="var-symbol">$</span>
                  <span class="var-name">EMAIL</span>
                  <span class="equals">=</span>
                </label>
                <input
                  type="email"
                  v-model="formData.email"
                  :placeholder="$t('contact.form_email_placeholder')"
                  required
                />
              </div>

              <div class="form-group">
                <label>
                  <span class="var-symbol">$</span>
                  <span class="var-name">MESSAGE</span>
                  <span class="equals">=</span>
                </label>
                <textarea
                  v-model="formData.message"
                  :placeholder="$t('contact.form_message_placeholder')"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                <span class="btn-prompt">~$</span>
                <span class="btn-text">{{ $t("contact.form_submit") }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Mail, Linkedin, Github } from "lucide-vue-next";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const handleSubmit = () => {
  alert(`Message sent! (This is a demo - implement your backend)`);
  console.log("Form data:", formData.value);
  formData.value = {
    name: "",
    email: "",
    message: "",
  };
};
</script>

<style scoped>
.contact {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 6rem 2rem;
}

.contact-container {
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

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.terminal-block {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.terminal-block:hover {
  border-color: var(--accent-hover);
  box-shadow: 0 8px 30px rgba(var(--accent-hover-rgb), 0.3);
}

.terminal-header {
  background: var(--bg-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border-color);
  font-family: "JetBrains Mono", monospace;
  color: var(--accent-yellow);
  font-size: 0.9rem;
  font-weight: 700;
}

.terminal-content {
  padding: 1.5rem;
  font-family: "JetBrains Mono", monospace;
}

.link-line {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.link-prompt {
  color: var(--accent-cyan);
  margin-right: 0.5rem;
}

.link-command {
  color: var(--accent-yellow);
}

.link-output {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  background: var(--bg-tertiary);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.link-output:hover {
  border-color: var(--accent-hover);
  color: var(--accent-hover);
  box-shadow: 0 0 15px rgba(var(--accent-hover-rgb), 0.3);
  transform: translateX(5px);
}

.icon {
  font-size: 1.2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
}

.var-symbol {
  color: var(--accent-pink);
}

.var-name {
  color: var(--accent-cyan);
}

.equals {
  color: var(--accent-yellow);
}

.form-group input,
.form-group textarea {
  font-family: "JetBrains Mono", monospace;
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  border-radius: 4px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-hover);
  box-shadow: 0 0 0 3px rgba(var(--accent-hover-rgb), 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-secondary);
  font-style: italic;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  font-family: "JetBrains Mono", monospace;
  background: var(--bg-tertiary);
  color: var(--accent-cyan);
  border: 2px solid var(--accent-cyan);
  padding: 0.9rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-prompt {
  color: var(--accent-yellow);
}

.submit-btn:hover {
  background: var(--accent-hover);
  color: var(--bg-primary);
  box-shadow: 0 0 20px rgba(var(--accent-hover-rgb), 0.6);
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
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

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
