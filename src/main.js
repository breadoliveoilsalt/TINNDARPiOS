import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { StyleSheet, Text, View } from 'react-native'

export default function TINNDARP(props) {
  const store = configureStore()

  const items = props.items.map(itemData => {
    return (<Text key={itemData.id}> {JSON.stringify(itemData)}</Text>)
  })

  return (
    <Provider store={store} >
      <View style={styles.container}>
        <Text testID="text">Item Data:</Text>
        {items}
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: "5%",
    marginLeft: "5%",
    flex: 1,
    backgroundColor: '#fff',
  },
})
