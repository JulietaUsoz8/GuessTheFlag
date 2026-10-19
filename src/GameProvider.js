import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScoreBoard from './ScoreBoard'
import LeaderBoard from './LeaderBoard'
import Timer from './Timer'
import GuessForm from './GuessForm'
import JugadorLog from './JugadorLog'
import Flag from './Flag'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import { createContext } from 'react';


import UserContext from './UserContext';
export default function GameProvider() {
  //createContext + useContext, expuesto mediante un GameProvider 
  
  //CAPITALES
  const [capitales, setCapitales] = useState([]);
  useEffect(() =>{
    fetch('https://countriesnow.space/api/v0.1/countries/capital')
     .then((response) => response.json())  
    .then((json) =>{
          setCapitales(json.data);
  
      })
      .catch((error)=>{
          console.error("Error", error);
  
      })
  
  },[]);
    const [capitales4, setCapitales4] = useState([]);
const generarOpciones = () => {
  const correcta = capitales.find(
    (pais) => pais.name === FlagRandom.name
  );

  if (!correcta) return;

  const incorrectas = capitales
    .filter((pais) => pais.name !== correcta.name);

  // Elegir 3 incorrectas al azar
  const seleccionadas = [...incorrectas]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Agregar la correcta y mezclar
  const opciones = [...seleccionadas, correcta]
    .sort(() => Math.random() - 0.5);

  setCapitales4(opciones);
};
  
  //API
      const [enviado, setEnviado] = useState(false);

  const [flags, setFlags] = useState([]);
  useEffect(() =>{
    
      fetch(' https://countriesnow.space/api/v0.1/countries/flag/images ')
      .then((response) => response.json())
      .then((json) =>{
          setFlags(json.data);
  
      })
      .catch((error)=>{
          console.error("Error", error);
  
      })
  
  },[capitales]);
//BANDERA RANDOM
  const [FlagRandom, setFlagRandom] = useState([] );
const seleccionarBandera = () => {
  if (flags.length === 0) return;

  const indice = Math.floor(Math.random() * flags.length);
  setFlagRandom(flags[indice]);
};

//PUNTOS
  const [puntos, setPuntos] = useState(0);



//TIMER
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
// Limpia el intervalo cuando el componente se desmonte o cambie el estado
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

const toggleTimer = () => {
  if (secondsLeft > 0) {
    setIsRunning((prev) => !prev);
  }
};  
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(15);
  };

//JUGADOR(usar localstorage)
  const [jugador, setJugador] = useState("");

//REVELA UNA LETRA
  const [LetraRandom, setLetraRandom] = useState();
const generarPista = () => {
  if (!FlagRandom.name) return;

  const nombre = FlagRandom.name;
  const indice = Math.floor(Math.random() * nombre.length);

  setLetraRandom(nombre[indice]);
};
//GUESS
const guess = (FlagGuessed) => {
if(FlagGuessed == FlagRandom.name){
  setPuntos(puntos+10);
if(secondsLeft > 0){
  setPuntos(puntos+secondsLeft);
}
NextCountry();
}
else{
    setPuntos(puntos-1);
}
};
//RESET SCORE

//NEXT COUNTRY
const NextCountry = () => {
  setIsRunning(false);
  setSecondsLeft(15);
  setFlagRandom(null);
  setCapitales4([]);
  setLetraRandom(null);
  seleccionarBandera();
};
//GUARDADO DE DATOS
/*const guardarDatosJugador = async () => {
  try {
    await AsyncStorage.setItem(jugador, puntos);
  } catch (error) {
    console.error('Error al guardar', error);
  }
};*/
const guardarDatosJugador = async () => {
  try {
    const datos = {
      jugador: jugador,
      puntos: puntos
    };

    await AsyncStorage.setItem(
      "jugador",
      JSON.stringify(datos)
    );
  } catch (error) {
    console.error("Error al guardar", error);
  }
};
const guardado = AsyncStorage.getItem("jugador");


  return (
    <View style={styles.container}>
      {!enviado?(<JugadorLog   setEnviado={setEnviado}
  setJugador={setJugador}/>):(
 <UserContext.Provider  value={{
    FlagRandom,
    puntos,
    secondsLeft,
    capitales4,
    LetraRandom,
    jugador,
    guess,
    NextCountry,
    generarPista,
    toggleTimer,
    guardarDatosJugador
  }} >  
<Flag />
<GuessForm /> 
<ScoreBoard /> 
<Timer />
<LeaderBoard /> 
</UserContext.Provider> ) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
