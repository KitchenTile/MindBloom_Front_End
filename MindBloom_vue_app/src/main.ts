import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faBook,
  faMoneyBillWave,
  faLocationDot,
  faUsers,
  faCartShopping,
  faFilter,
  faTrash,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

library.add(faBook, faMoneyBillWave, faLocationDot, faUsers, faCartShopping, faFilter, faTrash, faMagnifyingGlass)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
