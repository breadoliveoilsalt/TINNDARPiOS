import React, { Component } from 'react'
import { wakeUpAPI } from './src/api/apiRequests'
import { SplashScreen } from 'expo'
import SplashScreenComponent from './src/components/SplashScreen'
import TINNDARP from './src/main'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appIsReady: false,
      items: null}
  }

  componentDidMount() {
    SplashScreen.preventAutoHide() 
    this.warmUpBackend()
  }

  warmUpBackend() {
    return wakeUpAPI()
      .then(response => this.setState({items: response.data}))
      .catch(error => console.log("There was a problem waking up the backend."))
      .finally(() => {
        this.setState({appIsReady: true})
        SplashScreen.hide()
      })
  }

  render() {
    if (!this.state.appIsReady) {
      return <SplashScreenComponent />
    } else {
      return <TINNDARP items={this.state.items}/>
    }
  }
}

export default App
