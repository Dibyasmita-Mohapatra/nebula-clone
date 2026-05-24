import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";

const auraTypes = [
  {
    color: "#A855F7",
    name: "Purple Aura",
    meaning:
      "✨ Spiritual wisdom and cosmic intuition surround your energy.",
  },

  {
    color: "#EC4899",
    name: "Pink Aura",
    meaning:
      "💖 Love, emotional healing, and compassion are powerful within you.",
  },

  {
    color: "#3B82F6",
    name: "Blue Aura",
    meaning:
      "🌊 Calmness, intelligence, and emotional balance guide your spirit.",
  },

  {
    color: "#22C55E",
    name: "Green Aura",
    meaning:
      "🌿 Growth, healing, and personal transformation are unfolding.",
  },

  {
    color: "#F59E0B",
    name: "Golden Aura",
    meaning:
      "☀️ Confidence, abundance, and powerful life energy radiate from you.",
  },
];

export default function AuraScreen() {
  const [selectedAura, setSelectedAura] =
    useState<any>(null);

  const glowAnim = useRef(
    new Animated.Value(0.8)
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),

        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const detectAura = () => {
    const random =
      auraTypes[
        Math.floor(
          Math.random() * auraTypes.length
        )
      ];

    setSelectedAura(random);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🌌 Aura Reading
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={detectAura}
      >
        <Text style={styles.buttonText}>
          Detect My Aura
        </Text>
      </TouchableOpacity>

      {selectedAura && (
        <>
          <Animated.View
            style={[
              styles.auraCircle,
              {
                backgroundColor:
                  selectedAura.color,

                opacity: glowAnim,

                transform: [
                  {
                    scale: glowAnim,
                  },
                ],
              },
            ]}
          />

          <View style={styles.card}>
            <Text style={styles.auraName}>
              {selectedAura.name}
            </Text>

            <Text style={styles.meaning}>
              {selectedAura.meaning}
            </Text>
          </View>
        </>
      )}
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
    marginBottom: 40,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  auraCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignSelf: "center",

    shadowColor: "#FFFFFF",
    shadowOpacity: 1,
    shadowRadius: 35,

    elevation: 30,

    marginBottom: 40,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 28,
    marginBottom: 60,
  },

  auraName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },

  meaning: {
    color: "#E5E7EB",
    fontSize: 17,
    lineHeight: 30,
  },
});