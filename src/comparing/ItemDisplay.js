import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { openURL } from '../api/linkingWrapper'
import ActionButton from '../components/ActionButton'

export default ItemDisplay = (props) => {

  const item = props.item
  const customStyles = props.style ? props.style : {}
  const openLink = (url) => {
    openURL(url)
  }

  return (
    <View style={styles.container} >

      <Text 
        adjustsFontSizeToFit
        numberOfLines={1}
        style={{...styles.text, ...styles.textHeader, ...customStyles.text}}
      >
        {item.name}
      </Text>

      <Text 
        style={{...styles.text, ...styles.textItemDescription, ...customStyles.text}} 
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {item.description}
      </Text>

      <Text style={{...styles.text, ...customStyles.text}}>${item.price}</Text>

      <ActionButton 
        buttonText="Click for More Info" 
        action={() => openLink(item.moreInfoURL)} 
        style={{buttonText: styles.buttonText}}
      />

      <Image 
        style={{...styles.image, ...customStyles.image}}
        source={{uri: item.imageURL}}
      />

      <View style={{...styles.divider, ...customStyles.divider}} />

    </View>
  )
}

const defaultFontSize = 15
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3484F2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFDD1F",
    fontSize: defaultFontSize,
    textAlign: "center",
  },
  textHeader: {
    fontWeight: "bold", 
    fontSize: defaultFontSize * 1.5
  },
  textItemDescription: {
    paddingLeft: "3%", 
    paddingRight: "3%"
  },
  buttonText: {
    fontSize: defaultFontSize,
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