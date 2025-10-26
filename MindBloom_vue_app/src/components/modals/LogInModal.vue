<script setup>
import { ref, onMounted } from 'vue'
import { user } from '../../store/store'
import { supabase } from '../../utils/supabase'
import './LogInModal.css'
import Modal from './Modal.vue'
import { login } from '../../api/fetchAPI'

const email = ref('')
const password = ref('')

const loginFunction = async (email, password) => {
  try {
    const loginData = await login(email, password)

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
    <Modal>
      <div class="login-form">
        <input class="email-input" v-model="email" />
        <input
          class="password-input"
          v-model="password"
          @keyup.enter="loginFunction(email, password)"
        />
        <button class="" @click="loginFunction(email, password)" v-if="user === null">Login</button>
        <button class="" @click="logoutFunction" v-else>LogOut</button>
      </div>
    </Modal>
  </main>
</template>
