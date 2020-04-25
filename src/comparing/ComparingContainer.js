import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableHighlight } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
import { openURL } from '../api/linkingWrapper'
import { getCommonItems } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'
// import SwipeableImage from './SwipeableImage'
import ActionButton from '../components/ActionButton'
import MessagesModal from '../components/MessagesModal'

class ComparingContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      attemptCompareTo: null,
      successfulComparisonTo: null,
      commonItems: null,
      messages: [],
      messagesModalVisible: false
    }
    this.handleComparison = this.handleComparison.bind(this)
  }

  componentDidMount() {
    return getToken()
      .then(token => this.setState({ token: token }))
      .then(() => this.handleComparison())
      .catch(() => console.log("There was a problem getting the token for ComparisonContainer"))
  }

  openLink(url) {
    openURL(url)
  }

  handleComparison() {
    const params = {
      token: this.state.token,
      compare_to: "betty@betty.com"
      // compare_to: this.state.compareTo
    }
    return getCommonItems(params)
      .then(response => {
        // $$ debugger
        if (response.hasOwnProperty("errors")) {
          this.showMessages(response.errors)
        } else {
          this.setState({
            successfulComparisonTo: response.successfulComparisonTo,
            commonItems: response.commonItems
          })
        }
      })
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

  render() {
    // $$ handle loader somehow
    // if (!this.state.itemsToBrowse) {
    //   return (
    //     <View style={styles.container} >
    //       <ActivityIndicator size="large" color="#FFDD1F" />
    //     </View>
    //   )
    // }

    // const currentItem = this.getCurrentItem()

    return (
      <View style={styles.container} >
        <Text>
          {this.state.commonItems ? JSON.stringify(this.state.commonItems) : null }
        </Text>
        {/* <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{ ...styles.text, fontWeight: "bold", fontSize: 40 }}
        >
          {currentItem.name}
        </Text>

        <Text
          style={{ ...styles.text }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {currentItem.description}
        </Text>

        <Text style={styles.text}>${currentItem.price}</Text>

        <ActionButton buttonText="Click for More Info" action={() => this.openLink(currentItem.moreInfoURL)} />

        <SwipeableImage
          style={styles.image}
          source={this.state.itemsToBrowse[0].imageURL}
          rightSwipeAction={() => this.handleLike(currentItem)}
          leftSwipeAction={() => this.handleNope(currentItem)}
        />

        <Text style={styles.text}>Swipe image to decide</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableHighlight onPress={() => this.handleNope()}>
            <MaterialCommunityIcons name={"arrow-left-bold"} size={45} color={"maroon"} />
          </TouchableHighlight>
          <Text style={{ ...styles.textDecision }}>Nope</Text>
          <Text style={{ ...styles.textDecision }}>              </Text>
          <Text style={{ ...styles.textDecision }}>Like</Text>
          <TouchableHighlight onPress={() => this.handleLike()}>
            <MaterialCommunityIcons name={"arrow-right-bold"} size={45} color={"darkgreen"} />
          </TouchableHighlight>
        </View> */}

        <MessagesModal
          visible={this.state.messagesModalVisible}
          messages={this.state.messages}
          onClose={this.hideMessages}
        />

      </View>
    )
  }
}

export default ComparingContainer

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

