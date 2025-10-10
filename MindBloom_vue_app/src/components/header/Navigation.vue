<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Search from './Search.vue'
import "./Navigation.css"
</script>

<template>
  <div class="nav-search-container">
    <nav>
      <RouterLink to="/lessons"> <font-awesome-icon icon="book" /> </RouterLink>
      <RouterLink to="/cart"> <font-awesome-icon icon="cart-shopping" /> </RouterLink>
    </nav>
  </div>
</template>
