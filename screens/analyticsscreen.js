import{ScrollView,StyleSheet,Text,View,TouchableOpacity}from"react-native";
import{PieChart,BarChart}from"react-native-chart-kit";
import{Dimensions}from"react-native";
import colors from"../utils/colors";
import{MaterialIcons}from"@expo/vector-icons";

const width=Dimensions.get("window").width;

const pieData=[
{
name:"Food",
amount:4200,
color:"#F8BBD0",
legendFontColor:"#000",
legendFontSize:13
},
{
name:"Shopping",
amount:2800,
color:"#A5D6A7",
legendFontColor:"#000",
legendFontSize:13
},
{
name:"Bills",
amount:1800,
color:"#FFE082",
legendFontColor:"#000",
legendFontSize:13
},
{
name:"Travel",
amount:1400,
color:"#90CAF9",
legendFontColor:"#000",
legendFontSize:13
}
];

export default function AnalyticsScreen({navigation}){

return(

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
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
Insights
</Text>

<View style={{width:28}}/>

</View>

<View style={styles.card}>

<Text style={styles.title}>
Monthly Overview
</Text>

<View style={styles.row}>

<View>

<Text style={styles.label}>
Income
</Text>

<Text style={styles.income}>
₹32,000
</Text>

</View>

<View>

<Text style={styles.label}>
Expense
</Text>

<Text style={styles.expense}>
₹9,600
</Text>

</View>

<View>

<Text style={styles.label}>
Balance
</Text>

<Text style={styles.balance}>
₹58,400
</Text>

</View>

</View>

</View>

<View style={styles.card}>

<Text style={styles.title}>
Category Wise Spending
</Text>

<PieChart
data={pieData}
width={width-60}
height={220}
accessor="amount"
backgroundColor="transparent"
paddingLeft="15"
chartConfig={{
color:()=>"#000"
}}
absolute
/>

</View>

<View style={styles.card}>

<Text style={styles.title}>
Day Wise Spending
</Text>

<BarChart
data={{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
data:[1200,900,1800,700,2200,1400,600]
}
]
}}
width={width-60}
height={230}
fromZero
showValuesOnTopOfBars
chartConfig={{
backgroundGradientFrom:"#FFF",
backgroundGradientTo:"#FFF",
decimalPlaces:0,
color:(opacity=1)=>`rgba(233,30,99,${opacity})`,
labelColor:()=>"#000"
}}
style={{
borderRadius:16
}}
/>

</View>

</ScrollView>

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
marginBottom:20
},

heading:{
fontSize:28,
fontWeight:"700",
color:colors.black,
},

card:{
backgroundColor:"white",
borderRadius:20,
padding:18,
marginBottom:20
},

title:{
fontSize:20,
fontWeight:"700",
color:colors.black,
marginBottom:15
},

row:{
flexDirection:"row",
justifyContent:"space-between"
},

label:{
fontSize:15,
fontWeight:"600",
color:"#555"
},

income:{
fontSize:22,
fontWeight:"700",
color:colors.green,
marginTop:5
},

expense:{
fontSize:22,
fontWeight:"700",
color:colors.darkPink,
marginTop:5
},

balance:{
fontSize:22,
fontWeight:"700",
color:colors.black,
marginTop:5
}

});