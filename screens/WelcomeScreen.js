import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Expense Tracker
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Manage your expenses smartly & efficiently!
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("expenses")}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#B0B0B0",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
  },
});
