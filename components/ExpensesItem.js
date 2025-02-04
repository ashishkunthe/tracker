import { Pressable, Text, View, StyleSheet } from "react-native";

function ExpensesItem({ expenseItem }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.description}>{expenseItem.description}</Text>
        <Text style={styles.date}>{expenseItem.date.toLocaleDateString()}</Text>
      </View>
      <Text style={styles.amount}>${expenseItem.amount.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E", // Dark card background
    padding: 14,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3, // Adds slight shadow
  },
  pressed: {
    opacity: 0.7, // Dim effect when pressed
  },
  textContainer: {
    flexDirection: "column",
  },
  description: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#B0B0B0", // Grayish date text
    fontSize: 14,
    marginTop: 2,
  },
  amount: {
    color: "#4CAF50", // Green accent
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExpensesItem;
