import React, { Component } from 'react'
import { PanResponder, Animated, Dimensions } from 'react-native'

export default class SwipeableImage extends Component {

  constructor(props) {
    super(props)
    this.translateX = new Animated.Value(0)
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, { dx: this.translateX }]),
      onPanResponderRelease: (e, { vx, dx }) => {
        const screenWidth = Dimensions.get("window").width
        if (this.sufficientRightSwipe(screenWidth, vx, dx)) {
          Animated.timing(this.translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200
          }).start(this.props.rightSwipeAction)
        } else if (this.sufficientLeftSwipe(screenWidth, vx, dx)) {
          Animated.timing(this.translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200
          }).start(this.props.leftSwipeAction)
        } else {
          Animated.spring(this.translateX, {
            toValue: 0,
            bounciness: 10
          }).start()
        }
      }
    })
  }

  sufficientRightSwipe(screenWidth, xAxisVelocity, xAxisDistance) {
    return xAxisVelocity >= 0.5 || xAxisDistance >= 0.5 * screenWidth
  }

  sufficientLeftSwipe(screenWidth, xAxisVelocity, xAxisDistance) {
    return xAxisVelocity <= -0.5 || xAxisDistance <= -0.5 * screenWidth
  }

  render() {
    return (
      <Animated.Image
        source={{ uri: this.props.source }}
        style={{ transform: [{ translateX: this.translateX }], ...this.props.style }}
        {...this.panResponder.panHandlers}
        onLoad={() => this.translateX.setValue(0)}
      />
    )
  }
}
