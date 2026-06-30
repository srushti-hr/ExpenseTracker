import{StyleSheet,Text,TextInput,TouchableOpacity,View,Alert}from"react-native";
import{useState}from"react";

import colors from"../utils/colors";


export default function LoginScreen({navigation}){
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

function login(){

if(
email.trim()===""||
password.trim()===""
){

Alert.alert(
"Missing Details",
"Please enter both email and password."
);

return;

}

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email.trim())){

Alert.alert(
"Invalid Email",
"Please enter a valid email address."
);

return;

}

navigation.replace("Home");

}

return(
<View style={styles.container}>

<Text style={styles.title}>
Expense Tracker
</Text>

<Text style={styles.subtitle}>
Track every rupee beautifully
</Text>

<TextInput
placeholder="Email"
placeholderTextColor={colors.grey}
value={email}
onChangeText={setEmail}
style={styles.input}
/>

<TextInput
placeholder="Password"
placeholderTextColor={colors.grey}
secureTextEntry
value={password}
onChangeText={setPassword}
style={styles.input}
/>

<TouchableOpacity
style={styles.button}
onPress={login}
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