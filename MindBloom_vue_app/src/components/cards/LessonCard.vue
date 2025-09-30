<script setup lang="ts">
import { ref, computed } from 'vue'
import './LessonCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const cardProps = defineProps({
  topic: String,
  price: Number,
  location: String,
  numOfSpaces: Number,
  id: String,
})

const amount = ref(0)
const hidden = computed(() => amount.value === 0)
const compact = computed(() => amount.value === 0)

const isDisabled = ref(false)
const emit = defineEmits(['addToOrder'])

const plusOne = () => {
  amount.value++
  emit('addToOrder', { lessonId: cardProps.id, numOfSpaces: amount.value })
}

const minusOne = () => {
  amount.value--
  emit('addToOrder', { lessonId: cardProps.id, numOfSpaces: amount.value })
}
</script>

<template>
  <div class="card-container">
    <div class="image-container">
      <a href="">
        <img src="@/assets\mindbloomsvgbeige.svg" alt="" class="image" />
      </a>
    </div>
    <div class="text-container">
      <h1 class="title">{{ cardProps.topic }}</h1>
      <div class="icon-p-container">
        <font-awesome-icon icon="money-bill-wave" />
        <p id="price" class="description-text">{{ cardProps.price }}</p>
      </div>
      <div class="icon-p-container">
        <font-awesome-icon icon="location-dot" />
        <p id="location" class="description-text">{{ cardProps.location }}</p>
      </div>
      <div class="icon-p-container">
        <font-awesome-icon icon="users" />
        <p id="spaces" class="description-text">{{ cardProps.numOfSpaces }}</p>
      </div>
      <div class="buttons-container" :class="{ compact: hidden }">
        <button class="minus-button" :class="{ hidden: hidden }" @click="minusOne">
          <font-awesome-icon v-if="amount === 1" icon="trash" class="icon" />
          <span v-else :class="{ hidden: hidden }">-</span>
        </button>
        <p :class="{ hidden: hidden }">{{ amount }}</p>
        <button class="add-button" @click="plusOne">+</button>
      </div>
    </div>
  </div>
</template>
