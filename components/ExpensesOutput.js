import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Groceries",
    amount: 45.99,
    date: new Date("2025-02-01"),
  },
  {
    id: "e2",
    description: "Internet Bill",
    amount: 29.99,
    date: new Date("2025-01-28"),
  },
  {
    id: "e3",
    description: "Coffee",
    amount: 4.5,
    date: new Date("2025-02-03"),
  },
  {
    id: "e4",
    description: "Electricity Bill",
    amount: 60.0,
    date: new Date("2025-01-25"),
  },
  {
    id: "e5",
    description: "Gym Membership",
    amount: 25.0,
    date: new Date("2025-01-20"),
  },
];

function ExpensesOutput({ expenses = DUMMY_EXPENSES, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background to match theme
    padding: 16,
  },
});

export default ExpensesOutput;
