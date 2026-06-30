import{StyleSheet,Text,View}from"react-native";
import colors from"../utils/colors";

export default function ProfileScreen(){

return(

<View style={styles.container}>

<Text style={styles.text}>
Profile
</Text>

</View>

);
}

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:colors.background
},

text:{
fontSize:30,
fontWeight:"700",
color:colors.darkPink
}

});