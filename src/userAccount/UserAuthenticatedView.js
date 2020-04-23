import React, { Component }from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons'
import UserHome from './UserHome'
import BrowsingContainer from '../browsing/BrowsingContainer'
import ComparingContainer from '../comparing/ComparingContainer'

class UserAuthenticatedView extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const Tab = createBottomTabNavigator()

    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={"Home"}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              if (route.name === 'Home') {
                return <MaterialCommunityIcons name={"home-account"} size={33} color={color} />;
              } else if (route.name == "Browse") {
                return <MaterialCommunityIcons name={"thumbs-up-down"} size={25} color={color} />;
              } else if (route.name === 'Compare') {
                return <MaterialIcons name={"compare-arrows"} size={40} color={color} />;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
              activeTintColor: "black",
              inactiveTintColor: "#3484F2",
              style: {
                height: 60,
                backgroundColor: "lightgrey",
                paddingTop: 5,
                paddingBottom: 5
              }
          }}
          >
          <Tab.Screen name="Home">
            {props => <UserHome {...props} signOutOfApp={this.props.signOutOfApp} />}
          </Tab.Screen>
          <Tab.Screen name={"Browse"} component={BrowsingContainer} />
          <Tab.Screen name={"Compare"} component={ComparingContainer} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

export default UserAuthenticatedView

