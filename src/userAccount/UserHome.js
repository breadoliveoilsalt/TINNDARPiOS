import React, { Component }from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const UserHome = (props) => {
  return (
    <View style={styles.container}>
      <Text>You signed in!</Text>
      <TouchableOpacity
        onPress={props.renderSignedOutView}
      >
        <Text >Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})