import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const ActionButton = (props) => {
  const { action, buttonText } = props
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={action}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
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