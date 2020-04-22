import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { logIn, signUp } from '../api/apiRequests'
import { saveToken } from './tokenActions'
import Logo from '../components/Logo'
import UserAccountButton from './UserAccountButton'
import MessagesModal from '../components/MessagesModal'

class ProvideCredentialsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: "",
      userPassword: "",
      messages: [],
      messagesModalVisible: false
    }
  }

  handleAPIRequest(callback) {
    const credentials = {
      email: this.state.userEmail, 
      password: this.state.userPassword
    }
    return callback(credentials)
      .then(data => {
        if (data.loggedIn) {
          saveToken(data.token)
          this.props.renderLoggedInView()
          // $$ Remove below once logged in home screen implemented 
          // const messages = ["You are logged in with token", data.token]
          // this.showMessages(messages)
        } else if (!data.loggedIn) {
          const messages = ["Sorry, there were some errors:", ...data.errors]
          this.showMessages(messages)
        }
      })
      .catch(() => {
        const messages = ["Sorry, there was a server error."]
        this.showMessages(messages)
      })
  }

  showMessages(messages) {
    this.setState({
      messages: messages,
      messagesModalVisible: true
    })
  }

  hideMessages() {
    this.setState({
      messages: [],
      messagesModalVisible: false
    })
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="padding"
      >
        <Text style={styles.text} >Welcome To</Text>
        <Logo />

        <Text style={styles.text} >We're glad you're here</Text>
        <Text style={styles.text} >Please enter your information below to log in or sign up</Text>

        <TextInput
          style={styles.textInput}
          placeholder={"Enter email address"}
          onChangeText={(text) => this.setState({userEmail: text})}
          textContentType={"username"}
          value={this.state.userEmail}
          autoCapitalize={"none"}
        />

        <TextInput
          style={styles.textInput}
          placeholder={"Enter password"}
          onChangeText={(text) => this.setState({userPassword: text})}
          textContentType={"password"}
          secureTextEntry={true}
          value={this.state.userPassword}
          autoCapitalize={"none"}
        />

        <UserAccountButton action={() => this.handleAPIRequest(logIn)} buttonText={"Log In"} />
        <UserAccountButton action={() => this.handleAPIRequest(signUp)} buttonText={"Sign Up"} />

        <MessagesModal 
          visible={this.state.messagesModalVisible} 
          messages={this.state.messages} 
          onClose={() => this.hideMessages()} 
        />

      </KeyboardAvoidingView>
    )

  }
}

export default ProvideCredentialsView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3484F2",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    margin: "3%",
    textAlign: "center",
    color: "#FFDD1F",
    backgroundColor: "#3484F2"
  },
  textInput: {
    margin: "3%",
    padding: "2%",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: '#fff',
    width: "80%",
    backgroundColor: "#fff"
  }
})
