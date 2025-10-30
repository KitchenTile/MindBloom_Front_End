<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LessonCard from '../cards/LessonCard.vue'
import { getAllLessons } from '../../api/fetchAPI'

// const filterProps = defineProps({
//   topic: String,
//   price: Number,
//   location: String,
//   numOfSpaces: Number,
//   id: String,
// })

const searchTerm = ref('')
const hasFocus = ref(false)
const error = ref(null)
const cardInfo = ref([])
// const hidden = computed(() => hasFocus)
const compact = computed(() => hasFocus)

const emit = defineEmits(['addToOrder'])

async function fetchData() {
  error.value = null
  cardInfo.value = []
  console.log(cardInfo.value)

  try {
    const data = await getAllLessons()
    cardInfo.value = [...data]
  } catch (err) {
    error.value = err.toString()
  }
  // } finally {
  //   loading.value = false
  // }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="search-container">
    <div class="search-body">
      <input
        type="text"
        placeholder="Topic, price, etc."
        class="search-input"
        v-model="searchTerm"
      />
      <font-awesome-icon icon="magnifying-glass" class="search-icon" />
      <div class="search-results">
        <div v-for="(lesson, index) in cardInfo" :key="index" v-if="searchTerm">
          <!-- <div v-if=""> -->

          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :numOfSpaces="lesson.numOfSpaces"
            :search="true"
          />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
