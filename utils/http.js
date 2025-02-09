import axios from "axios";

const BACK_END_URL = "https://tracker-a4fb7-default-rtdb.firebaseio.com";

// ✅ Add Expense (POST)
export async function storeExpenses(expenseData) {
  const response = await axios.post(
    `${BACK_END_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name; // Firebase returns the unique key
  return id;
}

// ✅ Fetch Expenses (GET)
export async function fetchExpenses() {
  const response = await axios.get(`${BACK_END_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }

  return expenses;
}

// ✅ Update Expense (PUT)
export async function updateExpense(id, expenseData) {
  return axios.put(`${BACK_END_URL}/expenses/${id}.json`, expenseData);
}

// ✅ Delete Expense (DELETE)
export async function deleteExpense(id) {
  return axios.delete(`${BACK_END_URL}/expenses/${id}.json`);
}
