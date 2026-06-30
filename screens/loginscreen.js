import{StyleSheet,Text,TextInput,TouchableOpacity,View}from"react-native";
import colors from"../utils/colors";

export default function LoginScreen({navigation}){

return(
<View style={styles.container}>

<Text style={styles.title}>
Expense Tracker
</Text>

<Text style={styles.subtitle}>
Track every rupee beautifully
</Text>

<TextInput
placeholder="Username"
placeholderTextColor={colors.grey}
style={styles.input}
/>

<TextInput
placeholder="Password"
placeholderTextColor={colors.grey}
secureTextEntry
style={styles.input}
/>

<TouchableOpacity
style={styles.button}
onPress={()=>navigation.replace("Home")}
>

<Text style={styles.buttonText}>
Login
</Text>

</TouchableOpacity>

<TouchableOpacity
onPress={()=>navigation.navigate("Signup")}
>

<Text style={styles.link}>
Create a new account
</Text>

</TouchableOpacity>

</View>
);

}

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:25,
backgroundColor:colors.background
},

title:{
fontSize:34,
fontWeight:"700",
color:colors.darkPink,
textAlign:"center"
},

subtitle:{
textAlign:"center",
marginTop:8,
marginBottom:40,
color:colors.grey,
fontSize:16
},

input:{
backgroundColor:colors.white,
borderWidth:1,
borderColor:colors.border,
borderRadius:15,
padding:15,
marginBottom:18
},

button:{
backgroundColor:colors.darkPink,
padding:16,
borderRadius:15,
alignItems:"center",
marginTop:5
},

buttonText:{
color:colors.white,
fontSize:18,
fontWeight:"700"
},

link:{
marginTop:25,
textAlign:"center",
fontWeight:"600",
color:colors.darkPink
}

});