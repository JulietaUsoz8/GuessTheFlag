import { useContext } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import UserContext from './UserContext';

export default function PistaNombre() {
  const datos = useContext(UserContext);
  const nombre = datos.FlagRandom?.name;

  if (!nombre) return null;

  let resultado = '';

  for (let i = 0; i < nombre.length; i++) {
    if (nombre[i] === ' ') {
      resultado += '  ';
    } else if (datos.letrasReveladas.includes(i)) {
      resultado += nombre[i] + ' ';
    } else {
      resultado += '_ ';
    }
  }

  return (
    <View>
      <Text style={styles.textoBoton}>{resultado}</Text>
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