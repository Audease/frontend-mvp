/* eslint-disable quotes */
const VALID_NAME_REGEXP = new RegExp("^[A-Za-z 0-9'-]{1,30}$", 'i')

type ValidationFunc = (value: any) => string | undefined

export function applyAll(...validators: Array<ValidationFunc>) {
  return (value: any) => {
    // return the first error
    for (const validator of validators) {
      const err = validator(value)

      if (err) return err;
    } 
  }
}

export function validateNameLength(input: string) {
  if (input.length < 2) {
    return "Name is too short"
  }

  if (input.length > 25) {
    return "Name is too long"
  }
}

export function validateDateOfBirth(input: string) {
  const inputDob = new Date(input)

  const today = new Date()

  let age = today.getFullYear() - inputDob.getFullYear()

  const monthDifference = today.getMonth() - inputDob.getMonth()
  const dayDifference = today.getDate() - inputDob.getDate()

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
  }

  if (age < 18) {
      return "You must be 18 or over to use our platform."
  }
}

export const isEmpty = (
  value: string | null | undefined | number | boolean,
): boolean => {
  if (typeof value === 'boolean') {
    if (!value) {
      return true
    }
    return false
  }

  if (value || value === 0) {
    if (String(value) === 'null' || String(value).length === 0) {
      return true
    }
  } else {
    return true
  }
  return false
}

export const empty = (value: string | null | undefined | boolean) => {
  if (isEmpty(value)) {
    return 'This field is required'
  }
  return
}

export const notValidPassword = (
  value: string | null | undefined,
): string | undefined => {
  if (!value || value.length < 8)
    return 'Password must be at least 8 characters long'
}