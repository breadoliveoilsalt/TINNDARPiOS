import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

export default ActionButton = (props) => {
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

const styles = StyleSheet.create({
  button: {
    width: "60%",
    marginTop: 12,
    borderWidth: 2,
    borderColor: "#808080",
    backgroundColor: "#FFDD1F",
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "#3484F2",
    textAlign: "center"
  }
})