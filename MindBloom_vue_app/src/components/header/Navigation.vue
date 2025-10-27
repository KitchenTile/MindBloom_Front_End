<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './Navigation.css'
import { loginModalActice } from '../../store/store'
import LogInModal from '../modals/LogInModal.vue'

const openLoginModal = () => {
  loginModalActice.value = true
}
</script>

<template>
  <div class="nav-search-container">
    <nav>
      <RouterLink to="/lessons" id="book"> <font-awesome-icon icon="book" /> </RouterLink>
      <RouterLink to="/cart" id="cart"> <font-awesome-icon icon="cart-shopping" /> </RouterLink>
      <RouterLink to="/login" id="user" @click="openLoginModal">
        <font-awesome-icon icon="user" />
      </RouterLink>
    </nav>
  </div>
</template>
