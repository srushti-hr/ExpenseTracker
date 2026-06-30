import{Alert,StyleSheet,Text,TextInput,TouchableOpacity,View}from"react-native";
import{useState}from"react";
import colors from"../utils/colors";

export default function SignupScreen({navigation}){

const[username,setUsername]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[confirmPassword,setConfirmPassword]=useState("");

function signup(){
if(
username.trim()===""||
email.trim()===""||
password.trim()===""||
confirmPassword.trim()===""
){

Alert.alert(
"Missing Details",
"Please fill all the fields."
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

if(password!==confirmPassword){
Alert.alert("Error","Passwords do not match");
return;
}

navigation.replace("Home");

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Create Account
</Text>

<TextInput
placeholder="Username"
placeholderTextColor={colors.grey}
style={styles.input}
value={username}
onChangeText={setUsername}
/>

<TextInput
placeholder="Email"
placeholderTextColor={colors.grey}
keyboardType="email-address"
style={styles.input}
value={email}
onChangeText={setEmail}
/>

<TextInput
placeholder="New Password"
placeholderTextColor={colors.grey}
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<TextInput
placeholder="Confirm Password"
placeholderTextColor={colors.grey}
secureTextEntry
style={styles.input}
value={confirmPassword}
onChangeText={setConfirmPassword}
/>

<TouchableOpacity
style={styles.button}
onPress={signup}
>

<Text style={styles.buttonText}>
Sign Up
</Text>

</TouchableOpacity>

<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<Text style={styles.link}>
Already have an account?
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
fontSize:32,
fontWeight:"700",
textAlign:"center",
marginBottom:35,
color:colors.darkPink
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
backgroundColor:colors.green,
padding:16,
borderRadius:15,
alignItems:"center"
},

buttonText:{
fontSize:18,
fontWeight:"700",
color:colors.black
},

link:{
marginTop:22,
textAlign:"center",
fontWeight:"600",
color:colors.darkPink
}

});