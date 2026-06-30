import{
StyleSheet,
Text,
TouchableOpacity,
View
}from"react-native";
import{MaterialIcons}from"@expo/vector-icons";
import colors from"../utils/colors";

export default function AboutScreen({navigation}){

return(

<View style={styles.container}>

<View style={styles.header}>

<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<MaterialIcons
name="arrow-back"
size={28}
color={colors.black}
/>

</TouchableOpacity>

<Text style={styles.heading}>
About
</Text>

<View style={{width:28}}/>

</View>

<View style={styles.card}>

<Text style={styles.title}>
Expense Tracker
</Text>

<Text style={styles.text}>
Version 1.0
</Text>

<Text style={styles.text}>
Built using React Native, Expo and AsyncStorage.
</Text>

</View>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background,
padding:20
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:15,
marginBottom:25
},

heading:{
fontSize:28,
fontWeight:"700",
color:colors.black
},

card:{
backgroundColor:"white",
borderRadius:20,
padding:20
},

title:{
fontSize:24,
fontWeight:"700",
marginBottom:20,
color:colors.darkPink
},

text:{
fontSize:17,
lineHeight:28,
color:colors.black
}

});