import * as tokenActions from './tokenActions'
import { AsyncStorage } from 'react-native'

describe("token actions", () => {

  const token = "xyz"

  afterEach(() => {
    AsyncStorage.removeItem(tokenActions.tokenKey)
  })

  describe("saveToken()", () => {

    it("saves the token locally with a key set to tokenKey using AsyncStorage", () => {
      jest.spyOn(AsyncStorage, "setItem")

      return tokenActions.saveToken(token)
        .then(() => {
          expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1)
          expect(AsyncStorage.setItem).toHaveBeenCalledWith(tokenActions.tokenKey, "xyz")
        })
    })

  })

  describe("getToken()", () => {

    it("returns the saved token using AsyncStorage", () => {
      jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(token)

      return tokenActions.getToken()
        .then((result) => {
          expect(result).toEqual(token)
        })
    })

  })

  describe("tokenExists()", () => {
    
    it("relies on AsyncStorage to return true if a token exists", () => {
      jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(token)

      return tokenActions.tokenExists()
        .then((result) => {
          expect(result).toEqual(true)
        })
    })

    it("relies on AsyncStorage to return false if a token does not exist", () => {
      jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(null)

      return tokenActions.tokenExists()
        .then((result) => {
          expect(result).toEqual(false)
        })
    })

  })

  describe("deleteToken()", () => {

    it("deletes a token with a key set to tokenKey using AsyncStorage", () => {
      jest.spyOn(AsyncStorage, "removeItem")

      return tokenActions.deleteToken()
        .then(() => {
          expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1)
          expect(AsyncStorage.removeItem).toHaveBeenCalledWith(tokenActions.tokenKey)
        })
    })

  })

})
