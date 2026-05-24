import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function DreamScreen() {
  const [dream, setDream] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  const interpretDream = async () => {
    if (!dream) return;

    setLoading(true);

    setTimeout(() => {
      const interpretations = [
        "🌊 Water symbolizes emotional transformation and spiritual clarity.",

        "✨ Stars represent destiny, ambition, and cosmic guidance.",

        "🌙 The moon reflects hidden emotions and deep intuition.",

        "🔥 Fire suggests powerful inner energy and upcoming change.",

        "🕊️ Flying represents freedom, spiritual awakening, and confidence.",
      ];

      const random =
        interpretations[
          Math.floor(
            Math.random() *
              interpretations.length
          )
        ];

      setResult(random);

      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🌌 AI Dream Interpreter
      </Text>

      <Text style={styles.subheading}>
        Describe your dream and receive
        cosmic spiritual insights.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Describe your dream..."
        placeholderTextColor="#94A3B8"
        multiline
        value={dream}
        onChangeText={setDream}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={interpretDream}
      >
        <Text style={styles.buttonText}>
          Interpret Dream
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#A855F7"
          style={{ marginTop: 30 }}
        />
      )}

      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            ✨ Interpretation
          </Text>

          <Text style={styles.resultText}>
            {result}
          </Text>
        </View>
      ) : null}
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
    marginBottom: 14,
  },

  subheading: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 20,
    minHeight: 180,
    color: "white",
    fontSize: 17,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#7C3AED",
    marginTop: 25,
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 25,
    marginTop: 35,
    marginBottom: 60,
  },

  resultTitle: {
    color: "#A855F7",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  resultText: {
    color: "#E5E7EB",
    fontSize: 17,
    lineHeight: 30,
  },
});