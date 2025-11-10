<script setup>
import { ref } from 'vue'
import './Header.css'
import Navigation from './Navigation.vue'
import Search from './Search.vue'
import Logo from '../../assets/Logo.vue'
</script>

<template>
  <div class="header">
    <div class="iamge-title-container">
      <div class="image-container">
        <a href="/">
          <Logo />
        </a>
      </div>
      <a href="/">
        <h1 class="title">MIND BLOOM</h1>
      </a>
    </div>
    <div class="nav-search-container">
      <Search />
      <Navigation />
    </div>
  </div>
</template>
