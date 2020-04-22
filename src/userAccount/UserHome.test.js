import React from 'react'
import { shallow } from 'enzyme'
import UserHome from './UserHome'
import UserAccountButton from './UserAccountButton'

describe("<UserHome />", () => {

  it("has a UserAccountButton for signing out", () => {
    const wrapper = shallow(<UserHome />)
    const signOutButton = wrapper.find(UserAccountButton)

    expect(signOutButton.prop("buttonText")).toContain("Sign Out")
  })
  
  describe("the Sign Out button", () => {

    it("calls the renderSignedOutView prop when its action is triggered", () => {
      const props = {renderSignedOutView: jest.fn()}
      const wrapper = shallow(<UserHome {...props} />)
      const signOutButton = wrapper.find(UserAccountButton)

      signOutButton.props().action()

      expect(props.renderSignedOutView).toHaveBeenCalledTimes(1)
    })

  })

})