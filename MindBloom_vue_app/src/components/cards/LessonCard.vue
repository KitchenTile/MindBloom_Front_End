<script setup>
import { ref, computed, onMounted } from 'vue'
import './LessonCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { order, addToOrder, lessonModalActive } from '../../store/store'

const cardProps = defineProps(['topic', 'price', 'location', 'numOfSpaces', 'id'])

const amount = computed({
  get() {
    let item = null
    for (let i = 0; i < order.length; i++) {
      if (cardProps.id === order[i].lessonId) {
        item = order[i]
      }
    }
    return item && typeof item.numOfSpaces === 'number' ? item.numOfSpaces : 0
  },
  set(val) {
    if (val <= 0) {
      addToOrder({ lessonId: cardProps.id, numOfSpaces: 0 })
    } else {
      addToOrder({ lessonId: cardProps.id, numOfSpaces: val })
    }
  },
})

// bar width calcs
const barStyle = computed(() => {
  const spacesLeft = (10 - cardProps.numOfSpaces) * 10
  return {
    width: spacesLeft + '%',
  }
})
// add button class
const hidden = computed(() => amount.value === 0)

const isDisabled = computed(() => cardProps.numOfSpaces === amount.value)

const openLessonModal = () => {
  lessonModalActive.value = { active: true, id: cardProps.id }
  console.log(lessonModalActive.value)
}
</script>

<template>
  <div class="card-container">
    <div class="image-container" @click="openLessonModal">
      <!-- <a href=""> -->
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="#1d5236" />
      </svg>
      <img src="@/assets\mindbloomsvgbeige.svg" alt="" class="image" />
      <!-- </a> -->
    </div>
    <div class="text-container">
      <h1 class="title">{{ cardProps.topic }}</h1>
      <div class="spaces-display-container">
        <div class="icon-p-container" id="space-bar">
          <!-- <font-awesome-icon icon="users" /> -->
          <p id="spaces" class="description-text">Available spaces</p>
          <p id="spaces" class="description-text" v-if="cardProps.numOfSpaces !== 0">
            {{ cardProps.numOfSpaces }} / 10
          </p>
          <p id="full" class="description-text" v-else>full</p>
        </div>
        <div class="bar-container">
          <div class="bar" :style="barStyle" />
        </div>
      </div>
      <div class="icon-p-container">
        <font-awesome-icon icon="location-dot" />
        <p id="location" class="description-text">{{ cardProps.location }}</p>
      </div>
      <div class="icon-p-container">
        <font-awesome-icon icon="money-bill-wave" />
        <p id="price" class="description-text">{{ cardProps.price }}</p>
      </div>

      <div class="buttons-container" :class="{ compact: hidden }">
        <button class="minus-button" :class="{ hidden: hidden }" @click="amount--">
          <font-awesome-icon v-if="amount === 1" icon="trash" class="icon" />
          <span v-else :class="{ hidden: hidden }">-</span>
        </button>
        <p :class="{ hidden: hidden }" class="amount-text">{{ amount }}</p>
        <button
          class="add-button"
          :class="{ disabled: isDisabled }"
          @click="amount++"
          :disabled="isDisabled"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
