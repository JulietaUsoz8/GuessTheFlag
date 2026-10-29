import { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import UserContext from './UserContext';

export default function CapitalForm() {
  const {
    capitales,
    capitales4,
    guess,
    NextCountry
  } = useContext(UserContext);

  return (
    <View>
      <Text>¿Cuál es la capital de {capitales.name}?</Text>

      {capitales4.map((capital, index) => (
        <Pressable
          key={index}
          onPress={() => guess(capital)}
        >
          <Text>{capital}</Text>
        </Pressable>
        
      ))}
       <Pressable onPress={NextCountry}>
              <Text  >Pasar</Text>
            </Pressable>
    </View>
  );
}