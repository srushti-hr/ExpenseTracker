import{useCallback,useState}from"react";
import{ScrollView,StyleSheet,Text,TouchableOpacity,View}from"react-native";
import{LinearGradient}from"expo-linear-gradient";
import{MaterialIcons,Feather,Ionicons}from"@expo/vector-icons";
import colors from"../utils/colors";
import{accounts,transactions}from"../utils/data";
import{loadTransactions}from"../utils/storage";
import{useFocusEffect}from"@react-navigation/native";
import FloatingAssistant from"../components/floatingassistant";

export default function HomeScreen({navigation}){

const[showAccounts,setShowAccounts]=useState(false);
const[showBalance,setShowBalance]=useState(true);
const[allTransactions,setAllTransactions]=useState([]);
const[totalBalance,setTotalBalance]=useState(58400);
const[income,setIncome]=useState(32000);
const[expense,setExpense]=useState(9600);
const[accountBalances,setAccountBalances]=useState(accounts);

useFocusEffect(

useCallback(()=>{

loadData();

},[])

);

async function loadData(){

const saved=await loadTransactions();

const merged=[
...saved,
...transactions
];

const updatedAccounts=accounts.map(item=>({
...item
}));

saved.forEach(item=>{

const index=updatedAccounts.findIndex(
acc=>acc.name===(item.source??item.account)
);

if(index!==-1){
updatedAccounts[index].balance+=item.amount;
}

});

setAccountBalances(updatedAccounts);

setAllTransactions(merged);

let incomeTotal=32000;
let expenseTotal=9600;
let balance=58400;

saved.forEach(item=>{

balance+=item.amount;

if(item.amount>0){
incomeTotal+=item.amount;
}else{
expenseTotal+=Math.abs(item.amount);
}

});

setIncome(incomeTotal);
setExpense(expenseTotal);
setTotalBalance(balance);

}
return(

<View style={styles.container}>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.scroll}
>

<View style={styles.header}>

<TouchableOpacity style={styles.iconButton}>

<Feather
name="menu"
size={24}
color={colors.black}
/>

</TouchableOpacity>

<Text style={styles.homeTitle}>
Home
</Text>

<TouchableOpacity style={styles.iconButton}>

<Ionicons
name="notifications-outline"
size={24}
color={colors.black}
/>

</TouchableOpacity>

</View>

<LinearGradient

colors={[
"#FFE4EC",
"#FDECF4",
"#F1FFF4"
]}

start={{x:0,y:0}}
end={{x:1,y:1}}

style={styles.balanceCard}

>
<TouchableOpacity
style={styles.balanceHeader}
onPress={()=>setShowAccounts(!showAccounts)}
>

<View>

<Text style={styles.balanceLabel}>
Total Balance
</Text>

<View style={styles.balanceAmountRow}>

<Text style={styles.balanceAmount}>
{
showBalance
?
`₹${totalBalance.toLocaleString()}`
:
"₹••••••"
}
</Text>

<TouchableOpacity
onPress={()=>setShowBalance(!showBalance)}
>

<Ionicons
name={
showBalance
?
"eye-outline"
:
"eye-off-outline"
}
size={22}
color={colors.black}
style={{
marginLeft:10
}}
/>

</TouchableOpacity>

</View>

</View>

<MaterialIcons
name={showAccounts?"keyboard-arrow-up":"keyboard-arrow-down"}
size={32}
color={colors.black}
/>

</TouchableOpacity>
{

showAccounts&&

<View style={styles.accountsBox}>

{

accountBalances.map(item=>(

<View
key={item.id}
style={styles.accountRow}
>

<Text style={styles.accountText}>
{item.name}
</Text>

<Text style={styles.accountText}>
₹{item.balance.toLocaleString()}
</Text>

</View>

))

}

</View>

}

<View style={styles.statsRow}>

<View style={styles.incomeBox}>

<MaterialIcons
name="south"
size={24}
color="#6FCF97"
/>

<Text style={styles.incomeTitle}>
Income
</Text>

<Text style={styles.incomeAmount}>
₹{income}
</Text>

</View>

<View style={styles.divider}/>

<View style={styles.expenseBox}>

<MaterialIcons
name="north"
size={24}
color={colors.darkPink}
/>

<Text style={styles.expenseTitle}>
Expenses
</Text>

<Text style={styles.expenseAmount}>
₹{expense}
</Text>

</View>

</View>

</LinearGradient>

<View style={styles.transactionHeader}>

<Text style={styles.sectionTitle}>
Recent Transactions
</Text>

<TouchableOpacity
onPress={()=>navigation.navigate("History")}
>

<Text style={styles.seeAll}>
See All
</Text>

</TouchableOpacity>
</View>
{allTransactions.slice(0,10).map(item=>(

<TouchableOpacity

key={item.id}

style={styles.transactionCard}

activeOpacity={0.85}

onPress={()=>navigation.navigate("TransactionDetails",{
transaction:item
})}

>

<View style={styles.leftSection}>

<View

style={[
styles.iconCircle,
{
backgroundColor:item.amount>0?
"#D8F3DC":
"#FCE7F3"
}
]}

>

<MaterialIcons

name={
item.amount>0?
"call-received":
"call-made"
}

size={24}

color={
item.amount>0?
colors.income:
colors.darkPink
}

/>

</View>

<View>

<Text style={styles.transactionTitle}>
{item.title}
</Text>

<Text style={styles.transactionSubtitle}>
{item.date} • {item.time}
</Text>

</View>

</View>

<View>

<Text

style={[
styles.transactionAmount,
{
color:item.amount>0?
colors.income:
colors.darkPink
}
]}

>

{item.amount>0?"+":"-"}₹{Math.abs(item.amount)}

</Text>

<Text style={styles.transactionAccount}>
{item.source??item.account}
</Text>

</View>

</TouchableOpacity>

))}

</ScrollView>

<View style={styles.bottomBar}>

<TouchableOpacity
style={styles.bottomItem}
>

<Ionicons
name="home"
size={28}
color={colors.darkPink}
/>

<Text style={styles.activeText}>
Home
</Text>

</TouchableOpacity>

<TouchableOpacity

style={styles.bottomAdd}

onPress={()=>navigation.navigate("AddTransaction")}

>

<MaterialIcons
name="add"
size={36}
color="white"
/>

</TouchableOpacity>

<TouchableOpacity
style={styles.bottomItem}
onPress={()=>navigation.navigate("Analytics")}
>

<Ionicons
name="pie-chart"
size={28}
color={colors.green}
/>

<Text style={styles.analyticsText}>
Analytics
</Text>

</TouchableOpacity>

</View>
<FloatingAssistant navigation={navigation}/>
</View>



);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background
},

scroll:{
padding:20,
paddingBottom:120
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:15,
marginBottom:25
},

iconButton:{
height:46,
width:46,
borderRadius:23,
backgroundColor:"white",
justifyContent:"center",
alignItems:"center"
},

homeTitle:{
fontSize:30,
fontWeight:"700",
color:colors.black
},

balanceCard:{
borderRadius:25,
padding:22,
marginBottom:28,
borderWidth:2,
borderColor:"#F7A8C8"
},

balanceHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

balanceLabel:{
fontSize:16,
fontWeight:"700",
color:colors.black
},

balanceAmount:{
fontSize:38,
fontWeight:"700",
marginTop:6,
color:colors.black
},
balanceAmountRow:{
flexDirection:"row",
alignItems:"center"
},
accountsBox:{
marginTop:18,
marginBottom:18
},

accountRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

accountText:{
fontSize:16,
fontWeight:"600",
color:colors.black
},

statsRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:18
},

divider:{
width:1,
height:60,
backgroundColor:"rgba(255,255,255,0.35)"
},

incomeBox:{
flex:1,
alignItems:"center"
},

expenseBox:{
flex:1,
alignItems:"center"
},

incomeTitle:{
marginTop:5,
fontSize:15,
fontWeight:"700",
color:"#2E7D32"
},

expenseTitle:{
marginTop:5,
fontSize:15,
fontWeight:"700",
color:"#C62828"
},

incomeAmount:{
marginTop:5,
fontSize:22,
fontWeight:"700",
color:"#2E7D32"
},

expenseAmount:{
marginTop:5,
fontSize:22,
fontWeight:"700",
color:"#C62828"
},

transactionHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:18
},

sectionTitle:{
fontSize:22,
fontWeight:"700",
color:colors.black
},

seeAll:{
fontSize:15,
fontWeight:"700",
color:colors.darkPink
},

transactionCard:{
backgroundColor:colors.white,
borderRadius:18,
padding:16,
marginBottom:14,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
borderWidth:1,
borderColor:colors.border
},

leftSection:{
flexDirection:"row",
alignItems:"center"
},

iconCircle:{
height:50,
width:50,
borderRadius:25,
justifyContent:"center",
alignItems:"center",
marginRight:15
},

transactionTitle:{
fontSize:17,
fontWeight:"700",
color:colors.black
},

transactionSubtitle:{
fontSize:13,
marginTop:4,
color:colors.grey
},

transactionAmount:{
fontSize:19,
fontWeight:"700",
textAlign:"right"
},

transactionAccount:{
marginTop:4,
fontSize:13,
textAlign:"right",
color:colors.grey
},

bottomBar:{
position:"absolute",
bottom:0,
left:0,
right:0,
height:82,
backgroundColor:colors.white,
borderTopWidth:1,
borderTopColor:colors.border,
flexDirection:"row",
justifyContent:"space-around",
alignItems:"center",
paddingBottom:8
},

bottomItem:{
alignItems:"center",
width:70
},

bottomAdd:{
height:68,
width:68,
borderRadius:34,
backgroundColor:colors.darkPink,
justifyContent:"center",
alignItems:"center",
marginTop:-38,
borderWidth:5,
borderColor:colors.background,
elevation:12
},

activeText:{
marginTop:4,
fontSize:13,
fontWeight:"700",
color:colors.darkPink
},

analyticsText:{
marginTop:4,
fontSize:13,
fontWeight:"700",
color:colors.green
}

});