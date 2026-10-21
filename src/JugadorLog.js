
import { Text, View, Pressable, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function JugadorLog({ setEnviado, setJugador }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { nombre: '' }
  });

  const Entrada = (data) => {
    setJugador(data.nombre.trim());
    setEnviado(true);
  };

  return (
    <View style={styles.contenedor}>
      <ImageBackground
        source={require('../assets/LlenarB.png')}
        style={styles.boton}
        imageStyle={styles.imagenBoton}
        resizeMode="stretch"
      >
        <Controller
          control={control}
          name="nombre"
          rules={{
            required: 'Obligatorio',
            minLength: {
              value: 3,
              message: 'Ingresá al menos 3 caracteres'
            },
            validate: value =>
              value.trim().length >= 3 ||
              'Ingresá al menos 3 caracteres'
          }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View style={styles.entradaContenedor}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del jugador"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error && (
                <Text style={styles.error}>{error.message}</Text>
              )}
            </View>
          )}
        />
      </ImageBackground>
      <ImageBackground
        source={require('../assets/Opt2.png')}
        style={styles.botonEnviar}
        imageStyle={styles.imagenBoton}
        resizeMode="stretch"
      >
<Pressable onPress={() => setModoJuego('banderas')}>
  <Text  style={styles.textoBoton}>Adivinar banderas</Text>
</Pressable>
          </ImageBackground>
            <ImageBackground
        source={require('../assets/Opt1.png')}
        style={styles.botonEnviar}
        imageStyle={styles.imagenBoton}
        resizeMode="stretch"
      >
<Pressable onPress={() => setModoJuego('capitales')}>
  <Text  style={styles.textoBoton}>Adivinar capitales</Text>
</Pressable>
</ImageBackground>
      <ImageBackground
        source={require('../assets/EnviarB.png')}
        style={styles.botonEnviar}
        imageStyle={styles.imagenBoton}
        resizeMode="stretch"
      >
        <Pressable
          style={styles.pressable}
          onPress={handleSubmit(Entrada)}
        >
          <Text style={styles.textoBoton}>Enviar</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boton: {
    width: '90%',
    maxWidth: 400,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  botonEnviar: {
    width: '90%',
    maxWidth: 400,
    height: 90,
    alignSelf: 'center',
  },

  imagenBoton: {
    resizeMode: 'stretch',
  },

  entradaContenedor: {
    width: '90%',
    alignItems: 'center',
  },

  input: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },

  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBoton: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});
