import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ImageBackground } from 'react-native';
import ScoreBoard from './src/ScoreBoard'
import LeaderBoard from './src/LeaderBoard'
import GameProvider from './src/GameProvider'
import Timer from './src/Timer'
import GuessForm from './src/GuessForm'
import JugadorLog from './src/JugadorLog'

import {useState, useEffect} from 'react';



export default function App() {


  return (
    <View style={styles.container}>
    
<GameProvider/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a3431',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
