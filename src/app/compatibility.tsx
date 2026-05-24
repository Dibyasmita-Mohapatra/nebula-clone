import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import FloatingStars from "../components/FloatingStars";

const zodiacSigns = [
  { name: "Aries", emoji: "♈" },
  { name: "Taurus", emoji: "♉" },
  { name: "Gemini", emoji: "♊" },
  { name: "Cancer", emoji: "♋" },
  { name: "Leo", emoji: "♌" },
  { name: "Virgo", emoji: "♍" },
  { name: "Libra", emoji: "♎" },
  { name: "Scorpio", emoji: "♏" },
  {
    name: "Sagittarius",
    emoji: "♐",
  },
  {
    name: "Capricorn",
    emoji: "♑",
  },
  { name: "Aquarius", emoji: "♒" },
  { name: "Pisces", emoji: "♓" },
];

export default function MatchScreen() {
  const [yourSign, setYourSign] =
    useState("Scorpio");

  const [partnerSign, setPartnerSign] =
    useState("Leo");

  const getCompatibility = () => {
    if (
      yourSign === "Scorpio" &&
      partnerSign === "Leo"
    ) {
      return {
        score: "92%",

        text:
          "🔥 Powerful emotional attraction with intense passion.",

        energy:
          "Cosmic flames create magnetic chemistry and emotional depth.",
      };
    }

    if (
      yourSign === "Cancer" &&
      partnerSign === "Pisces"
    ) {
      return {
        score: "98%",

        text:
          "💖 Deep emotional and spiritual connection.",

        energy:
          "Your souls naturally understand each other emotionally.",
      };
    }

    return {
      score: "76%",

      text:
        "✨ Balanced cosmic energy with strong growth potential.",

      energy:
        "Patience and communication will strengthen this connection.",
    };
  };

  const result = getCompatibility();

  return (
    <View style={{ flex: 1 }}>
      <FloatingStars />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text style={styles.heading}>
          💖 Cosmic Compatibility
        </Text>

        <LinearGradient
          colors={[
            "#7C3AED",
            "#312E81",
          ]}
          style={styles.topCard}
        >
          <Text style={styles.topTitle}>
            ✨ Soul Connection
          </Text>

          <Text style={styles.topText}>
            Discover the spiritual
            bond between two zodiac
            energies.
          </Text>
        </LinearGradient>

        <Text style={styles.label}>
          🌙 Your Zodiac
        </Text>

        <View style={styles.grid}>
          {zodiacSigns.map(
            (sign) => (
              <TouchableOpacity
                key={sign.name}
                style={[
                  styles.card,

                  yourSign ===
                    sign.name &&
                    styles.activeCard,
                ]}
                onPress={() =>
                  setYourSign(
                    sign.name
                  )
                }
              >
                <Text
                  style={
                    styles.emoji
                  }
                >
                  {sign.emoji}
                </Text>

                <Text
                  style={
                    styles.cardText
                  }
                >
                  {sign.name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text style={styles.label}>
          💫 Partner Zodiac
        </Text>

        <View style={styles.grid}>
          {zodiacSigns.map(
            (sign) => (
              <TouchableOpacity
                key={sign.name}
                style={[
                  styles.card,

                  partnerSign ===
                    sign.name &&
                    styles.activeCard,
                ]}
                onPress={() =>
                  setPartnerSign(
                    sign.name
                  )
                }
              >
                <Text
                  style={
                    styles.emoji
                  }
                >
                  {sign.emoji}
                </Text>

                <Text
                  style={
                    styles.cardText
                  }
                >
                  {sign.name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <LinearGradient
          colors={[
            "#111827",
            "#1E1B4B",
          ]}
          style={styles.resultCard}
        >
          <Text style={styles.matchTitle}>
            🔮 Match Result
          </Text>

          <Text style={styles.score}>
            {result.score}
          </Text>

          <View
            style={styles.progressBar}
          >
            <View
              style={[
                styles.progressFill,

                {
                  width:
                    result.score,
                },
              ]}
            />
          </View>

          <Text
            style={
              styles.resultText
            }
          >
            {result.text}
          </Text>

          <View
            style={
              styles.energyBox
            }
          >
            <Text
              style={
                styles.energyTitle
              }
            >
              🌌 Cosmic Energy
            </Text>

            <Text
              style={
                styles.energyText
              }
            >
              {result.energy}
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

    marginBottom: 25,
  },

  topCard: {
    borderRadius: 28,

    padding: 25,

    marginBottom: 30,
  },

  topTitle: {
    color: "white",

    fontSize: 26,

    fontWeight: "bold",

    marginBottom: 12,
  },

  topText: {
    color: "#E5E7EB",

    fontSize: 16,

    lineHeight: 26,
  },

  label: {
    color: "#CBD5E1",

    fontSize: 20,

    marginBottom: 18,

    marginTop: 10,

    fontWeight: "bold",
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent:
      "space-between",
  },

  card: {
    width: "47%",

    backgroundColor:
      "#111827",

    borderRadius: 22,

    paddingVertical: 20,

    alignItems: "center",

    marginBottom: 14,

    borderWidth: 1,

    borderColor: "#1E293B",
  },

  activeCard: {
    backgroundColor:
      "#7C3AED",

    borderColor: "#C084FC",
  },

  emoji: {
    fontSize: 28,

    marginBottom: 8,
  },

  cardText: {
    color: "white",

    fontSize: 16,

    fontWeight: "bold",
  },

  resultCard: {
    borderRadius: 30,

    padding: 30,

    marginTop: 30,

    marginBottom: 40,
  },

  matchTitle: {
    color: "#C084FC",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,

    textAlign: "center",
  },

  score: {
    color: "white",

    fontSize: 58,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,
  },

  progressBar: {
    height: 14,

    backgroundColor:
      "#1E293B",

    borderRadius: 20,

    overflow: "hidden",

    marginBottom: 25,
  },

  progressFill: {
    height: "100%",

    backgroundColor:
      "#A855F7",

    borderRadius: 20,
  },

  resultText: {
    color: "#E5E7EB",

    fontSize: 18,

    textAlign: "center",

    lineHeight: 30,

    marginBottom: 25,
  },

  energyBox: {
    backgroundColor:
      "#0F172A",

    borderRadius: 22,

    padding: 20,
  },

  energyTitle: {
    color: "#C084FC",

    fontSize: 20,

    fontWeight: "bold",

    marginBottom: 12,
  },

  energyText: {
    color: "#CBD5E1",

    fontSize: 16,

    lineHeight: 26,
  },
});