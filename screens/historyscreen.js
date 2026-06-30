import{useCallback,useState}from"react";
import{
FlatList,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View
}from"react-native";
import{MaterialIcons}from"@expo/vector-icons";
import{useFocusEffect}from"@react-navigation/native";
import colors from"../utils/colors";
import{loadTransactions}from"../utils/storage";
import{transactions}from"../utils/data";

export default function HistoryScreen({navigation}){

const[search,setSearch]=useState("");
const[sortType,setSortType]=useState("Latest");
const[list,setList]=useState([]);

useFocusEffect(
useCallback(()=>{
loadData();
},[])
);

async function loadData(){

const saved=await loadTransactions();

setList([
...saved,
...transactions
]);

}

const filtered=list.filter(item=>
item.title.toLowerCase().includes(search.toLowerCase())||
item.category.toLowerCase().includes(search.toLowerCase())
).sort((a,b)=>{

if(sortType==="Highest"){
return Math.abs(b.amount)-Math.abs(a.amount);
}

if(sortType==="Lowest"){
return Math.abs(a.amount)-Math.abs(b.amount);
}

if(sortType==="Oldest"){
return new Date(a.date)-new Date(b.date);
}

return new Date(b.date)-new Date(a.date);

});

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
Transaction History
</Text>

<View style={{width:28}}/>

</View>

<View style={styles.searchBox}>

<MaterialIcons
name="search"
size={22}
color={colors.grey}
/>

<TextInput
placeholder="Search transaction..."
value={search}
onChangeText={setSearch}
style={styles.input}
/>

</View>
<TouchableOpacity
style={styles.sortButton}
onPress={()=>{

if(sortType==="Latest"){
setSortType("Oldest");
}else if(sortType==="Oldest"){
setSortType("Highest");
}else if(sortType==="Highest"){
setSortType("Lowest");
}else{
setSortType("Latest");
}

}}
>

<MaterialIcons
name="sort"
size={20}
color={colors.black}
/>

<Text style={styles.sortText}>
Sort : {sortType}
</Text>

</TouchableOpacity>
<FlatList

data={filtered}

keyExtractor={item=>item.id.toString()}

renderItem={({item})=>(

<TouchableOpacity

style={styles.card}

onPress={()=>navigation.navigate(
"TransactionDetails",
{
transaction:item
}
)}

>

<View>

<Text style={styles.title}>
{item.title}
</Text>

<Text style={styles.subtitle}>
{item.date} • {item.time}
</Text>

</View>

<View>

<Text
style={[
styles.amount,
{
color:item.amount>0?
colors.green:
colors.darkPink
}
]}
>

{item.amount>0?"+":"-"}₹{Math.abs(item.amount)}

</Text>

<Text style={styles.source}>
{item.source??item.account}
</Text>

</View>

</TouchableOpacity>

)}

showsVerticalScrollIndicator={false}

/>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background,
padding:20
},

heading:{
fontSize:30,
fontWeight:"700",
color:colors.black
},
header:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space"},

searchBox:{
backgroundColor:"white",
borderRadius:15,
paddingHorizontal:15,
height:55,
alignItems:"center",
flexDirection:"row",
marginBottom:20
},

input:{
flex:1,
marginLeft:10
},
card:{
backgroundColor:"white",
borderRadius:18,
padding:16,
marginBottom:14,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
borderWidth:1,
borderColor:colors.border
},

title:{
fontSize:17,
fontWeight:"700",
color:colors.black
},

subtitle:{
marginTop:4,
fontSize:13,
color:colors.grey
},

amount:{
fontSize:19,
fontWeight:"700",
textAlign:"right"
},

source:{
marginTop:4,
fontSize:13,
textAlign:"right",
color:colors.grey
},
sortButton:{
backgroundColor:"white",
padding:14,
borderRadius:15,
marginBottom:18,
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
borderWidth:1,
borderColor:colors.border
},

sortText:{
marginLeft:8,
fontSize:16,
fontWeight:"700",
color:colors.black
}

});