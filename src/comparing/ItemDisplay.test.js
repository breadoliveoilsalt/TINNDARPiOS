import React from 'react'
import { shallow } from 'enzyme'
import { Text, Image } from 'react-native'
import * as linkingActions from '../api/linkingWrapper'
import ItemDisplay from './ItemDisplay'
import ActionButton from '../components/ActionButton'

describe("<ItemDisplay />", () => {

  const mockItemData = {
    id: 1,
    name: 'SAGSTUA',
    imageURL: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
    price: '149.00',
    description: 'Bed frame, black, Full',
    moreInfoURL: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ItemDisplay item={mockItemData} />)
  })

  it("renders basic information about the item prop", () => {
    const { name, description, price } = mockItemData
    const [textName, textDescription, textPrice] = wrapper.find(Text)

    expect(textName.props.children).toEqual(name)
    expect(textDescription.props.children).toEqual(description)
    expect(textPrice.props.children).toEqual(["$", price])
  })

  it("renders an <ActionButton /> to handle linking to more infomation about the item prop", () => {
    const actionButton = wrapper.find(ActionButton)
    expect(actionButton.props().buttonText).toContain("More Info")

    jest.spyOn(linkingActions, "openURL").mockReturnValue(true)
    actionButton.props().action()

    expect(linkingActions.openURL).toHaveBeenCalledTimes(1)
    expect(linkingActions.openURL).toHaveBeenCalledWith(mockItemData.moreInfoURL)
  })

  it("renders an <Image /> sourced to prop item's url", () => {
    const image = wrapper.find(Image)

    expect(image.length).toEqual(1)
    expect(image.props().source).toEqual({uri: mockItemData.imageURL})
  })

})
