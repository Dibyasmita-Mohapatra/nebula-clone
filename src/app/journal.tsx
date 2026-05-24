import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

export default function JournalScreen() {
  const [text, setText] =
    useState("");

  const [entries, setEntries] =
    useState<any[]>([]);

  const [analysis, setAnalysis] =
    useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  const analyzeMoodAI = async (
    journalText: string
  ) => {
    try {
      const response =
        await fetch(
          "http://192.168.162.120:5000/analyze-mood",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              text: journalText,
            }),
          }
        );

      const data =
        await response.json();

      setAnalysis(data.reply);
    } catch (error) {
      console.log(error);
    }
  };

  const saveJournal = async () => {
    if (!text) {
      Alert.alert(
        "Error",
        "Write something first"
      );

      return;
    }

    try {
      await addDoc(
        collection(db, "journals"),
        {
          uid:
            auth.currentUser?.uid,

          text,

          createdAt:
            new Date(),
        }
      );

      Alert.alert(
        "Saved 🚀",
        "Journal saved to cloud"
      );

      setText("");

      await analyzeMoodAI(text);

      loadEntries();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to save journal"
      );
    }
  };

  const loadEntries = async () => {
    try {
      const q = query(
        collection(db, "journals"),

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

      setEntries(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
    >
      <Text style={styles.heading}>
        📖 Cosmic Journal
      </Text>

      <TextInput
        placeholder="Write your thoughts..."
        placeholderTextColor="#94A3B8"
        multiline
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveJournal}
      >
        <Text style={styles.buttonText}>
          Save Journal
        </Text>
      </TouchableOpacity>

      {analysis ? (
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>
            🧠 AI Mood Analysis
          </Text>

          <Text style={styles.aiText}>
            {analysis}
          </Text>
        </View>
      ) : null}

      {entries.map((item) => (
        <View
          key={item.id}
          style={styles.card}
        >
          <Text style={styles.cardText}>
            {item.text}
          </Text>
        </View>
      ))}
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
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#111827",
    color: "white",
    borderRadius: 22,
    padding: 20,
    height: 160,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#7C3AED",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
  },

  cardText: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 26,
  },

  aiCard: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 22,
    marginBottom: 25,
  },

  aiTitle: {
    color: "#A855F7",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  aiText: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 26,
  },
});