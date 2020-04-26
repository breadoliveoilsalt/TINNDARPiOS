import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { openURL } from '../api/linkingWrapper'
import ActionButton from '../components/ActionButton'

const ItemDisplay = ({item}) => {

  const openLink = (url) => {
    openURL(url)
  }

  return (
    <View style={styles.container} >

      <Text 
        adjustsFontSizeToFit
        numberOfLines={1}
        style={{...styles.text, fontWeight: "bold", fontSize: 30}}
      >
        {item.name}
      </Text>

      <Text 
        style={{...styles.text, paddingLeft: "3%", paddingRight: "3%"}} 
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {item.description}
      </Text>

      <Text style={styles.text}>${item.price}</Text>

      <ActionButton buttonText="Click for More Info" action={() => openLink(item.moreInfoURL)} />

      <Image 
        style={styles.image}
        source={{uri: item.imageURL}}
      />

      <View style={styles.divider} />

    </View>
  )
}

export default ItemDisplay

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3484F2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFDD1F",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    height: 200,
    width: 200,
    marginTop: "5%"
  },
  divider: {
    borderColor: "lightgrey",
    borderWidth: 2,
    width: "80%",
    margin: 20
  }
})