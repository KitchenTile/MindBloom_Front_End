<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import './ChatCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Logo from '../../assets/Logo.vue'
import router from '../../router'
import { cardInfo } from '../../store/store'

const cardProps = defineProps(['searchTerm'])

const chatTerm = ref('')

// add button class
const hidden = computed(() => amount.value === 0)

const checkLessonTitles = () => {
  for (let i = 0; i < cardInfo.value.length; i++) {
    if (cardInfo.value[i].topic.toLowerCase().includes(cardProps.searchTerm)) {
      chatTerm.value = cardInfo.value[i].topic
    }
  }
}

watch(
  () => cardProps.searchTerm,
  (newValue, oldValue) => {
    // console.log('Prop changed:', newValue)
    checkLessonTitles()
  },
  { immediate: true },
)

const isDisabled = computed(() => cardProps.availability === amount.value)
</script>

<template>
  <div class="chat-card-container search" v-show="chatTerm !== ''">
    <div class="image-container">
      <font-awesome-icon icon="message" class="book-icon" />
      <svg width="100" height="100" class="circle-svg">
        <circle cx="50" cy="50" r="50" fill="#1d5236" />
      </svg>
      <div class="logo-container">
        <Logo />
      </div>
    </div>
    <div class="text-container">
      <button class="chats-button" @click="router.push('/chat')">
        Learn {{ chatTerm }} with an expert!
      </button>
      <div></div>
    </div>
  </div>
</template>
