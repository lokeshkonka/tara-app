import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Dashboard</Text>
      <Text style={styles.subtitle}>Welcome to Tara</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAF5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  subtitle: {
    fontSize: 16,
    color: "#72776F",
    marginTop: 8,
  }
});
