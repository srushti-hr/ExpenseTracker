import{createNativeStackNavigator}from"@react-navigation/native-stack";

import LoginScreen from"../screens/loginscreen";
import SignupScreen from"../screens/signupscreen";
import HomeScreen from"../screens/homescreen";
import AddTransactionScreen from"../screens/addtransactionscreen";
import AnalyticsScreen from"../screens/analyticsscreen";
import HistoryScreen from"../screens/historyscreen";
import ProfileScreen from"../screens/profilescreen";
import AccountsScreen from"../screens/accountsscreen";
import TransactionDetailsScreen from"../screens/transactiondetailsscreen";
import AssistantScreen from"../screens/assistantscreen";
const Stack=createNativeStackNavigator();

export default function AppNavigator(){

return(

<Stack.Navigator
initialRouteName="Login"
screenOptions={{
headerShown:false
}}
>

<Stack.Screen
name="Login"
component={LoginScreen}
/>

<Stack.Screen
name="Signup"
component={SignupScreen}
/>

<Stack.Screen
name="Home"
component={HomeScreen}
/>

<Stack.Screen
name="AddTransaction"
component={AddTransactionScreen}
/>

<Stack.Screen
name="Analytics"
component={AnalyticsScreen}
/>

<Stack.Screen
name="History"
component={HistoryScreen}
/>

<Stack.Screen
name="Profile"
component={ProfileScreen}
/>

<Stack.Screen
name="Accounts"
component={AccountsScreen}
/>

<Stack.Screen
name="TransactionDetails"
component={TransactionDetailsScreen}
/>
<Stack.Screen
name="Assistant"
component={AssistantScreen}
options={{
headerShown:false
}}/>
</Stack.Navigator>
);
}
