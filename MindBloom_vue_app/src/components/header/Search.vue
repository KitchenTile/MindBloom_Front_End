<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LessonCard from '../cards/LessonCard.vue'
import { cardInfo, fetchData } from '../../store/store'
import ChatCard from '../cards/ChatCard.vue'

const searchTerm = ref('')

const emit = defineEmits(['addToOrder'])

const filteredLessons = computed(() => {
  // if search term is emtpy return regular cardInfo
  if (searchTerm.value.toLocaleLowerCase() === '') return cardInfo.value
  return cardInfo.value.filter((info) =>
    info.topic.toLowerCase().includes(searchTerm.value.toLocaleLowerCase()),
  )
})

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="search-container">
    <div class="search-body">
      <input
        type="text"
        placeholder="Topic, price, etc."
        class="search-input"
        v-model="searchTerm"
      />
      <font-awesome-icon icon="magnifying-glass" class="search-icon" />
      <div class="search-results">
        <div class="chat-suggesstion" v-if="searchTerm">
          <ChatCard :searchTerm="searchTerm" />
        </div>
        <div v-for="(lesson, index) in filteredLessons" :key="index" v-if="searchTerm">
          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :availability="lesson.availability"
            :search="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
