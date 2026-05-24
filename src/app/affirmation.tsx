import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const affirmations = [
  "✨ I attract positive energy and abundance.",

  "🌙 I trust the universe and my intuition.",

  "💖 I deserve love, peace, and happiness.",

  "🔥 I am confident, powerful, and fearless.",

  "🌌 My future is filled with endless opportunities.",

  "☀️ I radiate confidence and cosmic energy.",

  "🪐 The universe supports my dreams and goals.",
];

export default function AffirmationScreen() {
  const dailyAffirmation =
    affirmations[
      new Date().getDate() %
        affirmations.length
    ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🌟 Daily Affirmation
      </Text>

      <View style={styles.card}>
        <Text style={styles.affirmation}>
          {dailyAffirmation}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          ✨ Why Affirmations Matter
        </Text>

        <Text style={styles.infoText}>
          Positive affirmations help build
          confidence, emotional strength,
          mental clarity, and spiritual
          balance.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          🌙 Cosmic Tip
        </Text>

        <Text style={styles.infoText}>
          Repeat your affirmation slowly
          while focusing on your breathing
          and emotional energy.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  heading: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
  },

  card: {
    backgroundColor: "#7C3AED",
    borderRadius: 30,
    padding: 32,
    marginBottom: 25,
  },

  affirmation: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 42,
    textAlign: "center",
  },

  infoCard: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
  },

  infoTitle: {
    color: "#A855F7",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },

  infoText: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 28,
  },
});