import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Logo from '../components/Logo'
import UserAccountButton from './UserAccountButton'

const UserHome = (props) => {
  return (
    <View style={styles.container} >
      <Logo/>
      <Text style={styles.text} >Nice to see you!</Text>
      <Text style={styles.text} >Please click Browse to rate items.</Text>
      <Text style={styles.text} >Then click Compare to see what items you and another user have both liked!</Text>
      <Text style={styles.text} >If you ever want to sign out, click below.</Text>
      <UserAccountButton action={props.renderSignedOutView} buttonText={"Sign Out"} />
    </View>
  )
}

export default UserHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3484F2"
  },
  text: {
    color: "#FFDD1F",
    fontSize: 25,
    textAlign: "center", 
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%"
  }
})