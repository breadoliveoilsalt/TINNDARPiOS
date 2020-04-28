import * as apiRequests from './apiRequests'
import { fetchWrapper, apiBaseURL } from './configAPI'

describe("wakeUpApi()", () => {
  
  it("makes a GET request to the fetchWrapper to the api's '/items' URL", () => {
    jest.spyOn(fetchWrapper, "get").mockResolvedValue()
    
    apiRequests.wakeUpAPI()

    expect(fetchWrapper.get).toHaveBeenCalledWith(apiBaseURL + "/items")
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
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)
  })

  it("calls the post() method of the fetchWrapper", () => {
    apiRequests.logIn(userCredentials)

    expect(fetchWrapper.post).toHaveBeenCalledTimes(1)
  })

  it("calls the post() method with the cofigured apiBaseURL plus /log_in", () => {
    apiRequests.logIn(userCredentials)

    const expectedURL = apiBaseURL + "/log_in"
    expect(fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCreditials to the post() method of fetchwapper after indicating the token should be persistent and prefixing a 'user' key", () => {
    apiRequests.logIn(userCredentials)

    const expectedParams = { 
      user: {
        ...userCredentials, 
        persistent_token: true 
      }
    }
    expect(fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
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
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)

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
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)

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
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)
  })

  it("calls the post() method of the fetchWrapper", () => {
    apiRequests.signUp(userCredentials)

    expect(fetchWrapper.post).toHaveBeenCalledTimes(1)
  })

  it("calls the post() method with the cofigured apiBaseURL plus /sign_up", () => {
    apiRequests.signUp(userCredentials)

    const expectedURL = apiBaseURL + "/sign_up"
    expect(fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCreditials to the post() method of fetchwapper after indicating the token should be persistent and prefixing a 'user' key", () => {
    apiRequests.signUp(userCredentials)

    const expectedParams = { 
      user: {
        ...userCredentials, 
        persistent_token: true 
      }
    }
    expect(fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
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
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)

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
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)

    return apiRequests.signUp(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: true,
        token: mockData.data.token
      }
      expect(result).toEqual(expectedResult)
    })

  })

})

describe("authenticateUserToken()", () => {

  const userCredentials = {
    token: "xyz"
  }

  let mockData = {
    data: {
      logged_in: true,
      token: "xyz",
      user_email: "billy@billy.com"
    }
  }

  beforeEach(() => {
    jest.spyOn(fetchWrapper, "getWithParams").mockResolvedValue(mockData)
  })

  it("calls the getWithParams() method of the fetchWrapper", () => {
    apiRequests.authenticateUserToken(userCredentials)

    expect(fetchWrapper.getWithParams).toHaveBeenCalledTimes(1)
  })

  it("calls the getWithParams() method with the cofigured apiBaseURL plus /authenticate_user_token", () => {
    apiRequests.authenticateUserToken(userCredentials)

    const expectedURL = apiBaseURL + "/authenticate_user_token"
    expect(fetchWrapper.getWithParams.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCredentials to the getWithParams() method of fetchwapper after indicating the token should be persistent and prefixing a 'user' key", () => {
    apiRequests.authenticateUserToken(userCredentials)

    const expectedParams = { 
      user: {
        ...userCredentials, 
        persistent_token: true 
      }
    }
    expect(fetchWrapper.getWithParams.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with errors if the data returns errors ", () => {
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
    jest.spyOn(fetchWrapper, "getWithParams").mockResolvedValue(mockData)

    return apiRequests.authenticateUserToken(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: false,
        errors: mockData.data.errors
      }
      expect(result).toEqual(expectedResult)
    })
  })

  it("parses the return data to return a simple object with a loggedIn status, token, and email if the returned data does not have errors", () => {
    mockData = {
      headers: "stuff",
      data: {
        logged_in: "true",
        token: "xyz",
        user_email: "billy@billy.com"
      },
      metaData: {
        statusCode: 200
      }
    }
    jest.spyOn(fetchWrapper, "getWithParams").mockResolvedValue(mockData)

    return apiRequests.authenticateUserToken(userCredentials).then(result => {
      const expectedResult = {
        loggedIn: true,
        token: mockData.data.token,
        userEmail: mockData.data.user_email
      }
      expect(result).toEqual(expectedResult)
    })
  })

})

const mockData = {
  data: {
    items: [
      {
        id: 1,
        image_url: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
        created_at: '2020-03-02T22:15:33.322Z',
        updated_at: '2020-03-02T22:15:33.322Z',
        name: 'SAGSTUA',
        price: '149.00',
        description: 'Bed frame, black, Full',
        more_info_url: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
      },
      {
        id: 2,
        image_url: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s',
        created_at: '2020-03-02T22:15:33.333Z',
        updated_at: '2020-03-02T22:15:33.333Z',
        name: 'MALM',
        price: '199.00',
        description: 'Bed frame, high, black-brown, Luröy, Queen',
        more_info_url: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
      },
      {
        id: 3,
        image_url: 'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s',
        created_at: '2020-03-02T22:15:33.346Z',
        updated_at: '2020-03-02T22:15:33.346Z',
        name: 'BUSKBO',
        price: '130.00',
        description: 'Armchair, rattan',
        more_info_url: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/'
      }
    ]
  }
}

describe("getItemsToBrowse", () => {

  const params = {token: "xyz"}

  beforeEach(() => {
    jest.spyOn(fetchWrapper, "getWithParams").mockResolvedValue(mockData)
  })

  it("calls `getWithParams` on the configured fetchWrapper", () => {
    apiRequests.getItemsToBrowse(params)

    expect(fetchWrapper.getWithParams).toHaveBeenCalledTimes(1)
  })

  it("passes to fetchWrapper's `getWithParams` an items url based on the configured base URL", () => {
    apiRequests.getItemsToBrowse(params)

    expect(fetchWrapper.getWithParams.mock.calls[0][0]).toEqual(apiBaseURL + "/browsing")
  })

  it("passes to fetchWrapper's `getWithParams` the params after nesting them under a browsing key", () => {
    apiRequests.getItemsToBrowse(params)

    expect(fetchWrapper.getWithParams.mock.calls[0][1]).toEqual({browsing: params})
  })

  it("processes the API's raw data for a list of items into data comsumable by the frontend", () => {
    const result = apiRequests.processBrowsingData(mockData)

    const expectedResults = {
      items: [
        {
          id: 1,
          imageURL: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
          name: 'SAGSTUA',
          price: '149.00',
          description: 'Bed frame, black, Full',
          moreInfoURL: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
        },
        {
          id: 2,
          imageURL: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s',
          name: 'MALM',
          price: '199.00',
          description: 'Bed frame, high, black-brown, Luröy, Queen',
          moreInfoURL: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
        },
        {
          id: 3,
          imageURL: 'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s',
          name: 'BUSKBO',
          price: '130.00',
          description: 'Armchair, rattan',
          moreInfoURL: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/'
        }
      ]
    }

    expect(result).toEqual(expectedResults)
  })

})

describe("postBrowsingDecision()", () => {

  const params = {
    token: "xyz",
    item_id: 1,
    liked: "true"
  }

  beforeEach(() => {
    jest.spyOn(fetchWrapper, "post").mockResolvedValue({ data: {} })
  })

  it("calls the post() method of the fetchWrapper", () => {
    apiRequests.postBrowsingDecision(params)

    expect(fetchWrapper.post).toHaveBeenCalledTimes(1)
  })

  it("calls the post() method with the cofigured baseURL to /browsing", () => {
    apiRequests.postBrowsingDecision(params)

    const expectedURL = apiBaseURL + "/browsing"
    expect(fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the params to the post() method of fetchwapper after prefixing a 'browsing' key", () => {
    apiRequests.postBrowsingDecision(params)

    const expectedParams = { browsing: params }
    expect(fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with no errors if the data returns no errors", () => {
    const mockData = {
      headers: "stuff",
      data: {},
      metaData: {
        statusCode: 200
      }
    }
    jest.spyOn(fetchWrapper, "post").mockResolvedValue(mockData)

    return apiRequests.postBrowsingDecision(params).then(result => {
      expect(result.errors).toBeUndefined()
    })

  })

  it("parses the return data to return a simple object with an error field if the data returns errors", () => {
    const mockData = {
      headers: "stuff",
      data: {
        errors: "Something went wrong"
      },
      metaData: {
        statusCode: 200
      }
    }
    fetchWrapper.post = jest.fn()
    fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return apiRequests.postBrowsingDecision(params).then(result => {
      expect(result.errors).toEqual(mockData.data.errors)
    })
  })

})

describe("getCommonItems", () => {
  
  const requesterEmail = "billy@billy.com"
  const comparedEmail = "tommy@tommy.com"

  const params = {
    token: "xyz",
    compare_to: comparedEmail
  }

  let mockCommonItemData

  beforeEach(() => {
    mockCommonItemData = {
      data: {
        common_items: mockData.data.items,
        successful_comparison_to: comparedEmail,
        user_email: requesterEmail 
      }
    }
    jest.spyOn(fetchWrapper, "getWithParams").mockResolvedValue(mockCommonItemData)
  })

  it("calls the getWithParams() method of the fetchWrapper", () => {
    apiRequests.getCommonItems(params)

    expect(fetchWrapper.getWithParams).toHaveBeenCalledTimes(1)
  })

  it("calls the getWithParams() method with the cofigured baseURL to a /comparing path", () => {
    apiRequests.getCommonItems(params)

    const expectedURL = apiBaseURL + "/comparing"
    expect(fetchWrapper.getWithParams.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the params to the getWithParams() method of fetchwapper as the value of a comparing key", () => {
    apiRequests.getCommonItems(params)

    const expectedParams = {
      comparing: params
    }

    expect(fetchWrapper.getWithParams.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the raw data of a successful request to return an object with userEmail, successfulComparisonTo, and commonItems", () => {
    return apiRequests.getCommonItems(params)
      .then(result => {
        expect(result.userEmail).toEqual(requesterEmail)
        expect(result.successfulComparisonTo).toEqual(comparedEmail)

        const expectedItems = [
          {
            id: 1,
            imageURL: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
            name: 'SAGSTUA',
            price: '149.00',
            description: 'Bed frame, black, Full',
            moreInfoURL: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
          },
          {
            id: 2,
            imageURL: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s',
            name: 'MALM',
            price: '199.00',
            description: 'Bed frame, high, black-brown, Luröy, Queen',
            moreInfoURL: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
          },
          {
            id: 3,
            imageURL: 'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s',
            name: 'BUSKBO',
            price: '130.00',
            description: 'Armchair, rattan',
            moreInfoURL: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/'
          }
        ]
        expect(result.commonItems).toEqual(expectedItems)
      })

  })

  it("processes the raw data of an errors response to return an object with an errors key", () => {
    mockCommonItemData = {
      data: {
        errors: ["Something went wrong!"]
      }
    }

    jest.spyOn(fetchWrapper, "getWithParams").mockResolvedValue(mockCommonItemData)

    return apiRequests.getCommonItems(params)
      .then(result => {
        expect(result).toEqual({errors: mockCommonItemData.data.errors})
      })
  })

})