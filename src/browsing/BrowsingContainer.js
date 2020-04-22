import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BrowsingContainer = () => {
  return (
    <View style={styles.container} >
      <Text>Browsing Container</Text>
    </View>
  )
}

export default BrowsingContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
