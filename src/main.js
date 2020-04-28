import React, { Component } from 'react'
import * as tokenActions from './userAccount/tokenActions'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'

export default class TINNDARP extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: this.props.tokenExists
    }
    this.logInToApp = this.logInToApp.bind(this)
    this.signOutOfApp = this.signOutOfApp.bind(this)
  }

  logInToApp(token) {
    return tokenActions.saveToken(token)
      .then(() => this.setState({loggedIn: true}))
  }

  signOutOfApp() {
    return tokenActions.deleteToken()
      .then(() => this.setState({loggedIn: false}))
  }

  render() {
    if (this.state.loggedIn) { 
      return <UserAuthenticatedView signOutOfApp={this.signOutOfApp} />
    } else {
      return <ProvideCredentialsView logInToApp={this.logInToApp} /> 
    }
  }
  
}
