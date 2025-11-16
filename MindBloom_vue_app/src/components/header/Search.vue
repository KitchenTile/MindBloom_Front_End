<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LessonCard from '../cards/LessonCard.vue'
import { cardInfo, fetchData } from '../../store/store'
import ChatCard from '../cards/ChatCard.vue'
import { search } from '../../api/fetchAPI'

const searchTerm = ref('')
const searchResults = ref(null)

const emit = defineEmits(['addToOrder'])

watch(
  () => searchTerm.value,
  async (newSearchTerm) => {
    searchResults.value = await search(newSearchTerm)
  },
  { immediate: true },
)

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
          <ChatCard :searchTerm="searchTerm.toLocaleLowerCase()" />
        </div>
        <div
          v-for="(lesson, index) in searchResults"
          :key="index"
          v-if="searchTerm && searchResults !== undefined"
        >
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
