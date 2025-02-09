import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../utils/http";
import { ExpensesContext } from "../store/expenses-context";
import ErrorOverlay from "../ui/ErrorOverLay";
import LoadingOverlay from "../ui/LoadingOverLay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true); // Start loading
      setError(null); // Reset error before fetching data

      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses); // ✅ Ensure the correct function is used
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        setError("Could not fetch expenses. Please try again!"); // ✅ Set error message
      }

      setIsFetching(false); // Stop loading
    }

    getExpenses();
  }, []); // ✅ Removed expensesCtx to prevent infinite re-renders

  // Get current date and calculate 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter expenses from the last 7 days
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo;
  });

  // Error handler function to reset error state
  function errorHandler() {
    setError(null);
  }

  // Show error overlay if an error occurs
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  // Show loading indicator while fetching data
  if (isFetching) {
    return <LoadingOverlay />;
  }

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
