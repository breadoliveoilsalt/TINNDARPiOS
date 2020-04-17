import React, { Component } from 'react'
import { wakeUpAPI } from './src/api/apiRequests'
import SplashScreen from './src/components/SplashScreen'
import TINNDARP from './src/main'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appIsReady: false,
      items: null}
  }

  componentDidMount() {
    this.warmUpBackend()
  }

  warmUpBackend() {
    return wakeUpAPI()
      .then(response => this.setState({items: response.data}))
      .then(() => this.delayReadyState())
      .catch(error => console.log("There was a problem waking up the backend."))
  }

  delayReadyState() {
    setTimeout(() => this.setState({appIsReady: true}), 2000)
  }

  render() {
    if (!this.state.appIsReady) {
      return <SplashScreen />
    } else {
      return <TINNDARP items={this.state.items}/>
    }
  }
}

export default App
