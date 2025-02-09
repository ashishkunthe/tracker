import { useContext, useLayoutEffect, useState } from "react";
import { Pressable, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpenses, updateExpense, deleteExpense } from "../utils/http";
import ErrorOverlay from "../ui/ErrorOverLay";
import LoadingOverlay from "../ui/LoadingOverLay";

function ManageExpenses({ route, navigation }) {
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    setError(null); // Reset error state

    try {
      await deleteExpense(editExpenseId);
      expensesCtx.deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Could not delete expense. Please try again!");
    }

    setIsSubmitting(false);
  }

  function handleCancel() {
    navigation.goBack();
  }

  async function handleConfirm(expenseData) {
    setIsSubmitting(true);
    setError(null); // Reset error state

    try {
      if (isEditing) {
        await updateExpense(editExpenseId, expenseData);
        expensesCtx.updateExpense(editExpenseId, expenseData);
      } else {
        const id = await storeExpenses(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving expense:", error);
      setError("Could not save expense. Please try again!");
    }

    setIsSubmitting(false);
  }

  // Error handler function to reset error state
  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        isEditing={isEditing}
        onSubmit={handleConfirm}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.bottomBar}>
          <View style={styles.divider} />
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
    backgroundColor: "#121212",
    justifyContent: "space-between",
  },
  bottomBar: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "gray",
    marginBottom: 10,
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
