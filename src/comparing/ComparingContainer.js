import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const ComparingContainer = () => {
  return (
    <View style={styles.container} >
      <Text>Comparing Container</Text>
    </View>
  )
}

export default ComparingContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
