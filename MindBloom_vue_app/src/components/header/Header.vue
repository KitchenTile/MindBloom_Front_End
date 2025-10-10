<script setup lang="ts">
import { ref } from 'vue'
import './Header.css'
import Navigation from './Navigation.vue'
import Search from './Search.vue'
</script>

<template>
  <div class="header">
    <div class="iamge-title-container">
      <div class="image-container">
        <a href="/">
          <img src="@/assets\MBSVGbeige.svg" alt="" class="logo" />
        </a>
      </div>
      <h1 class="title">MIND BLOOM</h1>
    </div>
    <div class="nav-search-container">
      <Search />
    <Navigation />
    </div>
  </div>
</template>
