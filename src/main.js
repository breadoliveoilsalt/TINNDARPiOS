import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { StyleSheet, Text, View } from 'react-native'

export default function TINNDARP() {
  const store = configureStore()

  return (
    <Provider store={store} >
      <View style={styles.container}>
        <Text testID="text">Open up App.js to start working on your app!</Text>
        <Text>This confirms Travis only deploys when merged into master.</Text>
        <Text>Now there is redux installed.</Text>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})