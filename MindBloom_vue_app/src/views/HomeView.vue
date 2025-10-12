<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import "./HomeView.css"
import { handleChat } from '../api/fetchAPI';

const loading = ref(false)
const prompt = ref("");
const topic = ref("TOPIC")
const chat = ref([])
const activeChat = computed(() => {
  return chat.value.length !== 0
})

const handleSubmit = async () => {
  if (prompt.value === "") return; 

  chat.value.push(prompt.value)
  const gptResponse = await handleChat(prompt.value)

  console.log(gptResponse)
  chat.value.push(gptResponse);
  prompt.value = ""
}

</script>

<template>
  <main>
    <div v-if="loading" class="loading">Loading...</div>
    <div class="home-page-container">
      <div class="chat-container">
          <div v-for="(message, index) in chat" class="chat-message-container" :class="{right: index % 2 == 0}">
            <p :for="message" :id="`m-${index}`" class="chat-message" >{{ message }}</p>
          </div>
          <div class="chat-form-container fade-in fade-in-delay-3">
            <div class="chat-form">
              <input type="text" placeholder="ask me anything..." name="chat-input" v-model="prompt" class="chat-input"/>
              <button class="chat-submit-button" aria-label="Start Chat" v-on:click="handleSubmit">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-submit-icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  </main>
</template>
