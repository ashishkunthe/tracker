import { Pressable, Text, View, StyleSheet } from "react-native";

function Button({ children, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed, // Adds feedback when pressed
        ]}
      >
        <View>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden", // Prevents Pressable overflow effect
  },
  button: {
    backgroundColor: "#4CAF50", // Primary color (Green Accent)
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75, // Reduces opacity on press for feedback
  },
});

export default Button;
