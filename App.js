import React, { Component } from 'react'
import { wakeUpAPI } from './src/api/apiRequests'
import { SplashScreen } from 'expo'
import * as tokenActions from './src/userAccount/tokenActions'
import SplashScreenComponent from './src/components/SplashScreen'
import TINNDARP from './src/main'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appIsReady: false,
      items: null,
      tokenExists: false
    }
  }

  componentDidMount() {
    SplashScreen.preventAutoHide()
    this.warmUp()
  }

  warmUp() {
    return wakeUpAPI()
      .then(response => this.setState({items: response.data}))
      .then(() => this.checkForToken())
      .then(() => this.delayReadyState())
      .catch(() => console.log("There was a problem warming up."))
  }

  checkForToken() {
    tokenActions.tokenExists()
      .then((bool) => this.setState({tokenExists: bool}))
      .catch(() => console.log("There was a problem checking if the token exists in the warm up."))
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
      return <TINNDARP tokenExists={this.state.tokenExists}/>
    }
  }
}
