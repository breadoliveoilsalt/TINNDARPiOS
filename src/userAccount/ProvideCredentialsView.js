import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, TouchableHighlight, Modal, StyleSheet } from 'react-native'
import { logIn, signUp } from '../api/apiRequests'
import { saveToken } from './tokenActions'
import Logo from '../components/Logo'
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
    callback(credentials)
      .then(data => {
        if (data.loggedIn) {
          saveToken(data.token)
          const messages = ["You are logged in with token", data.token]
          this.showMessages(messages)
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleAPIRequest(logIn)}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleAPIRequest(signUp)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

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
  },
  button: {
    width: "60%"
  },
  buttonText: {
    marginTop: "7%",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#FFDD1F",
    fontSize: 20,
    color: "#3484F2",
    borderColor: "#808080",
    borderWidth: 2,
    textAlign: "center"
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalCloseButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
   backgroundColor: "#2196F3" 
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
})
