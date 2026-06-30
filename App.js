import{NavigationContainer}from"@react-navigation/native";
import AppNavigator from"./navigation/appnavigator";

export default function App(){
return(
<NavigationContainer>
<AppNavigator/>
</NavigationContainer>
);
}