import React from 'react'
import { shallow } from 'enzyme'
import { Text } from 'react-native'
import UserHome from './UserHome'
import ActionButton from '../components/ActionButton'

describe("<UserHome />", () => {

  const props = {
    userEmail: "billy@billy.com",
    signOutOfApp: jest.fn()
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<UserHome {...props} />)
  })

  it("has a ActionButton for signing out", () => {
    const signOutButton = wrapper.find(ActionButton)

    expect(signOutButton.prop("buttonText")).toContain("Sign Out")
  })
  
  describe("the Sign Out button", () => {

    it("calls the signOutOfApp prop when its action is triggered", () => {
      const signOutButton = wrapper.find(ActionButton)

      signOutButton.props().action()

      expect(props.signOutOfApp).toHaveBeenCalledTimes(1)
    })

  })

  it("displays the logged in user's email at the bottom", () => {
    const textNodes = wrapper.find(Text)

    expect(textNodes.last().props().children).toContain(props.userEmail)
  })

})