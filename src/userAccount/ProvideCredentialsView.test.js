import React from 'react'
import { shallow } from 'enzyme'
import ProvideCredentialsView from './ProvideCredentialsView'
import MessagesModal from '../components/MessagesModal'
import { Text, TextInput, TouchableOpacity } from 'react-native'
import * as apiRequests from '../api/apiRequests'
import * as tokenActions from '../userAccount/tokenActions'

describe("<ProvideCredentialsView />", () => {
  
  const mockUserEmail = "bill@bill.com"
  const mockUserPassword = "password"
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ProvideCredentialsView />)
  })

  it("has a TextInput for entering a user's email address, with changes updating the userEmail state", () => {
    const emailTextInput = wrapper.find(TextInput).at(0)

    expect(emailTextInput.prop("placeholder")).toContain("email")

    expect(wrapper.state().userEmail).toEqual("")
    emailTextInput.simulate("changeText",  mockUserEmail) 
    expect(wrapper.state().userEmail).toEqual(mockUserEmail)
  })

  it("has a TextInput for entering a user's password, with changes updating the userPassword state", () => {
    const passwordTextInput = wrapper.find(TextInput).at(1)

    expect(passwordTextInput.prop("placeholder")).toContain("password")

    expect(wrapper.state().userPassword).toEqual("")
    passwordTextInput.simulate("changeText",  mockUserPassword) 
    expect(wrapper.state().userPassword).toEqual(mockUserPassword)
  })

  it("has a <TouchableOpacity /> button to handle logging in", () => {
    const logInButton = wrapper.find(TouchableOpacity).at(0)

    expect(logInButton.find(Text).props().children).toContain("Log In")

    const instance = wrapper.instance()
    jest.spyOn(instance, "handleAPIRequest")

    logInButton.simulate("press") 

    expect(instance.handleAPIRequest).toHaveBeenCalledTimes(1)
    expect(instance.handleAPIRequest).toHaveBeenCalledWith(apiRequests.logIn)
  })

  describe("handleAPIRequest", () => {

    let instance

    beforeEach(() => {
      instance = wrapper.instance()
    })

    it("takes an API request callback and passes the user's credientials in the state to the callback", () => {
      let mockData = {
        loggedIn: true,
        token: "xyz"
      }
      jest.spyOn(apiRequests, "logIn").mockResolvedValue(mockData)
      wrapper.setState({
        userEmail: mockUserEmail, 
        userPassword: mockUserPassword
      })

      instance.handleAPIRequest(apiRequests.logIn)

      expect(apiRequests.logIn).toHaveBeenCalledTimes(1)
      expect(apiRequests.logIn).toHaveBeenCalledWith({email: mockUserEmail, password: mockUserPassword})
    })

    it("on a successful log in, saves the returned token", () => {
      let mockData = {
        loggedIn: true,
        token: "xyz"
      }
      jest.spyOn(apiRequests, "logIn").mockResolvedValue(mockData)
      jest.spyOn(tokenActions, "saveToken").mockResolvedValue(true)

      return instance.handleAPIRequest(apiRequests.logIn)
        .then(() => {
          expect(tokenActions.saveToken).toHaveBeenCalledTimes(1)
          expect(tokenActions.saveToken).toHaveBeenCalledWith(mockData.token)
        })
    })

    it("on an unsuccessful log in, displays MessagesModal with the error messages", () => {
      let mockData = {
        loggedIn: false,
        errors: ["Invalid log in", "Bad password"]
      }
      jest.spyOn(apiRequests, "logIn").mockResolvedValue(mockData)

      const instance = wrapper.instance()
      jest.spyOn(instance, "showMessages")

      let modal = wrapper.find(MessagesModal)
      expect(modal.length).toEqual(1)
      expect(modal.prop("visible")).toEqual(false)
      expect(modal.prop("messages")).toEqual([])

      return instance.handleAPIRequest(apiRequests.logIn)
        .then(() => {
          modal = wrapper.find(MessagesModal)

          expect(modal.length).toEqual(1)
          expect(modal.prop("visible")).toEqual(true)
          expect(modal.prop("messages")).toContain(mockData.errors[0])
          expect(modal.prop("messages")).toContain(mockData.errors[1])
        }) 
    })
  })

})