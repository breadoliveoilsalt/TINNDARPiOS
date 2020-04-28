import React, { Component } from 'react'
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native'

export default class MessagesModal extends Component {

  constructor(props) {
    super(props)
  }

  renderMessages() {
    return this.props.messages.map((message, index) => {
      return <Text key={index} style={styles.modalText}>{message}</Text>
    })
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={styles.centeredModal}>
          <View style={styles.modalView}>
            {this.renderMessages()}
            <TouchableHighlight
              style={styles.modalCloseButton}
              onPress={this.props.onClose}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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
