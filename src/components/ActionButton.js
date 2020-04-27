import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const ActionButton = (props) => {
  const { action, buttonText } = props
  const customStyles = props.style ? props.style : {}
  return (
    <TouchableHighlight
      style={{...styles.button, ...customStyles.button}}
      onPress={action}
      activeOpacity={0.6}
      underlayColor="lightgrey"
    >
      <Text style={{...styles.buttonText, ...customStyles.buttonText}}>{buttonText}</Text>
    </TouchableHighlight>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  button: {
    width: "60%",
    marginTop: "3%",
    borderWidth: 2,
    borderColor: "#808080",
    backgroundColor: "#FFDD1F",
  },
  buttonText: {
    paddingTop: "3.5%",
    paddingBottom: "3.5%",
    fontSize: 20,
    color: "#3484F2",
    textAlign: "center"
  }
})