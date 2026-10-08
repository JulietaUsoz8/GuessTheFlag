import { use } from 'react';
import {useForm} from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

export default function JugadorLog(setEnviado){
const{control, handleSubmit, formState:{errors}, } = useForm();


return(
    <View>
     <Image
            source={{ uri: datos.FlagRandom.image }}
     />
    <Controller
    control ={control}
    name = "nombre"
    rules={{
        required:'Obligatorio',
        minLength:{value: 3, message: 'ingrese un valido'}
    }}
    render ={({field, fieldState}) =>(
      <Text>  error={fieldState.error?.message}</Text>
        
    )}

    />


      

    <Pressable onPress={setEnviado(true)} >
        <Text >
            Enviar
        </Text>
    </Pressable>


</View>

);
}