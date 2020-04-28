import React from 'react'
import { shallow } from 'enzyme'
import TINNDARP from './main'
import { ActivityIndicator } from 'react-native'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'
import * as tokenActions from './userAccount/tokenActions'
import * as apiRequests from './api/apiRequests'

describe("<TINNDARP />", () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TINNDARP />)
  })

  describe("the layout", () => {
    
    it("renders an <ActivityIndicator /> while the component is fetching", () => {
      wrapper.setState({fetching: false})

      expect(wrapper.find(ActivityIndicator).length).toEqual(0)

      wrapper.setState({fetching: true})

      expect(wrapper.find(ActivityIndicator).length).toEqual(1)
    })

    it("renders <UserAuthenticatedView /> if the user is logged in and the app is not fetching", () => {
      wrapper.setState({loggedIn: false, fetching: false})

      expect(wrapper.find(UserAuthenticatedView).length).toEqual(0)
      
      wrapper.setState({loggedIn: true, fetching: false})

      expect(wrapper.find(UserAuthenticatedView).length).toEqual(1)
    })

    it("passes signOutOfApp(), userEmail, and token to <UserAuthenticatedView /> as a props", () => {
      const currentUserEmail = "billy@billy.com"
      const currentUserToken = "xyz"

      wrapper.setState({loggedIn: true, fetching: false, userEmail: currentUserEmail, token: currentUserToken})
      const instance = wrapper.instance()

      expect(wrapper.find(UserAuthenticatedView).prop("signOutOfApp")).toEqual(instance.signOutOfApp)
      expect(wrapper.find(UserAuthenticatedView).prop("userEmail")).toEqual(currentUserEmail)
      expect(wrapper.find(UserAuthenticatedView).prop("token")).toEqual(currentUserToken)
    })

    it("renders <ProvideCredentialsView /> if the user is not logged in and the app is not fetching", () => {
      wrapper.setState({loggedIn: false, fetching: false})

      expect(wrapper.find(ProvideCredentialsView).length).toEqual(1)
      
      wrapper.setState({loggedIn: true, fetching: false})

      expect(wrapper.find(ProvideCredentialsView).length).toEqual(0)
    })

    it("passes logInToApp() to <ProvideCredentialsView /> as a prop", () => {
      wrapper.setState({loggedIn: false, fetching: false})
      const instance = wrapper.instance()

      expect(wrapper.find(ProvideCredentialsView).prop("logInToApp")).toEqual(instance.logInToApp)
    })
  })

  describe("the logic", () => {

    describe("when it mounts", () => {

      it("starts fetching", () => {
        wrapper = shallow(<TINNDARP />)

        expect(wrapper.state().fetching).toEqual(true)
      })

      it("checks whether there is a token when it mounts", () => {
        const mockToken = "xyz"
        jest.spyOn(tokenActions, "getToken").mockResolvedValue(mockToken)
        const mockAPIResponse = {
          loggedIn: true,
          userEmail: "billy@billy.com",
          token: "xyz"
        }
        jest.spyOn(apiRequests, "authenticateUserToken").mockResolvedValue(mockAPIResponse)

        wrapper = shallow(<TINNDARP />)

        expect(tokenActions.getToken).toHaveBeenCalledTimes(1)
      })

      it("checks the authenticity of the user token if there is one already", () => {
        const mockToken = "xyz"
        jest.spyOn(tokenActions, "getToken").mockResolvedValue(mockToken)
        const mockAPIResponse = {
          loggedIn: true,
          userEmail: "billy@billy.com",
          token: "xyz"
        }
        jest.spyOn(apiRequests, "authenticateUserToken").mockResolvedValue(mockAPIResponse)

        const instance = wrapper.instance()

        return instance.componentDidMount()
          .then(() => {
            expect(apiRequests.authenticateUserToken).toHaveBeenCalledTimes(1)
            expect(apiRequests.authenticateUserToken).toHaveBeenCalledWith({token: mockToken})
          })
      })

      it("updates the state's user information if the token is authenticated", () => {
        expect(wrapper.state().loggedIn).toEqual(false)
        expect(wrapper.state().userEmail).toEqual("")
        expect(wrapper.state().token).toEqual("")

        const mockToken = "xyz"
        jest.spyOn(tokenActions, "getToken").mockResolvedValue(mockToken)
        const mockAPIResponse = {
          loggedIn: true,
          userEmail: "billy@billy.com",
          token: "xyz"
        }
        jest.spyOn(apiRequests, "authenticateUserToken").mockResolvedValue(mockAPIResponse)

        const instance = wrapper.instance()

        return instance.componentDidMount()
          .then(() => {
            expect(wrapper.state().userEmail).toEqual(mockAPIResponse.userEmail)
            expect(wrapper.state().token).toEqual(mockAPIResponse.token)
            expect(wrapper.state().loggedIn).toEqual(true)
          })
      })

      it("does nothing if the token is invalid", () => {
        expect(wrapper.state().loggedIn).toEqual(false)
        expect(wrapper.state().userEmail).toEqual("")
        expect(wrapper.state().token).toEqual("")

        const mockToken = null
        jest.spyOn(tokenActions, "getToken").mockResolvedValue(mockToken)
        const mockAPIResponse = {
          loggedIn: false,
        }
        jest.spyOn(apiRequests, "authenticateUserToken").mockResolvedValue(mockAPIResponse)

        const instance = wrapper.instance()

        return instance.componentDidMount()
          .then(() => {
            expect(wrapper.state().loggedIn).toEqual(false)
            expect(wrapper.state().userEmail).toEqual("")
            expect(wrapper.state().token).toEqual("")
          })
      })

      it("updates the fetching state when the fetching is over", () => {
        const mockToken = "xyz"
        jest.spyOn(tokenActions, "getToken").mockResolvedValue(mockToken)
        const mockAPIResponse = {
          loggedIn: true,
          userEmail: "billy@billy.com",
          token: "xyz"
        }
        jest.spyOn(apiRequests, "authenticateUserToken").mockResolvedValue(mockAPIResponse)

        const instance = wrapper.instance()

        return instance.componentDidMount()
          .then(() => {
            expect(wrapper.state().fetching).toEqual(false)
          })
      })
      
    })

  })


  describe("logInToApp()", () => {

    it("saves the token from the user information passed in", () => {
      const mockUserInfo = {
        loggedIn: true,
        userEmail: "billy@billy.com",
        token: "xyz"
      }
      jest.spyOn(tokenActions, "saveToken").mockResolvedValue(true)
      const instance = wrapper.instance()

      return instance.logInToApp(mockUserInfo)
        .then(() => {
          expect(tokenActions.saveToken).toHaveBeenCalledTimes(1)
          expect(tokenActions.saveToken).toHaveBeenCalledWith(mockUserInfo.token)
        })
    })

    it("updates the state based on the user information passed in, causing <UserAuthenticatedView /> to render", () => {
      expect(wrapper.state().loggedIn).toEqual(false)
      expect(wrapper.state().userEmail).toEqual("")
      expect(wrapper.state().token).toEqual("")
      expect(wrapper.find(UserAuthenticatedView).length).toEqual(0)

      const mockUserInfo = {
        loggedIn: true,
        userEmail: "billy@billy.com",
        token: "xyz"
      }
      jest.spyOn(tokenActions, "saveToken").mockResolvedValue(true)
      const instance = wrapper.instance()

      return instance.logInToApp(mockUserInfo)
        .then(() => {
          expect(wrapper.state().loggedIn).toEqual(true)
          expect(wrapper.state().userEmail).toEqual(mockUserInfo.userEmail)
          expect(wrapper.state().token).toEqual(mockUserInfo.token)
          expect(wrapper.find(UserAuthenticatedView).length).toEqual(1)
        })
    })

  })

  describe("signOutOfApp()", () => {

    it("deletes the token", () => {
      jest.spyOn(tokenActions, "deleteToken").mockResolvedValue(true)

      const instance = wrapper.instance()
      return instance.signOutOfApp()
        .then(() => {
          expect(tokenActions.deleteToken).toHaveBeenCalledTimes(1)
        })
    })

    it("updates the state, causing <ProvideUserCredentialsView /> to render", () => {
      const mockUserInfo = {
        loggedIn: true,
        userEmail: "billy@billy.com",
        token: "xyz"
      }
      wrapper.setState(mockUserInfo)
      expect(wrapper.find(ProvideCredentialsView).length).toEqual(0)

      jest.spyOn(tokenActions, "deleteToken").mockResolvedValue(true)
      const instance = wrapper.instance()

      return instance.signOutOfApp()
        .then(() => {
          expect(wrapper.state().loggedIn).toEqual(false)
          expect(wrapper.state().userEmail).toEqual("")
          expect(wrapper.state().token).toEqual("")
          expect(wrapper.find(ProvideCredentialsView).length).toEqual(1)
        })
    })

  })
  
})
