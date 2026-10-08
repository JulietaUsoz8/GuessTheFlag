const UserContext = React.createContext();
import { StyleSheet, Text, View } from 'react-native';

export default function ScoreBoard(){
    const datos = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
            <Text>{datos.guardado}</Text>


    </View>

)
}