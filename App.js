import React, {useState, createContext, useEffect} from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer, createSwitchNavigator, createAppContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { theme } from './src/core/theme'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/storage';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  SwipeScreen,
  ChatScreen,
  SettingsScreen,
} from './src/screens'

// const usersCollection = firestore().collection('Users');

const AuthContext = createContext(null)

function AuthNavigator() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  function loginfb(a){ 
    setUser(a) 
    console.log(a)
  }

  function login(a){
    setUser(a)
    console.log("login email", a)
  }

  function logout(){
    setUser("null")
  }

  function isUser(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("IS USER")
        return true
      } else {
        console.log("IS NOT USER")
        return false
      }
    });
  }

  return isUser() ? (
    <MyTabs user={user} logout={logout} />
  ) : (
    <MyStack login={login} loginfb={loginfb} />
  )
}

    // <AuthContext.Provider value={user}>

const AuthStack = createStackNavigator();

function MyStack(props) {

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{
        headerMode: 'none'
        }}>
        <AuthStack.Screen name="StartScreen" component={StartScreen} options={{ title: 'Blurb App' }} initialParams={{loginfb: props.loginfb}} />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen}  initialParams={{login: props.login}}/>
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} initialParams={{login: props.login}} />
        <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const AppStack = createBottomTabNavigator();

function MyTabs(props) {

  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="SwipeScreen"
        barStyle={{ backgroundColor: 'white' }}
      >
        <AppStack.Screen
          name="SwipeScreen"
          component={SwipeScreen}
          initialParams={{user: props.user}}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <AppStack.Screen
          name="Chat"
          component={ChatScreen}
          initialParams={{user: props.user}}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chat" color={color} size={26} />
            ),
          }}
        />
        <AppStack.Screen
          name="Profile"
          component={Dashboard}
          initialParams={{user: props.user}}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            ),
          }}
        />
        <AppStack.Screen
          name="Settings"
          component={SettingsScreen}
          initialParams={{user: props.user, logout: props.logout}}
          options={{
            tabBarButton: () => null,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

var firebaseConfig = {
  apiKey: "AIzaSyDLeiyd8iai6akLcumpP5-A1yxs7t5wflk",
  authDomain: "socially-b729a.firebaseapp.com",
  databaseURL: "https://socially-b729a-default-rtdb.firebaseio.com",
  projectId: "socially-b729a",
  storageBucket: "socially-b729a.appspot.com",
  messagingSenderId: "804187430311",
  appId: "1:804187430311:web:6dad7a05a011fb3a032a82",
  measurementId: "G-P1NKXT7943"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
const store = firebase.firestore();
const authenticate = firebase.auth();

export  {
   storage, store, authenticate, AuthNavigator as default
 }