import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TINNDÅRP</Text>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3484F2",
    justifyContent: "center"
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFDD1F",
    backgroundColor: "#3484F2" 
  }
})

