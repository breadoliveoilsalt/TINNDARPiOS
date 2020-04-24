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
    .then(rawData => processBrowsingData(rawData))
}

export const processBrowsingData = (rawData) => {
  const parsedData = rawData.data
  if (parsedData.errors) {
    return {errors: parsedData.errors}
  } else {
    return {items: cherrypickItemData(parsedData.items)}
  }
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
    return {errors: decisionData.errors}
  } else {
    return {}
  }
}

export const getCommonItems = (params) => {
  const url = apiBaseURL + "/comparing"
  const strongParams = {
    comparing: params
  }
  return fetchWrapper.getWithParams(url, strongParams)
    .then(rawData => processComparingData(rawData))
}

const processComparingData = (rawData) => {
  if (rawData.data.hasOwnProperty("errors")) {
    return {errors: rawData.data.errors}
  } else {
    return {
      userEmail: rawData.data.user_email,
      successfulComparisonTo: rawData.data.successful_comparison_to,
      commonItems: cherrypickItemData(rawData.data.common_items)
    }
  }
}

const cherrypickItemData = (rawListOfItems) => {
  return rawListOfItems.map(rawItemData => {
    return {
      id: rawItemData.id,
      name: rawItemData.name,
      imageURL: rawItemData.image_url,
      description: rawItemData.description,
      price: rawItemData.price,
      moreInfoURL: rawItemData.more_info_url
    }
  })
}
