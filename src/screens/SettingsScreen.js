import React, {useEffect, useRef, useState, setState,} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Image, TextInput, Text, View } from 'react-native';
import Navbar from '../components/Navbar'
import * as FB from './facebook.js'

import firebase from 'firebase';
import { storage, store } from "../../App.js";

export default function SettingsScreen(props) {

  const [image, setImage] = useState(null);
  const [imageurl, setImageURL] = useState(null);
  const [about, setAbout] = useState('');
  const [interests, setInterests] = useState('');
  const navigation = useNavigation();

  function logout(){
    props.route.params.logout()
  }

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var filename = "images/" + "IMG" + Math.round(Math.random()*100)

    var refs = storage.ref().child(filename);
    refs.put(blob);

    storage.ref(filename).getDownloadURL()
      .then((url) => {
        console.log("link", url)
        setImageURL(url);
    })
  }

  let openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    setImage(pickerResult.uri);

    if (!pickerResult.cancelled) {
      uploadImage(pickerResult.uri)
    }
  }

  function save(){
    console.log(about, interests)
    var user = props.route.params.user.id
    store.collection('users').doc(user).update({
      about: about,
      interests: interests,
      image: imageurl
    })
    navigation.navigate("Profile")
  }

  function initValues() {
    var docRef = store.collection('users').doc(props.route.params.user.id)

    docRef.get().then((doc) => {
      if (doc.exists) {
        setInterests(doc.data().interests);
        setAbout(doc.data().about);
      }
    });
  }


  useEffect(() => {
    initValues()
  },[])

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: 70,
      height: '100%',
    },
    textInput: {
      width: '30%',
    },
    buttons: {
      color: 'black',
    }
  });

  return (
    <Background>
      <View style={styles.container}>
        <Navbar />
        <BackButton goBack={navigation.goBack} />
        <Button
          mode="outlined"
          onPress={openImagePicker}>Upload Image</Button>

          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <TextInput
          multiline
          numberOfLines={3}
          placeholder="About Me"
          placeholderTextColor="#666666"
          value={about}
          onChangeText={setAbout}
          style={[styles.textInput, {height: 90}]}
        />
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Interests"
          placeholderTextColor="#666666"
          value={interests}
          onChangeText={setInterests}
          style={[styles.textInput, {height: 90}]}
        />

        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Location"
          placeholderTextColor="#666666"
          value={interests}
          onChangeText={setInterests}
          style={[styles.textInput, {height: 90}]}
        />

        <Button
          mode="outlined"
          style={styles.buttons}
          onPress={save}>Save</Button>

        <Button
          mode="outlined"
          style={styles.buttons}
          onPress={logout}>Logout</Button>

      </View>
    </Background>
  )
}
