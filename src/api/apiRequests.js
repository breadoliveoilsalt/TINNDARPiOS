import { fetchWrapper, apiBaseURL } from './configAPI' 

export const wakeUpAPI = () => {
  return fetchWrapper.get(apiBaseURL + "/items")
}