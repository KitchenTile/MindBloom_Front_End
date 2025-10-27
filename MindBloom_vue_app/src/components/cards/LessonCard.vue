<script setup>
import { ref, computed, onMounted } from 'vue'
import './LessonCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { order, addToOrder } from '../../store/store'

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

const hidden = computed(() => amount.value === 0)

const isDisabled = computed(() => cardProps.numOfSpaces === amount.value)
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
        <button class="minus-button" :class="{ hidden: hidden }" @click="amount--">
          <font-awesome-icon v-if="amount === 1" icon="trash" class="icon" />
          <span v-else :class="{ hidden: hidden }">-</span>
        </button>
        <p :class="{ hidden: hidden }">{{ amount }}</p>
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
