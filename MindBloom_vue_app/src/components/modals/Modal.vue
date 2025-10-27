<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import './modal.css'
import { loginModalActice } from '../../store/store'

const modalProps = defineProps(['modalActive'])

const closeModal = () => {
  loginModalActice.value = false
}
</script>

<template>
  <transition name="modal-animation">
    <div class="modal" v-show="modalProps.modalActive">
      <transition name="inner-modal-animation">
        <div class="modal-inner" v-show="modalProps.modalActive">
          <font-awesome-icon icon="xmark" class="icon" @click="closeModal" />
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>
