import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const questions = [
  {
    question:
      "Which zodiac sign is known as the Lion?",
    options: [
      "Cancer",
      "Leo",
      "Pisces",
      "Virgo",
    ],
    answer: "Leo",
  },

  {
    question:
      "Which element belongs to Scorpio?",
    options: [
      "Fire",
      "Water",
      "Air",
      "Earth",
    ],
    answer: "Water",
  },

  {
    question:
      "Which planet rules Aquarius?",
    options: [
      "Venus",
      "Mars",
      "Uranus",
      "Moon",
    ],
    answer: "Uranus",
  },
];

export default function QuizScreen() {
  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [finished, setFinished] =
    useState(false);

  const handleAnswer = (option: string) => {
    if (
      option ===
      questions[current].answer
    ) {
      setScore(score + 1);
    }

    if (
      current + 1 <
      questions.length
    ) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🌌 Zodiac Quiz
      </Text>

      {!finished ? (
        <>
          <View style={styles.card}>
            <Text style={styles.question}>
              {
                questions[current]
                  .question
              }
            </Text>
          </View>

          {questions[current].options.map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() =>
                  handleAnswer(option)
                }
              >
                <Text style={styles.optionText}>
                  {option}
                </Text>
              </TouchableOpacity>
            )
          )}
        </>
      ) : (
        <View style={styles.resultCard}>
          <Text style={styles.score}>
            ✨ Score: {score}/
            {questions.length}
          </Text>

          <Text style={styles.resultText}>
            {score === questions.length
              ? "🌟 Cosmic Master!"
              : score >= 2
              ? "💫 Astrology Expert!"
              : "🌙 Keep exploring the stars!"}
          </Text>
        </View>
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

  card: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 30,
    marginBottom: 30,
  },

  question: {
    color: "white",
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "bold",
  },

  option: {
    backgroundColor: "#7C3AED",
    paddingVertical: 18,
    borderRadius: 22,
    marginBottom: 18,
    alignItems: "center",
  },

  optionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  resultCard: {
    backgroundColor: "#111827",
    borderRadius: 28,
    padding: 35,
    marginTop: 30,
    alignItems: "center",
  },

  score: {
    color: "#A855F7",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },

  resultText: {
    color: "#E5E7EB",
    fontSize: 22,
    textAlign: "center",
    lineHeight: 34,
  },
});