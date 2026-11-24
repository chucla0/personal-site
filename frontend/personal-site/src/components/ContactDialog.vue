<template>
  <dialog ref="dialog" aria-labelledby="contact-title" @click.self="dialog.close()">
    <form @submit.prevent="send">
      <div class="head">
        <h2 id="contact-title" class="big">{{ $t('contact.title') }}</h2>
        <button type="button" class="pill" @click="dialog.close()">{{ $t('contact.close') }}</button>
      </div>
      <label for="contact-name">{{ $t('contact.form_name') }}</label>
      <input id="contact-name" v-model="form.name" name="name" type="text" autocomplete="name" required />
      <label for="contact-email">{{ $t('contact.form_email') }}</label>
      <input id="contact-email" v-model="form.email" name="_replyto" type="email" autocomplete="email" spellcheck="false" required />
      <label for="contact-message">{{ $t('contact.form_message') }}</label>
      <textarea id="contact-message" v-model="form.message" name="message" rows="4" required></textarea>
      <button type="submit" class="pill send" :disabled="sending">{{ $t(sending ? 'contact.sending' : 'contact.form_submit') }}</button>
      <p role="status" class="status"><template v-if="status">{{ $t(`contact.status_${status}`) }}</template></p>
    </form>
  </dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'

const ENDPOINT = 'https://formspree.io/f/xwpyapqy'
const dialog = ref(null)
const sending = ref(false)
const status = ref('') // '', 'success' or 'error'
const form = reactive({ name: '', email: '', message: '' })

async function send() {
  sending.value = true
  status.value = ''
  const data = new FormData()
  data.append('name', form.name)
  data.append('_replyto', form.email)
  data.append('message', form.message)
  try {
    const response = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    if (response.ok) {
      status.value = 'success'
      Object.assign(form, { name: '', email: '', message: '' })
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  } finally {
    sending.value = false
  }
}

defineExpose({
  open() {
    status.value = ''
    dialog.value.showModal()
  }
})
</script>

<style scoped>
dialog {
  margin: auto;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 0;
  border-radius: 34px;
  background: var(--w1);
  color: var(--k1);
}
dialog::backdrop { background: color-mix(in srgb, var(--paper) 78%, transparent); }
form { display: flex; flex-direction: column; padding: clamp(20px, 4vw, 36px); }
.head { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 14px; }
h2 { font-size: clamp(34px, 6vw, 54px); }
label { font-weight: 700; margin: 10px 0 6px; }
input, textarea {
  font: inherit;
  color: var(--ink);
  background: var(--paper);
  border: 0;
  border-radius: 18px;
  padding: 13px 18px;
  resize: vertical;
}
.pill { background: var(--k1); color: var(--w1); }
.send { margin-top: 20px; padding: 14px 22px; font-size: 1.05em; }
.send:disabled { opacity: 0.6; cursor: progress; }
.status:empty { display: none; }
.status { margin-top: 14px; font-weight: 700; }
:focus-visible { outline-color: var(--k1); }
</style>
