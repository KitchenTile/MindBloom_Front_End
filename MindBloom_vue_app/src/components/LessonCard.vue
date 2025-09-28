<script setup lang="ts">
import { ref } from 'vue'
import './LessonCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const cardProps = defineProps({
  topic: String,
  price: Number,
  location: String,
  numOfSpaces: Number,
})

const amount = ref(0)
const isDisabled = ref(false)

const plusOne = () => {
  amount.value++
}

const minusOne = () => {
  amount.value--
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
      <div class="button-container">
        <button class="add-button" @click="plusOne">{{ amount === 0 ? '+' : amount }}</button>
      </div>
    </div>
  </div>
</template>
