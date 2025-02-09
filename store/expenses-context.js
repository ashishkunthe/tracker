import { createContext, useReducer } from "react";
import {
  storeExpenses,
  fetchExpenses,
  updateExpense,
  deleteExpense,
} from "../utils/http";

// Context Definition
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: async (expenseData) => {},
  setExpenses: async () => {},
  deleteExpense: async (id) => {},
  updateExpense: async (id, expenseData) => {},
});

// Reducer Function
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]; // Adds new expense at the top
    case "SET":
      return action.payload.reverse(); // Ensures latest expenses appear first
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    default:
      return state;
  }
}

// Context Provider Component
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  // ✅ Fetch Expenses from Firebase & Set in State
  async function setExpenses() {
    try {
      const expenses = await fetchExpenses();
      dispatch({ type: "SET", payload: expenses });
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  }

  // ✅ Add Expense to Firebase & Local State
  async function addExpense(expenseData) {
    try {
      const id = await storeExpenses(expenseData); // Save to Firebase
      dispatch({ type: "ADD", payload: { ...expenseData, id } });
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  }

  // ✅ Update Expense in Firebase & Local State
  async function updateExpenseHandler(id, expenseData) {
    try {
      await updateExpense(id, expenseData); // Update in Firebase
      dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  }

  // ✅ Delete Expense from Firebase & Local State
  async function deleteExpenseHandler(id) {
    try {
      await deleteExpense(id); // Remove from Firebase
      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        setExpenses, // ✅ Renamed for clarity
        deleteExpense: deleteExpenseHandler,
        updateExpense: updateExpenseHandler,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
