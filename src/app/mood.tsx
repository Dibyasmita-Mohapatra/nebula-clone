import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

import FloatingStars from "../components/FloatingStars";

const moods = [
  "😊 Happy",

  "😔 Sad",

  "😡 Angry",

  "😴 Tired",

  "💖 Loved",

  "😰 Stressed",

  "✨ Motivated",
];

const aiAdvice: any = {
  "😊 Happy":
    "✨ Positive energy surrounds your aura today.",

  "😔 Sad":
    "🌙 Healing energy is slowly restoring emotional balance.",

  "😡 Angry":
    "🔥 Release negative vibrations through calm reflection.",

  "😴 Tired":
    "💤 Your spirit needs rest and spiritual recovery.",

  "💖 Loved":
    "💖 Love vibrations are strengthening your heart chakra.",

  "😰 Stressed":
    "🌌 Deep breathing and cosmic meditation will help you.",

  "✨ Motivated":
    "🚀 Powerful success energy is guiding your ambitions.",
};

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] =
    useState("");

  const [history, setHistory] =
    useState<any[]>([]);

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const saveMood =
    async (mood: string) => {
      setSelectedMood(mood);

      try {
        await addDoc(
          collection(
            db,
            "moods"
          ),
          {
            uid:
              auth.currentUser?.uid,

            mood,

            advice:
              aiAdvice[mood],

            createdAt:
              new Date(),
          }
        );

        loadMoodHistory();
      } catch (error) {
        console.log(error);
      }
    };

  const loadMoodHistory =
    async () => {
      try {
        const q = query(
          collection(db, "moods"),

          where(
            "uid",
            "==",
            auth.currentUser?.uid
          )
        );

        const querySnapshot =
          await getDocs(q);

        const data: any[] = [];

        querySnapshot.forEach(
          (doc) => {
            data.push({
              id: doc.id,

              ...doc.data(),
            });
          }
        );

        setHistory(
          data.reverse()
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <FloatingStars />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Text style={styles.heading}>
          🌙 Mood Tracker
        </Text>

        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood}
              style={styles.moodButton}
              onPress={() =>
                saveMood(mood)
              }
            >
              <Text
                style={
                  styles.moodText
                }
              >
                {mood}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood ? (
          <View style={styles.resultCard}>
            <Text
              style={
                styles.selectedMood
              }
            >
              {selectedMood}
            </Text>

            <Text
              style={styles.advice}
            >
              {
                aiAdvice[
                  selectedMood
                ]
              }
            </Text>
          </View>
        ) : null}

        <Text style={styles.historyTitle}>
          ✨ Mood History
        </Text>

        {history.map((item) => (
          <View
            key={item.id}
            style={
              styles.historyCard
            }
          >
            <Text
              style={
                styles.historyMood
              }
            >
              {item.mood}
            </Text>

            <Text
              style={
                styles.historyAdvice
              }
            >
              {item.advice}
            </Text>
          </View>
        ))}
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

    marginBottom: 30,
  },

  moodContainer: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent:
      "space-between",

    marginBottom: 30,
  },

  moodButton: {
    backgroundColor:
      "#7C3AED",

    width: "48%",

    paddingVertical: 18,

    borderRadius: 20,

    alignItems: "center",

    marginBottom: 15,
  },

  moodText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor:
      "#111827",

    borderRadius: 24,

    padding: 24,

    marginBottom: 30,
  },

  selectedMood: {
    color: "#C084FC",

    fontSize: 26,

    fontWeight: "bold",

    marginBottom: 15,
  },

  advice: {
    color: "#E5E7EB",

    fontSize: 17,

    lineHeight: 28,
  },

  historyTitle: {
    color: "white",

    fontSize: 26,

    fontWeight: "bold",

    marginBottom: 20,
  },

  historyCard: {
    backgroundColor:
      "#111827",

    borderRadius: 22,

    padding: 20,

    marginBottom: 18,
  },

  historyMood: {
    color: "#A855F7",

    fontSize: 20,

    fontWeight: "bold",

    marginBottom: 10,
  },

  historyAdvice: {
    color: "#E5E7EB",

    fontSize: 16,

    lineHeight: 26,
  },
});