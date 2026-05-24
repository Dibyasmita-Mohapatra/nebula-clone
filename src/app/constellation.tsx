import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import Svg, {
  Circle,
  Line,
} from "react-native-svg";

export default function ConstellationScreen() {
  return (
    <View style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text style={styles.heading}>
          ✨ Constellation Explorer
        </Text>

        <View style={styles.chart}>
          <Svg width="320" height="320">
            {/* Stars */}

            <Circle
              cx="50"
              cy="60"
              r="5"
              fill="white"
            />

            <Circle
              cx="120"
              cy="100"
              r="6"
              fill="white"
            />

            <Circle
              cx="180"
              cy="70"
              r="5"
              fill="white"
            />

            <Circle
              cx="250"
              cy="130"
              r="6"
              fill="white"
            />

            <Circle
              cx="210"
              cy="220"
              r="5"
              fill="white"
            />

            <Circle
              cx="120"
              cy="250"
              r="6"
              fill="white"
            />

            {/* Lines */}

            <Line
              x1="50"
              y1="60"
              x2="120"
              y2="100"
              stroke="#A855F7"
              strokeWidth="2"
            />

            <Line
              x1="120"
              y1="100"
              x2="180"
              y2="70"
              stroke="#A855F7"
              strokeWidth="2"
            />

            <Line
              x1="180"
              y1="70"
              x2="250"
              y2="130"
              stroke="#A855F7"
              strokeWidth="2"
            />

            <Line
              x1="250"
              y1="130"
              x2="210"
              y2="220"
              stroke="#A855F7"
              strokeWidth="2"
            />

            <Line
              x1="210"
              y1="220"
              x2="120"
              y2="250"
              stroke="#A855F7"
              strokeWidth="2"
            />
          </Svg>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            🌌 Orion Constellation
          </Text>

          <Text style={styles.text}>
            Orion symbolizes strength,
            courage, adventure, and
            cosmic exploration.
            Ancient astrologers
            believed Orion guided
            warriors and dreamers.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            ✨ Spiritual Meaning
          </Text>

          <Text style={styles.text}>
            Constellations represent
            universal patterns,
            destiny, and celestial
            guidance throughout
            human history.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  chart: {
    backgroundColor: "#111827",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
  },

  title: {
    color: "#A855F7",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  text: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 28,
  },
});