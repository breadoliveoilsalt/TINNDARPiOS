import { fetchWrapper, apiBaseURL } from './configAPI' 

export const wakeUpAPI = () => {
  return fetchWrapper.get(apiBaseURL + "/items")
}

export const logIn = (credentials) => {
  const url = apiBaseURL + "/log_in"
  const params = formatParams(credentials)
  return fetchWrapper.post(url, params)
    .then(rawData => process(rawData))
}

export const signUp = (credentials) => {
  const url = apiBaseURL + "/sign_up"
  const params = formatParams(credentials)
  return fetchWrapper.post(url, params)
    .then(rawData => process(rawData))
}

const formatParams = (credentials) => {
  return { user: {
    ...credentials,
    persistent_token: true 
    }
  }
}


const process = (rawData) => {
  if (rawData.data.errors) {
    return {
      loggedIn: false,
      errors: rawData.data.errors
    }
  } else if (rawData.data.logged_in === "true") {
    return {
      loggedIn: true,
      token: rawData.data.token,
      userEmail: rawData.data.user_email
    }
  } else {
    return {
      errors: "Processing Error: The app does not understand the return data upon log in or sign up."
    }
  }
}
