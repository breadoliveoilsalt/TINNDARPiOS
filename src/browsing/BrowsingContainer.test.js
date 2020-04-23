import React from 'react'
import { shallow } from 'enzyme'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { getItemsToBrowse } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'
import BrowsingContainer from './BrowsingContainer'
import SwipeableImage from './SwipeableImage'

describe("<BrowsingContainer />", () => {

  it("renders an <ActivityIndicator /> if the items have not been populated", () => {
    const wrapper = shallow(<BrowsingContainer />)

    expect(wrapper.state().itemsToBrowse).toEqual(null)
    expect(wrapper.find(ActivityIndicator).length).toEqual(1)
  })

})