import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

function RecentExpenses() {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod="Last 7 Days" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark theme background
    padding: 16,
  },
});

export default RecentExpenses;
