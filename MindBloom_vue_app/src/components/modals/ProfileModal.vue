<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { loginModalActive, user } from '../../store/store'
import { supabase } from '../../utils/supabase'
import './ProfileModal.css'
import Modal from './Modal.vue'
import { createUser, login } from '../../api/fetchAPI'
import BookUploadCompoenet from '../BookUploadCompoenet.vue'

const newUser = ref(false)
const register = computed(() => newUser)
const email = ref('')
const password = ref('')

const isAdmin = ref(false)
const name = ''
const phoneNumber = ref(null)
const userAdmin = ref(false)

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
    <Modal :modalActive="modalProps.modalActive" @closeModal="closeModal">
      <div class="profile-container">
        <div class="form" v-if="user === null">
          <div class="logo-title-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 59.48 59.48"
              xml:space="preserve"
              class="logo"
            >
              <path
                d="M24.929 31.978a1 1 0 0 0-1.414 0c-1.279 1.279-1.984 2.979-1.984 4.785s.705 3.506 1.984 4.785a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414c-.901-.901-1.398-2.099-1.398-3.371s.497-2.47 1.398-3.371a1 1 0 0 0 0-1.414m.353-18.877c-3.679-.638-7.191 1.821-7.836 5.496a4.774 4.774 0 0 1-5.521 3.87 1 1 0 1 0-.346 1.971q.593.103 1.174.103c3.222 0 6.085-2.316 6.662-5.598a4.777 4.777 0 0 1 5.521-3.871 1 1 0 1 0 .346-1.971"
              />
              <path
                d="M55.3 22.684c-.774-1.203-1.206-3.811-1.11-5.398.225-3.707-1.745-7.388-4.789-8.95-.587-.302-1.115-.454-1.581-.588-.801-.231-1.132-.327-1.435-.956-1.596-3.316-3.356-3.782-6.711-3.564-.311.006-.732-.46-1.163-.92C37.77 1.515 36.78.456 35.21.276l-.505-.05c-1.682 0-3.309.501-4.463 1.374-.327.246-.731.248-1.007.006C27.864.403 25.798-.488 24.377.298c-1.558.307-2.556 1.295-3.293 2.025-.583.577-.964.944-1.281.904-3.351-.215-5.114.249-6.711 3.564-.302.629-.633.725-1.434.956-.465.134-.993.286-1.581.588-3.044 1.563-5.013 5.243-4.789 8.95.096 1.588-.336 4.195-1.11 5.398-1.908 2.969-1.908 7.114 0 10.082.295.458.727.991 1.227 1.609.892 1.102 2.386 2.945 2.335 3.789-.227 3.736 2.053 8.041 5.082 9.596.545.28.637.563.843 1.42.114.474.256 1.063.562 1.697.823 1.711 2.114 2.201 3.056 2.561.936.355 1.323.503 1.465 1.529.329 2.383 1.604 3.99 3.497 4.409q.477.104.975.104c2.132 0 4.458-1.415 5.931-3.701.177-.274.471-.305.588-.305s.411.03.588.305c1.702 2.641 4.542 4.114 6.906 3.598 1.894-.419 3.168-2.026 3.497-4.409.142-1.026.529-1.174 1.465-1.529.942-.359 2.233-.85 3.057-2.561.305-.634.447-1.224.561-1.697.207-.856.298-1.14.843-1.42 3.028-1.555 5.308-5.859 5.082-9.596-.051-.844 1.443-2.688 2.335-3.789.5-.618.932-1.151 1.227-1.609 1.908-2.968 1.908-7.113 0-10.082m-.597 5.613a.986.986 0 0 0-.963-.816 1 1 0 0 0 0 2 .99.99 0 0 0 .905-.587 7.2 7.2 0 0 1-.92 2.59 1 1 0 0 0-.985.997c0 .103.03.196.058.289l-.279.345-.369.458a1 1 0 0 0-.41-.093 1 1 0 0 0-1 1c0 .244.098.46.243.634q-.258.375-.476.748a.98.98 0 0 0-.767-.382 1 1 0 0 0 0 2c.032 0 .06-.016.091-.018-.064.28-.105.556-.089.823.024.391.005.795-.041 1.203a.996.996 0 0 0-.961.992c0 .379.219.696.529.866-.163.484-.351.961-.585 1.414.027-.091.056-.18.056-.28a1 1 0 1 0-1 1 1 1 0 0 0 .681-.275c-.713 1.219-1.645 2.245-2.677 2.775-.48.246-.819.538-1.074.85a1 1 0 0 0 .071-.35 1 1 0 1 0-1 1 1 1 0 0 0 .654-.257c-.281.485-.408 1.002-.525 1.487a10 10 0 0 1-.225.79.99.99 0 0 0-.826 1.371c-.328.289-.709.456-1.137.622a1 1 0 0 0-.547.212c-.972.391-2.115 1.029-2.386 2.989-.149 1.082-.608 2.434-1.947 2.729-1.536.341-3.555-.807-4.793-2.729-.493-.764-1.341-1.221-2.269-1.221s-1.776.457-2.27 1.221c-1.237 1.922-3.251 3.068-4.792 2.729-1.339-.296-1.798-1.647-1.947-2.729-.304-2.2-1.709-2.735-2.735-3.125-.831-.316-1.488-.566-1.965-1.559a5 5 0 0 1-.314-.896c.005-.04.023-.075.023-.116 0-2.757 2.243-5 5-5a1 1 0 1 0 0-2c-2.911 0-5.411 1.788-6.465 4.322a4 4 0 0 0-.538-.34c-2.307-1.184-4.175-4.78-3.999-7.695.004-.071-.011-.144-.013-.216.002-.025.014-.046.014-.072 0-3.309 2.691-6 6-6 4.411 0 8-3.589 8-8a1 1 0 1 0-2 0c0 3.309-2.691 6-6 6-3.32 0-6.173 2.034-7.382 4.921a37 37 0 0 0-1.397-1.803c-.444-.548-.863-1.065-1.098-1.432-1.499-2.33-1.499-5.587 0-7.918 1.043-1.622 1.543-4.63 1.423-6.602-.175-2.893 1.383-5.857 3.706-7.05.415-.213.826-.331 1.222-.446.214-.062.434-.127.655-.206a.99.99 0 0 0 .871.536c1.654 0 3 1.346 3 3a1 1 0 1 0 2 0c0-2.445-1.767-4.477-4.089-4.908.085-.133.167-.273.244-.432.964-2.003 1.705-2.484 3.547-2.484.364 0 .772.019 1.233.049 1.246.077 2.079-.748 2.817-1.479.701-.693 1.362-1.349 2.395-1.506l.329-.061.158-.146c.367-.165 1.536.192 2.544 1.077.932.817 2.265.889 3.322.219a.97.97 0 0 0 .5.153.994.994 0 0 0 .988-.939 6.2 6.2 0 0 1 1.544-.302l.468.009c.016 0 .029.007.045.007-.016.076-.044.147-.044.227a1 1 0 0 0 1 1c.31 0 .577-.15.76-.372a15 15 0 0 1 .602.618.98.98 0 0 0-.362.754 1 1 0 0 0 1 1 .99.99 0 0 0 .858-.517c.357.177.754.28 1.206.259.465-.029.859-.041 1.225-.04a1 1 0 0 0 .711.298 1 1 0 0 0 .544-.183c.329.079.61.212.869.395a.98.98 0 0 0-.413.788 1 1 0 0 0 1 1 .98.98 0 0 0 .625-.238c.073.138.144.26.219.415.075.156.157.294.24.425a.995.995 0 0 0 .916 1.398.97.97 0 0 0 .513-.162c.321.144.646.243.96.334a.98.98 0 0 0-.473.828 1 1 0 0 0 2 0c0-.084-.028-.16-.048-.238 1.221.697 2.205 1.883 2.819 3.284a.986.986 0 0 0-.771.954 1 1 0 0 0 1 1c.12 0 .231-.03.338-.068a7.6 7.6 0 0 1 .116 1.752c-.008.136-.006.288-.009.433a1 1 0 0 0-.445-.116 1 1 0 0 0 0 2 .97.97 0 0 0 .535-.177c.172 1.517.582 3.122 1.215 4.227a.986.986 0 0 0-.749.949 1 1 0 0 0 1 1 .98.98 0 0 0 .582-.208c.329.966.455 2 .38 3.024"
              />
              <circle cx="37.74" cy="52.481" r="1" />
              <circle cx="33.74" cy="52.481" r="1" />
              <circle cx="35.74" cy="50.481" r="1" />
              <circle cx="39.74" cy="50.481" r="1" />
              <circle cx="31.74" cy="50.481" r="1" />
              <circle cx="39.74" cy="46.481" r="1" />
              <circle cx="31.74" cy="46.481" r="1" />
              <circle cx="33.74" cy="44.481" r="1" />
              <circle cx="35.74" cy="42.481" r="1" />
              <circle cx="39.74" cy="42.481" r="1" />
              <circle cx="31.74" cy="42.481" r="1" />
              <circle cx="37.74" cy="40.481" r="1" />
              <circle cx="31.74" cy="38.481" r="1" />
              <circle cx="37.74" cy="36.481" r="1" />
              <circle cx="33.74" cy="36.481" r="1" />
              <circle cx="31.74" cy="34.481" r="1" />
              <circle cx="33.74" cy="32.481" r="1" />
              <circle cx="35.74" cy="30.481" r="1" />
              <circle cx="39.74" cy="30.481" r="1" />
              <circle cx="31.74" cy="30.481" r="1" />
              <circle cx="37.74" cy="28.481" r="1" />
              <circle cx="35.74" cy="26.481" r="1" />
              <circle cx="39.74" cy="26.481" r="1" />
              <circle cx="31.74" cy="26.481" r="1" />
              <circle cx="33.74" cy="24.481" r="1" />
              <circle cx="35.74" cy="22.481" r="1" />
              <circle cx="37.74" cy="20.481" r="1" />
              <circle cx="33.74" cy="20.481" r="1" />
              <circle cx="31.74" cy="18.481" r="1" />
              <circle cx="37.74" cy="16.481" r="1" />
              <circle cx="33.74" cy="16.481" r="1" />
              <circle cx="35.74" cy="14.481" r="1" />
              <circle cx="39.74" cy="14.481" r="1" />
              <circle cx="37.74" cy="12.481" r="1" />
              <circle cx="33.74" cy="12.481" r="1" />
              <circle cx="31.74" cy="10.481" r="1" />
              <circle cx="37.74" cy="8.481" r="1" />
              <circle cx="39.74" cy="6.481" r="1" />
              <circle cx="31.74" cy="6.481" r="1" />
              <circle cx="33.74" cy="4.481" r="1" />
              <circle cx="41.74" cy="48.481" r="1" />
              <circle cx="45.74" cy="44.481" r="1" />
              <circle cx="43.74" cy="42.481" r="1" />
              <circle cx="45.74" cy="40.481" r="1" />
              <circle cx="47.74" cy="38.481" r="1" />
              <circle cx="45.74" cy="36.481" r="1" />
              <circle cx="41.74" cy="36.481" r="1" />
              <circle cx="45.74" cy="32.481" r="1" />
              <circle cx="49.74" cy="32.481" r="1" />
              <circle cx="41.74" cy="32.481" r="1" />
              <circle cx="45.74" cy="28.481" r="1" />
              <circle cx="49.74" cy="28.481" r="1" />
              <circle cx="43.74" cy="26.481" r="1" />
              <circle cx="45.74" cy="24.481" r="1" />
              <circle cx="47.74" cy="22.481" r="1" />
              <circle cx="43.74" cy="22.481" r="1" />
              <circle cx="45.74" cy="20.481" r="1" />
              <circle cx="41.74" cy="20.481" r="1" />
              <circle cx="47.74" cy="18.481" r="1" />
              <circle cx="49.74" cy="16.481" r="1" />
              <circle cx="47.74" cy="14.481" r="1" />
              <circle cx="43.74" cy="14.481" r="1" />
              <circle cx="49.74" cy="12.481" r="1" />
              <circle cx="41.74" cy="12.481" r="1" />
              <circle cx="43.74" cy="10.481" r="1" />
              <circle cx="51.74" cy="26.481" r="1" />
              <circle cx="51.74" cy="22.481" r="1" />
            </svg>
            <h1 class="title">{{ newUser ? 'REGISTER' : 'LOG IN' }}</h1>
          </div>
          <div class="input-label-container" :class="{ hidden: !newUser }">
            <label id="name-label" for="name">FULL NAME</label>
            <input id="name-input" v-model="name" />
          </div>

          <div class="input-label-container" :class="{ hidden: !newUser }">
            <label id="phone-label" for="phone">PHONE</label>
            <input id="phone-input" v-model="phoneNumber" />
          </div>
          <div class="input-label-container">
            <label id="email-label" for="email">EMAIL</label>
            <input id="email-input" v-model="email" />
          </div>

          <div class="input-label-container">
            <label id="password-label" for="password">PASSWORD</label>
            <input id="password-input" v-model="password" />
          </div>

          <div class="input-label-container" id="admin-check" :class="{ hidden: !newUser }">
            <label for="isAdmin">Are you an admin?</label>
            <input v-model="isAdmin" type="checkbox" />
          </div>

          <div v-if="newUser">
            <button
              class="button"
              @click="signUpFunction(email, password, name, phoneNumber, isAdmin)"
            >
              JOIN
            </button>
            <p>
              Already an user?
              <span @click="newUser = false" class="register-text">Login now.</span>
            </p>
          </div>
          <div v-else>
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
