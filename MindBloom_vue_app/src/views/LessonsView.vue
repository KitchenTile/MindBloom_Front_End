<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons, placeOrder, updateLessons } from '../api/fetchAPI'
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
const order = ref([])

const addToOrder = (newOrder) => {
  const newItem = ref(true)
  for (let i = 0; i < order.value.length; i++) {
    if (order.value[i].lessonId === newOrder.lessonId) {
      console.log(order.value[i].lessonId)
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

console.log(error)
</script>

<template>
  <main>
    <Header />

    <div v-if="loading" class="loading">Loading...</div>
    <div class="lesson-page-container">
      <div class="title-icon-contaianer">
        <h1 class="title">All Lessons</h1>
        <font-awesome-icon icon="filter" />
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
