<script setup>
import Header from '../components/header/Header.vue'
import LessonCard from '../components/cards/LessonCard.vue'
import { ref, onMounted, computed, watch } from 'vue'
import './LessonsView.css'
import LessonModalComponent from '../components/modals/LessonModalComponent.vue'
import { cardInfo, fetchData, lessonModalActive } from '../store/store'

const loading = ref(false)
const filter = ref({ criteria: 'topic', ascending: false })
const filterOpen = ref(false)

const filterCriteria = ['topic', 'price', 'location', 'availability']

const filterLessons = computed(() => {
  const lessonsCopy = [...cardInfo.value]

  if (filter.value.criteria === 'topic' || filter.value.criteria === 'location') {
    lessonsCopy.sort((a, b) => {
      const lessonA = a[filter.value.criteria].toUpperCase()
      const lessonB = b[filter.value.criteria].toUpperCase()
      if (lessonA < lessonB) {
        return filter.value.ascending ? 1 : -1
      }
      if (lessonA > lessonB) {
        return filter.value.ascending ? -1 : 1
      }
    })
  } else {
    lessonsCopy.sort((a, b) =>
      filter.value.ascending
        ? a[filter.value.criteria] - b[filter.value.criteria]
        : b[filter.value.criteria] - a[filter.value.criteria],
    )
  }

  return lessonsCopy
})

watch(filter.value, (newCriteria) => {
  console.log(newCriteria)
  console.log(filterCriteria)

  if (filterOpen) filterOpen.value = !filterOpen
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main>
    <Header />

    <div v-if="loading" class="loading">Loading...</div>
    <div class="lesson-page-container">
      <div class="title-icon-contaianer">
        <h1 class="title">All Lessons</h1>
        <div class="filter-container">
          <font-awesome-icon icon="filter" class="icon" @click="() => (filterOpen = !filterOpen)" />
          <div class="filter-inputs-container" :class="{ open: filterOpen }">
            <div
              v-for="criteria in filterCriteria"
              class="filter-input"
              :class="[
                { hidden: !filterOpen },
                { selected: filter.criteria === criteria && !filterOpen },
              ]"
            >
              <input
                type="radio"
                :id="`filter-${criteria}`"
                name="criteria"
                :value="criteria"
                class="radio-input"
                v-model="filter.criteria"
              />
              <label :for="`filter-${criteria}`">{{ criteria }}</label>
              <div class="ascdsc-container" :class="{ hidden: filterOpen }">
                <input
                  type="radio"
                  id="asc"
                  name="asc"
                  :value="!filter.ascending"
                  class="radio-input"
                  v-model="filter.ascending"
                />
                <label for="asc" v-if="filter.ascending"
                  ><font-awesome-icon icon="arrow-up-wide-short"
                /></label>
                <input
                  type="radio"
                  id="dsc"
                  name="dsc"
                  :value="!filter.ascending"
                  class="radio-input"
                  v-model="filter.ascending"
                />
                <label for="dsc" v-if="!filter.ascending"
                  ><font-awesome-icon icon="arrow-down-wide-short"
                /></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="all-cards-container">
        <div v-for="lesson in filterLessons" :key="lesson._id">
          <LessonCard
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :availability="lesson.availability"
            :search="false"
            :svg="lesson.svg"
          />
          <LessonModalComponent
            :id="lesson._id"
            :topic="lesson.topic"
            :price="lesson.price"
            :location="lesson.location"
            :availability="lesson.availability"
            :map="lesson.map"
            :tutor="lesson.tutor"
            :date="lesson.date"
            :svg="lesson.svg"
            :modalActive="lessonModalActive.active && lessonModalActive.id === lesson._id"
          />
        </div>
      </div>
    </div>
  </main>
</template>
