import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TARA</Text>
      <Link href="/tara-demo" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Open Tara Demo</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 8,
    color: "#1B5E20",
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "#FFC107",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1B5E20",
  },
});
