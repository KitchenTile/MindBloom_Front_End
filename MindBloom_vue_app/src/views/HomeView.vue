<script setup lang="ts">
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { getAllLessons } from '../api/fetchAPI'
import { ref, onMounted } from 'vue'

const loading = ref(false)
</script>

<template>
  <main>
    <Header />

    <div v-if="loading" class="loading">Loading...</div>
  </main>
</template>
