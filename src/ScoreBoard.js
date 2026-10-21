import {useContext } from 'react';
import { ImageBackground } from 'react-native-web';

//const UserContext = React.createContext();
import { StyleSheet, Text, View } from 'react-native';
import UserContext from './UserContext';
export default function ScoreBoard(){
    const datos = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
        <ImageBackground source={require('../assets/PuntosImg.png')} style={styles.boton}>
            <Text style ={styles.textoBoton}>{datos.puntos}</Text>
        </ImageBackground>

    </View>

)
}
const styles = StyleSheet.create({
  boton: {
    width: 80,
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