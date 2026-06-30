import{TouchableOpacity,StyleSheet}from"react-native";
import{MaterialIcons}from"@expo/vector-icons";
import colors from"../utils/colors";

export default function FloatingAssistant({navigation}){

return(

<TouchableOpacity
style={styles.button}
onPress={()=>navigation.navigate("Assistant")}
>

<MaterialIcons
name="smart-toy"
size={30}
color="white"
/>

</TouchableOpacity>

);

}

const styles=StyleSheet.create({

button:{
position:"absolute",
bottom:95,
right:20,
height:64,
width:64,
borderRadius:32,
backgroundColor:colors.darkPink,
justifyContent:"center",
alignItems:"center",
elevation:10,
borderWidth:3,
borderColor:"white"
}

});