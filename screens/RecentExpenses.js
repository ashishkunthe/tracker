import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  // Get current date and calculate 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter expenses from the last 7 days
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo;
  });

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
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
