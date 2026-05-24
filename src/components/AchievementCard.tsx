import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AchievementCard() {
  const [streak, setStreak] =
    useState(0);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak =
    async () => {
      const savedStreak =
        await AsyncStorage.getItem(
          "streak"
        );

      if (savedStreak) {
        setStreak(
          parseInt(savedStreak)
        );
      }
    };

  const getAchievement =
    () => {
      if (streak >= 30) {
        return {
          title:
            "🌌 Cosmic Master",

          desc:
            "You mastered cosmic discipline.",
        };
      }

      if (streak >= 14) {
        return {
          title:
            "🌙 Moon Child",

          desc:
            "Your spiritual energy is growing.",
        };
      }

      return {
        title:
          "✨ Mystic Beginner",

        desc:
          "Your cosmic journey has begun.",
      };
    };

  const achievement =
    getAchievement();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        🏆 Achievement
      </Text>

      <Text style={styles.title}>
        {achievement.title}
      </Text>

      <Text style={styles.desc}>
        {achievement.desc}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      "#111827",

    borderRadius: 28,

    padding: 24,

    marginBottom: 25,
  },

  heading: {
    color: "#C084FC",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 15,
  },

  title: {
    color: "white",

    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 12,
  },

  desc: {
    color: "#E5E7EB",

    fontSize: 16,

    lineHeight: 26,
  },
});