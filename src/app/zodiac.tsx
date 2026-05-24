import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export default function ZodiacScreen() {
  const [selected, setSelected] =
    useState("");

  const saveZodiac = async () => {
    if (!selected) {
      Alert.alert(
        "Please select your zodiac sign"
      );

      return;
    }

    const userProfile = {
      zodiac: selected,
    };

    await AsyncStorage.setItem(
      "userProfile",
      JSON.stringify(userProfile)
    );

    router.push("/horoscope");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        ✨ Choose Your Zodiac
      </Text>

      {zodiacSigns.map((sign) => (
        <TouchableOpacity
          key={sign}
          style={[
            styles.card,

            selected === sign &&
              styles.selectedCard,
          ]}
          onPress={() => setSelected(sign)}
        >
          <Text style={styles.cardText}>
            {sign}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={saveZodiac}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#111827",
    padding: 22,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedCard: {
    borderColor: "#A855F7",
    backgroundColor: "#312E81",
  },

  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#9333EA",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});