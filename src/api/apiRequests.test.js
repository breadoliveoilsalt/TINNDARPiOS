import * as apiRequests from './apiRequests'
import { apiBaseURL, fetchWrapper } from './configAPI'

describe("wakeUpApi()", () => {
  
  it("makes a GET request to the fetchWrapper to the api's '/items' URL", () => {
    jest.spyOn(fetchWrapper, "get").mockImplementation(() => Promise.resolve() )
    
    apiRequests.wakeUpAPI()

    expect(fetchWrapper.get).toHaveBeenCalledWith(apiBaseURL + "/items")
  })

})