<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './modal.css'

const modalProps = defineProps(['modalActive'])
const modalEmit = defineEmits(['closeModal'])

const closeButton = () => {
  modalEmit('closeModal')
}
</script>

<template>
  <transition name="modal-animation">
    <div class="modal" v-show="modalProps.modalActive">
      <transition name="inner-modal-animation">
        <div class="modal-inner" v-show="modalProps.modalActive">
          <font-awesome-icon icon="xmark" class="cross-icon" @click="closeButton" />
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>
