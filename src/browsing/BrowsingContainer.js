import React, { Component } from 'react'
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions } from 'react-native'
import { getItemsToBrowse } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'

class BrowsingContainer extends Component {

  constructor(props) {
    super(props)
    this.translateX = new Animated.Value(0)
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, { dx: this.translateX }]),
      onPanResponderRelease: (e, { vx, dx }) => {
        const screenWidth = Dimensions.get("window").width
        this.setState({screenWidth: screenWidth})
        this.setState({ dx: dx }) // dx - accumulated distance of the gesture since the touch started (x axis)
        this.setState({ vx: vx }) // vx - current velocity of the gesture (x axis)
        if (this.sufficientRightSwipe(screenWidth, vx, dx)) {
          Animated.timing(this.translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200
          }).start(this.setState({backgroundColor: {backgroundColor: "yellow"}}))
        } else if (this.sufficientLeftSwipe(screenWidth, vx, dx)) {
          Animated.timing(this.translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200
          }).start(this.setState({backgroundColor: {backgroundColor: "blue"}}))
        } else {
          Animated.spring(this.translateX, {
            toValue: 0,
            bounciness: 10
          }).start()
        }
      }
    })
    this.state = {
      token: null,
      itemsToBrowse: null,
      messages: [],
      messagesModalVisible: false,
      dx: 0,
      vx: 0,
      screenWidth: 0,
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
          <Text>DX: {this.state.dx}</Text>
          <Text>VX: {this.state.vx}</Text>
          <Text>screenWidth: {this.state.screenWidth}</Text>

          <Animated.Image 
           source={{uri: this.state.itemsToBrowse[0].imageURL}}
           style={{ transform: [{ translateX: this.translateX }], ...styles.image}} 
           {...this.panResponder.panHandlers}
           />
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
