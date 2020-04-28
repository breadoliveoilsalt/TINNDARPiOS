import React, { Component } from 'react'
import * as tokenActions from './userAccount/tokenActions'
import { authenticateUserToken } from './api/apiRequests'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default class TINNDARP extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      loggedIn: false,
      userEmail: "",
      token: "" 
    }
    this.logInToApp = this.logInToApp.bind(this)
    this.signOutOfApp = this.signOutOfApp.bind(this)
  }

  componentDidMount() {
    this.setState({fetching: true})
    return tokenActions.getToken()
      .then(token => authenticateUserToken({token: token}))
      .then(response => {
        if (response.loggedIn) {
          this.setState({
            loggedIn: true,
            userEmail: response.userEmail,
            token: response.token
          })
        }
      })
      .finally(() => this.setState({fetching: false}))
  }

  logInToApp(userInfo) {
    this.setState({fetching: true})
    return tokenActions.saveToken(userInfo.token)
      .then(() => this.setState({
        loggedIn: true,
        userEmail: userInfo.userEmail,
        token: userInfo.token
      }))
      .finally(() => this.setState({fetching: false}))
  }

  signOutOfApp() {
    this.setState({fetching: true})
    return tokenActions.deleteToken()
      .then(() => this.setState({
        loggedIn: false,
        userEmail: "",
        token: "" 
      }))
      .finally(() => this.setState({fetching: false}))
  }

  render() {

    if (this.state.fetching) {
      return (
        <View style={styles.container} >
          <ActivityIndicator size="large" color="#FFDD1F" />
        </View>
      )
    }

    if (this.state.loggedIn) { 
      return <UserAuthenticatedView 
        signOutOfApp={this.signOutOfApp}
        userEmail={this.state.userEmail}
        token={this.state.token}
      />
    } 
    
    return <ProvideCredentialsView logInToApp={this.logInToApp} /> 
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3484F2",
    justifyContent: "center",
    alignItems: "center",
  }
})
