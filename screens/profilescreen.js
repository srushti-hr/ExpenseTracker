import{StyleSheet,Text,View,TouchableOpacity}from"react-native";
import colors from"../utils/colors";
import{MaterialIcons}from"@expo/vector-icons";

export default function ProfileScreen({navigation}){
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
Profile
</Text>

<View style={{width:28}}/>

</View>

<View style={styles.card}>

<MaterialIcons
name="account-circle"
size={90}
color={colors.darkPink}
/>

<Text style={styles.name}>
Guest User
</Text>

<Text style={styles.email}>
guest@example.com
</Text>

<View style={styles.infoRow}>
<Text style={styles.label}>App Version</Text>
<Text style={styles.value}>1.0</Text>
</View>

<View style={styles.infoRow}>
<Text style={styles.label}>Theme</Text>
<Text style={styles.value}>Light</Text>
</View>

<View style={styles.infoRow}>
<Text style={styles.label}>Currency</Text>
<Text style={styles.value}>₹ INR</Text>
</View>

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
padding:25,
alignItems:"center"
},

name:{
fontSize:24,
fontWeight:"700",
marginTop:15,
color:colors.black
},

email:{
fontSize:16,
color:"#666",
marginTop:5,
marginBottom:25
},

infoRow:{
flexDirection:"row",
justifyContent:"space-between",
width:"100%",
paddingVertical:12,
borderBottomWidth:1,
borderBottomColor:"#F1F1F1"
},

label:{
fontSize:17,
fontWeight:"600",
color:colors.black
},

value:{
fontSize:17,
color:"#555"
}
});