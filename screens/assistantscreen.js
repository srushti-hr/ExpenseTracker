import{transactions as defaultTransactions}from"../utils/data";
import{StyleSheet,View,ScrollView,TouchableOpacity,Text,KeyboardAvoidingView,Platform}from"react-native";
import colors from"../utils/colors";
import SmartAssistant from"../components/smartassistant";
import{useEffect,useState}from"react";
import{loadTransactions}from"../utils/storage";
import{MaterialIcons}from"@expo/vector-icons";

export default function AssistantScreen({navigation}){
const[transactions,setTransactions]=useState([]);
useEffect(()=>{
loadData();
},[]);
async function loadData(){
const data=await loadTransactions();
setTransactions([...data,...defaultTransactions]);
}

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
Assistant
</Text>

<View style={{width:28}}/>

</View>
<KeyboardAvoidingView
style={{flex:1}}
behavior={Platform.OS==="ios"?"padding":"height"}
>
<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.scrollContent}
>

<SmartAssistant
transactions={transactions}
/>

</ScrollView>
</KeyboardAvoidingView>
</View>


);
}
const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background
},

scrollContent:{
padding:20,
paddingBottom:40

},

header:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
paddingHorizontal:20,
paddingTop:55,
paddingBottom:10,
borderBottomWidth:1,
borderBottomColor:"#F2F2F2",
backgroundColor:"white"
},

heading:{
fontSize:22,
fontWeight:"700",
color:colors.black,
marginLeft:12
}
});