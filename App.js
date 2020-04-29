import React, { Component } from 'react'
import { wakeUpAPI } from './src/api/apiRequests'
import { SplashScreen } from 'expo'
import SplashScreenComponent from './src/components/SplashScreen'
import TINNDARP from './src/main'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appIsReady: false,
    }
  }

  componentDidMount() {
    SplashScreen.preventAutoHide()
    this.warmUp()
  }

  warmUp() {
    return wakeUpAPI()
      .then(() => this.delayReadyState())
      .catch(() => console.log("There was a problem warming up."))
  }

  delayReadyState() {
    setTimeout(() => this.setReadyState(), 2000)
  }

  setReadyState() {
    this.setState({appIsReady: true})
    SplashScreen.hide()
  }

  render() {
    if (!this.state.appIsReady) {
      return <SplashScreenComponent />
    } else {
      return <TINNDARP />
    }
  }
  
}
