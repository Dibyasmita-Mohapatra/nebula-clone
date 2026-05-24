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
  ActivityIndicator,
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

const tarotCards = [
  "The Fool",

  "The Lovers",

  "The Star",

  "The Moon",

  "The Sun",

  "Death",

  "The Devil",

  "Wheel of Fortune",

  "Justice",

  "The Hermit",
];

const aiReadings: any = {
  "The Fool":
    "🌟 A fresh beginning is entering your life. Trust the universe and embrace new opportunities.",

  "The Lovers":
    "💖 Emotional harmony and deep romantic energy surround your aura.",

  "The Star":
    "✨ Hope and healing are guiding your spiritual journey.",

  "The Moon":
    "🌙 Hidden truths and intuition are becoming stronger.",

  "The Sun":
    "☀️ Success, happiness, and positive energy are approaching.",

  Death:
    "🦂 Transformation is happening. A powerful new chapter is beginning.",

  "The Devil":
    "🔥 Release toxic energy and reclaim your personal power.",

  "Wheel of Fortune":
    "🎡 Major destiny shifts are arriving unexpectedly.",

  Justice:
    "⚖️ Karma and truth are balancing your life.",

  "The Hermit":
    "🕯️ Self-reflection will reveal spiritual wisdom.",
};

export default function TarotScreen() {
  const [selectedCard, setSelectedCard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [history, setHistory] =
    useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const drawCard = async () => {
    setLoading(true);

    const randomCard =
      tarotCards[
        Math.floor(
          Math.random() *
            tarotCards.length
        )
      ];

    const reading =
      aiReadings[randomCard];

    setSelectedCard({
      name: randomCard,

      meaning: reading,
    });

    try {
      await addDoc(
        collection(
          db,
          "tarotReadings"
        ),
        {
          uid:
            auth.currentUser?.uid,

          card: randomCard,

          reading,

          createdAt:
            new Date(),
        }
      );

      loadHistory();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const loadHistory =
    async () => {
      try {
        const q = query(
          collection(
            db,
            "tarotReadings"
          ),

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
          🔮 AI Tarot Reading
        </Text>

        <TouchableOpacity
          style={styles.cardBack}
          onPress={drawCard}
        >
          <Text
            style={
              styles.cardBackText
            }
          >
            Tap To Reveal Your Fate
          </Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#A855F7"
          />
        )}

        {selectedCard && (
          <View
            style={
              styles.resultCard
            }
          >
            <Text
              style={
                styles.cardName
              }
            >
              {
                selectedCard.name
              }
            </Text>

            <Text
              style={
                styles.meaning
              }
            >
              {
                selectedCard.meaning
              }
            </Text>
          </View>
        )}

        <Text style={styles.historyTitle}>
          ✨ Reading History
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
                styles.historyName
              }
            >
              {item.card}
            </Text>

            <Text
              style={
                styles.historyText
              }
            >
              {item.reading}
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

    marginBottom: 35,
  },

  cardBack: {
    height: 260,

    borderRadius: 30,

    backgroundColor:
      "#7C3AED",

    justifyContent:
      "center",

    alignItems: "center",

    marginBottom: 30,
  },

  cardBackText: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    textAlign: "center",

    paddingHorizontal: 20,
  },

  resultCard: {
    backgroundColor:
      "#111827",

    borderRadius: 28,

    padding: 28,

    marginBottom: 30,
  },

  cardName: {
    color: "#A855F7",

    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 18,
  },

  meaning: {
    color: "#E5E7EB",

    fontSize: 18,

    lineHeight: 30,
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

  historyName: {
    color: "#C084FC",

    fontSize: 20,

    fontWeight: "bold",

    marginBottom: 10,
  },

  historyText: {
    color: "#E5E7EB",

    fontSize: 16,

    lineHeight: 26,
  },
});