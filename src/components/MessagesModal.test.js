import React from 'react'
import { shallow } from 'enzyme'
import MessagesModal from './MessagesModal'
import { Modal, Text, TouchableHighlight } from 'react-native'

describe("<MessagesModal />", () => {

  it("renders a <Modal /> with visibility determined by its props", () => {
    const props = {
      visible: false,
      messages: [],
      onClose: () => true
    }
    const wrapper = shallow(<MessagesModal {...props} />)
    const modal = wrapper.find(Modal)

    expect(modal.length).toEqual(1)
    expect(modal.prop("visible")).toEqual(wrapper.prop("visible"))
  })

  it("renders each messages prop within a <Text/>", () => {
    const props = {
      visible: false,
      messages: ["Message 1", "Message 2"],
      onClose: () => true
    }
    const wrapper = shallow(<MessagesModal {...props} />)

    const textRendered = wrapper.find(Text)

    expect(textRendered.at(0).props().children).toEqual(props.messages[0])
    expect(textRendered.at(1).props().children).toEqual(props.messages[1])
  })

  it("renders a TouchableHighlight as a close button that calls the onClose props when pressed", () => {
    const props = {
      visible: false,
      messages: ["Message 1", "Message 2"],
      onClose: jest.fn()
    }
    const wrapper = shallow(<MessagesModal {...props} />)

    const button = wrapper.find(TouchableHighlight)
    expect(button.find(Text).props().children).toEqual("Close")

    button.props().onPress()
    expect(props.onClose).toHaveBeenCalledTimes(1)
  })

})
