import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const planets = [
  {
    name: "Mercury",
    emoji: "☿️",
    color: "#94A3B8",
    meaning:
      "Communication, intelligence, and quick thinking.",
  },

  {
    name: "Venus",
    emoji: "♀️",
    color: "#EC4899",
    meaning:
      "Love, beauty, attraction, and emotional harmony.",
  },

  {
    name: "Mars",
    emoji: "♂️",
    color: "#EF4444",
    meaning:
      "Energy, courage, ambition, and passion.",
  },

  {
    name: "Jupiter",
    emoji: "♃",
    color: "#F59E0B",
    meaning:
      "Luck, expansion, abundance, and wisdom.",
  },

  {
    name: "Saturn",
    emoji: "♄",
    color: "#6366F1",
    meaning:
      "Discipline, karma, structure, and growth.",
  },
];

export default function PlanetScreen() {
  const [selectedPlanet, setSelectedPlanet] =
    useState<any>(planets[0]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🪐 Planet Explorer
      </Text>

      <View style={styles.planetRow}>
        {planets.map((planet, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.planetButton,
              {
                backgroundColor:
                  planet.color,
              },
            ]}
            onPress={() =>
              setSelectedPlanet(planet)
            }
          >
            <Text style={styles.planetEmoji}>
              {planet.emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.planetName}>
          {selectedPlanet.name}
        </Text>

        <Text style={styles.meaning}>
          {selectedPlanet.meaning}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          ✨ Astrological Influence
        </Text>

        <Text style={styles.infoText}>
          Planetary energies influence human
          emotions, decisions, relationships,
          and spiritual growth throughout
          life.
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

  planetRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  planetButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  planetEmoji: {
    fontSize: 34,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 28,
    marginBottom: 22,
  },

  planetName: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },

  meaning: {
    color: "#E5E7EB",
    fontSize: 17,
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