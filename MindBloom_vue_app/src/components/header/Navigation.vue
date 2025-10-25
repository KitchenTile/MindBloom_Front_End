<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Search from './Search.vue'
import './Navigation.css'
</script>

<template>
  <div class="nav-search-container">
    <nav>
      <RouterLink to="/lessons" id="book"> <font-awesome-icon icon="book" /> </RouterLink>
      <RouterLink to="/cart" id="cart"> <font-awesome-icon icon="cart-shopping" /> </RouterLink>
    </nav>
  </div>
</template>
