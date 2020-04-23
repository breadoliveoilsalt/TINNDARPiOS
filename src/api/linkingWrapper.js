import { Linking } from 'expo'

export const openURL = (url) => {
  Linking.openURL(url)
}