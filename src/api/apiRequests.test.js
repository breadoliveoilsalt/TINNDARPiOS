import * as apiRequests from './apiRequests'
import * as config from './configAPI'

describe("wakeUpApi()", () => {
  
  it("makes a GET request to the fetchWrapper to the api's '/items' URL", () => {
    jest.spyOn(config.fetchWrapper, "get").mockResolvedValue()
    
    apiRequests.wakeUpAPI()

    expect(config.fetchWrapper.get).toHaveBeenCalledWith(config.apiBaseURL + "/items")
  })

})

describe("logIn()", () => {

  const userCredentials = {
    email: "someEmail@email.com",
    password: "password",
  }

  let mockData = {
    data: {
      logged_in: true,
      token: "xyz"
    }
  }

  beforeEach(() => {
    jest.spyOn(config.fetchWrapper, "post").mockResolvedValue(mockData)
  })

  it("calls the post() method of the fetchWrapper", () => {
    apiRequests.logIn(userCredentials)

    expect(config.fetchWrapper.post).toHaveBeenCalledTimes(1)
  })

  it("calls the post() method with the cofigured apiBaseURL plus /log_in", () => {
    apiRequests.logIn(userCredentials)

    const expectedURL = config.apiBaseURL + "/log_in"
    expect(config.fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCreditials to the post() method of fetchwapper after indicating the token should be persistent and prefixing a 'user' key", () => {
    apiRequests.logIn(userCredentials)

    const expectedParams = { 
      user: {
        ...userCredentials, 
        persistent_token: true 
      }
    }
    expect(config.fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with errors if the data returns errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        logged_in: "false",
        errors: ["Invalid log in credentials."]
      },
      metaData: {
        statusCode: 200
      }
    }
    jest.spyOn(config.fetchWrapper, "post").mockResolvedValue(mockData)

    return apiRequests.logIn(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: false,
        errors: mockData.data.errors
      }
      expect(result).toEqual(expectedResult)
    })

  })

  it("parses the return data to return a simple object with a loggedIn status and token if the data does not have errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        logged_in: "true",
        token: "xyz"
      },
      metaData: {
        statusCode: 200
      }
    }
    jest.spyOn(config.fetchWrapper, "post").mockResolvedValue(mockData)

    return apiRequests.logIn(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: true,
        token: mockData.data.token
      }
      expect(result).toEqual(expectedResult)
    })

  })

})

describe("signUp()", () => {

  const userCredentials = {
    email: "someEmail@email.com",
    password: "password",
  }

  let mockData = {
    data: {
      logged_in: true,
      token: "xyz"
    }
  }

  beforeEach(() => {
    jest.spyOn(config.fetchWrapper, "post").mockResolvedValue(mockData)
  })

  it("calls the post() method of the fetchWrapper", () => {
    apiRequests.signUp(userCredentials)

    expect(config.fetchWrapper.post).toHaveBeenCalledTimes(1)
  })

  it("calls the post() method with the cofigured apiBaseURL plus /sign_up", () => {
    apiRequests.signUp(userCredentials)

    const expectedURL = config.apiBaseURL + "/sign_up"
    expect(config.fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCreditials to the post() method of fetchwapper after indicating the token should be persistent and prefixing a 'user' key", () => {
    apiRequests.signUp(userCredentials)

    const expectedParams = { 
      user: {
        ...userCredentials, 
        persistent_token: true 
      }
    }
    expect(config.fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with errors if the data returns errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        logged_in: "false",
        errors: ["Invalid log in credentials."]
      },
      metaData: {
        statusCode: 200
      }
    }
    jest.spyOn(config.fetchWrapper, "post").mockResolvedValue(mockData)

    return apiRequests.signUp(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: false,
        errors: mockData.data.errors
      }
      expect(result).toEqual(expectedResult)
    })

  })

  it("parses the return data to return a simple object with a loggedIn status and token if the data does not have errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        logged_in: "true",
        token: "xyz"
      },
      metaData: {
        statusCode: 200
      }
    }
    jest.spyOn(config.fetchWrapper, "post").mockResolvedValue(mockData)

    return apiRequests.signUp(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: true,
        token: mockData.data.token
      }
      expect(result).toEqual(expectedResult)
    })

  })

})