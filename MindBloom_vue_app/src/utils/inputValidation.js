export const validateName = (name) => {
  const regex = /^[a-z ,.'-]+$/i

  return regex.test(name)
}

export const validateNumber = (phoneNumber) => {
  const regex = /^\d{11}$/

  return regex.test(phoneNumber)
}

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return regex.test(email)
}

export const validatePassword = (password) => {
  /*
   * At least one lowercase letter ((?=.*[a-z])).
   * At least one uppercase letter ((?=.*[A-Z])).
   * At least one digit ((?=.*\d)).
   * Consists of only alphanumeric characters ([a-zA-Z\d]).
   * Has a minimum length of 8 characters ({8,}).
   */
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  return regex.test(password)
}
