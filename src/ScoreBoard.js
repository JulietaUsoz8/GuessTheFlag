const UserContext = React.createContext();
function ScoreBoard(){
    const datos = useContext(UserContext);
//RECIBE los puntajes
return(
    <View>
            <Text>{datos.segundosLeft}</Text>


    </View>

)
}