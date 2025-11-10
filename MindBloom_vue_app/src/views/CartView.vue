<script setup>
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons, placeOrder, updateLessons } from '../api/fetchAPI'
import { ref, onMounted, computed } from 'vue'
import { order, addToOrder, user, cardInfo, fetchData, checkoutModalActive } from '../store/store'
import './CartView.css'
import CheckoutModalComponent from '../components/modals/CheckoutModalComponent.vue'

const currentUser = ref(user)
const guestCheckout = ref(false)
const loading = ref(false)
const name = ref(null)
const number = ref(null)

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

// const placeOrderCall = async () => {
//   const result = await placeOrder({
//     name: currentUser ? currentUser.value.identities[0].identity_data.full_name : name.value,
//     phoneNumber: currentUser
//       ? currentUser.value.identities[0].identity_data.phone_number
//       : number.value,
//     lessonsOrdered: order,
//   })
//   console.log(result)
//   await updateLessons(result)
//   clearOrder()
//   fetchData()
// }

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

    <div class="lesson-page-container">
      <div class="title-icon-contaianer">
        <h1 class="title">Your Cart</h1>
      </div>
      <div class="all-cards-container">
        <div v-for="lesson in fullOrders" :key="lesson._id">
          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :availability="lesson.availability"
            @addToOrder="addToOrder"
          />
        </div>
      </div>
      <button @click="checkoutModalActive = true" class="button">Proceed To Checkout</button>
      <CheckoutModalComponent :modalActive="checkoutModalActive" />
    </div>
  </main>
</template>
