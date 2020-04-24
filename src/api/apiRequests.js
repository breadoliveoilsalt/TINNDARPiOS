import { fetchWrapper, apiBaseURL } from './configAPI' 

export const wakeUpAPI = () => {
  return fetchWrapper.get(apiBaseURL + "/items")
}

export const logIn = (credentials) => {
  const url = apiBaseURL + "/log_in"
  const params = formatUserParams(credentials)
  return fetchWrapper.post(url, params)
    .then(rawData => processAuthenticationResponse(rawData))
}

export const signUp = (credentials) => {
  const url = apiBaseURL + "/sign_up"
  const params = formatUserParams(credentials)
  return fetchWrapper.post(url, params)
    .then(rawData => processAuthenticationResponse(rawData))
}

const formatUserParams = (credentials) => {
  return { user: {
    ...credentials,
    persistent_token: true 
    }
  }
}

const processAuthenticationResponse = (rawData) => {
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

export const getItemsToBrowse = (params) => {
  const url = apiBaseURL + "/browsing"
  const strongParams = formatBrowsingParams(params)
  return fetchWrapper.getWithParams(url, strongParams)
    .then(rawData => processItemData(rawData))
}

export const processItemData = (rawData) => {
  const parsedData = rawData.data
  if (parsedData.errors) {
    return {errors: parsedData.errors}
  } else {
    const rawItemListData = rawData.data.items
    let processedData = []
    rawItemListData.forEach(rawItemData => cherrypickItemData(rawItemData, processedData))
    return processedData
  }
}

const cherrypickItemData = (rawItemData, processedData) => {
  const newObject = {
    id: rawItemData.id,
    name: rawItemData.name,
    imageURL: rawItemData.image_url,
    description: rawItemData.description,
    price: rawItemData.price,
    moreInfoURL: rawItemData.more_info_url
  }
  
  processedData.push(newObject)
}

export const postBrowsingDecision = (params) => {
  const url = apiBaseURL + "/browsing"
  const strongParams = formatBrowsingParams(params)
  return fetchWrapper.post(url, strongParams)
    .then(rawData => processDecisionResponse(rawData))
}

const formatBrowsingParams = (params) => {
  return {browsing: params}
}

const processDecisionResponse = (rawData) => {
  const decisionData = rawData.data
  if (decisionData.hasOwnProperty("errors")) {
    return { errors: decisionData.errors }
  } else {
    return {}
  }
}
