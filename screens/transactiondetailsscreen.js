import{Alert,ScrollView,StyleSheet,Text,TouchableOpacity,View}from"react-native";
import{deleteTransaction}from"../utils/storage";
import{MaterialIcons}from"@expo/vector-icons";
import colors from"../utils/colors";

export default function TransactionDetailsScreen({route,navigation}){

const{transaction}=route.params;
async function removeTransaction(){

await deleteTransaction(
transaction.id
);

navigation.navigate("Home");

}

return(

<ScrollView
style={styles.container}
contentContainerStyle={styles.scroll}
>
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
Transaction Details
</Text>

<View style={{width:28}}/>

</View>

<View
style={[
styles.amountCard,
{
backgroundColor:
transaction.amount>0
?
"#D8F3DC"
:
"#FCE7F3"
}
]}
>

<MaterialIcons
name={
transaction.amount>0
?
"call-received"
:
"call-made"
}
size={34}
color={
transaction.amount>0
?
colors.green
:
colors.darkPink
}
/>

<Text
style={[
styles.amount,
{
color:
transaction.amount>0
?
colors.green
:
colors.darkPink
}
]}
>
{transaction.amount>0?"+":"-"}₹{Math.abs(transaction.amount)}

</Text>
<Text style={styles.type}>
{transaction.type}
</Text>

</View>

<View style={styles.card}>

<Row
title="Category"
value={transaction.category}
/>

<Row
title="Source"
value={transaction.source??transaction.account}
/>

<Row
title="Date"
value={transaction.date}
/>

<Row
title="Time"
value={transaction.time}
/>

<Row
title="Notes"
value={transaction.note||"No Notes"}
/>

</View>

<TouchableOpacity
style={styles.editButton}
onPress={()=>
navigation.navigate(
"AddTransaction",
{
transaction
}
)
}
>

<Text style={styles.editText}>
Edit Transaction
</Text>

</TouchableOpacity>

<TouchableOpacity

style={styles.deleteButton}

onPress={()=>
Alert.alert(
"Delete Transaction",
"Are you sure you want to delete this transaction?",

[
{
text:"Cancel",
style:"cancel"
},
{
text:"Delete",
style:"destructive",
onPress:removeTransaction
}
]
)
}

>

<Text style={styles.deleteText}>
Delete Transaction
</Text>

</TouchableOpacity>

</ScrollView>

);

}

function Row({title,value}){

return(

<View style={styles.row}>

<Text style={styles.rowTitle}>
{title}
</Text>

<Text style={styles.rowValue}>
{value}
</Text>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background
},
header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:10,
marginBottom:25
},

scroll:{
padding:20
},

heading:{
fontSize:26,
fontWeight:"700"
},

amountCard:{
borderRadius:22,
padding:25,
alignItems:"center",
marginBottom:25
},

amount:{
fontSize:36,
fontWeight:"700",
marginTop:10
},

type:{
marginTop:8,
fontSize:18,
fontWeight:"600",
color:colors.black
},

card:{
backgroundColor:"white",
borderRadius:20,
padding:20
},

row:{
flexDirection:"row",
justifyContent:"space-between",
paddingVertical:15,
borderBottomWidth:1,
borderBottomColor:"#EEEEEE"
},

rowTitle:{
fontSize:16,
fontWeight:"600",
color:colors.grey
},

rowValue:{
fontSize:16,
fontWeight:"700",
color:colors.black
},

editButton:{
height:55,
backgroundColor:colors.green,
borderRadius:18,
justifyContent:"center",
alignItems:"center",
marginTop:25
},

editText:{
fontSize:18,
fontWeight:"700",
color:colors.black
},

deleteButton:{
height:55,
backgroundColor:colors.darkPink,
borderRadius:18,
justifyContent:"center",
alignItems:"center",
marginTop:15,
marginBottom:40
},

deleteText:{
fontSize:18,
fontWeight:"700",
color:"white"
}
});