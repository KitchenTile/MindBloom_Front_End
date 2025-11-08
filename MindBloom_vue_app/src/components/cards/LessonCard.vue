<script setup>
import { ref, computed, onMounted } from 'vue'
import './LessonCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { order, addToOrder, lessonModalActive } from '../../store/store'

const cardProps = defineProps(['topic', 'price', 'location', 'availability', 'id', 'search'])

const amount = computed({
  get() {
    let item = null
    for (let i = 0; i < order.length; i++) {
      if (cardProps.id === order[i].lessonId) {
        item = order[i]
      }
    }
    return item && typeof item.availability === 'number' ? item.availability : 0
  },
  set(val) {
    if (val <= 0) {
      addToOrder({ lessonId: cardProps.id, availability: 0 })
    } else {
      addToOrder({ lessonId: cardProps.id, availability: val })
    }
  },
})

// bar width calcs
const barStyle = computed(() => {
  const spacesLeft = (10 - cardProps.availability) * 10
  return {
    width: spacesLeft + '%',
  }
})
// add button class
const hidden = computed(() => amount.value === 0)

const isDisabled = computed(() => cardProps.availability === amount.value)

const openLessonModal = () => {
  lessonModalActive.value = { active: true, id: cardProps.id }
  console.log(lessonModalActive.value)
}
</script>

<template>
  <div class="card-container" :class="{ search: search }">
    <div class="image-container" @click="openLessonModal" :class="{ search: search }">
      <font-awesome-icon icon="book-open" class="book-icon" />
      <svg width="100" height="100" :class="{ search: search }">
        <circle cx="50" cy="50" r="50" fill="#1d5236" />
      </svg>
      <img src="@/assets\mindbloomsvgbeige.svg" alt="" class="image" />
    </div>
    <div class="text-container" :class="{ search: search }">
      <h1 class="title">{{ cardProps.topic }}</h1>
      <div :class="{ search: search }">
        <div class="spaces-display-container" v-if="!search">
          <div class="icon-p-container" id="space-bar">
            <p id="spaces" class="description-text">Available spaces</p>
            <p id="spaces" class="description-text" v-if="cardProps.availability !== 0">
              {{ cardProps.availability }} / 10
            </p>
            <p id="full" class="description-text" v-else>full</p>
          </div>
          <div class="bar-container">
            <div class="bar" :style="barStyle" />
          </div>
        </div>
        <div class="icon-p-container" v-else>
          <font-awesome-icon icon="users" />
          <p class="description-text" v-if="cardProps.availability !== 0">
            {{ cardProps.availability }}
          </p>
          <p id="full" class="description-text" v-else>full</p>
        </div>
        <div class="icon-p-container">
          <font-awesome-icon icon="location-dot" />
          <p id="location" class="description-text">{{ cardProps.location }}</p>
        </div>
        <div class="icon-p-container">
          <font-awesome-icon icon="money-bill-wave" />
          <p id="price" class="description-text">{{ cardProps.price }}</p>
        </div>
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
