import React from 'react'
import { shallow } from 'enzyme'
import { Text, ActivityIndicator } from 'react-native'
import * as apiRequests from '../api/apiRequests'
import * as linkingActions from '../api/linkingWrapper'
import BrowsingContainer from './BrowsingContainer'
import ActionButton from '../components/ActionButton'
import SwipeableImage from './SwipeableImage'
import MessagesModal from '../components/MessagesModal'

describe("<BrowsingContainer />", () => {

  const userToken = "xyz"

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

  const props = {
    token: "xyz"
  }

  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(<BrowsingContainer {...props} />)
  })

  describe("when it mounts", () => {

    beforeEach(() => {
      jest.spyOn(apiRequests, "getItemsToBrowse").mockResolvedValue({items: mockItemsData})
    })

    it("gets the itemsToBrowse from the api with the token props", () => {
      expect(wrapper.state().itemsToBrowse).toEqual(null)

      const instance = wrapper.instance()

      return instance.componentDidMount()
        .then(() => {
          expect(apiRequests.getItemsToBrowse).toHaveBeenCalledTimes(1)
          expect(apiRequests.getItemsToBrowse).toHaveBeenCalledWith({token: props.token})
          expect(wrapper.state().itemsToBrowse).toEqual(mockItemsData)
        })

    })

  })

  describe("when it renders", () => {

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

    describe("the <SwipeableImage />", () => {

      it("calls this.handleLike() with the first item when swiped right", () => {
        wrapper.setState({itemsToBrowse: mockItemsData})
        const swipeableImage = wrapper.find(SwipeableImage)
        const instance = wrapper.instance()
        jest.spyOn(instance, "handleLike")

        swipeableImage.props().rightSwipeAction()
        expect(instance.handleLike).toHaveBeenCalledTimes(1)
        expect(instance.handleLike).toHaveBeenCalledWith(mockItemsData[0])
      })

      it("calls this.handleNope() with the first item when swiped left", () => {
        wrapper.setState({itemsToBrowse: mockItemsData})
        const swipeableImage = wrapper.find(SwipeableImage)
        const instance = wrapper.instance()
        jest.spyOn(instance, "handleNope")

        swipeableImage.props().leftSwipeAction()
        expect(instance.handleNope).toHaveBeenCalledTimes(1)
        expect(instance.handleNope).toHaveBeenCalledWith(mockItemsData[0])
      })

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

  describe("handleLike()", () => {

    let instance

    beforeEach(() => {
      wrapper.setState({itemsToBrowse: mockItemsData})
      instance = wrapper.instance()
      jest.spyOn(apiRequests, "postBrowsingDecision").mockResolvedValue({})
    })

    it("sends the user's token, first item's id, and user's 'like' decision to postBrowsingDecision()", () => {
      wrapper.setState({token: userToken})

      return instance.handleLike()
        .then(() => {
          expect(apiRequests.postBrowsingDecision).toHaveBeenCalledTimes(1)
          expect(apiRequests.postBrowsingDecision).toHaveBeenCalledWith({
            token: userToken,
            item_id: mockItemsData[0].id,
            liked: "true"
          })
        })
    })

    it("renders a <MessagesModal /> showing errors if there are errors from trying to save the 'like'", () => {
      expect(wrapper.find(MessagesModal).prop("visible")).toEqual(false)

      const mockResponse = {
        errors: ["Something went wrong", "Oops"]
      }
      jest.spyOn(apiRequests, "postBrowsingDecision").mockResolvedValue(mockResponse)

      return instance.handleLike()
        .then(() => {
          expect(wrapper.find(MessagesModal).prop("visible")).toEqual(true)
          expect(wrapper.find(MessagesModal).prop("messages")).toEqual(mockResponse.errors)
        })
    })

    it("advances the itemsToBrowse", () => {
      expect(wrapper.state().itemsToBrowse[0]).toEqual(mockItemsData[0])

      return instance.handleLike()
        .then(() => {
          expect(wrapper.state().itemsToBrowse[0]).toEqual(mockItemsData[1])
          expect(wrapper.state().itemsToBrowse[1]).toEqual(mockItemsData[2])
        })
    })

  })

  describe("handleNope()", () => {

    let instance

    beforeEach(() => {
      wrapper.setState({itemsToBrowse: mockItemsData})
      instance = wrapper.instance()
      jest.spyOn(apiRequests, "postBrowsingDecision").mockResolvedValue({})
    })

    it("sends the user's token, first item's id, and user's 'nope' decision to postBrowsingDecision()", () => {
      wrapper.setState({token: userToken})

      return instance.handleNope()
        .then(() => {
          expect(apiRequests.postBrowsingDecision).toHaveBeenCalledTimes(1)
          expect(apiRequests.postBrowsingDecision).toHaveBeenCalledWith({
            token: userToken,
            item_id: mockItemsData[0].id,
            liked: "false"
          })
        })
    })

    it("renders a <MessagesModal /> showing errors if there are errors from trying to save the 'nope'", () => {
      expect(wrapper.find(MessagesModal).prop("visible")).toEqual(false)

      const mockResponse = {
        errors: ["Something went wrong", "Oops"]
      }
      jest.spyOn(apiRequests, "postBrowsingDecision").mockResolvedValue(mockResponse)

      return instance.handleNope()
        .then(() => {
          expect(wrapper.find(MessagesModal).prop("visible")).toEqual(true)
          expect(wrapper.find(MessagesModal).prop("messages")).toEqual(mockResponse.errors)
        })
    })

    it("advances the itemsToBrowse", () => {
      expect(wrapper.state().itemsToBrowse[0]).toEqual(mockItemsData[0])

      return instance.handleNope()
        .then(() => {
          expect(wrapper.state().itemsToBrowse[0]).toEqual(mockItemsData[1])
          expect(wrapper.state().itemsToBrowse[1]).toEqual(mockItemsData[2])
        })
    })

  })

})
