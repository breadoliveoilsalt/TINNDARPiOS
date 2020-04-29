import React, { Component }from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import UserHome from './UserHome'
import BrowsingContainer from '../browsing/BrowsingContainer'
import ComparingContainer from '../comparing/ComparingContainer'

export default class LoggedInView extends Component {

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
              if (route.name === "Home") {
                return <MaterialCommunityIcons name={"home-account"} size={33} color={color} />
              } else if (route.name == "Browse") {
                return <MaterialIcons name={"compare-arrows"} size={33} color={color} />
              } else if (route.name === "Compare") {
                return <MaterialCommunityIcons name={"playlist-check"} size={33} color={color} />
              }
            }
          })}
          tabBarOptions={{
              activeTintColor: "black",
              inactiveTintColor: "#3484F2",
              style: {
                height: 80,
                backgroundColor: "lightgrey",
                paddingTop: 15,
                paddingBottom: 15
              }
          }}
        >

          <Tab.Screen name="Home" >
            {props => 
              <UserHome 
                {...props} 
                signOutOfApp={this.props.signOutOfApp}
                userEmail={this.props.userEmail}
              />
            }
          </Tab.Screen>

          <Tab.Screen name={"Browse"} >
            {props => 
              <BrowsingContainer 
                {...props} 
                token={this.props.token}
              />
            }
          </Tab.Screen>

          <Tab.Screen name={"Compare"} >
            {props => 
              <ComparingContainer 
                {...props} 
                token={this.props.token}
              />
            }
          </Tab.Screen>

        </Tab.Navigator>

      </NavigationContainer>
    )
  }
}
