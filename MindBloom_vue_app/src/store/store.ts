import { ref, reactive } from 'vue'

interface OrderItem {
  lessonId: string
  numOfSpaces: number
}

export const order = reactive<OrderItem[]>([])

export const addToOrder = (newOrder: OrderItem) => {
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
