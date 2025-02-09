import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

function ErrorOverlay({
  message = "Something went wrong. Please try again!",
  onConfirm,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An Error Occurred!</Text>
      <Text style={styles.errorText}>{message}</Text>
      <Button onPress={onConfirm} style={styles.button}>
        Okay
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 18, 18, 0.85)", // Semi-transparent dark background
    padding: 20,
  },
  title: {
    color: "#ffffff", // White for contrast
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10, // Space between title and message
  },
  errorText: {
    color: "#CF6679", // Red error color from Material Dark theme
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20, // Adds spacing before button
  },
  button: {
    marginTop: 10, // Space above the button
    paddingHorizontal: 20,
  },
});

export default ErrorOverlay;
