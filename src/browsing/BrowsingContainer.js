import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class BrowsingContainer extends Component {

  render() {
    //getItemsToBrowse only requires {token: token} as params
    return (
      <View style={styles.container} >
        <Text>Browsing Container</Text>
      </View>
    )
  }
}

export default BrowsingContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
