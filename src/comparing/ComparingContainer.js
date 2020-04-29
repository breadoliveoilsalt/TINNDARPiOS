import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Keyboard } from 'react-native'
import { getCommonItems } from '../api/apiRequests'
import ActionButton from '../components/ActionButton'
import MessagesModal from '../components/MessagesModal'
import ItemDisplay from './ItemDisplay'

export default class ComparingContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      attemptCompareTo: "",
      successfulComparisonTo: "",
      commonItems: null,
      messages: [],
      messagesModalVisible: false
    }
    this.handleComparison = this.handleComparison.bind(this)
    this.hideMessages = this.hideMessages.bind(this)
  }


  handleComparison() {
    Keyboard.dismiss()
    const params = {
      token: this.props.token,
      compare_to: this.state.attemptCompareTo.trim()
    }
    return getCommonItems(params)
      .then(response => {
        if (response.hasOwnProperty("errors")) {
          this.showMessages(response.errors)
        } else {
          this.setState({
            successfulComparisonTo: response.successfulComparisonTo,
            commonItems: response.commonItems
          })
          this.flatListRef.scrollToOffset({ animated: true, offset: 0 })
        }
      })
      .catch(error => this.showMessages([error.message]))
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
      <View style={styles.container} >

        <View style={styles.compareForm} >
          <Text style={styles.text} >Enter the email of another user to see what items you both liked!</Text>

          <TextInput
            style={styles.textInput}
            placeholder={"Enter email address"}
            onChangeText={(text) => this.setState({attemptCompareTo: text})}
            value={this.state.attemptCompareTo}
            autoCapitalize={"none"}
          />

          <ActionButton action={this.handleComparison} buttonText={"Compare"} style={{button: styles.button, buttonText: styles.buttonText}} />

          {this.state.successfulComparisonTo ? 
              <Text 
                style={styles.text} 
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                Showing comparison to: {this.state.successfulComparisonTo}
              </Text> 
            : 
              null
          }

        </View>
        
        <View style={styles.divider} />

        <View style={styles.itemList} >
          {this.state.commonItems ? 
              <FlatList 
                data={this.state.commonItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <ItemDisplay item={item} />}
                ref={(ref) => {this.flatListRef = ref}}
              />
            : 
              null
          }
        </View>

        <MessagesModal
          visible={this.state.messagesModalVisible}
          messages={this.state.messages}
          onClose={this.hideMessages}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3484F2",
    alignItems: "center",
  },
  compareForm: {
    paddingTop: "7%",
    width: "100%",
    height: "35%",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    borderColor: "lightgrey",
    borderWidth: 1 
  },
  itemList: {
    marginTop: "5%",
    height: "60%"
  },
  text: {
    fontSize: 15,
    margin: "2%",
    textAlign: "center",
    color: "#FFDD1F",
    backgroundColor: "#3484F2"
  },
  textInput: {
    margin: "1%",
    padding: "2%",
    textAlign: "center",
    fontSize: 15,
    backgroundColor: '#fff',
    width: "80%",
    backgroundColor: "#fff"
  },
  button: {
  },
  buttonText: {
    fontSize: 15
  }
})
