import React from 'react'
import { shallow } from 'enzyme'
import { Text, TextInput, FlatList } from 'react-native'
import * as apiRequests from '../api/apiRequests'
import * as tokenActions from '../userAccount/tokenActions'
import ComparingContainer from './ComparingContainer'
import ActionButton from '../components/ActionButton'
import ItemDisplay from './ItemDisplay'
import MessagesModal from '../components/MessagesModal'

const getDeeplyRenderedText = (wrapper) => {
  const textNodes = wrapper.find(Text)
  return textNodes.map(node => node.props().children).flat().join()
}

const mockItemData = [
  {
    "id": 1,
    "name": "GJÖRA",
    "imageURL": "https://www.ikea.com/us/en/images/products/gjoera-bed-frame__0524587_PE644399_S5.JPG?f=s",
    "description": "Bed frame, birch, Eidfjord, Queen",
    "price": "429.00",
    "moreInfoURL": "https://www.ikea.com/us/en/p/gjoera-bed-frame-birch-eidfjord-s09210616/"
  },
  {
    "id": 4,
    "name": "MALM",
    "imageURL": "https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s",
    "description": "Bed frame, high, black-brown, Luröy, Queen",
    "price": "199.00",
    "moreInfoURL": "https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/"
  },
  {
    "id": 5,
    "name": "BUSKBO",
    "imageURL": "https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s",
    "description": "Armchair, rattan",
    "price": "130.00",
    "moreInfoURL": "https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/"
  }
]

const comparedUserEmail = "bobby@bobby.com"

describe("<ComparingContainer />", () => {

  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(<ComparingContainer />)
  })

  describe("the layout", () => {

    it("has a <TextInput /> for entering an email address", () => {
      const textInput = wrapper.find(TextInput)

      expect(textInput.length).toEqual(1)
      expect(textInput.prop("placeholder")).toContain("email")
    })

    describe("the <TextInput />", () => {

      it("updates the attemptToCompareTo state when text is entered", () => {
        expect(wrapper.state().attemptCompareTo).toEqual("")

        const textInput = wrapper.find(TextInput)
        textInput.props().onChangeText(comparedUserEmail)

        expect(wrapper.state().attemptCompareTo).toEqual(comparedUserEmail)
      })

    })

    it("has an <ActionButton /> that with handleComparison as its action prop", () => {
      const instance = wrapper.instance()

      const actionButton = wrapper.find(ActionButton)
      
      expect(actionButton.length).toEqual(1)
      expect(actionButton.prop("action")).toEqual(instance.handleComparison)
    })

    it("displays the email of successfully compared user", () => {
      let textRendered = getDeeplyRenderedText(wrapper)
      expect(textRendered.includes(comparedUserEmail)).toEqual(false)

      wrapper.setState({successfulComparisonTo: comparedUserEmail})

      textRendered = getDeeplyRenderedText(wrapper)
      expect(textRendered.includes(comparedUserEmail)).toEqual(true)
    })

    it("renders a <FlatList /> if there are commonItems", () => {
      expect(wrapper.find(FlatList).length).toEqual(0)

      wrapper.setState({commonItems: mockItemData})

      expect(wrapper.find(FlatList).length).toEqual(1)
    })

    describe("the <FlatList />", () => {

      it("has the commonItems for data", () => {
        wrapper.setState({commonItems: mockItemData})
        const flatList = wrapper.find(FlatList)

        expect(flatList.props().data).toEqual(wrapper.state().commonItems)
      })

      it("renders an <ItemDisplay /> for a commonItem, with the commonItem as a item prop", () => {
        wrapper.setState({commonItems: mockItemData})
        const flatList = wrapper.find(FlatList)

        const itemElement = flatList.props().renderItem({item: flatList.props().data[0]})

        expect(itemElement.type).toEqual(ItemDisplay)
        expect(itemElement.props.item).toEqual(mockItemData[0])
      })

    })

    it("has a <MessagesModal />", () => {
      expect(wrapper.find(MessagesModal).length).toEqual(1)
    })

    describe("the <MessagesModal />", () => {

      let modal

      beforeEach(() => {
        modal = wrapper.find(MessagesModal)
      })

      it("is invisible by default", () => {
        expect(modal.prop("visible")).toEqual(false)
      })

      it("displays any messages in the state", () => {
        const messagesToUser = ["Something went wrong", "Error"]
        wrapper.setState({messages: messagesToUser})

        modal = wrapper.find(MessagesModal)
        expect(modal.prop("messages")).toEqual(wrapper.state().messages)
      })

      it("calls hideMessages on close", () => {
        const instance = wrapper.instance()

        expect(modal.prop("onClose")).toEqual(instance.hideMessages)
      })

    })

  })

  describe("the logic", () => {

    it("gets the token when it mounts", () => {
      const userToken = "xyz"
      jest.spyOn(tokenActions, "getToken").mockResolvedValue(userToken)

      const instance = wrapper.instance()

      return instance.componentDidMount()
        .then(() => {
          expect(tokenActions.getToken).toHaveBeenCalledTimes(1)
          expect(wrapper.state().token).toEqual(userToken)
        })
    })

    describe("showMessages()", () => {
      
      it("updates the state to show the <MessageModal /> and messages", () => {
        expect(wrapper.state().messagesModalVisible).toEqual(false)
        expect(wrapper.state().messages).toEqual([])

        const instance = wrapper.instance()
        const messagesToUser = ["Something went wrong", "Error"]

        instance.showMessages(messagesToUser)

        expect(wrapper.state().messagesModalVisible).toEqual(true)
        expect(wrapper.state().messages).toEqual(messagesToUser)
      })

    })

    describe("hideMessages()", () => {
      
      it("updates the state to hide the <MessageModal /> and delete prior messages", () => {
        const messagesToUser = ["Something went wrong", "Error"]
        wrapper.setState({messagesModalVisible: true, messages: messagesToUser})

        const instance = wrapper.instance()

        instance.hideMessages()

        expect(wrapper.state().messagesModalVisible).toEqual(false)
        expect(wrapper.state().messages).toEqual([])
      })

    })

    describe("handleComparison()", () => {
      const userToken = "xyz"
      const userToCompare = "billy@billy.com"

      it("calls getCommonItems() with the token and email of other user to compare against", () => {
        wrapper.setState({token: userToken, attemptCompareTo: userToCompare})
        jest.spyOn(apiRequests, "getCommonItems")
        const instance = wrapper.instance()

        return instance.handleComparison()
          .then(() => {
            expect(apiRequests.getCommonItems).toHaveBeenCalledTimes(1)
            expect(apiRequests.getCommonItems).toHaveBeenCalledWith({token: userToken, compare_to: userToCompare})
          })
      })

      it("shows the error messages if getCommonItems() returns errors", () => {
        const errorsFromAPI = ["Something went wrong", "Error"]
        jest.spyOn(apiRequests, "getCommonItems").mockResolvedValue({errors: errorsFromAPI})
        const instance = wrapper.instance()
        jest.spyOn(instance, "showMessages")

        return instance.handleComparison()
          .then(() => {
            expect(instance.showMessages).toHaveBeenCalledTimes(1)
            expect(instance.showMessages).toHaveBeenCalledWith(errorsFromAPI)
          })
      })
      
      it("updates the state if getCommonItems() returns comparison results", () => {
        jest.spyOn(apiRequests, "getCommonItems").mockResolvedValue({
           successfulComparisonTo: userToCompare,
           commonItems: mockItemData
        })

        expect(wrapper.state().successfulComparisonTo).toEqual("")
        expect(wrapper.state().commonItems).toEqual(null)

        const instance = wrapper.instance()

        return instance.handleComparison()
          .then(() => {
            expect(wrapper.state().successfulComparisonTo).toEqual(userToCompare)
            expect(wrapper.state().commonItems).toEqual(mockItemData)
          })
      })

    })

  })

})