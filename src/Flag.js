
import {useContext } from 'react';
import UserContext from './UserContext';
     //const UserContext = React.createContext();
     import {  Text, View , Image, ImageBackground} from 'react-native';
     import { SvgUri } from 'react-native-svg';

     export default function Flag(){
         const datos = useContext(UserContext);
     //RECIBE los puntajes
     if (!datos.FlagRandom?.flag) {
  return <Text>Cargando bandera...</Text>;
}
     return(
       
       <View>

        <Image
  source={{ uri: datos.FlagRandom.flag }}
  style={{ width: 200, height: 120 }}
  resizeMode="contain"
/>

         </View>

         
     
     )
     }