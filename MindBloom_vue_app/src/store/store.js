import { ref, reactive } from 'vue'

// user object
export const user = ref(null)

//login modal
export const loginModalActice = ref(false)

// order state and logic
export const order = reactive([])

export const addToOrder = (newOrder) => {
  const newItem = ref(true)
  for (let i = 0; i < order.length; i++) {
    if (order[i].lessonId === newOrder.lessonId) {
      order[i].numOfSpaces = newOrder.numOfSpaces
      newItem.value = false
    }
    if (order[i].lessonId === newOrder.lessonId && order[i].numOfSpaces === 0) {
      order.splice(i, 1)
    }
  }
  if (newItem.value === true) {
    order.push(newOrder)
  }
  console.log(order)
}

export function clearOrder() {
  order.length = 0
}
