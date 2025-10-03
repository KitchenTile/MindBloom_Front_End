<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons, placeOrder, updateLessons } from '../api/fetchAPI'
import { ref, onMounted, computed } from 'vue'
import { order, addToOrder, clearOrder } from '../store/store'
import './CartView.css'

interface Lesson {
  topic: string
  price: number
  location: string
  numOfSpaces: number
  id: number
}

const loading = ref(false)
const cardInfo = ref<Lesson[]>([])
const name = ref(null)
const number = ref(null)
const error = ref(null)
const isDisabled = computed(
  () => order.length === 0 || name.value === null || name.value === '' || number.value === null,
)

const fullOrders = computed(() => {
  const cartItems = ref([])

  if (order.length !== 0) {
    for (let i = 0; i < cardInfo.value.length; i++) {
      for (let f = 0; f < order.length; f++) {
        if (order[f].lessonId === cardInfo.value[i]._id) {
          cartItems.value.push(cardInfo.value[i])
        }
      }
    }
  }

  return cartItems.value
})

const placeOrderCall = async () => {
  const result = await placeOrder({
    name: name.value,
    phoneNumber: number.value,
    lessonsOrdered: order,
  })
  updateLessons(result)
  clearOrder()
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

onMounted(() => {
  console.log(order)
})
</script>

<template>
  <main>
    <Header />

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="order.length === 0" class="loading">Loading...</div>

    <div class="lesson-page-container">
      <div class="title-icon-contaianer">
        <h1 class="title">CART VIEW</h1>
      </div>
      <div class="all-cards-container">
        <div v-for="lesson in fullOrders" :key="lesson._id">
          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :numOfSpaces="lesson.numOfSpaces"
            @addToOrder="addToOrder"
          />
        </div>
      </div>
      <div>
        <input v-model="name" placeholder="Name" />
        <input v-model="number" placeholder="Phone Number" />
      </div>
      <button @click="placeOrderCall" :disabled="isDisabled">PLACE ORDER</button>
    </div>
  </main>
</template>
