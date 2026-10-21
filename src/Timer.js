import {useContext } from 'react';

//const UserContext = React.createContext();
import {  StyleSheet, Text, View } from 'react-native';
import UserContext from './UserContext';
export default function Timer(){
const { secondsLeft } = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
            <Text style={styles.textoBoton}>Tiempo: {secondsLeft} segundos</Text>


    </View>

)
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