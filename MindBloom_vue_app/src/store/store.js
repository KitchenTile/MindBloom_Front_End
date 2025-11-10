import { ref, reactive } from 'vue'
import { getAllLessons } from '../api/fetchAPI'

// user object
export const user = ref(null)

//login modal
export const loginModalActive = ref(false)

//lesson modal
export const lessonModalActive = ref({ active: false, id: null })

//checkout modal
export const checkoutModalActive = ref(false)

// order state and logic
export const order = reactive([])

export const addToOrder = (newOrder) => {
  const newItem = ref(true)
  for (let i = 0; i < order.length; i++) {
    if (order[i].lessonId === newOrder.lessonId) {
      order[i].availability = newOrder.availability
      newItem.value = false
    }
    if (order[i].lessonId === newOrder.lessonId && order[i].availability === 0) {
      order.splice(i, 1)
    }
  }
  if (newItem.value === true) {
    order.push(newOrder)
  }
  // console.log(order)
}

export function clearOrder() {
  order.length = 0
}

// fetch and store lessons
export const cardInfo = ref([])

export const fetchData = async () => {
  cardInfo.value = []

  try {
    const data = await getAllLessons()
    cardInfo.value = [...data]
  } catch (err) {
    console.log(err)
  }
}
