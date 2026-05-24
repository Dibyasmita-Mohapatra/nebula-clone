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

export default function StreakCard() {
  const [streak, setStreak] =
    useState(1);

  useEffect(() => {
    updateStreak();
  }, []);

  const updateStreak =
    async () => {
      const today =
        new Date().toDateString();

      const savedDate =
        await AsyncStorage.getItem(
          "lastOpenedDate"
        );

      const savedStreak =
        await AsyncStorage.getItem(
          "streak"
        );

      let currentStreak =
        savedStreak
          ? parseInt(savedStreak)
          : 1;

      if (
        savedDate !== today
      ) {
        currentStreak += 1;

        await AsyncStorage.setItem(
          "streak",
          currentStreak.toString()
        );

        await AsyncStorage.setItem(
          "lastOpenedDate",
          today
        );
      }

      setStreak(currentStreak);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🔥 Spiritual Streak
      </Text>

      <Text style={styles.streak}>
        {streak} Days
      </Text>

      <Text style={styles.subtitle}>
        Keep your cosmic journey alive
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      "#7C3AED",

    borderRadius: 28,

    padding: 24,

    marginBottom: 25,
  },

  title: {
    color: "white",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 12,
  },

  streak: {
    color: "white",

    fontSize: 40,

    fontWeight: "bold",

    marginBottom: 10,
  },

  subtitle: {
    color: "#E9D5FF",

    fontSize: 16,
  },
});