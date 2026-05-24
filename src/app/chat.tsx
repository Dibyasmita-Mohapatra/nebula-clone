import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import axios from "axios";

import FloatingStars from "../components/FloatingStars";

export default function ChatScreen() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    try {
      setReply("✨ Connecting to universe...");

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content:
                "You are a mystical astrology AI assistant. Give short, smart and spiritual answers.",
            },

            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.9,
        },

        {
          headers: {
            Authorization:
              `Bearer ${process.env.EXPO_PUBLIC_GROQ_API_KEY}`,

            "Content-Type":
              "application/json",
          },
        }
      );

      console.log(
        response.data
      );

      setReply(
        response.data.choices[0].message.content
      );
    } catch (error: any) {
      console.log(
        "AI CHAT ERROR FULL:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      setReply(
        "❌ AI failed. Check console."
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FloatingStars />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.heading}>
          🔮 AI Astrologer
        </Text>

        <TextInput
          placeholder="Ask the universe..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={sendMessage}
        >
          <Text style={styles.buttonText}>
            Ask AI
          </Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#C084FC"
            style={{
              marginTop: 30,
            }}
          />
        )}

        {reply ? (
          <View style={styles.replyCard}>
            <Text style={styles.replyTitle}>
              ✨ Cosmic Reading
            </Text>

            <Text style={styles.replyText}>
              {reply}
            </Text>
          </View>
        ) : null}
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

  input: {
    backgroundColor:
      "#111827",

    color: "white",

    borderRadius: 24,

    padding: 20,

    minHeight: 130,

    textAlignVertical: "top",

    fontSize: 16,

    marginBottom: 20,
  },

  button: {
    backgroundColor:
      "#7C3AED",

    paddingVertical: 18,

    borderRadius: 24,

    alignItems: "center",

    shadowColor:
      "#7C3AED",

    shadowOpacity: 0.8,

    shadowRadius: 15,

    elevation: 12,
  },

  buttonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  replyCard: {
    backgroundColor:
      "#111827",

    borderRadius: 28,

    padding: 26,

    marginTop: 30,

    marginBottom: 40,
  },

  replyTitle: {
    color: "#C084FC",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 16,
  },

  replyText: {
    color: "#E5E7EB",

    fontSize: 17,

    lineHeight: 30,
  },
});