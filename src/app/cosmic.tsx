import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
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

import * as Speech from "expo-speech";

const cosmicMessages = [
  "✨ A major emotional breakthrough is approaching.",

  "🌙 Trust your intuition today. Cosmic energy is strong.",

  "💖 Love vibrations are surrounding your aura.",

  "🔥 Your confidence will attract powerful opportunities.",

  "🌌 Spiritual transformation is beginning.",
];

export default function CosmicScreen() {
  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

  const [memory, setMemory] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [
    personalityMode,
    setPersonalityMode,
  ] = useState(
    "Mystic Oracle"
  );

  const [listening, setListening] =
    useState(false);

  const todayMessage =
    cosmicMessages[
      new Date().getDate() %
        cosmicMessages.length
    ];

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const q = query(
        collection(db, "aiChats"),

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

      setMessages(data.reverse());

      setMemory(
        data.slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startVoiceRecognition =
    async () => {
      try {
        const SpeechRecognitionAPI =
          (window as any)
            .webkitSpeechRecognition;

        if (!SpeechRecognitionAPI) {
          Alert.alert(
            "Use Google Chrome for voice AI"
          );

          return;
        }

        const recognition =
          new SpeechRecognitionAPI();

        recognition.lang = "en-US";

        recognition.continuous = false;

        recognition.interimResults = false;

        setListening(true);

        recognition.start();

        recognition.onstart = () => {
          console.log(
            "Voice started"
          );
        };

        recognition.onresult =
          async (event: any) => {
            const transcript =
              event.results[0][0]
                .transcript;

            console.log(
              "Transcript:",
              transcript
            );

            setInput(transcript);

            setListening(false);

            try {
              setLoading(true);

              const response =
                await fetch(
                  "http://192.168.162.120:5000/chat",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      message:
                        transcript,

                      personalityMode,
                    }),
                  }
                );

              const data =
                await response.json();

              Speech.speak(
                data.reply
              );

              const newMessage = {
                id: Date.now().toString(),

                userMessage:
                  transcript,

                aiReply:
                  data.reply,
              };

              setMessages(
                (prev) => [
                  newMessage,
                  ...prev,
                ]
              );

              await addDoc(
                collection(db, "aiChats"),
                {
                  uid:
                    auth.currentUser?.uid,

                  userMessage: input,

                  aiReply: data.reply,

                  mood:
                    "Spiritual Reflection",

                  zodiac:
                    "Scorpio",

                  personalityMode:
                    "Mystic Oracle",

                  createdAt: new Date(),
                }
              );
            } catch (error) {
              console.log(error);

              Alert.alert(
                "AI request failed"
              );
            }

            setLoading(false);
          };

        recognition.onerror =
          (event: any) => {
            console.log(
              "Speech Error:",
              event.error
            );

            setListening(false);

            Alert.alert(
              "Speech Error",
              event.error
            );
          };

        recognition.onend = () => {
          setListening(false);

          console.log(
            "Voice ended"
          );
        };
      } catch (error) {
        console.log(error);

        setListening(false);
      }
    };

  const sendMessage = async () => {
    if (!input) {
      Alert.alert(
        "Error",
        "Write something first"
      );

      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "http://192.168.162.120:5000/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message: input,
            }),
          }
        );

      const data =
        await response.json();

      Speech.speak(data.reply);

      await addDoc(
        collection(db, "aiChats"),
        {
          uid:
            auth.currentUser?.uid,

          userMessage: input,

          aiReply: data.reply,

          createdAt: new Date(),
        }
      );

      setInput("");

      loadMessages();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "AI request failed"
      );
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        🔮 Cosmic AI
      </Text>

      <Text
        style={{
          color: "#C084FC",

          fontSize: 18,

          marginBottom: 20,
        }}
      >
        Active Mode:
        {" "}
        {personalityMode}
      </Text>

      <View style={styles.card}>
        <Text style={styles.message}>
          {todayMessage}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.title}>
          🌠 Energy Reading
        </Text>

        <Text style={styles.text}>
          The universe is aligning emotional
          clarity and personal transformation
          into your spiritual journey today.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        style={{
          marginBottom: 20,
        }}
      >
        {[
          "Mystic Oracle",

          "Love Guru",

          "Spiritual Healer",

          "Dream Interpreter",
        ].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={{
              backgroundColor:
                personalityMode === mode
                  ? "#7C3AED"
                  : "#111827",

              paddingHorizontal: 20,

              paddingVertical: 12,

              borderRadius: 20,

              marginRight: 12,
            }}
            onPress={() =>
              setPersonalityMode(
                mode
              )
            }
          >
            <Text
              style={{
                color: "white",

                fontWeight: "bold",
              }}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Ask Cosmic AI..."
        placeholderTextColor="#94A3B8"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={sendMessage}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.voiceButton}
        onPress={startVoiceRecognition}
      >
        <Text style={styles.buttonText}>
          {listening
            ? "Listening..."
            : "🎙️ Voice Input"}
        </Text>
      </TouchableOpacity>

      {memory.length > 0 && (
        <View
          style={styles.memoryCard}
        >
          <Text
            style={styles.memoryTitle}
          >
            🧠 AI Memory
          </Text>

          {memory.map(
            (item, index) => (
              <Text
                key={index}
                style={styles.memoryText}
              >
                • {item.userMessage}
              </Text>
            )
          )}
        </View>
      )}

      {messages.map((item) => (
        <View
          key={item.id}
          style={styles.chatCard}
        >
          <Text style={styles.userText}>
            You: {item.userMessage}
          </Text>

          <Text style={styles.aiText}>
            AI: {item.aiReply}
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
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#7C3AED",
    borderRadius: 30,
    padding: 30,
    marginBottom: 25,
  },

  message: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 38,
  },

  infoCard: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },

  title: {
    color: "#A855F7",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },

  text: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 28,
  },

  input: {
    backgroundColor: "#111827",
    color: "white",
    borderRadius: 20,
    padding: 18,
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#7C3AED",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  voiceButton: {
    backgroundColor: "#EC4899",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  chatCard: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },

  userText: {
    color: "#A855F7",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  aiText: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 26,
  },

  memoryCard: {
    backgroundColor:
      "#1E1B4B",

    borderRadius: 24,

    padding: 22,

    marginBottom: 25,
  },

  memoryTitle: {
    color: "#C084FC",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 14,
  },

  memoryText: {
    color: "#E5E7EB",

    fontSize: 16,

    marginBottom: 10,

    lineHeight: 24,
  },
});