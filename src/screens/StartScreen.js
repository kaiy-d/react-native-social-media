import React, {useEffect, useRef, setState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, Text, View } from "react-native";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Snap from './snap.js'
import FB from './facebook.js'

import firebase from 'firebase';

import { authenticate } from "../../App.js";

require('http');
WebBrowser.maybeCompleteAuthSession();

export default function StartScreen(props) {

  const [usersc, setUserSc] = React.useState(null);

  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);

  var provider = new firebase.auth.FacebookAuthProvider();
  console.log(provider)

  function facebookSignInPopup(provider) {
    authenticate
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }

  // const handlePressAsyncFB = async () => {
  //   const result = await promptAsync();
  //   props.route.params.loginfb(user)
  // };


  const styles = StyleSheet.create({
    white: {
      color: 'white',
    },
    black: {
      color: 'black',
    },
    login: {
      marginTop: 100,
      alignItems: 'center',
    },
    facebook: {
      backgroundColor: '#4267B2',
    },
    snapchat: {
      width: '100%',
      color: 'white',
    },
    def: {
      backgroundColor: 'black',
    }
  })

  return (
    <Background>
      <Navbar />
      <Logo />
      <div id="fb-root"></div>
      <View style={styles.login}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.def}
        >
          Login
        </Button>

        <div id="display_name"></div>
        <img id="bitmoji" />
        <div id="external_id"></div>
        <hr />
        <div id="my-login-button-target"></div>

        <Button
          mode="outlined"
          onPress={facebookSignInPopup}
          style={styles.facebook}
        >
          <Text style={styles.white}>Facebook Login</Text>
        </Button>

      </View>
      <Footer />
    </Background>
  )
}
