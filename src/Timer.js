const UserContext = React.createContext();
import {  Text, View } from 'react-native';

function Timer(){
    const datos = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
            <Text>{datos.segundosLeft}</Text>


    </View>

)
}