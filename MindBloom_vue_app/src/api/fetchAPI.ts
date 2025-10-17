interface Chats {
  chat_id: string
  user_id: string
  title: string
  messages: []
  created_at: string
}

export const placeOrder = async (order: Object) => {
  try {
    const res = await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order),
    })

    if (!res.ok) {
      throw new Error(`Failed to place orders: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('Order placed:', data)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateLessons = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/lessons/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: id }),
    })

    if (!res.ok) {
      throw new Error(`Failed to update lessons: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('Order updated:', data)

    // return data
  } catch (error) {
    console.error(error)
  }
}

export const getAllLessons = async () => {
  try {
    const res = await fetch('http://localhost:5000/lessons')

    if (!res.ok) {
      throw new Error(`Failed to get all lessons: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    // console.log('data')
    // console.log(data)
    return data
  } catch (error) {
    console.error('error:' + error)
  }
}

export const getAllChats = async (): Promise<Chats[] | undefined> => {
  try {
    const res = await fetch('http://localhost:5000/chat')

    if (!res.ok) {
      throw new Error(`Failed to get all chats: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const handleChat = async (
  userQuery: string,
  chatId: string,
): Promise<string | undefined> => {
  try {
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userQuery: userQuery, chatId: chatId }),
    })

    if (!res.ok) {
      throw new Error(`Failed to handle chat submition: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('User Question:', userQuery)

    return data
  } catch (error) {
    console.error('Error in API deleteChat:', error)
    throw error
  }
}

export const deleteChat = async (chatId: string): Promise<string | undefined> => {
  try {
    const res = await fetch('http://localhost:5000/chat', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: chatId }),
    })

    if (!res.ok) {
      throw new Error(`Failed to delete chat: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error in API deleteChat:', error)
    throw error
  }
}

export const editChatTitle = async (
  chatId: string,
  newTitle: string,
): Promise<string | undefined> => {
  try {
    const res = await fetch('http://localhost:5000/chat', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chatId: chatId, newTitle: newTitle }),
    })

    if (!res.ok) {
      throw new Error(`Failed to edit title: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error in API editChatTitle:', error)
    throw error
  }
}
