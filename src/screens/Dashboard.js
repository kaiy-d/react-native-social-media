import React, { useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import SettingsButton from '../components/SettingsButton'
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar'
import Settings from './SettingsScreen.js'

import { storage, store } from "../../App.js";

export default function Dashboard(props) {
  const navigation = useNavigation();
  const user = props.route.params.user || ""
  const name = user.name.split(" ")[0] || ""
  const [about, setAbout] = useState('');
  const [interests, setInterests] = useState('');
  const [image, setImage] = useState('');
  const pic = image || user.picture.data.url 

  var docRef = store.collection('users').doc(props.route.params.user.id)

  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log(doc.data())
      setInterests(doc.data().interests);
      setAbout(doc.data().about);
      setImage(doc.data().image)
    }
  });

  function settings () {
    navigation.navigate('Settings')
  } 

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'blue',
      width: '40%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7em',
      borderRadius: '2em',
    },
    name: {
      paddingTop: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    image: {
      width: 100,
      height: 100,
      marginTop: 80,
      borderRadius: 50,
    },
    nav: {
      paddingTop: 40,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    details: {
      paddingTop: '1em',
    }
  });

  return (
    <Background>
    <Navbar />
      <View style={styles.container}>
        <Image source={{uri: pic}} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <SettingsButton nav={settings}/>
        <View style={styles.details}>
          <Text>{about}</Text>
          <Text>Interests: {interests}</Text>
        </View>
      </View>
    </Background>
  )
}
