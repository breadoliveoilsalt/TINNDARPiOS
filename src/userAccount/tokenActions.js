import { AsyncStorage } from 'react-native'

export const tokenKey = "tinndarp-ios-token"

export const saveToken = async (value) => {
  try {
    await AsyncStorage.setItem(tokenKey, value)
  } catch {
    console.log("There was an error saving the token")
  }
}

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(tokenKey)
  } catch {
    console.log("There was an error getting the token")
  }
}

export const tokenExists = async () => {
  try {
    const token = await AsyncStorage.getItem(tokenKey)
    return !!token
  } catch {
    console.log("There was an error chcking if the token exists")
  }
}

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem(tokenKey)
  } catch {
    console.log("There was a problem deleting the token")
  }
}