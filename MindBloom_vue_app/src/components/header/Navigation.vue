<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './Navigation.css'
import { loginModalActive, order } from '../../store/store'
import { computed } from 'vue'

const openLoginModal = () => {
  loginModalActive.value = true
}

const isDisabled = computed(() => order.length === 0)
</script>

<template>
  <div class="nav-search-container">
    <nav>
      <RouterLink to="/chat" id="chat"> <font-awesome-icon icon="message" /> </RouterLink>
      <RouterLink to="/lessons" id="book"> <font-awesome-icon icon="book" /> </RouterLink>
      <RouterLink to="/cart" id="cart" :disabled="isDisabled" :class="{ disabled: isDisabled }">
        <font-awesome-icon icon="cart-shopping" />
      </RouterLink>
      <RouterLink to="" id="user" @click="openLoginModal">
        <font-awesome-icon icon="user" />
      </RouterLink>
    </nav>
  </div>
</template>
