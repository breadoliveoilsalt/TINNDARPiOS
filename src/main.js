import React, { Component } from 'react'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'

class TINNDARP extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: this.props.tokenExists
    }
    this.renderLoggedInView = this.renderLoggedInView.bind(this)
    this.renderLoggedOutView = this.renderSignedOutView.bind(this)
  }

  renderLoggedInView() {
    this.setState({loggedIn: true})
  }

  renderSignedOutView() {
    this.setState({loggedIn: true})
  }

  render() {
    if (this.state.loggedIn) { 
      return <UserAuthenticatedView renderSignedOutView={this.renderSignedOutView} />
    } else {
      return <ProvideCredentialsView renderLoggedInView={this.renderLoggedInView} /> 
    }
  }
  
}

export default TINNDARP
