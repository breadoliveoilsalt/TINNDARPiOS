import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'
import UserAccountButton from './UserAccountButton'

describe("<UserAccountButton />", () => {

  it("renders the text passed in as a buttonText prop", () => {
    const textToRender = "Log In"
    const actionToTrigger = jest.fn()
    const wrapper = shallow(<UserAccountButton buttonText={textToRender} action={actionToTrigger} />)
     
    expect(wrapper.find(Text).props().children).toEqual(textToRender) 
  })

  it("has a TouchableOpacity that calls the action prop when pressed", () => {
    const textToRender = "Log In"
    const actionToTrigger = jest.fn()
    const wrapper = shallow(<UserAccountButton buttonText={textToRender} action={actionToTrigger} />)

    const touchable = wrapper.find(TouchableOpacity)
    touchable.props().onPress() 

    expect(actionToTrigger).toHaveBeenCalledTimes(1)
  })

})