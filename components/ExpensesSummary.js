import { Text, View, StyleSheet } from "react-native";

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0); // Added initial value 0

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.amount}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E", // Theme card color
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  period: {
    color: "#B0B0B0", // Muted text for period
    fontSize: 14,
  },
  amount: {
    color: "#4CAF50", // Theme primary color (Green Accent)
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExpensesSummary;
