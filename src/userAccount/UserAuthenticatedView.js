import React from 'react'
// import { Provider } from 'react-redux'
// import configureStore from '../configureStore'
import { StyleSheet, Text, View } from 'react-native'

const UserAuthenticatedView = (props) => {
  return (
      <View style={styles.container}>
        <Text>You signed in!</Text>
      </View>
  )
}
// const UserAuthenticatedView = (props) => {
//   const store = configureStore()

//   const listItems = () => {
//     return props.items.map(itemData => {
//       return (<Text key={itemData.id}> {JSON.stringify(itemData)}</Text>)
//     })
//   }

//   return (
//     <Provider store={store} >
//       <View style={styles.container}>
//         <Text testID="text">Item Data:</Text>
//         {props.items ? listItems() : <Text> None </Text>}
//       </View>
//     </Provider>
//   )
// }

export default UserAuthenticatedView

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    marginRight: "5%",
    marginLeft: "5%",
    flex: 1,
    backgroundColor: '#fff',
  }
})