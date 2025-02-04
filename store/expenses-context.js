import { createContext, useReducer } from "react";

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

// Context Definition
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expenseData) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, expenseData) => {},
});

// Reducer Function
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: new Date().toString() }, ...state];

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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
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
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
