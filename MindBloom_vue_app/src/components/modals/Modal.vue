<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import './modal.css'

// export default {
//   props: ['modalActive'],
// }

const modalProps = defineProps({
  modalActive: Boolean,
})

const modalActive = ref(true)

const closeModal = () => {
  modalActive.value = false
}
</script>

<template>
  <transition name="modal-animation">
    <div class="modal" v-show="modalActive">
      <transition name="inner-modal-animation">
        <div class="modal-inner" v-show="modalActive">
          <font-awesome-icon icon="xmark" class="icon" @click="closeModal" />
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>
