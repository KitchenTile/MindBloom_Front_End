<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import './HomeView.css'
import { getAllChats, handleChat, deleteChat, editChatTitle } from '../api/fetchAPI'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { v4 as uuidv4 } from 'uuid'

interface Chat {
  chat_id: string
  title: string
  created_at: string
  messages: { role: string; content: string; timestamp: string }[]
  user_id: string
}

const loading = ref<boolean>(false)
const prompt = ref<string>('')
const topic = ref<string>('TOPIC')
const chatContainer = ref<HTMLDivElement | null>(null)
const chats = ref<Chat[]>([])
const chat = ref<string[]>([])
const chatId = ref<string>('')
const chatIdToEdit = ref<string | null>(null)
const newTitle = ref<string>('')

const computedCurrentChat = computed(() => {
  //filter current chat
  const currentChat = chats.value.filter((chat) => chat.chat_id === chatId.value)
  //get current chat's messages
  const currentChatMessages = currentChat[0].messages.map((message) => {
    return message.content
  })
  //display current chat
  chat.value = currentChatMessages
})

const handleSubmit = async () => {
  if (prompt.value === '') return

  if (chat.value.length === 0) {
    chatId.value = uuidv4()
  }

  chat.value.push(prompt.value)

  const gptResponse: string | undefined = await handleChat(prompt.value, chatId.value)

  if (!gptResponse) return console.error('GPT response was undefined')

  console.log(gptResponse)
  chat.value.push(gptResponse)
  prompt.value = ''

  //update the chats section
  await fetchChats()
}

const deleteChatFunction = async (chatId: string) => {
  try {
    //delete chat
    await deleteChat(chatId)
    //update the chats section
    await fetchChats()
  } catch (error) {
    console.log(error)
  }
}

//API call to change title
const editTitleFunction = async (chatId: string, editedTitle: string) => {
  try {
    const response = await editChatTitle(chatId, editedTitle)
    await fetchChats()
    chatIdToEdit.value = null
    newTitle.value = ''
  } catch (error) {
    console.log(error)
  }
}

//title state managers
const editTitle = (chatItem: Chat) => {
  chatIdToEdit.value = chatItem.chat_id
  newTitle.value = chatItem.title
}

const cancelTitleEdit = () => {
  chatIdToEdit.value = null
  newTitle.value = ''
}

const addNewChat = () => {
  chat.value = []
  prompt.value = ''
  chatId.value = ''
}

async function fetchChats() {
  chats.value = []
  try {
    console.log('Fetching')
    const data = await getAllChats()

    if (!data) return console.error('data response was undefined')

    chats.value = [...data]
    if (chats.value.length === 0) console.log('No chats available')
  } catch (err) {
    console.log(err)
  }
}

watch(
  () => chat.value.length,
  async () => {
    await nextTick()
    const el = chatContainer.value
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      })
    }
  },
)

onMounted(() => {
  console.log('FETCHING CHATS')
  fetchChats()
})
</script>

<template>
  <main>
    <div v-if="loading" class="loading">Loading...</div>
    <div class="home-page-container">
      <div class="chats-chat-container">
        <div class="all-chats-container">
          <div class="title-button-container">
            <h2 class="chats-title">Your Chats</h2>
            <h2 class="add-chat-button" @click="addNewChat()">+</h2>
          </div>
          <div class="chat" v-for="(chat, index) in chats" :key="chat.chat_id">
            <button
              v-if="chatIdToEdit !== chat.chat_id"
              class="chat-button"
              :for="chat"
              :id="`chat-${index}`"
              @click="[(chatId = chat.chat_id), computedCurrentChat]"
            >
              {{ chat.title }}
            </button>
            <input v-else class="title-edit" :for="chat" v-model="newTitle" />
            <div style="display: flex; gap: 5px">
              <font-awesome-icon
                icon="pen-to-square"
                class="icon"
                @click="editTitle(chat)"
                v-if="chatIdToEdit !== chat.chat_id"
              />
              <font-awesome-icon icon="xmark" class="icon" v-else @click="cancelTitleEdit()" />
              <font-awesome-icon
                v-if="chatIdToEdit !== chat.chat_id"
                icon="trash"
                class="icon"
                @click="deleteChatFunction(chat.chat_id)"
              />
              <font-awesome-icon
                icon="check"
                class="icon"
                @click="editTitleFunction(chat.chat_id, newTitle)"
                v-else
              />
            </div>
          </div>
        </div>
        <div class="chat-container">
          <div ref="chatContainer" class="chat-content-container">
            <div
              v-for="(message, index) in chat"
              class="chat-message-container"
              :class="{ right: index % 2 == 0 }"
            >
              <p :for="message" :id="`m-${index}`" class="chat-message">{{ message }}</p>
            </div>
          </div>
          <div class="chat-form-container fade-in fade-in-delay-3">
            <div class="chat-form">
              <input
                type="text"
                placeholder="ask me anything..."
                name="chat-input"
                v-model="prompt"
                class="chat-input"
              />
              <button class="chat-submit-button" aria-label="Start Chat" v-on:click="handleSubmit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="chat-submit-icon"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
