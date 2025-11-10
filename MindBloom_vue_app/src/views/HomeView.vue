<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import './HomeView.css'
import { getAllChats, handleChat, deleteChat, editChatTitle, login, logout } from '../api/fetchAPI'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { v4 as uuidv4 } from 'uuid'
import { user } from '../store/store'
import { checkSession, supabase, userSessionCheck } from '../utils/supabase'
import BookUploadCompoenet from '../components/BookUploadCompoenet.vue'

const loading = ref(false)
const prompt = ref('')
const chatContainer = ref(null)
const chats = ref([])
const chat = ref([])
const chatId = ref('')
const chatIdToEdit = ref(null)
const newTitle = ref('')

// watcher to keep an eye on chatId and change the current chat view
watch(
  chatId,
  (newChatId) => {
    // Try to find the chat object in the main list
    const chatData = chats.value.find((chat) => chat.chat_id === newChatId)

    // If an existing chat object is found, load its messages
    if (chatData) {
      chat.value = chatData.messages.map((message) => message.content)
      return
    }

    // If the ID is empty, clear the display
    if (newChatId === '') {
      chat.value = []
      return
    }
  },
  { immediate: true },
)

//make sure there's an user before fetching chats
watch(
  user,
  (newUser) => {
    if (newUser) {
      // The user object just became available/updated, now fetch data
      console.log(`User ${newUser.id} logged in. Fetching data...`)
      fetchChats()
    } else {
      chats.value = []
      chat.value = []
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  if (prompt.value === '') return

  if (chat.value.length === 0) {
    chatId.value = uuidv4()
  }

  chat.value.push(prompt.value)
  const userQuery = prompt.value

  prompt.value = ''
  //loading bubble
  loading.value = true

  const gptResponse = await handleChat(userQuery, chatId.value)

  //update the chats section
  await fetchChats()
  loading.value = false

  if (!gptResponse) return console.error('GPT response was undefined')

  console.log(gptResponse)
  chat.value.push(gptResponse)
}

// delete chat
const deleteChatFunction = async (chatId) => {
  try {
    //delete chat
    await deleteChat(chatId)
    //update the chats section
    await fetchChats()
    addNewChat()
  } catch (error) {
    console.log(error)
  }
}

//API call to change title
const editTitleFunction = async (chatId, editedTitle) => {
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
const editTitle = (chatItem) => {
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

    if (chats.value.length === 0) {
      console.log('No chats available')
    } else {
      chatId.value = chats.value[0].chat_id
    }
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

onMounted(async () => {
  await userSessionCheck()
})
</script>

<template>
  <main>
    <div class="home-page-container">
      <div class="chats-chat-container">
        <div class="all-chats-container">
          <div class="title-button-container">
            <h2 class="chats-title">Your Chats</h2>
          </div>
          <button class="add-chat-button" @click="addNewChat()">+ New Chat</button>
          <div
            class="chat"
            v-for="(chat, index) in chats"
            :key="chat.chat_id"
            :class="{ selected: chatId === chat.chat_id }"
          >
            <div style="display: flex">
              <div class="chat-tab" />
              <button
                v-if="chatIdToEdit !== chat.chat_id"
                class="chat-button"
                :for="chat"
                :id="`chat-${index}`"
                @click="[(chatId = chat.chat_id)]"
              >
                {{ chat.title }}
              </button>
              <input
                v-else
                class="title-edit"
                :for="chat"
                v-model="newTitle"
                @keyup.enter="editTitleFunction(chat.chat_id, newTitle)"
                @keyup.escape="cancelTitleEdit()"
              />
            </div>
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
            <div v-if="loading" class="loading"></div>
          </div>
          <div class="chat-form-container fade-in fade-in-delay-3">
            <div class="chat-form">
              <input
                type="text"
                placeholder="ask me anything..."
                name="chat-input"
                v-model="prompt"
                class="chat-input"
                v-on:keyup.enter="handleSubmit"
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
