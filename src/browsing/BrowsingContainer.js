import React, { Component } from 'react'
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions } from 'react-native'
import { getItemsToBrowse } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'
import SwipeableImage from './SwipeableImage'

class BrowsingContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      itemsToBrowse: null,
      messages: [],
      messagesModalVisible: false,
      backgroundColor: {backgroundColor: "red"}
    }
  }

  sufficientRightSwipe(screenWidth, xAxisVelocity, xAxisDistance) {
    return xAxisVelocity >= 0.5 || xAxisDistance >= 0.5 * screenWidth
  }

  sufficientLeftSwipe(screenWidth, xAxisVelocity, xAxisDistance) {
    return xAxisVelocity <= -0.5 || xAxisDistance <= -0.5 * screenWidth
  }

  componentDidMount() {
    getToken()
      .then(token => this.setState({token: token}))
      .then(() => getItemsToBrowse({token: this.state.token}))
      .then(items => this.setState({itemsToBrowse: items}))
      .catch(() => console.log("There was a problem getting the items to browse"))
  }

  render() {
    //getItemsToBrowse only requires {token: token} as params
    if (this.state.itemsToBrowse) {
      return (
        <View style={{...styles.container, ...this.state.backgroundColor}} >
          <Text>Browsing Container</Text>

          <SwipeableImage 
            style={styles.image}
            source={this.state.itemsToBrowse[0].imageURL}
            rightSwipeAction={() => this.setState({backgroundColor: { backgroundColor: "yellow" }})}
            leftSwipeAction={() => this.setState({backgroundColor: { backgroundColor: "blue" }})}
          / >
        </View>
      )
    } else {
        <View style={styles.container} >
          <Text>No images!</Text>
        </View>
      return null
    }

  }
}

export default BrowsingContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
    margin: "5%",
  }
})
