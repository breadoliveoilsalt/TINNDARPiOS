import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { openURL } from '../api/linkingWrapper'
import { getItemsToBrowse, postBrowsingDecision } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'
import SwipeableImage from './SwipeableImage'
import ActionButton from '../components/ActionButton'
import MessagesModal from '../components/MessagesModal'

export default class BrowsingContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      itemsToBrowse: null,
      messages: [],
      messagesModalVisible: false
    }
    this.handleLike = this.handleLike.bind(this)
    this.handleNope = this.handleNope.bind(this)
    this.hideMessages = this.hideMessages.bind(this)
    this.getCurrentItem = this.getCurrentItem.bind(this)
  }

  componentDidMount() {
    return getToken()
      .then(token => this.setState({token: token}))
      .then(() => getItemsToBrowse({token: this.state.token}))
      .then(itemsData => this.setState({itemsToBrowse: itemsData.items}))
      .catch(() => this.showMessages(["There was a problem getting the items to browse"]))
  }

  openLink(url) {
    openURL(url)
  }

  getCurrentItem() {
    return this.state.itemsToBrowse[0]
  }

  handleLike(currentItem = this.getCurrentItem()) {
    const params = {
      token: this.state.token,
      item_id: currentItem.id,
      liked: "true"
    }
    return this.postDecision(params)
  }

  handleNope(currentItem = this.getCurrentItem()) {
    const params = {
      token: this.state.token,
      item_id: currentItem.id,
      liked: "false"
    }
    return this.postDecision(params)
  }

  postDecision(params) {
    return postBrowsingDecision(params)
      .then((response) => {
        if (response.hasOwnProperty("errors")) {
          this.showMessages(response.errors)
        } else {
          this.advanceToNextItem()
        }
      })
      .catch(error => this.showMessages([error]))
  }

  showMessages(messages) {
    this.setState({
      messages: messages,
      messagesModalVisible: true
    })
  }

  hideMessages() {
    this.setState({
      messages: [],
      messagesModalVisible: false
    })
  }

  advanceToNextItem() {
    this.setState({itemsToBrowse: this.state.itemsToBrowse.slice(1)})
  }

  render() {
    if (!this.state.itemsToBrowse) {
      return (
        <View style={styles.container} >
          <ActivityIndicator size="large" color="#FFDD1F" />
        </View>
      )
    } 

    if (this.state.itemsToBrowse.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={{...styles.text, fontWeight: "bold"}}>There are no further items to browse!</Text>
        </View>
      )
    }

    const currentItem = this.getCurrentItem()

    return (
      <View style={styles.container} >
        <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{...styles.text, fontWeight: "bold", fontSize: 40}}
        >
          {currentItem.name}
        </Text>

        <Text 
          style={styles.text} 
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {currentItem.description}
        </Text>

        <Text style={styles.text}>${currentItem.price}</Text>

        <ActionButton buttonText="Click for More Info" action={() => this.openLink(currentItem.moreInfoURL)} />

        <SwipeableImage 
          style={styles.image}
          source={currentItem.imageURL}
          rightSwipeAction={() => this.handleLike(currentItem)}
          leftSwipeAction={() => this.handleNope(currentItem)}
        />

        <Text style={styles.text}>Swipe image to decide</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableHighlight onPress={() => this.handleNope()}>
            <MaterialCommunityIcons name={"arrow-left-bold"} size={45} color={"maroon"}/>
          </TouchableHighlight>
          <Text style={styles.textDecision}>Nope</Text>
          <Text style={styles.textDecision}>              </Text>
          <Text style={styles.textDecision}>Like</Text>
          <TouchableHighlight onPress={() => this.handleLike()}>
            <MaterialCommunityIcons name={"arrow-right-bold"} size={45} color={"darkgreen"} />
          </TouchableHighlight>
        </View>

        <MessagesModal
          visible={this.state.messagesModalVisible}
          messages={this.state.messages}
          onClose={this.hideMessages}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3484F2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFDD1F",
    fontSize: 25,
    textAlign: "center",
    marginTop: "1%",
    marginLeft: "3%",
    marginRight: "3%"
  },
  textDecision: {
    color: "#FFDD1F",
    fontSize: 25,
    fontWeight: "bold",
    margin: "2%"
  },
  image: {
    height: 250,
    width: 250,
    marginTop: "5%",
  }
})
