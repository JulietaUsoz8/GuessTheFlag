import {useContext } from 'react';

//const UserContext = React.createContext();
import {  Text, View } from 'react-native';
import UserContext from './UserContext';
export default function Timer(){
    const datos = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
            <Text>{datos.segundosLeft}</Text>


    </View>

)
}