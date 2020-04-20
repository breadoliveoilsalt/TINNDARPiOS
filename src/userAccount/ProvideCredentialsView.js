import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Logo from '../components/Logo'

class ProvideCredentialsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: "",
      userPassword: ""
    }
  }

  handleLogIn() {
    console.log("Logging in", this.state.userEmail, this.state.userPassword)
  }

  handleSignUp() {
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
        />
        <TextInput
          style={styles.textInput}
          placeholder={"Enter password"}
          onChangeText={(text) => this.setState({userPassword: text})}
          textContentType={"password"}
          secureTextEntry={true}
          value={this.state.userPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleLogIn()}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSignUp()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  }
})
