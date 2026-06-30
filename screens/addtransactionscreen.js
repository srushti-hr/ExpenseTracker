import{useState}from"react";
import{
Alert,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View}from"react-native";
import{MaterialIcons}from"@expo/vector-icons";
import colors from"../utils/colors";
import{loadTransactions,saveTransactions}from"../utils/storage";
import DateTimePicker from"@react-native-community/datetimepicker";

const expenseCategories=[
"Food",
"Transport",
"Shopping",
"Bills",
"Entertainment",
"Health",
"Education",
"Lending",
"Others"
];

const incomeCategories=[
"Salary",
"Freelancing",
"Bonus",
"Scholarship",
"Investment",
"Lending",
"Others"
];

const accounts=[
"HDFC",
"SBI",
"Cash",
"Gift Card"
];

export default function AddTransactionScreen({navigation,route}){

const editingTransaction=route.params?.transaction;
const[type,setType]=useState(editingTransaction?.type??"Expense");
const[transactionMode,setTransactionMode]=useState("Current");

const today=new Date();

const defaultDate=today.toLocaleDateString("en-GB",{
day:"2-digit",
month:"short",
year:"numeric"
});

const defaultTime=today.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

const[amount,setAmount]=useState(editingTransaction?String(Math.abs(editingTransaction.amount)):"");
const[category,setCategory]=useState(editingTransaction?.category??"");
const[source,setSource]=useState(editingTransaction?.account??editingTransaction?.source??"");
const[date,setDate]=useState(editingTransaction?.date??defaultDate);
const[time,setTime]=useState(editingTransaction?.time??defaultTime);
const[showDatePicker,setShowDatePicker]=useState(false);
const[showTimePicker,setShowTimePicker]=useState(false);
const[notes,setNotes]=useState(editingTransaction?.note??"");

const currentCategories=
type==="Expense"
?
expenseCategories
:
incomeCategories;

async function saveData(){

if(
amount.trim()===""||
Number(amount)<=0||
category===""||
source===""||
(
transactionMode==="Past"&&
(
date.trim()===""||
time.trim()===""
)
)
){
Alert.alert(
"Invalid Transaction",
"Please enter a valid amount and complete all required fields."
);
return;
}

const newTransaction={

id:editingTransaction?.id??Date.now(),
type,
title:category,

category,

amount:
type==="Expense"
?
-Number(amount)
:
Number(amount),

date,

time,

account:source,

note:notes.trim()===""?"No Notes":notes.trim()

};

const oldTransactions=
await loadTransactions();

let updatedTransactions;

if(editingTransaction){

updatedTransactions=
oldTransactions.map(item=>

item.id===editingTransaction.id
?
newTransaction
:
item

);

}else{

updatedTransactions=[
newTransaction,
...oldTransactions
];

}

await saveTransactions(updatedTransactions);

if(editingTransaction){

navigation.replace(
"TransactionDetails",
{
transaction:newTransaction
}
);

}else{

navigation.goBack();

}
}

return(

<View
style={[
styles.container,
{
backgroundColor:
type==="Expense"
?
"#FFF5F8"
:
"#F2FFF5"
}
]}
>

<ScrollView
showsVerticalScrollIndicator={false}
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


<View style={{width:28}}/>

</View>

<Text style={styles.heading}>
Add Transaction
</Text>

<View style={styles.modeContainer}>

<TouchableOpacity

style={[
styles.modeButton,
{
backgroundColor:
transactionMode==="Current"
?
"#E8F8EE"
:
colors.white
}
]}

onPress={()=>{

setTransactionMode("Current");

const now=new Date();

setDate(
now.toLocaleDateString("en-GB",{
day:"2-digit",
month:"short",
year:"numeric"
})
);

setTime(
now.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})
);

}}

>

<Text style={styles.modeText}>
Current
</Text>

</TouchableOpacity>

<TouchableOpacity

style={[
styles.modeButton,
{
backgroundColor:
transactionMode==="Past"
?
"#FCE7F3"
:
colors.white
}
]}

onPress={()=>setTransactionMode("Past")}

>

<Text style={styles.modeText}>
Past
</Text>

</TouchableOpacity>

</View>
<View style={styles.toggleContainer}>

<TouchableOpacity

style={[
styles.toggle,
{
backgroundColor:
type==="Expense"
?
colors.darkPink
:
colors.white
}
]}

onPress={()=>setType("Expense")}

>

<Text

style={[
styles.toggleText,
{
color:
type==="Expense"
?
colors.white
:
colors.darkPink
}
]}

>

Expense

</Text>

</TouchableOpacity>

<TouchableOpacity

style={[
styles.toggle,
{
backgroundColor:
type==="Income"
?
colors.green
:
colors.white
}
]}

onPress={()=>setType("Income")}

>

<Text

style={[
styles.toggleText,
{
color:
type==="Income"
?
colors.black
:
colors.green
}
]}

>

Income

</Text>

</TouchableOpacity>

</View>

<Text style={styles.label}>
Amount
</Text>

<TextInput
placeholder="₹ Enter Amount"
keyboardType="numeric"
value={amount}
onChangeText={setAmount}
style={styles.input}
/>

<Text style={styles.label}>
Category
</Text>

<View style={styles.categoryContainer}>

{currentCategories.map(item=>(

<TouchableOpacity

key={item}

style={[
styles.categoryChip,
{
backgroundColor:
category===item
?
type==="Expense"
?
colors.darkPink
:
colors.green
:
colors.white
}
]}

onPress={()=>setCategory(item)}

>

<Text

style={[
styles.categoryText,
{
color:
category===item
?
type==="Expense"
?
colors.white
:
colors.black
:
colors.black
}
]}

>

{item}

</Text>

</TouchableOpacity>

))}

</View>

<Text style={styles.label}>
Money Source
</Text>

<View style={styles.categoryContainer}>

{accounts.map(item=>(

<TouchableOpacity

key={item}

style={[
styles.categoryChip,
{
backgroundColor:
source===item
?
type==="Expense"
?
colors.darkPink
:
colors.green
:
colors.white
}
]}

onPress={()=>setSource(item)}

>

<Text

style={[
styles.categoryText,
{
color:
source===item
?
type==="Expense"
?
colors.white
:
colors.black
:
colors.black
}
]}

>

{item}

</Text>

</TouchableOpacity>

))}

</View>

{

transactionMode==="Past"&&(

<>
<Text style={styles.label}>
Date
</Text>

<TouchableOpacity
style={styles.input}
onPress={()=>setShowDatePicker(true)}
>
<Text>
{date}
</Text>

</TouchableOpacity>

<Text style={styles.label}>
Time
</Text>

<TouchableOpacity
style={styles.input}
onPress={()=>setShowTimePicker(true)}
>

<Text>
{time}
</Text>

</TouchableOpacity>

</>

)

}

<Text style={styles.label}>
Notes
</Text>

<TextInput
placeholder="Optional"
value={notes}
onChangeText={setNotes}
multiline
style={[
styles.input,
{
height:100,
textAlignVertical:"top"
}
]}
/>

<TouchableOpacity

style={[
styles.saveButton,
{
backgroundColor:
type==="Expense"
?
colors.darkPink
:
colors.green
}
]}

onPress={saveData}

>

<MaterialIcons
name="check"
size={24}
color={
type==="Expense"
?
colors.white
:
colors.black
}
/>

<Text

style={[
styles.saveText,
{
color:
type==="Expense"
?
colors.white
:
colors.black
}
]}

>

{editingTransaction?"Update Transaction":"Save Transaction"}

</Text>

</TouchableOpacity>

{

showDatePicker&&(

<DateTimePicker
value={new Date()}
mode="date"
display="default"
onChange={(event,selectedDate)=>{

setShowDatePicker(false);

if(selectedDate){

setDate(
selectedDate.toLocaleDateString("en-GB",{
day:"2-digit",
month:"short",
year:"numeric"
})
);

}

}}
/>

)

}

{

showTimePicker&&(

<DateTimePicker
value={new Date()}
mode="time"
display="spinner"
onChange={(event,selectedTime)=>{

setShowTimePicker(false);

if(selectedTime){

setTime(
selectedTime.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})
);

}

}}
/>
)
}
</ScrollView>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1
},

scroll:{
padding:20
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:10,
marginBottom:25
},

heading:{
fontSize:28,
fontWeight:"700",
color:colors.black
},

modeContainer:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:20
},

modeButton:{
width:"48%",
padding:15,
borderRadius:15,
borderWidth:1,
borderColor:colors.border,
alignItems:"center"
},

modeText:{
fontSize:16,
fontWeight:"700",
color:colors.black
},

toggleContainer:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:25
},

toggle:{
width:"48%",
padding:15,
borderRadius:15,
alignItems:"center",
borderWidth:1,
borderColor:colors.border
},

toggleText:{
fontSize:17,
fontWeight:"700"
},

label:{
fontSize:18,
fontWeight:"700",
marginBottom:12,
marginTop:8,
color:colors.black
},
categoryContainer:{
flexDirection:"row",
flexWrap:"wrap",
marginBottom:18
},

categoryChip:{
paddingHorizontal:18,
paddingVertical:10,
borderRadius:22,
borderWidth:1,
borderColor:colors.border,
marginRight:10,
marginBottom:10
},

categoryText:{
fontSize:15,
fontWeight:"600"
},

input:{
backgroundColor:colors.white,
borderRadius:15,
padding:15,
marginBottom:20,
borderWidth:1,
borderColor:colors.border
},

saveButton:{
marginTop:20,
height:60,
borderRadius:18,
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
marginBottom:40
},

saveText:{
fontSize:18,
fontWeight:"700",
marginLeft:10
}

});