import AsyncStorage from"@react-native-async-storage/async-storage";

const TRANSACTION_KEY="transactions";

export async function saveTransactions(transactions){
try{
await AsyncStorage.setItem(
TRANSACTION_KEY,
JSON.stringify(transactions)
);
}catch(error){
console.log(error);
}
}

export async function loadTransactions(){
try{

const data=await AsyncStorage.getItem(
TRANSACTION_KEY
);

if(data){
return JSON.parse(data);
}

return[];

}catch(error){
console.log(error);
return[];
}
}

export async function clearTransactions(){
try{
await AsyncStorage.removeItem(
TRANSACTION_KEY
);
}catch(error){
console.log(error);
}
}
export async function deleteTransaction(id){

const transactions=
await loadTransactions();

const updatedTransactions=
transactions.filter(item=>item.id!==id);

await saveTransactions(updatedTransactions);

}