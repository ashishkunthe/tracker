import axios from "axios";

const BACK_END_URL = "https://tracker-a4fb7-default-rtdb.firebaseio.com";

export function storeExpenses(expenseData) {
  axios.post(BACK_END_URL + "/expenses.json", expenseData);
}

export async function fetchExpense() {
  const response = await axios.get(BACK_END_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseAmount = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseAmount);
  }
  return expenses;
}
