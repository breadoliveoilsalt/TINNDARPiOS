import React from 'react'
import { shallow } from 'enzyme'
import { Text, ActivityIndicator } from 'react-native'
import { getItemsToBrowse } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'
import * as linkingActions from '../api/linkingWrapper'
import BrowsingContainer from './BrowsingContainer'
import ActionButton from '../components/ActionButton'
import SwipeableImage from './SwipeableImage'

describe("<BrowsingContainer />", () => {
  const mockItemsData = [
    {
      id: 1,
      name: 'SAGSTUA',
      imageURL: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
      price: '149.00',
      description: 'Bed frame, black, Full',
      moreInfoURL: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
    },
    {
      id: 2,
      name: 'MALM',
      imageURL: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s',
      price: '199.00',
      description: 'Bed frame, high, black-brown, Luröy, Queen',
      moreInfoURL: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
    },
    {
      id: 3,
      name: 'BUSKBO',
      imageURL: 'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s',
      price: '130.00',
      description: 'Armchair, rattan',
      moreInfoURL: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/'
    }
  ]

  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(<BrowsingContainer />)
  })

  const getDeeplyRenderedText = (wrapper) => {
    const textNodes = wrapper.find(Text)
    return textNodes.map(node => node.props().children).flat().join()
  }

  it("renders an <ActivityIndicator /> if the items have not been populated", () => {
    expect(wrapper.state().itemsToBrowse).toEqual(null)
    expect(wrapper.find(ActivityIndicator).length).toEqual(1)
  })

  it("renders basic information about the first item in the list of itemsToBrowse", () => {
    wrapper.setState({itemsToBrowse: mockItemsData})

    const renderedText = getDeeplyRenderedText(wrapper)
    
    const { name, description, price } = mockItemsData[0]
    expect(renderedText).toContain(name)
    expect(renderedText).toContain(description)
    expect(renderedText).toContain(price)
  })

  it("renders an <ActionButton /> to handle linking to more infomation about the first item", () => {
    wrapper.setState({itemsToBrowse: mockItemsData})

    const actionButton = wrapper.find(ActionButton) 
    expect(actionButton.props().buttonText).toContain("More Info")

    jest.spyOn(linkingActions, "openURL").mockReturnValue(true)
    actionButton.props().action()

    expect(linkingActions.openURL).toHaveBeenCalledTimes(1)
    expect(linkingActions.openURL).toHaveBeenCalledWith(mockItemsData[0].moreInfoURL)
  })

  it("renders a <SwipeableImage /> sourced to the first item in the list of itemsToBrowse", () => {
    wrapper.setState({itemsToBrowse: mockItemsData})

    const swipeableImage = wrapper.find(SwipeableImage)
    expect(swipeableImage.length).toEqual(1)
    expect(swipeableImage.props().source).toEqual(mockItemsData[0].imageURL)
  })

  it("renders instructions on how to make a decision about an item", () => {
    wrapper.setState({itemsToBrowse: mockItemsData})
    const renderedText = getDeeplyRenderedText(wrapper)
    
    expect(renderedText).toContain("Swipe image to decide")
  })

  it("alerts the user when there are no items left to browse", () => {
    wrapper.setState({itemsToBrowse: []})
    const renderedText = getDeeplyRenderedText(wrapper)

    expect(renderedText).toContain("There are no further items to browse")
  })
  
})
