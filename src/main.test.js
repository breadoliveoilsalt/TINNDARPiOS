
import React from 'react'
import { shallow } from 'enzyme'
import TINNDARP from './main'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'
import * as tokenActions from './userAccount/tokenActions'

describe("<TINNDARP />", () => {

  it("renders <ProvideCredentialsView /> if no token is saved", () => {
    const wrapper = shallow(<TINNDARP />)

    expect(wrapper.find(ProvideCredentialsView).length).toEqual(1)
    expect(wrapper.find(UserAuthenticatedView).length).toEqual(0)
  })

  it("renders <UserAuthenticatedView /> if a token is saved", () => {
    const wrapper = shallow(<TINNDARP />)

    tokenActions.saveToken("xyz")
      .then(() => {
        expect(wrapper.find(UserAuthenticatedView).length).toEqual(1)
        expect(wrapper.find(ProvideCredentialsView).length).toEqual(0)
      })
      .then(() => tokenActions.deleteToken())
  })
})