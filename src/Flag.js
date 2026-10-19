
import {useContext } from 'react';
import UserContext from './UserContext';
     //const UserContext = React.createContext();
     import {  Text, View , Image} from 'react-native';
     
     export default function Flag(){
         const datos = useContext(UserContext);
     //RECIBE los puntajes
     return(
         <View>
         <Image
            source={{ uri: datos.FlagRandom.image }}
            />     
     
         </View>
     
     )
     }