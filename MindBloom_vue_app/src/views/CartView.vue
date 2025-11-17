<script setup>
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons, placeOrder, updateLessons } from '../api/fetchAPI'
import { ref, onMounted, computed } from 'vue'
import { order, addToOrder, user, cardInfo, fetchData, checkoutModalActive } from '../store/store'
import './CartView.css'
import CheckoutModalComponent from '../components/modals/CheckoutModalComponent.vue'

const loading = ref(false)

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

onMounted(() => {
  fetchData()
})

// onMounted(() => {
//   console.log(order)
// })
</script>

<template>
  <main>
    <Header />

    <div class="cart-page-container">
      <div class="title-icon-contaianer">
        <h1 class="title">Your Cart</h1>
        <button @click="checkoutModalActive = true" class="button">Proceed To Checkout</button>
      </div>
      <div class="all-cards-container">
        <div v-for="lesson in fullOrders" :key="lesson._id">
          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :availability="lesson.availability"
            :svg="lesson.svg"
            @addToOrder="addToOrder"
          />
        </div>
      </div>
      <CheckoutModalComponent :modalActive="checkoutModalActive" />
    </div>
  </main>
</template>
