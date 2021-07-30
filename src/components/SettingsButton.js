import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';

export default function SettingsButton({ nav }) {
  return (
    <TouchableOpacity onPress={nav} style={styles.container}>
      <FontAwesomeIcon icon={ faCog } size={ 30 } style={styles.cog} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    left: 130,
    top: -150,
  },
  cog: {
  	color: 'rgb(142, 142, 143)',
  }
})
