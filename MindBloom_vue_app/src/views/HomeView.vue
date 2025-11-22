<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import './HomeView.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { cardInfo } from '../store/store'
import { userSessionCheck } from '../utils/supabase'
import router from '../router'
import Logo from '../assets/Logo.vue'

const loading = ref(false)

const routeFunction = (route) => {
  router.push(`/${route}`)
}

onMounted(async () => {
  await userSessionCheck()
})
</script>

<template>
  <main>
    <div class="home-page-container">
      <p class="sub-text">Hybrid learning made <span class="accent">simple</span>.</p>
      <h1 class="title">MIND <span class="accent">BLOOM</span>.</h1>
      <div class="info-container">
        <div class="info-left">
          <font-awesome-icon icon="microchip" class="icon" />
          <p class="text">Take advantage of the infinite knowledge of AI to maximize learning.</p>
          <button class="button" @click="routeFunction('chat')">START A CHAT</button>
        </div>
        <div class="info-right">
          <font-awesome-icon icon="chalkboard-user" class="icon" />
          <p class="text">
            Secure your place in expert-led private hire lessons for deep dives into critical
            subjects.
          </p>
          <button class="button" id="lessons-button" @click="routeFunction('lessons')">
            VIEW ALL LESSONS
          </button>
        </div>
      </div>
      <Logo />
      <div class="carousel-title-container">
        <h1 class="title">Let's learn together</h1>
        <div class="carousel">
          <div class="group">
            <div v-for="(lesson, index) in cardInfo" :key="index" class="lesson-preview">
              <font-awesome-icon :icon="lesson.svg" class="icon" />
              <p>{{ lesson.topic }}</p>
            </div>
          </div>
          <div class="group">
            <div v-for="(lesson, index) in cardInfo" :key="index" class="lesson-preview">
              <font-awesome-icon :icon="lesson.svg" class="icon" />
              <p>{{ lesson.topic }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
