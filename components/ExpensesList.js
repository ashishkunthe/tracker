import { FlatList, Text, View, StyleSheet } from "react-native";
import ExpensesItem from "./ExpensesItem";

function ExpensesList({ expenses }) {
  function ExpenseListItem({ item }) {
    return <ExpensesItem expenseItem={item} />;
  }
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={(item) => ExpenseListItem(item)}
    />
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: "#1E1E1E", // Theme's card color
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    color: "#FFFFFF", // Theme's text color
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    color: "#4CAF50", // Theme's primary color (Green Accent)
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExpensesList;
