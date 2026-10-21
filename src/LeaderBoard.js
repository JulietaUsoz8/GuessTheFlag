
import { useState, useEffect, useContext } from 'react';
import { View, Text , StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './UserContext';
import { ImageBackground } from 'react-native-web';

export default function LeaderBoard() {
  const datos = useContext(UserContext);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const guardados = await AsyncStorage.getItem('jugadores');
        setJugadores(guardados ? JSON.parse(guardados) : []);
      } catch (error) {
        console.log('Error al cargar jugadores:', error);
      }
    };

    cargarJugadores();
  }, []);

  return (
    <View>
        <ImageBackground source={require('../assets/LeaderImg.png')} style={styles.boton}>
      <Text style={styles.textoBoton}>Leaderboard</Text>

      {jugadores
        .sort((a, b) => b.puntos - a.puntos)
        .map((item, index) => (
          <Text key={index}  style={styles.textoBoton}>
            {index + 1}. {item.jugador}: {item.puntos} puntos
          </Text>
        ))}
        </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  boton: {
    width: 400,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  imagenBoton: {
    resizeMode: 'stretch',
  },

  textoBoton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    fontSize: 22,
    fontWeight: 'bold',
  },
});