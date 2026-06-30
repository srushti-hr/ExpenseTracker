import{StyleSheet,Text,View}from"react-native";
import colors from"../utils/colors";

export default function AccountsScreen(){

return(

<View style={styles.container}>

<Text style={styles.text}>
Accounts
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
color:colors.green
}

});