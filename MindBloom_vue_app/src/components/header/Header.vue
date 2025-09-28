<script setup lang="ts">
import { ref } from 'vue'
import './Header.css'
import Navigation from './Navigation.vue'
</script>

<template>
  <div class="header">
    <div class="image-container">
      <a href="">
        <img src="@/assets\MBSVGbeige.svg" alt="" class="logo" />
      </a>
    </div>
    <h1 class="title">MIND BLOOM</h1>
    <Navigation />
  </div>
</template>
