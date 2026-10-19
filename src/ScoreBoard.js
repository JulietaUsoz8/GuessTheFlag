import {useContext } from 'react';

//const UserContext = React.createContext();
import { StyleSheet, Text, View } from 'react-native';
import UserContext from './UserContext';
export default function ScoreBoard(){
    const datos = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
            <Text>{datos.puntos}</Text>


    </View>

)
}