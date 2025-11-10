<script setup>
import { computed, ref, watch } from 'vue'
import {
  order,
  clearOrder,
  user,
  loginModalActive,
  checkoutModalActive,
  cardInfo,
} from '../../store/store'
import './CheckoutModalComponent.css'
import Modal from './Modal.vue'
import { placeOrder, updateLessons } from '../../api/fetchAPI'
import Logo from '../../assets/Logo.vue'

const modalProps = defineProps(['modalActive'])

const name = ref('')
const currentUser = ref(user)
const phoneNumber = ref(null)
const guestCheckout = ref(false)
const lessonsInfo = ref(cardInfo)

const computedOrder = computed(() =>
  lessonsInfo.value
    .map((lesson) => {
      const match = order.find((orderId) => orderId.lessonId === lesson._id)
      if (match) {
        return { ...lesson, amount: match.availability }
      }
      return null
    })
    .filter(Boolean),
)
const isDisabled = computed(
  () => order.length === 0 || name.value === null || name.value === '' || number.value === null,
)

const orderTotal = computed(() => {
  return computedOrder.value.map((order) => order.price * order.amount).reduce((a, b) => a + b, 0)
})

const closeModal = () => {
  checkoutModalActive.value = false
}

const placeOrderCall = async () => {
  const result = await placeOrder({
    name: currentUser ? currentUser.value.identities[0].identity_data.full_name : name.value,
    phoneNumber: currentUser
      ? currentUser.value.identities[0].identity_data.phone_number
      : number.value,
    lessonsOrdered: order,
  })
  console.log(result)
  await updateLessons(result)
  clearOrder()
}
</script>

<template>
  <main>
    <Modal :modalActive="modalProps.modalActive" @closeModal="closeModal">
      <div class="profile-container">
        <div class="form" v-if="user === null">
          <div class="logo-title-container">
            <Logo />
            <h1 class="title">Checkout</h1>
          </div>

          <div class="checkout-container">
            <div v-if="!currentUser">
              <h2 v-if="!guestCheckout">
                Oh no! Seems like you're not logged in. Click
                <span @click="loginModalActive = true" class="clickable-text">here to log in</span>
                or
                <span @click="guestCheckout = true" class="clickable-text"
                  >check out as a guest</span
                >
              </h2>
              <div v-else class="order-recap-container">
                <div class="total-container">
                  <h2 class="total-text">TOTAL</h2>
                  <h2 class="total-text">{{ orderTotal }}</h2>
                </div>
                <div class="lessons-container" v-for="(lesson, index) in computedOrder">
                  <p>{{ lesson.topic }} x {{ lesson.amount }}</p>
                  <p>{{ lesson.price * lesson.amount }}</p>
                </div>
                <span class="line" />
                <div class="name-number-container">
                  <input v-model="name" placeholder="Name" />
                  <input v-model="phoneNumber" placeholder="Phone Number" />
                </div>
                <button @click="placeOrderCall" :disabled="isDisabled" class="button">
                  PLACE ORDER
                </button>
              </div>
            </div>
            <button @click="placeOrderCall" v-else class="button">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </Modal>
  </main>
</template>
