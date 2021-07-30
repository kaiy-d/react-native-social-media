import React, {useState, useRef, setState} from 'react'
import Background from '../components/Background'
import {StyleSheet, Image, TextInput, Text, View, Dimensions, PanResponder, Animated } from 'react-native';
import Navbar from '../components/Navbar';
import Swing from 'react-swing';
import './swipe.css';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

  const People = [
    { id: "1", uri: require('../assets/Swipe/1.jpeg') },
    { id: "2", uri: require('../assets/Swipe/2.jpeg') },
    { id: "3", uri: require('../assets/Swipe/3.jpeg') },
    { id: "4", uri: require('../assets/Swipe/4.jpeg') },
    { id: "5", uri: require('../assets/Swipe/5.jpeg') },
  ]

export default function SwipeScreen({ route, navigation }) {

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  const stack = useRef()
  const card1 = useRef()
  const card2 = useRef()
  const card3 = useRef()
  const card4 = useRef()

  const showPics = () => {
    People.forEach(function(a){
      console.log('showing pics', a)
      return(
        <div className="card clubs" ref={card1} throwout={(e) => console.log('card throwout', e)}>
          <Image source={a.uri} /> 
        </div>
        )
    })
  }

  const styles = StyleSheet.create({
    image: {
      opacity: 1,
      height: 420,
    },
    info: {
      padding: 2,
    },
    heading: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    description: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  })

  return (
    <Background>
     <Navbar />
     <div className="viewport">
      {/*
        ReactSwing Element
      */}
       <Swing
        className="stack"
        ref={stack}
        throwout={(e) => console.log('throwout', e)}
        >
          <div ref={card1} style={{boxShadow: '0 0 2px rgb(0 0 0 / 20%), 1px 1px 1px rgb(0 0 0 / 20%)'}}>
             <Image source={require('../assets/Swipe/3.jpeg')} style={styles.image}/>
             <View style={styles.info}> 
               <Text style={styles.heading}>Sally{"\n"} </Text>
               <Text style={styles.description}>21, Bronx, NY</Text>
            </View>
          </div>
        </Swing>
      </div>
    </Background>
  )
}

