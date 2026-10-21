import { useContext } from 'react';
import UserContext from './UserContext';
import { useForm, Controller } from 'react-hook-form';
import {StyleSheet, Text, View, TextInput, Pressable , ImageBackground} from 'react-native';

export default function GuessForm() {
  const datos = useContext(UserContext);
  const { control, handleSubmit } = useForm();

  const enviarRespuesta = (data) => {
    datos.guess(data.respuesta);
  };

  return (
    <View>
      <Controller
        control={control}
        name="respuesta"
        rules={{ required: 'Ingresá una respuesta' }}
        render={({ field, fieldState }) => (
          <>
          <ImageBackground   source={require('../assets/LlenarB.png')}
 style={styles.boton}
  imageStyle={styles.imagenBoton}
  resizeMode="stretch">
            <TextInput style={styles.textoBoton}
              placeholder="Escribí tu respuesta"
              value={field.value ?? ''}
              onChangeText={field.onChange}
            /></ImageBackground>
            {fieldState.error && (
                <ImageBackground   source={require('../assets/Error.png')}
   style={styles.boton}
  imageStyle={styles.imagenBoton}
  resizeMode="stretch">
              <Text>{fieldState.error.message}</Text></ImageBackground>
            )}
          </>
        )}
      />
<ImageBackground source={require('../assets/TXTholder2.png')}
   style={styles.boton}
  imageStyle={styles.imagenBoton}
  resizeMode="stretch">
      <Pressable onPress={datos.generarPista}>
        <Text  style={styles.textoBoton}>Revelar letra</Text>
      </Pressable>
</ImageBackground>
<ImageBackground source={require('../assets/TXTholder1.png')}
   style={styles.boton}
  imageStyle={styles.imagenBoton}
  resizeMode="stretch">
      <Pressable onPress={handleSubmit(enviarRespuesta)}>
        <Text  style={styles.textoBoton}>Enviar</Text>
      </Pressable>
</ImageBackground>
<ImageBackground source={require('../assets/TXTholder2.png')}
   style={styles.boton}
  imageStyle={styles.imagenBoton}
  resizeMode="stretch">
     <Pressable onPress={datos.NextCountry}>
        <Text  style={styles.textoBoton}>Pasar</Text>
      </Pressable>
       </ImageBackground>
       <ImageBackground source={require('../assets/EnviarB.png')}
   style={styles.boton}
  imageStyle={styles.imagenBoton}
  resizeMode="stretch">
          <Pressable  onPress={datos.Limpiar} >
         <Text  style={styles.textoBoton}> Regresar </Text> 
      </Pressable>
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