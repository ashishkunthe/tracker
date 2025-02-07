import { Text, TextInput, View, StyleSheet } from "react-native";

function Input({ label, textInputConfig, style }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#E0E0E0", // Light gray text for dark mode
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#1E1E1E", // Dark background for input field
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 16,
    color: "white", // White text for input
    borderWidth: 1,
    borderColor: "#333", // Subtle border
  },
});

export default Input;
