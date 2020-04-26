import React from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { shallow } from 'enzyme'
import ActionButton from './ActionButton'

describe("<ActionButton />", () => {

  it("renders the text passed in as a buttonText prop", () => {
    const textToRender = "Log In"
    const actionToTrigger = jest.fn()
    const wrapper = shallow(<ActionButton buttonText={textToRender} action={actionToTrigger} />)
     
    expect(wrapper.find(Text).props().children).toEqual(textToRender) 
  })

  it("has a TouchableHighlight that calls the action prop when pressed", () => {
    const textToRender = "Log In"
    const actionToTrigger = jest.fn()
    const wrapper = shallow(<ActionButton buttonText={textToRender} action={actionToTrigger} />)

    const touchable = wrapper.find(TouchableHighlight)
    touchable.props().onPress() 

    expect(actionToTrigger).toHaveBeenCalledTimes(1)
  })

})