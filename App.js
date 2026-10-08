import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScoreBoard from './src/ScoreBoard'
import LeaderBoard from './src/LeaderBoard'
import GameProvider from './src/GameProvider'
import Timer from './src/Timer'
import GuessForm from './src/GuessForm'
import JugadorLog from './src/JugadorLog'




export default function App() {
  //createContext + useContext, expuesto mediante un GameProvider 
  
  //CAPITALES
  const [capitales, setCapitales] = useState([]);
  useEffect(() =>{
    
      api.get('  https://countriesnow.space/api/v0.1/countries/capital')
      .then((responde) =>{
          setFlags(responde.data);
  
      })
      .catch((error)=>{
          console.error("Error", error);
  
      })
  
  },[]);
    const [capitales4, setCapitales4] = useState([]);
  useEffect(() =>{
const indiceInicial = Math.floor(Math.random(3) * capitales.length);
const OpcionV =   capitales.find((capital) => capital.id === FlagRandom.id)

return setCapitales4[indiceInicial, OpcionV];
  },[]);
  
  //API
      const [enviado, setEnviado] = useState(false);

  const [flags, setFlags] = useState([]);
  useEffect(() =>{
    
      api.get(' https://countriesnow.space/api/v0.1/countries/flag/images ')
      .then((responde) =>{
          setFlags(responde.data);
  
      })
      .catch((error)=>{
          console.error("Error", error);
  
      })
  
  },[]);
//BANDERA RANDOM
  const [FlagRandom, setFlagRandom] = useState([] );
  useEffect(()=> {
    const indiceInicial = Math.floor(Math.random() * flags.length);
    return setFlagRandom[indiceInicial];
  });

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

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(15);
  };

//JUGADOR(usar localstorage)
  const [jugador, setJugador] = useState("");

//REVELA UNA LETRA
  const [LetraRandom, setLetraRandom] = useState();

const useEffect = ()=>{
    const letra = Math.floor(Math.random() * FlagRandom.name.lenght);
    return LetraRandom[letra];
}
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
const NextCountry =()=>{
resetTimer();
setFlagRandom([]);
}
//GUARDADO DE DATOS
/*const guardarDatosJugador = async () => {
  try {
    await AsyncStorage.setItem(jugador, puntos);
  } catch (error) {
    console.error('Error al guardar', error);
  }
};*/
const guardarUsuario =()=>{
  localStorage.setItem("jugador", JSON.stringify(jugador, puntos));
}
const guardado = localStorage.getItem("jugador");


  return (
    <View style={styles.container}>
      {!enviado?(<JugadorLog setEnviado={setEnviado}/>):(
 <UserContext.Provider  value={[FlagRandom,puntos,secondsLeft, guardado,guess(),NextCountry(),Adivinar()]} >  
<GameProvider/>
<Flag />
<GuessForm /> 
<ScoreBoard /> 
<Timer />
<Leaderboard /> 
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
