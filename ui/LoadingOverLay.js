import { View, ActivityIndicator, StyleSheet } from "react-native";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#BB86FC" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 18, 18, 0.9)", // Dark background with transparency
  },
});

export default LoadingOverlay;
