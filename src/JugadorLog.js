import { Text, View, Pressable, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function JugadorLog({ setEnviado, setJugador }) {
  const { control, handleSubmit } = useForm();

  const Entrada = (data) => {
    setJugador(data.nombre);
    setEnviado(true);
  };

  return (
    <View>
      <Controller
        control={control}
        name="nombre"
        rules={{
          required: 'Obligatorio',
          minLength: {
            value: 3,
            message: 'Ingresá al menos 3 caracteres'
          }
        }}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              placeholder="Nombre del jugador"
              value={field.value ?? ''}
              onChangeText={field.onChange}
            />
            {fieldState.error && (
              <Text>{fieldState.error.message}</Text>
            )}
          </>
        )}
      />

      <Pressable onPress={handleSubmit(Entrada)}>
        <Text>Enviar</Text>
      </Pressable>
    </View>
  );
}