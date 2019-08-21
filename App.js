import React, { Component } from 'react'
// import {View, Text} from 'react-native'
import {Icon} from 'native-base'
import {Provider} from 'react-redux'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'

import EmployeeScreen from './src/app/EmployeeScreen'
import AddEmployeeScreen from './src/app/AddEmployeeScreen'
import DetailEmployeeScreen from './src/app/DetailEmployeeScreen'

import ProfileScreen from './src/app/ProfileScreen'


import STORE from './src/store/reducers/index'

const EmployeeStack = createStackNavigator(
  {
    ListEmployee: EmployeeScreen,
    AddEmployee: AddEmployeeScreen,
    DetailEmployee: DetailEmployeeScreen
  },
  {
    headerMode: 'none'
  }
)

const MainTab = createBottomTabNavigator(
  {
    Employee: {
      screen: EmployeeStack,
      navigationOptions: {
        tabBarIcon: <Icon name='filing'/>
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: <Icon name='contact'/>
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: 'grey'
    }
  }
)

const RootStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Main: MainTab
  },
  {
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(RootStack)

class App extends Component {
  render (){
    return (
      <Provider store={STORE}>
        <AppContainer/>
      </Provider>
    )
  }
}


export default App

















// import React, { Component } from 'react';
// import {
//   View, 
//   Text,
//   TouchableOpacity,
//   TouchableNativeFeedback,
//   StyleSheet
// } from 'react-native';


// class App extends Component {
//   render () {
//     return (
      
        
//         <View style={styles.container}>
//         {/* <Text>App Screen</Text> */}
//         <TouchableNativeFeedback>
//           {/* <View style={{width: 150, heigth: 100, backgroundColor: 'red'}}> */}
//           {/* NATIVE FEEDBACK */}
//           <View style={styles.button}>
//             <Text style={styles.text}>A</Text>
//           </View>
//         </TouchableNativeFeedback>

//         <TouchableOpacity>
//         {/* <View style={{width: 150, heigth: 100, backgroundColor: 'blue'}}> */}
//         {/* TOUCHABLE OPACITY */}
//         <View style={styles.button}>
//             <Text style={styles.text}>B</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity>
//         {/* <View style={{width: 150, heigth: 100, backgroundColor: 'blue'}}> */}
//         {/* TOUCHABLE OPACITY */}
//         <View style={styles.button}>
//           <Text style={styles.text}>C</Text>
//         </View>
//         </TouchableOpacity>
//         </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     // Untuk menetukan arah susunan component (default: column)
//     flexDirection: 'row',
//     // flexDirection: 'column',
//     // alignItems: 'center',
//     alignItems: 'flex-start',
//     // justifyContent: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: 'grey',
//     flex: 1
//   },
//   button: {
//     // marginHorizontal: 5,
//     // marginVertical: 5,
//     marginTop: 50,
//     width: 100,
//     height: 50, // HARUS height
//     backgroundColor: 'powderblue'
//   },
//   text: {margin: 2, color: 'white', textAlign: 'center'}
// })

// export default App