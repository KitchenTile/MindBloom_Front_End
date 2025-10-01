<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons, placeOrder, updateLessons } from '../api/fetchAPI'
import { ref, onMounted } from 'vue'
import './LessonsView.css'

interface Lesson {
  topic: string
  price: number
  location: string
  numOfSpaces: number
}

const loading = ref(false)
const cardInfo = ref<Lesson[]>([])
const error = ref(null)
const order = ref([])

const addToOrder = (newOrder) => {
  const newItem = ref(true)
  for (let i = 0; i < order.value.length; i++) {
    if (order.value[i].lessonId === newOrder.lessonId) {
      order.value[i].numOfSpaces = newOrder.numOfSpaces
      newItem.value = false
    }
  }
  if (newItem.value === true) {
    order.value.push(newOrder)
  }
  console.log(order.value)
}

const placeOrderCall = async () => {
  const result = await placeOrder({ name: 'AZUL', phoneNumber: 123, lessonsOrdered: order.value })
  updateLessons(result)
  fetchData()
}

const filterLessons = (criteria, ascdsc) => {
  let filteredLessons = []
  if (criteria === 'topic' || criteria === 'location') {
    filteredLessons = cardInfo.value.sort((a, b) => {
      const lessonA = a[criteria].toUpperCase()
      const lessonB = b[criteria].toUpperCase()
      if (lessonA < lessonB) {
        return ascdsc ? 1 : -1
      }
      if (lessonA > lessonB) {
        return ascdsc ? -1 : 1
      }
    })
  } else {
    filteredLessons = cardInfo.value.sort((a, b) =>
      ascdsc ? a[criteria] - b[criteria] : b[criteria] - a[criteria],
    )
  }

  console.log(filteredLessons)

  return filteredLessons
}

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
    filterLessons('numOfSpaces', true)
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
        <font-awesome-icon icon="filter" class="icon" />
      </div>
      <div v-for="lesson in cardInfo" :key="lesson._id">
        <LessonCard
          :id="lesson._id"
          :topic="lesson.topic"
          :price="lesson.price"
          :location="lesson.location"
          :numOfSpaces="lesson.numOfSpaces"
          @addToOrder="addToOrder"
        />
      </div>
      <button @click="placeOrderCall">PLACE ORDER</button>
    </div>
  </main>
</template>
