const UserContext = React.createContext();
import { use } from 'react';
import {useForm} from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

export default function GuessForm(){
    const datos = useContext(UserContext);
const{control, handleSubmit, formState:{errors}, } = useForm();


return(
    <View>
     <Image
            source={{ uri: datos.FlagRandom.image }}
     />
    <Controller
    control ={control}
    name = "Flag"
    rules={{
        required:'Obligatorio',
        minLength:{value: 1, message: 'ingrese un nombre'}
    }}
    render ={({field, fieldState}) =>(
      <Text>  error={fieldState.error?.message}</Text>
        
    )}

    />
   <Pressable onPress={datos.Adivinar()} >
        <Text >
            Revelar letra
        </Text>
    </Pressable>
    <Pressable onPress={datos.guess(name)} >
        <Text >
            Enviar
        </Text>
    </Pressable>
     <Pressable onPress={datos.NextCountry()} >
        <Text >
            Pasar
        </Text>
    </Pressable>
</View>

);
}