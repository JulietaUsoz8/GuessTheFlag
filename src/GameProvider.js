import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScoreBoard from './ScoreBoard'
import LeaderBoard from './LeaderBoard'
import Timer from './Timer'
import GuessForm from './GuessForm'
import JugadorLog from './JugadorLog'
import PistaNombre from './PistaNombre'
import Flag from './Flag'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import { createContext } from 'react';


import UserContext from './UserContext';
import { ImageBackground } from 'react-native-web';
export default function GameProvider() {
  //createContext + useContext, expuesto mediante un GameProvider 
  const [modoJuego, setModoJuego] = useState('banderas');
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
    /*let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
// Limpia el intervalo cuando el componente se desmonte o cambie el estado
    return () => clearInterval(interval);*/
      if (!isRunning || secondsLeft <= 0) return;

  const intervalo = setInterval(() => {
    setSecondsLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(intervalo);
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
  const [letrasReveladas, setLetrasReveladas] = useState([]);
 /* useEffect(() => {
  if (!FlagRandom?.name) return;

  const intervalo = setInterval(() => {
    generarPista();
  }, 3000);

  return () => clearInterval(intervalo);
}, [FlagRandom, letrasReveladas]);*/
const generarPista = () => {
  if (!FlagRandom?.name) return;

  const nombre = FlagRandom.name;
  const disponibles = [];

  for (let i = 0; i < nombre.length; i++) {
    if (
      nombre[i] !== " " &&
      !letrasReveladas.includes(i)
    ) {
      disponibles.push(i);
    }
  }

  if (disponibles.length === 0) return;

  const indice = disponibles[
    Math.floor(Math.random() * disponibles.length)
  ];

  setLetrasReveladas((prev) => [...prev, indice]);
};
//GUESS
const guess = (FlagGuessed) => {
if(FlagGuessed.toLowerCase() == FlagRandom.name.toLowerCase()){
  setPuntos(puntos+10);
if(secondsLeft > 0){
  setPuntos(puntos+secondsLeft);
}
NextCountry();
}
else{
    setPuntos(puntos-1);
    NextCountry();
}
};
//RESET SCORE
const Limpiar =() =>{
  setEnviado(false);
  setPuntos(0);
};
//NEXT COUNTRY
const NextCountry = () => {
  setIsRunning(false);
  setSecondsLeft(15);
  setFlagRandom(null);
  setCapitales4([]);
setLetrasReveladas([]);
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
  const datosGuardados = await AsyncStorage.getItem('jugadores');
  const jugadores = datosGuardados ? JSON.parse(datosGuardados) : [];

  jugadores.push({ jugador, puntos });

  await AsyncStorage.setItem('jugadores', JSON.stringify(jugadores));
};
const guardado = AsyncStorage.getItem("jugador");


return (
  <View style={styles.container}>
    {!enviado ? (
      <JugadorLog
        setModoJuego={setModoJuego}
        setEnviado={setEnviado}
        setJugador={setJugador}
      />
    ) : (
      <UserContext.Provider value={{
        FlagRandom,
        puntos,
        secondsLeft,
        capitales4,
        capitales,
        modoJuego,
        LetraRandom,
        jugador,
        guess,
        letrasReveladas,
        NextCountry,
        Limpiar,
        generarPista,
        toggleTimer,
        guardarDatosJugador
      }}>
        <Timer />

        {modoJuego === 'banderas' ? (
          <>
            <ImageBackground
              source={require('../assets/FlagBook.png')}
              style={styles.fondoBandera}
              imageStyle={styles.imagenFondo}
              resizeMode="stretch"
            >
              <Flag />
            </ImageBackground>
            <PistaNombre />
            <GuessForm />
          </>
        ) : (
          <CapitalForm />
        )}

        <ScoreBoard />
        <LeaderBoard />
      </UserContext.Provider>
    )}
  </View>
);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a3431',
    alignItems: 'center',
    justifyContent: 'center',
     contenedorBandera: {
    alignItems: 'center',
    alignSelf: 'center',
  },

  fondoBandera: {
    width: 250,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagenFondo: {
    resizeMode: 'stretch',
  },
  },})