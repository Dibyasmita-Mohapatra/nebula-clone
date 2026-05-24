import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        ✨ Nebula
      </Text>

      <Text style={styles.subtitle}>
        Your Cosmic Astrology Universe
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/login")
        }
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() =>
          router.push("/signup")
        }
      >
        <Text style={styles.buttonText}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    color: "white",
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 60,
  },

  button: {
    backgroundColor: "#7C3AED",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  signupButton: {
    backgroundColor: "#EC4899",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});