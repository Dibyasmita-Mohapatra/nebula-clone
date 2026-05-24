import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const cosmicEvents = [
  {
    date: "12 May",
    title: "🌕 Full Moon",
    desc:
      "Powerful emotional clarity and manifestation energy.",
  },

  {
    date: "18 May",
    title: "☿️ Mercury Shift",
    desc:
      "Communication and decision-making become stronger.",
  },

  {
    date: "24 May",
    title: "♀️ Venus Alignment",
    desc:
      "Love, beauty, and relationships gain positive energy.",
  },

  {
    date: "30 May",
    title: "🪐 Saturn Energy",
    desc:
      "Discipline and long-term growth become important.",
  },
];

export default function CalendarScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        📅 Astrology Calendar
      </Text>

      {cosmicEvents.map((event, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.date}>
            {event.date}
          </Text>

          <Text style={styles.title}>
            {event.title}
          </Text>

          <Text style={styles.desc}>
            {event.desc}
          </Text>
        </View>
      ))}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          🌌 Cosmic Guidance
        </Text>

        <Text style={styles.infoText}>
          Planetary alignments and lunar
          phases influence emotions,
          relationships, communication,
          and spiritual growth.
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

  card: {
    backgroundColor: "#111827",
    borderRadius: 26,
    padding: 24,
    marginBottom: 18,
  },

  date: {
    color: "#A855F7",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  desc: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 28,
  },

  infoCard: {
    backgroundColor: "#1E1B4B",
    borderRadius: 28,
    padding: 24,
    marginTop: 15,
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