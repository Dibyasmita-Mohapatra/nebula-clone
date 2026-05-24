import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function PremiumCard() {
  return (
    <LinearGradient
      colors={[
        "#7C3AED",
        "#EC4899",
      ]}
      style={styles.card}
    >
      <Text style={styles.title}>
        💎 Nebula Premium
      </Text>

      <Text style={styles.text}>
        Unlock unlimited AI,
        premium readings,
        advanced astrology,
        meditation music,
        and exclusive cosmic
        experiences.
      </Text>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Upgrade Now 🚀
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,

    padding: 28,

    marginBottom: 25,

    shadowColor: "#EC4899",

    shadowOpacity: 0.8,

    shadowRadius: 20,

    elevation: 15,
  },

  title: {
    color: "white",

    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 15,
  },

  text: {
    color: "white",

    fontSize: 16,

    lineHeight: 28,

    marginBottom: 25,
  },

  button: {
    backgroundColor:
      "rgba(255,255,255,0.2)",

    paddingVertical: 16,

    borderRadius: 20,

    alignItems: "center",
  },

  buttonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});