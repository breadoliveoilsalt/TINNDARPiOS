import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
// import { Linking } from 'expo'
// import { LinkingWrapper } from '../api/linkingWrapper'
import { openURL } from '../api/linkingWrapper'
import { getItemsToBrowse } from '../api/apiRequests'
import { getToken } from '../userAccount/tokenActions'
import SwipeableImage from './SwipeableImage'
import ActionButton from '../components/ActionButton'

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

  openLink(url) {
    // return LinkingWrapper.openURL(url)
    openURL(url)
  }

  render() {
    //$$getItemsToBrowse only requires {token: token} as params

    if (!this.state.itemsToBrowse) {
      return (
        <View style={styles.container} >
          <ActivityIndicator size="large" color="#FFDD1F" />
        </View>
      )
    }

    const currentItem = this.state.itemsToBrowse[0]

    return (
      <View style={{...styles.container, ...this.state.backgroundColor}} >
        <Text style={{...styles.text, fontWeight: "bold", fontSize: 40}}>{currentItem.name}</Text>
        <Text style={styles.text}>{currentItem.description}</Text>
        <Text style={styles.text}>${currentItem.price}</Text>
        <ActionButton buttonText="Click for More Info" action={() => this.openLink(currentItem.moreInfoURL)} />
        <SwipeableImage 
          style={styles.image}
          source={this.state.itemsToBrowse[0].imageURL}
          // fix the actions below
          rightSwipeAction={() => this.setState({backgroundColor: { backgroundColor: "yellow" }})}
          leftSwipeAction={() => this.setState({backgroundColor: { backgroundColor: "blue" }})}
        />
      </View>
    )
  }
}

export default BrowsingContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3484F2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFDD1F",
    fontSize: 25,
    textAlign: "center",
    margin: "1%"
  },
  image: {
    height: 250,
    width: 250,
    marginTop: "10%",
  }
})
