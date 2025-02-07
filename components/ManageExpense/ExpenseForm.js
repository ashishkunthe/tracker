import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../../ui/Button";

function ExpenseForm({ onCancel, onSubmit, isEditing, defaultValue }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : "",
    date: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
    description: defaultValue ? defaultValue.description : "",
  });

  const [inputValidities, setInputValidities] = useState({
    amount: true,
    date: true,
    description: true,
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((currentValue) => ({
      ...currentValue,
      [inputIdentifier]: enteredValue,
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description.trim(),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValidities({
        amount: amountIsValid,
        date: dateIsValid,
        description: descriptionIsValid,
      });
      Alert.alert("Invalid input", "Please check the values.");
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Input
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: inputValues.amount,
            }}
            style={!inputValidities.amount ? styles.invalidInput : null}
          />
          {!inputValidities.amount && (
            <Text style={styles.errorText}>Enter a valid amount</Text>
          )}
        </View>

        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Input
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: inputValues.date,
            }}
            style={!inputValidities.date ? styles.invalidInput : null}
          />
          {!inputValidities.date && (
            <Text style={styles.errorText}>Enter a valid date</Text>
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            numberOfLines: 3,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputValues.description,
          }}
          style={!inputValidities.description ? styles.invalidInput : null}
        />
        {!inputValidities.description && (
          <Text style={styles.errorText}>Enter a description</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <Button onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <View style={styles.spacer} />
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  halfWidth: {
    flex: 1,
    marginRight: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
  spacer: {
    width: 12,
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default ExpenseForm;
