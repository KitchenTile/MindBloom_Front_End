const AWS_URL = 'http://mindbloom-backend-env.eba-awc55pm9.eu-north-1.elasticbeanstalk.com'

export const placeOrder = async (order) => {
  try {
    const res = await fetch(`${AWS_URL}/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order),
    })

    if (!res.ok) {
      throw new Error(`Failed to place orders: ${res.status} ${res.statusText}`)
    }

    console.log(order)

    const data = await res.json()
    console.log('Order placed:', data)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const updateLessons = async (id) => {
  try {
    const res = await fetch(`${AWS_URL}/lessons/${id}`, {
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
    const res = await fetch(`${AWS_URL}/lessons`)

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

export const getAllChats = async () => {
  try {
    const res = await fetch(`${AWS_URL}/chat`)

    if (!res.ok) {
      throw new Error(`Failed to get all chats: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const handleChat = async (userQuery, chatId) => {
  try {
    const res = await fetch(`${AWS_URL}/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userQuery: userQuery, chatId: chatId }),
    })

    console.log(userQuery)

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

export const deleteChat = async (chatId) => {
  try {
    const res = await fetch(`${AWS_URL}/chat`, {
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

export const editChatTitle = async (chatId, newTitle) => {
  try {
    const res = await fetch(`${AWS_URL}/chat`, {
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

export const createUser = async (email, password, name, phoneNumber, role) => {
  try {
    const res = await fetch(`${AWS_URL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        role: role ? 'admin' : 'student',
      }),
    })

    if (!res.ok) {
      throw new Error(`Failed to handle user creation: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('User created:', data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const login = async (email, password) => {
  try {
    const res = await fetch(`${AWS_URL}/users/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })

    if (!res.ok) {
      throw new Error(`Failed to login: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('login:', data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const res = await fetch(`${AWS_URL}/users/logout`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`Failed to login: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log('login:', data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const uploadBook = async (file) => {
  try {
    const res = await fetch(`${AWS_URL}/chat/upload`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ file: file }),
    })

    if (!res.ok) {
      throw new Error(`Failed to upload book: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const search = async (searchTerm) => {
  try {
    if (searchTerm === '') return

    // const res = await fetch(`${AWS_URL}/search/${searchTerm}`)
    const res = await fetch(`http://localhost:5000/search/${searchTerm}`)

    if (!res.ok) {
      throw new Error(`Failed to search for lessons: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
