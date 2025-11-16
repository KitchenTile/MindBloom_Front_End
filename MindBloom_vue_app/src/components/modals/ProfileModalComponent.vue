<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { loginModalActive, user } from '../../store/store'
import { supabase } from '../../utils/supabase'
import './ProfileModal.css'
import Modal from './Modal.vue'
import { createUser, login } from '../../api/fetchAPI'
import BookUploadCompoenet from '../BookUploadCompoenet.vue'
import Logo from '../../assets/Logo.vue'
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from '../../utils/inputValidation'

const newUser = ref(false)
const register = computed(() => newUser)
const email = ref('')
const password = ref('')
const errors = ref({ name: null, phoneNumber: null, email: null, password: null })

const isAdmin = ref(false)
const name = ref('')
const phoneNumber = ref(null)
const userAdmin = ref(false)

const hasAnyErrors = computed(() => {
  return Object.values(errors.value).some((error) => error !== null)
})

const modalProps = defineProps(['modalActive'])

const closeModal = () => {
  loginModalActive.value = false
}

const adminCheck = async () => {
  try {
    if (!user.value) {
      userAdmin.value = false
      return
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.value.id)

    if (error) return console.log(error)

    const isUserAdmin = data[0].role === 'admin'
    userAdmin.value = isUserAdmin

    console.log(userAdmin.value)
  } catch (error) {
    console.log(error)
  }
}

watch(user, (newUser) => {
  adminCheck()
  console.log(newUser)
  console.log(userAdmin.value)
})

watch(
  () => name.value,
  (newName) => {
    if (!validateName(newName)) {
      errors.value.name = 'Enter a valid name'
    } else {
      errors.value.name = null
    }
  },
)

watch(
  () => phoneNumber.value,
  (newPhoneNumber) => {
    if (!validateNumber(newPhoneNumber)) {
      errors.value.phoneNumber = 'Enter a valid phone number'
    } else {
      errors.value.phoneNumber = null
    }
  },
)

watch(
  () => email.value,
  (newEmail) => {
    if (!validateEmail(newEmail)) {
      errors.value.email = 'Enter a valid email'
    } else {
      errors.value.email = null
    }
  },
)

watch(
  () => password.value,
  (newPassword) => {
    if (!validatePassword(newPassword)) {
      errors.value.password = 'Enter a valid password'
    } else {
      errors.value.password = null
    }
  },
)

const signUpFunction = async (email, password, name, phoneNumber, isAdmin) => {
  try {
    const newUser = await createUser(email, password, name, phoneNumber, isAdmin)

    if (newUser.error) {
      throw new Error(newUser.error.message || 'Sign up failed')
    }

    console.log(newUser)

    await loginFunction(email.value, password.value)
  } catch (error) {
    console.log(error)
  }
}

const loginFunction = async () => {
  try {
    const loginData = await login(email.value, password.value)

    if (loginData.error) {
      throw new Error(loginData.error.message || 'Login failed')
    }

    // Extract the tokens and user object from the response
    const { session, user: userObject } = loginData

    const { data, error } = await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    })

    if (error) throw error

    user.value = userObject

    console.log(user.value)
  } catch (error) {
    console.log(error)
  }
}

const logoutFunction = async () => {
  console.log('logout')
  await supabase.auth.signOut()
}
</script>

<template>
  <main>
    <Modal :modalActive="modalProps.modalActive" @closeModal="closeModal">
      <div class="profile-container">
        <div class="form" v-if="user === null">
          <div class="logo-title-container">
            <Logo />
            <h1 class="title">{{ newUser ? 'REGISTER' : 'LOG IN' }}</h1>
          </div>
          <div class="input-label-container" :class="{ hidden: !newUser }">
            <label id="name-label" for="name">FULL NAME</label>
            <input id="name-input" v-model="name" />
            <p class="error-message" v-show="errors.name">{{ errors.name }}</p>
          </div>

          <div class="input-label-container" :class="{ hidden: !newUser }">
            <label id="phone-label" for="phone">PHONE</label>
            <input id="phone-input" v-model="phoneNumber" />
            <p class="error-message" v-show="errors.phoneNumber">{{ errors.phoneNumber }}</p>
          </div>
          <div class="input-label-container">
            <label id="email-label" for="email">EMAIL</label>
            <input id="email-input" v-model="email" />
            <p class="error-message" v-show="errors.email">{{ errors.email }}</p>
          </div>

          <div class="input-label-container">
            <label id="password-label" for="password">PASSWORD</label>
            <input id="password-input" v-model="password" />
            <p class="error-message" v-show="errors.password">{{ errors.password }}</p>
          </div>

          <div class="input-label-container" id="admin-check" :class="{ hidden: !newUser }">
            <label for="isAdmin">Are you an admin?</label>
            <input v-model="isAdmin" type="checkbox" />
          </div>

          <div v-if="newUser" style="margin-bottom: 30px">
            <button
              class="button"
              :class="{ disabled: hasAnyErrors }"
              @click="signUpFunction(email, password, name, phoneNumber, isAdmin)"
            >
              JOIN
            </button>
            <p>
              Already an user?
              <span @click="newUser = false" class="register-text">Login now.</span>
            </p>
          </div>
          <div v-else style="margin-bottom: 30px">
            <button class="button" @click="loginFunction(email, password)">LOGIN</button>
            <p style="text-align: center">
              no account? <span @click="newUser = true" class="register-text">Register now.</span>
            </p>
          </div>
        </div>
        <button class="button" @click="logoutFunction" v-else>LOGOUT</button>
        <div class="upload-container" v-if="userAdmin">
          <BookUploadCompoenet />
        </div>
      </div>
    </Modal>
  </main>
</template>
