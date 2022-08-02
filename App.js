import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'


// Import Screen
import OnBoarding from './screens/Onboarding';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AddTodo from './screens/AddTodos';
import EditTodo from './screens/EditTodos';
import Logout from './components/Logout';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
export const AppContext = React.createContext(null)

const MyTab = () => {
  return(
    <Tab.Navigator
            initialRouteName='Todo'
            screenOptions={({ route }) => ({
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#5c5c5c'},
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Todo'){
                        iconName = focused ? 'ios-home' : 'ios-home-outline'
                    } else if (route.name === 'Profile'){
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color}/>
                    )
                },
                tabBarActiceTintColor: '#3c3c3c',
                tabBarInactiveTintColor: 'gray'
            })}
        >
            <Tab.Screen name='Todo' component={Home} options={{headerShown: false}}/>
            {/* <Tab.Screen name='Profile' component={Profile} /> */}
    </Tab.Navigator>
  )
}

export default function App() {
  const [token, setToken] = React.useState(null)
  const [idUser, setIdUser] = React.useState(null)

  React.useEffect(() => {
    getToken()
  }, [])

  React.useEffect(() => {
    if(token){
      updateToken()
    }
  }, [token])

  const getToken = async() => {
    try {
      const asyncToken = await AsyncStorage.getItem('token')
      if(!asyncToken){
        return;
      } else {
        setToken(asyncToken)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateToken = async() => {
    try {
      const asyncToken = await AsyncStorage.getItem('token')
      if (asyncToken === token) {
        return;
      } else {
        await AsyncStorage.setItem("token", token)
        getToken()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AppContext.Provider value={{token, setToken, idUser, setIdUser}}>
    
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Onboarding"}
        screenOptions={{headerStyle: {backgroundColor: "#354259"}, headerTintColor: "#ffffff", headerRight: () => { return <Logout />}}}
      >
        <Stack.Screen name="Onboarding" component={OnBoarding} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: true}}/>
        <Stack.Screen name="Home" component={MyTab} />
        <Stack.Screen name="Add" component={AddTodo} />
        <Stack.Screen name="Edit" component={EditTodo} />
      </Stack.Navigator>
    </NavigationContainer>

    </AppContext.Provider>
  );
}