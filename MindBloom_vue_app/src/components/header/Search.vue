<script setup lang="ts">
import { ref, computed } from 'vue'
import './LessonCard.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// const filterProps = defineProps({
//   topic: String,
//   price: Number,
//   location: String,
//   numOfSpaces: Number,
//   id: String,
// })

const searchTerm = ref('')
const hasFocus = ref(false)
// const hidden = computed(() => hasFocus)
const compact = computed(() => hasFocus)

const emit = defineEmits(['addToOrder'])

const handleFocus = (value) => {
  focus(value)
}

// @focusin="focus(true)"
// @focusout="focus(false)"
</script>

<template>
  <div className="genres-container">
    <span>Genres</span>
    <div className="genres-list" id="{section}">
      {genres.map((genre, idx) => (
      <div className="input-container" key="{idx}">
        <input
          type="radio"
          id="{genre}"
          name="genre"
          value="{genre}"
          className="input"
          onClick="{(event)"
          =""
        />
        handleFilter(event.target.value)} />
        <svg>
          <polyline points="1,5 6,9 14,1"></polyline>
        </svg>
        <label htmlFor="{genre}">{genre}</label>
      </div>
      ))}
    </div>
  </div>
</template>
