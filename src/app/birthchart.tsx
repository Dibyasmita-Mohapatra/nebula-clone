import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import FloatingStars from "../components/FloatingStars";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

export default function BirthChartScreen() {
  const [name, setName] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [place, setPlace] =
    useState("");

  const [chart, setChart] =
    useState<any>(null);

  const generateChart = () => {
    const charts = [
      {
        sun: "Leo ☀️",

        moon: "Pisces 🌙",

        rising:
          "Scorpio ⬆️",

        compatibility:
          "Aries ❤️",

        cosmicScore: 92,

        planets:
          "Mercury in Leo\nVenus in Libra\nMars in Scorpio",

        personality:
          "You are charismatic, emotionally intuitive, and spiritually intense.",
      },

      {
        sun: "Scorpio ☀️",

        moon: "Cancer 🌙",

        rising:
          "Aquarius ⬆️",

        compatibility:
          "Pisces ❤️",

        cosmicScore: 95,

        planets:
          "Mercury in Scorpio\nVenus in Virgo\nMars in Aries",

        personality:
          "You possess emotional depth, mystery, and strong cosmic intuition.",
      },

      {
        sun: "Gemini ☀️",

        moon: "Libra 🌙",

        rising:
          "Sagittarius ⬆️",

        compatibility:
          "Leo ❤️",

        cosmicScore: 88,

        planets:
          "Mercury in Gemini\nVenus in Taurus\nMars in Capricorn",

        personality:
          "You are intellectually curious, social, and adventurous.",
      },
    ];

    const randomChart =
      charts[
        Math.floor(
          Math.random() *
            charts.length
        )
      ];

    setChart(randomChart);
  };

  const saveChart =
    async () => {
      try {
        await addDoc(
          collection(
            db,
            "birthCharts"
          ),
          {
            uid:
              auth.currentUser
                ?.uid,

            name,

            date,

            time,

            place,

            chart,

            createdAt:
              new Date(),
          }
        );

        Alert.alert(
          "Success",
          "Birth Chart Saved 🌌"
        );
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Failed to save chart"
        );
      }
    };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <FloatingStars />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 180,
        }}
      >
        <Text style={styles.heading}>
          🌌 AI Birth Chart
        </Text>

        <TextInput
          placeholder="Your Name"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Birth Date"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          placeholder="Birth Time"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={time}
          onChangeText={setTime}
        />

        <TextInput
          placeholder="Birth Place"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={place}
          onChangeText={setPlace}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={
            generateChart
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Generate Chart
          </Text>
        </TouchableOpacity>

        {chart && (
          <View
            style={
              styles.resultCard
            }
          >
            <Text
              style={
                styles.resultTitle
              }
            >
              ✨ Cosmic Identity
            </Text>

            <Text
              style={
                styles.resultText
              }
            >
              {chart.sun}
            </Text>

            <Text
              style={
                styles.resultText
              }
            >
              {chart.moon}
            </Text>

            <Text
              style={
                styles.resultText
              }
            >
              {chart.rising}
            </Text>

            <View
              style={
                styles.scoreCard
              }
            >
              <Text
                style={
                  styles.scoreText
                }
              >
                🌌 Cosmic Score:
                {" "}
                {
                  chart.cosmicScore
                }
                %
              </Text>
            </View>

            <View
              style={
                styles.planetCard
              }
            >
              <Text
                style={
                  styles.planetTitle
                }
              >
                🪐 Planet
                Positions
              </Text>

              <Text
                style={
                  styles.personality
                }
              >
                {
                  chart.planets
                }
              </Text>
            </View>

            <View
              style={
                styles.planetCard
              }
            >
              <Text
                style={
                  styles.planetTitle
                }
              >
                ❤️ Compatibility
              </Text>

              <Text
                style={
                  styles.personality
                }
              >
                {
                  chart.compatibility
                }
              </Text>
            </View>

            <Text
              style={
                styles.personality
              }
            >
              {
                chart.personality
              }
            </Text>

            <TouchableOpacity
              style={
                styles.saveButton
              }
              onPress={
                saveChart
              }
            >
              <Text
                style={
                  styles.saveText
                }
              >
                Save Birth Chart
                🚀
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        "#020617",

      paddingTop: 60,

      paddingHorizontal: 20,
    },

    heading: {
      color: "white",

      fontSize: 34,

      fontWeight: "bold",

      marginBottom: 30,
    },

    input: {
      backgroundColor:
        "#111827",

      color: "white",

      borderRadius: 20,

      padding: 18,

      fontSize: 16,

      marginBottom: 18,
    },

    button: {
      backgroundColor:
        "#7C3AED",

      paddingVertical: 18,

      borderRadius: 22,

      alignItems: "center",

      marginBottom: 30,

      shadowColor:
        "#7C3AED",

      shadowOpacity: 0.8,

      shadowRadius: 20,

      elevation: 15,
    },

    buttonText: {
      color: "white",

      fontSize: 18,

      fontWeight: "bold",
    },

    resultCard: {
      backgroundColor:
        "#111827",

      borderRadius: 28,

      padding: 28,

      shadowColor:
        "#7C3AED",

      shadowOpacity: 0.6,

      shadowRadius: 18,

      elevation: 12,
    },

    resultTitle: {
      color: "#C084FC",

      fontSize: 28,

      fontWeight: "bold",

      marginBottom: 20,
    },

    resultText: {
      color: "white",

      fontSize: 20,

      marginBottom: 12,
    },

    personality: {
      color: "#E5E7EB",

      fontSize: 17,

      lineHeight: 30,

      marginTop: 18,
    },

    scoreCard: {
      backgroundColor:
        "#7C3AED",

      borderRadius: 20,

      padding: 18,

      marginTop: 20,

      marginBottom: 20,
    },

    scoreText: {
      color: "white",

      fontSize: 20,

      fontWeight: "bold",

      textAlign: "center",
    },

    planetCard: {
      backgroundColor:
        "#1E1B4B",

      borderRadius: 22,

      padding: 20,

      marginBottom: 20,
    },

    planetTitle: {
      color: "#C084FC",

      fontSize: 22,

      fontWeight: "bold",

      marginBottom: 12,
    },

    saveButton: {
      backgroundColor:
        "#7C3AED",

      paddingVertical: 18,

      borderRadius: 22,

      alignItems: "center",

      marginTop: 25,
    },

    saveText: {
      color: "white",

      fontSize: 18,

      fontWeight: "bold",
    },
  });