<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/LessonCard.vue'
import { getAllLessons } from '../api/fetchAPI'
import { ref, onMounted } from 'vue'

interface Lesson {
  topic: string
  price: number
  location: string
  numOfSpaces: number
}
const loading = ref(false)
const cardInfo = ref<Lesson[]>([])
const error = ref(null)

async function fetchData() {
  error.value = cardInfo.value = null
  loading.value = true

  try {
    cardInfo.value = await getAllLessons()
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

console.log(error)
</script>

<template>
  <main>
    <Header />

    <div v-if="loading" class="loading">Loading...</div>

    <div v-for="(lesson, index) in cardInfo" :key="index">
      <LessonCard
        :topic="lesson.topic"
        :price="lesson.price"
        :location="lesson.location"
        :numOfSpaces="lesson.numOfSpaces"
      />
    </div>
  </main>
</template>
