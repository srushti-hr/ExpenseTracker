import { useState } from "react";
import {StyleSheet,Text,TextInput,TouchableOpacity,View} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

export default function SmartAssistant({ transactions }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  function askAssistant(text) {
    if (text.trim() === "") {
      return;
    }

    const q = text.toLowerCase();

    setMessages(previous => [
      ...previous,
      {
        sender: "user",
        text: text
      }
    ]);

    setQuestion("");

    setLoading(true);

    setTimeout(() => {
      let reply = "";

      if (q.includes("today")) {
        reply = getTodayExpense();
      } else if (q.includes("week")) {
        reply = getWeekExpense();
      } else if (q.includes("month")) {
        reply = getMonthExpense();
      } else if (q.includes("category") && q.includes("income")) {
        reply = getHighestIncomeCategory();
      } else if (q.includes("account") || q.includes("bank")) {
        reply = getMostUsedAccount();
      } else if (q.includes("category") || q.includes("spent the most")) {
        reply = getHighestCategory();
      } else if (q.includes("biggest") || q.includes("largest")) {
        reply = getBiggestExpense();
      } else if (q.includes("how many") || q.includes("transactions")) {
        reply = getTransactionCount();
      } else if (q.includes("day") || q.includes("busiest")) {
        reply = getHighestSpendingDay();
      } else {
        reply =
          "Sorry 😅 I can answer questions about spending, income, categories, accounts and transactions.";
      }

      setMessages(previous => [
        ...previous,
        {
          sender: "assistant",
          text: reply
        }
      ]);

      setLoading(false);
    }, 1000);
  }

  function getTodayExpense() {
    const today = new Date().toDateString();

    let total = 0;
    let count = 0;

    transactions.forEach(item => {
      if (new Date(item.date).toDateString() === today && item.amount < 0) {
        total += Math.abs(item.amount);
        count++;
      }
    });

    return `You spent ₹${total.toLocaleString()} today across ${count} transaction${
      count === 1 ? "" : "s"
    }.`;
  }

  function getWeekExpense() {
    const now = new Date();

    const start = new Date(now);

    start.setDate(now.getDate() - 6);

    let total = 0;

    transactions.forEach(item => {
      const date = new Date(item.date);

      if (date >= start && date <= now && item.amount < 0) {
        total += Math.abs(item.amount);
      }
    });

    return `You spent ₹${total.toLocaleString()} in the last 7 days.`;
  }

  function getMonthExpense() {
    const now = new Date();

    let total = 0;

    transactions.forEach(item => {
      const date = new Date(item.date);

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear() &&
        item.amount < 0
      ) {
        total += Math.abs(item.amount);
      }
    });

    return `You spent ₹${total.toLocaleString()} this month.`;
  }

  function getHighestCategory() {
    const categories = {};

    transactions.forEach(item => {
      if (item.amount < 0) {
        const category = item.category ?? "Others";

        categories[category] = (categories[category] || 0) + Math.abs(item.amount);
      }
    });

    let highest = "";
    let amount = 0;

    Object.keys(categories).forEach(key => {
      if (categories[key] > amount) {
        highest = key;
        amount = categories[key];
      }
    });

    const replies = [
      `📊 ${highest} is your highest spending category with ₹${amount.toLocaleString()}.`,
      `💡 You spent the most on ${highest} this month (₹${amount.toLocaleString()}).`,
      `🛍 Most of your expenses were in ${highest} (₹${amount.toLocaleString()}).`
    ];

    return replies[Math.floor(Math.random() * replies.length)];
  }

  function getHighestIncomeCategory() {
    const categories = {};

    transactions.forEach(item => {
      if (item.amount > 0) {
        categories[item.category] = (categories[item.category] || 0) + item.amount;
      }
    });

    let highest = "None";
    let amount = 0;

    Object.keys(categories).forEach(key => {
      if (categories[key] > amount) {
        highest = key;
        amount = categories[key];
      }
    });

    return `${highest} generated the highest income of ₹${amount.toLocaleString()}.`;
  }

  function getMostUsedAccount() {
    const accounts = {};

    transactions.forEach(item => {
      const account = item.source ?? item.account;

      if (account) {
        accounts[account] = (accounts[account] || 0) + 1;
      }
    });

    let highest = "";
    let count = 0;

    Object.keys(accounts).forEach(key => {
      if (accounts[key] > count) {
        highest = key;
        count = accounts[key];
      }
    });

    const replies = [
      `🏦 ${highest} is your most used account with ${count} transactions.`,
      `💳 You used ${highest} the most (${count} transactions).`,
      `📊 ${highest} was your preferred payment source this month.`
    ];

    return replies[Math.floor(Math.random() * replies.length)];
  }

  function getBiggestExpense() {
    let biggest = null;

    transactions.forEach(item => {
      if (item.amount < 0) {
        if (biggest === null || Math.abs(item.amount) > Math.abs(biggest.amount)) {
          biggest = item;
        }
      }
    });

    if (biggest === null) {
      return "No expense transactions found.";
    }

    return `💸 Your biggest expense was ${biggest.title} for ₹${Math.abs(
      biggest.amount
    ).toLocaleString()}.`;
  }

  function getTransactionCount() {
    return `🧾 You have recorded ${transactions.length} transactions.`;
  }

  function getHighestSpendingDay() {
    const days = {};

    transactions.forEach(item => {
      if (item.amount < 0) {
        days[item.date] = (days[item.date] || 0) + Math.abs(item.amount);
      }
    });

    let highest = "";
    let amount = 0;

    Object.keys(days).forEach(day => {
      if (days[day] > amount) {
        highest = day;
        amount = days[day];
      }
    });

    if (highest === "") {
      return "No expense transactions found.";
    }

    return `📅 Your highest spending day was ${highest} with ₹${amount.toLocaleString()} spent.`;
  }

 return(

    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="smart-toy" size={28} color={colors.darkPink} />
        <Text style={styles.title}>Smart Spending Assistant</Text>
      </View>

      <Text style={styles.subtitle}>Suggested Questions</Text>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("How much did I spend today?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 How much did I spend today?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("How much did I spend this week?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 How much did I spend this week?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("Which is my highest spending category?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 Which is my highest spending category?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("Which account do I use the most?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 Which account do I use the most?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("What was my biggest expense?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 What was my biggest expense?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("How many transactions did I make this month?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 How many transactions did I make this month?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.question}
        onPress={() => askAssistant("Which day did I spend the most?")}
      >
        <Text style={{ color: colors.black, fontWeight: "600" }}>
          💬 Which day did I spend the most?
        </Text>
      </TouchableOpacity>

      {messages.map((item, index) => (
        <View
          key={index}
          style={[
            styles.message,
            {
              alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.sender === "user" ? "#FCE7F3" : "#F5F5F5"
            }
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      ))}

      {loading && (
        <View style={[styles.message, { backgroundColor: "#F5F5F5", alignSelf: "flex-start" }]}>
          <Text style={styles.messageText}>🤖 Analyzing your transactions...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
      <View style={styles.inputContainer}>

<TextInput
placeholder="Custom questions coming soon..."
editable={false}
style={[
styles.input,
{
backgroundColor:"#F8F8F8",
color:"#888"
}
]}
/>

<TouchableOpacity
style={[
styles.button,
{
backgroundColor:"#D8D8D8"
}
]}
disabled
>

<Text
style={[
styles.buttonText,
{
color:"#666"
}
]}
>
Coming Soon
</Text>

</TouchableOpacity>

</View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    marginTop: 25
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
    color: colors.darkPink
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },

  question: {
    backgroundColor: "#FFF5F8",
    borderWidth: 1,
    borderColor: "#F48FB1",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    padding: 14,
    marginTop: 20
  },
    inputContainer:{
    marginTop:20
  },
  button: {
    backgroundColor: colors.darkPink,
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  },

  answerBox: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 15,
    marginTop: 20
  },

  answerTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8
  },

  message: {
    padding: 14,
    borderRadius: 16,
    marginTop: 10,
    maxWidth: "85%"
  },

  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.black
  },

  answer: {
    fontSize: 16,
    lineHeight: 24
  }
});