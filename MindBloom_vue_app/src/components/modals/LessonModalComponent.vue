<script setup>
import { ref, computed, onMounted } from 'vue'
import './LessonModalComponent.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { order, addToOrder, lessonModalActive } from '../../store/store'
import Modal from './Modal.vue'

const modalProps = defineProps([
  'topic',
  'price',
  'location',
  'availability',
  'id',
  'modalActive',
  'tutor',
  'date',
  'map',
])

const closeModal = () => {
  lessonModalActive.value = { active: false, id: null }
}

const amount = computed({
  get() {
    let item = null
    for (let i = 0; i < order.length; i++) {
      if (modalProps.id === order[i].lessonId) {
        item = order[i]
      }
    }
    return item && typeof item.availability === 'number' ? item.availability : 0
  },
  set(val) {
    if (val <= 0) {
      addToOrder({ lessonId: modalProps.id, availability: 0 })
    } else {
      addToOrder({ lessonId: modalProps.id, availability: val })
    }
  },
})

// bar width calcs
const barStyle = computed(() => {
  const spacesLeft = (10 - modalProps.availability) * 10
  return {
    width: spacesLeft + '%',
  }
})
// add button class
const hidden = computed(() => amount.value === 0)

const isDisabled = computed(() => modalProps.availability === amount.value)
</script>

<template>
  <Modal :modalActive="modalProps.modalActive" @closeModal="closeModal">
    <div class="lesson-modal-container">
      <div class="img-info-container">
        <div class="image-container">
          <img src="@/assets\mindbloomsvgbeige.svg" alt="" class="image" />
        </div>
        <div class="text-container">
          <h1 class="title">Lesson Overview</h1>
          <div class="spaces-display-container">
            <div class="icon-p-container" id="space-bar">
              <p id="spaces" class="description-text">Available spaces</p>
              <p id="spaces" class="description-text" v-if="modalProps.availability !== 0">
                {{ modalProps.availability }} / 10
              </p>
              <p id="full" class="description-text" v-else>full</p>
            </div>
            <div class="bar-container">
              <div class="bar" :style="barStyle" />
            </div>
          </div>
          <div class="details-container">
            <div class="icon-p-container">
              <font-awesome-icon icon="book" class="icon" />
              <p class="description-text">{{ modalProps.topic }}</p>
            </div>
            <div class="icon-p-container">
              <font-awesome-icon icon="person-chalkboard" class="icon" />
              <p id="price" class="description-text">{{ modalProps.tutor }}</p>
            </div>
            <div class="icon-p-container">
              <font-awesome-icon icon="location-dot" class="icon" />
              <p id="location" class="description-text">{{ modalProps.location }}</p>
            </div>
            <div class="icon-p-container">
              <font-awesome-icon icon="money-bill-wave" class="icon" />
              <p id="price" class="description-text">{{ modalProps.price }}</p>
            </div>
            <div class="icon-p-container">
              <font-awesome-icon icon="calendar" class="icon" />
              <p id="price" class="description-text">{{ modalProps.date }}</p>
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
      <div class="map-container">
        <h1 class="title">Location</h1>
        <iframe
          :src="modalProps.map"
          style="filter: invert(90%) hue-rotate(180deg)"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="map"
        ></iframe>
      </div>
    </div>
  </Modal>
</template>
