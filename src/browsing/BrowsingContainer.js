import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getItemsToBrowse } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'

class BrowsingContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      itemsToBrowse: null,
      messages: [],
      messagesModalVisible: false
    }
  }

  componentDidMount() {
    getToken()
      .then(token => this.setState({token: token}))
      .then(() => getItemsToBrowse({token: this.state.token}))
      .then(items => this.setState({itemsToBrowse: items}))
      .catch(() => console.log("There was a problem getting the items to browse"))
  }

  render() {
    //getItemsToBrowse only requires {token: token} as params
    return (
      <View style={styles.container} >
        <Text>Browsing Container</Text>
        {this.state.itemsToBrowse ? <Text>{JSON.stringify(this.state.itemsToBrowse)}</Text> : null}
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
