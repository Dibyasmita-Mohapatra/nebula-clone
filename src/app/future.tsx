import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const predictions = [
  "✨ A powerful new opportunity will appear very soon.",

  "🌙 Emotional healing and personal growth are approaching.",

  "💖 Someone important may re-enter your life unexpectedly.",

  "🔥 Your confidence will attract success and abundance.",

  "🌌 A spiritual awakening is beginning within you.",

  "☀️ Positive energy and exciting transformation are near.",

  "🪐 Major cosmic changes will guide your next chapter.",
];

export default function FutureScreen() {
  const [prediction, setPrediction] =
    useState("");

  const revealFuture = () => {
    const random =
      predictions[
        Math.floor(
          Math.random() * predictions.length
        )
      ];

    setPrediction(random);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🔮 Future Prediction
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={revealFuture}
      >
        <Text style={styles.buttonText}>
          Reveal My Future
        </Text>
      </TouchableOpacity>

      {prediction ? (
        <View style={styles.card}>
          <Text style={styles.title}>
            ✨ Your Cosmic Future
          </Text>

          <Text style={styles.text}>
            {prediction}
          </Text>
        </View>
      ) : null}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          🌌 Spiritual Insight
        </Text>

        <Text style={styles.infoText}>
          The universe constantly shifts
          energy patterns that influence
          emotions, destiny, relationships,
          and opportunities.
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

  button: {
    backgroundColor: "#7C3AED",
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 35,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 28,
    marginBottom: 24,
  },

  title: {
    color: "#A855F7",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  text: {
    color: "#E5E7EB",
    fontSize: 18,
    lineHeight: 30,
  },

  infoCard: {
    backgroundColor: "#1E1B4B",
    borderRadius: 28,
    padding: 24,
    marginBottom: 60,
  },

  infoTitle: {
    color: "white",
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