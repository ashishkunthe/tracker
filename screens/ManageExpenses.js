import { useContext, useLayoutEffect } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../ui/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpenses({ route, navigation }) {
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;
  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    navigation.goBack();
    expensesCtx.deleteExpense(editExpenseId);
  }

  function handleCancel() {
    navigation.goBack();
  }

  function handleConfirm() {
    navigation.goBack();
    if (isEditing) {
      expensesCtx.updateExpense(editExpenseId, {
        description: "Test!!!!!!",
        amount: 29,
        date: new Date("2025-4-6"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19,
        date: new Date("2025-4-5"),
      });
    }
  }

  return (
    <View style={styles.container}>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <View style={styles.spacer} />
        <Button onPress={handleConfirm} style={styles.button}>
          Confirm
        </Button>
      </View>

      {/* Delete Section */}
      {isEditing && (
        <View style={styles.bottomBar}>
          {/* Divider Line */}
          <View style={styles.divider} />

          {/* Delete Button */}
          <Pressable onPress={deleteExpenseHandler} style={styles.deleteButton}>
            <Ionicons name="trash" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark theme background
    justifyContent: "space-between", // Pushes content up, keeps bar at bottom
  },
  buttonsContainer: {
    flexDirection: "row", // Aligns buttons in a row
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    flex: 1, // Makes buttons take equal width
  },
  spacer: {
    width: 15, // Space between buttons
  },
  bottomBar: {
    backgroundColor: "#1E1E1E", // Dark gray bar (theme-based)
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  divider: {
    width: "90%", // Makes it span most of the width
    height: 1,
    backgroundColor: "gray", // Light gray color for the line
    marginBottom: 10, // Adds spacing before the button
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    width: 60,
    alignItems: "center",
  },
});

export default ManageExpenses;
