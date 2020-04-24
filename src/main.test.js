
import React from 'react'
import { shallow } from 'enzyme'
import TINNDARP from './main'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'
import * as tokenActions from './userAccount/tokenActions'

describe("<TINNDARP />", () => {

  it("renders <UserAuthenticatedView /> if the parent has determined a token exists", () => {
    const props = {tokenExists: true}
    const wrapper = shallow(<TINNDARP {...props} />)

    expect(wrapper.find(UserAuthenticatedView).length).toEqual(1)
    expect(wrapper.find(ProvideCredentialsView).length).toEqual(0)
  })

  it("passes signOutOfApp() to <UserAuthenticatedView /> as a prop", () => {
    const props = {tokenExists: true}
    const wrapper = shallow(<TINNDARP {...props} />)
    const instance = wrapper.instance()

    expect(wrapper.find(UserAuthenticatedView).prop("signOutOfApp")).toEqual(instance.signOutOfApp)
  })

  it("renders <ProvideCredentialsView /> if the parent has determined a token does not exist", () => {
    const props = {tokenExists: false}
    const wrapper = shallow(<TINNDARP {...props} />)

    expect(wrapper.find(ProvideCredentialsView).length).toEqual(1)
    expect(wrapper.find(UserAuthenticatedView).length).toEqual(0)
  })

  it("passes logInToApp() to <ProvideCredentialsView /> as a prop", () => {
    const props = {tokenExists: false}
    const wrapper = shallow(<TINNDARP {...props} />)
    const instance = wrapper.instance()

    expect(wrapper.find(ProvideCredentialsView).prop("logInToApp")).toEqual(instance.logInToApp)
  })

  describe("logInToApp()", () => {

    it("saves the token and renders <UserAuthenticatedView />", () => {
      const props = {tokenExists: false}
      const wrapper = shallow(<TINNDARP {...props} />)
      expect(wrapper.find(ProvideCredentialsView).length).toEqual(1)

      jest.spyOn(tokenActions, "saveToken")
      const instance = wrapper.instance()
      const token = "xyz"
      return instance.logInToApp(token)
        .then(() => {
          expect(tokenActions.saveToken).toHaveBeenCalledTimes(1)
          expect(tokenActions.saveToken).toHaveBeenCalledWith(token)
        })
        .then(() => {
          expect(wrapper.find(ProvideCredentialsView).length).toEqual(0)
          expect(wrapper.find(UserAuthenticatedView).length).toEqual(1)
        })
    })

  })

  describe("signOutOfApp()", () => {

    it("deletes the token and renders <ProvideCredentialsView />", () => {
      const props = {tokenExists: true}
      const wrapper = shallow(<TINNDARP {...props} />)
      expect(wrapper.find(UserAuthenticatedView).length).toEqual(1)

      jest.spyOn(tokenActions, "deleteToken")
      const instance = wrapper.instance()
      return instance.signOutOfApp()
        .then(() => {
          expect(tokenActions.deleteToken).toHaveBeenCalledTimes(1)
        })
        .then(() => {
          expect(wrapper.find(UserAuthenticatedView).length).toEqual(0)
          expect(wrapper.find(ProvideCredentialsView).length).toEqual(1)
        })
    })

  })
})