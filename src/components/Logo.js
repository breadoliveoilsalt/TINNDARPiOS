import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default Logo = () => {
  return (
    <Text style={styles.text}>TINNDÅRP</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFDD1F",
    backgroundColor: "#3484F2",
    paddingTop: "3%",
    paddingBottom: "3%"
  }
})

