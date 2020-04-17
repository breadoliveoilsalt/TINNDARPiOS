import { fetchWrapper, apiBaseURL } from './apiConfig' 

export const wakeUpAPI = () => {
  return fetchWrapper.get(apiBaseURL + "/items")
}