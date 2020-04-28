import React from 'react'
import { View, Image } from 'react-native'
import splashImage from '../../assets/splash.png'

export default SplashScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: "#3484F2"}}> 
      <Image
        style={{flex: 1, resizeMode: 'contain', width: undefined, height: undefined}}
        source={splashImage}
      />
    </View>
  )
}
