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
import { validateName, validateNumber } from '../../utils/inputValidation'

const modalProps = defineProps(['modalActive'])

const errors = ref({ name: null, phoneNumber: null })
const currentUser = ref(user)
const name = ref(currentUser.value ? currentUser.value.identities[0].identity_data.full_name : '')
const phoneNumber = ref(
  currentUser.value ? currentUser.value.identities[0].identity_data.phone_number : null,
)
const guestCheckout = ref(false)
const lessonsInfo = ref(cardInfo)
const checkoutMessage = ref(false)

// console.log(currentUser.value)

watch(
  () => name.value,
  (newName) => {
    if (!validateName(newName)) {
      errors.value.name = 'Enter a valid name'
    } else {
      errors.value.name = null
    }
  },
)

watch(
  () => phoneNumber.value,
  (newPhoneNumber) => {
    if (!validateNumber(newPhoneNumber)) {
      errors.value.phoneNumber = 'Enter a valid phone number'
    } else {
      errors.value.phoneNumber = null
    }
  },
)

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
  () =>
    order.length === 0 ||
    name.value === null ||
    name.value === '' ||
    phoneNumber.value === null ||
    phoneNumber.value.length !== 11 ||
    errors.value.phoneNumber !== null ||
    errors.value.name !== null,
)

const orderTotal = computed(() => {
  return computedOrder.value.map((order) => order.price * order.amount).reduce((a, b) => a + b, 0)
})

const closeModal = () => {
  checkoutModalActive.value = false
  if (checkoutMessage.value) {
    clearOrder()
  }
  checkoutMessage.value = false
}

const placeOrderCall = async () => {
  const result = await placeOrder({
    name: currentUser.value ? currentUser.value.identities[0].identity_data.full_name : name.value,
    phoneNumber: currentUser.value
      ? currentUser.value.identities[0].identity_data.phone_number
      : phoneNumber.value,
    lessonsOrdered: order,
  })
  console.log(result)
  await updateLessons(result)
  checkoutMessage.value = true
}
</script>

<template>
  <main>
    <Modal :modalActive="modalProps.modalActive" @closeModal="closeModal">
      <div class="profile-container">
        <div class="form">
          <div class="logo-title-container">
            <Logo />
            <h1 class="title">Checkout</h1>
          </div>
          <div class="checkout-container">
            <div v-if="!currentUser && !guestCheckout">
              <h2>
                Oh no! Seems like you're not logged in. Click
                <span @click="loginModalActive = true" class="clickable-text">here to log in</span>
                or
                <span @click="guestCheckout = true" class="clickable-text"
                  >check out as a guest</span
                >
              </h2>
            </div>
            <div v-if="currentUser !== null || guestCheckout" class="order-recap-container">
              <div class="total-container">
                <h2 class="total-text">TOTAL</h2>
                <h2 class="total-text">£{{ orderTotal }}</h2>
              </div>
              <div class="lessons-container" v-for="(lesson, index) in computedOrder">
                <p>{{ lesson.topic }} x {{ lesson.amount }}</p>
                <p>£{{ lesson.price * lesson.amount }}</p>
              </div>
              <span class="line" />
              <div class="name-number-container">
                <input v-model="name" placeholder="Name" v-if="!currentUser" />
                <p class="checkout-text-user" v-else>
                  {{ currentUser.identities[0].identity_data.full_name }}
                </p>
                <input v-model="phoneNumber" placeholder="Phone Number" v-if="!currentUser" />
                <p class="checkout-text-user" v-else>
                  {{ currentUser.identities[0].identity_data.phone_number }}
                </p>
              </div>
              <div class="errors-container" v-show="errors">
                <p class="error-message">{{ errors.name }}</p>
                <p class="error-message">{{ errors.phoneNumber }}</p>
              </div>
              <button
                @click="placeOrderCall"
                :disabled="isDisabled"
                class="button"
                :class="{ disabled: isDisabled }"
                v-if="!checkoutMessage"
              >
                PLACE ORDER
              </button>
              <div class="button-message" v-else>DONE</div>
            </div>
            <div class="checkout-message" v-if="checkoutMessage">
              <h1 class="title">Order Placed!</h1>
              <p>Thank you for your order of £{{ orderTotal }}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </main>
</template>
