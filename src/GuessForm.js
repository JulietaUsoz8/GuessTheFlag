import { useContext } from 'react';
import UserContext from './UserContext';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, Pressable } from 'react-native';

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
            <TextInput
              placeholder="Escribí tu respuesta"
              value={field.value ?? ''}
              onChangeText={field.onChange}
            />
            {fieldState.error && (
              <Text>{fieldState.error.message}</Text>
            )}
          </>
        )}
      />

      <Pressable onPress={datos.generarPista}>
        <Text>Revelar letra</Text>
      </Pressable>

      <Text>{datos.LetraRandom}</Text>

      <Pressable onPress={handleSubmit(enviarRespuesta)}>
        <Text>Enviar</Text>
      </Pressable>

      <Pressable onPress={datos.NextCountry}>
        <Text>Pasar</Text>
      </Pressable>
    </View>
  );
}