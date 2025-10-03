<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons, placeOrder, updateLessons } from '../api/fetchAPI'
import { ref, onMounted, computed } from 'vue'
import './LessonsView.css'
import { order, addToOrder, clearOrder } from '../store/store'

interface Lesson {
  topic: string
  price: number
  location: string
  numOfSpaces: number
}

const loading = ref(false)
const cardInfo = ref<Lesson[]>([])
const error = ref(null)
const filter = ref({ criteria: 'topic', ascending: false })

const filterCriteria = ['topic', 'price', 'location', 'numOfSpaces']

const filterLessons = computed(() => {
  const lessonsCopy = [...cardInfo.value]

  if (filter.value.criteria === 'topic' || filter.value.criteria === 'location') {
    lessonsCopy.sort((a, b) => {
      const lessonA = a[filter.value.criteria].toUpperCase()
      const lessonB = b[filter.value.criteria].toUpperCase()
      if (lessonA < lessonB) {
        return filter.value.ascending ? 1 : -1
      }
      if (lessonA > lessonB) {
        return filter.value.ascending ? -1 : 1
      }
    })
  } else {
    lessonsCopy.sort((a, b) =>
      filter.value.ascending
        ? a[filter.value.criteria] - b[filter.value.criteria]
        : b[filter.value.criteria] - a[filter.value.criteria],
    )
  }

  return lessonsCopy
})

async function fetchData() {
  error.value = null
  loading.value = true
  cardInfo.value = []

  try {
    const data = await getAllLessons()
    cardInfo.value = [...data]
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main>
    <Header />

    <div v-if="loading" class="loading">Loading...</div>
    <div class="lesson-page-container">
      <div class="title-icon-contaianer">
        <h1 class="title">All Lessons</h1>
        <div>
          <font-awesome-icon icon="filter" class="icon" />
          <div v-for="criteria in filterCriteria">
            <input
              type="radio"
              :id="criteria"
              :name="criteria"
              :value="criteria"
              class="radio-input"
              v-model="filter.criteria"
            />
            <label :for="criteria">{{ criteria }}</label>
          </div>
          <div>
            <input
              type="radio"
              id="asc"
              name="asc"
              :value="true"
              class="radio-input"
              v-model="filter.ascending"
            />
            <label for="asc">ascending</label>
            <input
              type="radio"
              id="dsc"
              name="dsc"
              :value="false"
              class="radio-input"
              v-model="filter.ascending"
            />
            <label for="dsc">descending</label>
          </div>
        </div>
      </div>
      <div class="all-cards-container">
        <div v-for="lesson in filterLessons" :key="lesson._id">
          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :numOfSpaces="lesson.numOfSpaces"
          />
        </div>
      </div>
    </div>
  </main>
</template>
