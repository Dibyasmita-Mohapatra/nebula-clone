import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  const handleContinue = async () => {
    const month = parseInt(
      birthDate.split("/")[1]
    );

    const day = parseInt(
      birthDate.split("/")[0]
    );

    let zodiac = "";

    if (
      (month === 3 && day >= 21) ||
      (month === 4 && day <= 19)
    ) {
      zodiac = "Aries";
    } else if (
      (month === 4 && day >= 20) ||
      (month === 5 && day <= 20)
    ) {
      zodiac = "Taurus";
    } else if (
      (month === 5 && day >= 21) ||
      (month === 6 && day <= 20)
    ) {
      zodiac = "Gemini";
    } else if (
      (month === 6 && day >= 21) ||
      (month === 7 && day <= 22)
    ) {
      zodiac = "Cancer";
    } else if (
      (month === 7 && day >= 23) ||
      (month === 8 && day <= 22)
    ) {
      zodiac = "Leo";
    } else if (
      (month === 8 && day >= 23) ||
      (month === 9 && day <= 22)
    ) {
      zodiac = "Virgo";
    } else if (
      (month === 9 && day >= 23) ||
      (month === 10 && day <= 22)
    ) {
      zodiac = "Libra";
    } else if (
      (month === 10 && day >= 23) ||
      (month === 11 && day <= 21)
    ) {
      zodiac = "Scorpio";
    } else if (
      (month === 11 && day >= 22) ||
      (month === 12 && day <= 21)
    ) {
      zodiac = "Sagittarius";
    } else if (
      (month === 12 && day >= 22) ||
      (month === 1 && day <= 19)
    ) {
      zodiac = "Capricorn";
    } else if (
      (month === 1 && day >= 20) ||
      (month === 2 && day <= 18)
    ) {
      zodiac = "Aquarius";
    } else {
      zodiac = "Pisces";
    }

    const userData = {
      name,
      birthDate,
      birthTime,
      birthPlace,
      zodiac,
    };

    await AsyncStorage.setItem(
      "userProfile",
      JSON.stringify(userData)
    );

    alert(
      `✨ Welcome ${name}\n\nYour Zodiac Sign is ${zodiac}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        ✨ Cosmic Profile
      </Text>

      <Text style={styles.subheading}>
        Discover your astrological identity
      </Text>

      <TextInput
        placeholder="Your Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Birth Date (DD/MM/YYYY)"
        placeholderTextColor="#999"
        style={styles.input}
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TextInput
        placeholder="Birth Time"
        placeholderTextColor="#999"
        style={styles.input}
        value={birthTime}
        onChangeText={setBirthTime}
      />

      <TextInput
        placeholder="Birth Place"
        placeholderTextColor="#999"
        style={styles.input}
        value={birthPlace}
        onChangeText={setBirthPlace}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
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
    backgroundColor: "#0B1020",
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  heading: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subheading: {
    color: "#D1D5DB",
    fontSize: 18,
    marginBottom: 40,
  },

  input: {
    backgroundColor: "#1F2937",
    color: "white",
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 58,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#7C3AED",
    height: 58,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});