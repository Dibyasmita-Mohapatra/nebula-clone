import React, {
  useEffect,
  useRef,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

export default function MoonScreen() {
  const glowAnim = useRef(
    new Animated.Value(0.7)
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),

        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        🌕 Moon Energy
      </Text>

      <Animated.View
        style={[
          styles.moon,
          {
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
        <Text style={styles.phase}>
          Full Moon
        </Text>

        <Text style={styles.text}>
          ✨ Emotional energy is amplified
          today. A powerful moment for
          manifestation, reflection, and
          spiritual growth.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          🌙 Spiritual Meaning
        </Text>

        <Text style={styles.infoText}>
          The Full Moon symbolizes
          completion, emotional clarity,
          intuition, and cosmic alignment.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  heading: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
  },

  moon: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F8FAFC",

    shadowColor: "#FFFFFF",
    shadowOpacity: 1,
    shadowRadius: 35,

    elevation: 30,

    marginBottom: 50,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 28,
    width: "100%",
    marginBottom: 22,
  },

  phase: {
    color: "#A855F7",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },

  text: {
    color: "#E5E7EB",
    fontSize: 17,
    lineHeight: 30,
  },

  infoBox: {
    backgroundColor: "#1E1B4B",
    borderRadius: 28,
    padding: 25,
    width: "100%",
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