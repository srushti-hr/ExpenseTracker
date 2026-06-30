import{StyleSheet,Text,View}from"react-native";
import colors from"../utils/colors";
import SmartAssistant from"../components/smartassistant";

export default function AssistantScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>
🤖 Smart Spending Assistant
</Text>

<SmartAssistant
transactions={[]}
/>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background,
justifyContent:"center",
alignItems:"center"
},

title:{
fontSize:28,
fontWeight:"700",
color:colors.black
},

subtitle:{
marginTop:15,
fontSize:17,
color:colors.grey
}

});