import React from 'react'
import { shallow } from 'enzyme'
import UserHome from './UserHome'
import ActionButton from '../components/ActionButton'

describe("<UserHome />", () => {

  it("has a ActionButton for signing out", () => {
    const wrapper = shallow(<UserHome />)
    const signOutButton = wrapper.find(ActionButton)

    expect(signOutButton.prop("buttonText")).toContain("Sign Out")
  })
  
  describe("the Sign Out button", () => {

    it("calls the signOutOfApp prop when its action is triggered", () => {
      const props = {signOutOfApp: jest.fn()}
      const wrapper = shallow(<UserHome {...props} />)
      const signOutButton = wrapper.find(ActionButton)

      signOutButton.props().action()

      expect(props.signOutOfApp).toHaveBeenCalledTimes(1)
    })

  })

})