import {useState, useEffect} from 'react'

export  function MainScreen = ()=>{
// https://countriesnow.space/api/v0.1/countries/flag/images 
const [flags, setFlags] = useState([]);

useEffecrt(() =>{
    api.get(' https://countriesnow.space/api/v0.1/countries/flag/images ')
    .then((responde) =>{
        setFlags(responde.data);

    })
    .catch((error)=>{
        console.error("Error", error);

    })

},[]);
return();
}
export default MainScreen

//Toda la lógica y el estado del juego (países, país actual, puntaje, jugadores, timer, pistas)
//  debe vivir en un GameContext creado con createContext + useContext, expuesto mediante un GameProvider que envuelve la app.