export const placeOrder = async (order: Object) => {
  try {
    const res = await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order),
    })

    const data = await res.json()
    console.log('Order placed:', data)

    return data
    // return res
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
      console.log('Error fetching data')
    }

    const data = await res.json()
    // console.log('data')
    // console.log(data)
    return data
  } catch (error) {
    console.error('error:' + error)
  }
}
