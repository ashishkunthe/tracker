import { createContext, useReducer } from "react";

// Context Definition
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expenseData) => {},
  setExpense: (expense) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, expenseData) => {},
});

// Reducer Function
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: new Date().toString() }, ...state];
    case "SET":
      return action.payload;
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

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpense(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
