<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons } from '../api/fetchAPI'
import { ref, onMounted } from 'vue'
import "./HomeView.css"

const loading = ref(false)
</script>

<template>
  <main>
    <div v-if="loading" class="loading">Loading...</div>
    <div class="home-page-container">
      
    </div>
  </main>
</template>
