<script setup>
import { ref, onMounted, watch } from 'vue'
import { user } from '../../store/store'
import { supabase } from '../../utils/supabase'
import './LogInModal.css'
import Modal from './Modal.vue'
import { createUser, login } from '../../api/fetchAPI'

const newUser = ref(false)
const email = ref('')
const password = ref('')

const isAdmin = ref(false)
const name = ''
const phoneNumber = ref(null)

watch(isAdmin, (admin) => {
  console.log(admin)
})

const modalProps = defineProps(['modalActive'])

const signUpFunction = async (email, password, name, phoneNumber, isAdmin) => {
  try {
    const newUser = await createUser(
      email.value,
      password.value,
      name.value,
      phoneNumber.value,
      isAdmin.value,
    )

    console.log(newUser)

    if (newUser.error) {
      throw new Error(newUser.error.message || 'Sign up failed')
    }

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
  await supabase.auth.signOut()
}
</script>

<template>
  <main>
    <Modal :modalActive="modalProps.modalActive">
      <div class="form">
        <input class="name-input" :class="{ hidden: !newUser }" v-model="name" />
        <input class="phone-input" :class="{ hidden: !newUser }" v-model="phoneNumber" />
        <input class="email-input" v-model="email" />
        <input class="password-input" v-model="password" />
        <input v-model="isAdmin" :class="{ hidden: !newUser }" type="checkbox" />
        <div v-if="newUser">
          <button
            class="button"
            @click="signUpFunction(email, password, name, phoneNumber, isAdmin)"
          >
            Join
          </button>
        </div>
        <div v-else>
          <button class="button" @click="loginFunction(email, password)" v-if="user === null">
            Login
          </button>
          <button class="button" @click="logoutFunction" v-else>LogOut</button>
        </div>
        <button class="button" @click="newUser = true" v-if="user === null">NEW USER?</button>
      </div>
    </Modal>
  </main>
</template>
