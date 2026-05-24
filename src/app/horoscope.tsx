import React, {
  useEffect,
  useState,
} from "react";

import StarBackground from "../components/StarBackground";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import FloatingStars from "../components/FloatingStars";

export default function HoroscopeScreen() {
  const [user, setUser] =
    useState<any>(null);

  const [horoscope, setHoroscope] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data =
        await AsyncStorage.getItem(
          "userProfile"
        );

      if (data) {
        const parsedUser =
          JSON.parse(data);

        setUser(parsedUser);

        fetchHoroscope(
          parsedUser.zodiac
        );
      } else {
        fetchHoroscope("Scorpio");
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const fetchHoroscope = async (
    sign: string
  ) => {
    try {
      const response =
        await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",

          {
            model:
              "llama-3.3-70b-versatile",

            messages: [
              {
                role: "system",

                content:
                  "You are a mystical astrology expert that replies only in JSON.",
              },

              {
                role: "user",

                content: `
  Give today's horoscope for ${sign}.

  Return ONLY valid JSON.

  {
  "description":"...",
  "compatibility":"...",
  "color":"...",
  "lucky_number":"...",
  "lucky_time":"...",
  "mood":"..."
  }
  `,
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

      const aiText =
        response.data
          .choices[0]
          .message.content;

      console.log(
        "RAW AI:",
        aiText
      );

      const cleanedText =
        aiText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const parsedData =
        JSON.parse(cleanedText);

      setHoroscope(
        parsedData
      );
    } catch (error: any) {
      console.log(
        "Horoscope Error:",
        error.response?.data ||
          error.message
      );
    }

    setLoading(false);
  };

  const zodiac =
    user?.zodiac || "Scorpio";

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: "#020617",
      }}
    >
      <StarBackground />

      <FloatingStars />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          ✨ Daily Horoscope
        </Text>

        <View style={styles.card}>
          <Text style={styles.sign}>
            {zodiac}
          </Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="white"
            />
          ) : (
            <>
              <Text style={styles.text}>
                {
                  horoscope?.description ||
                  "The cosmos is preparing powerful emotional transformations for you today."
                }
              </Text>

              <Text
                style={styles.extra}
              >
                ❤️ Compatibility:
                {" "}
                {
                  horoscope?.compatibility
                }
              </Text>

              <Text
                style={styles.extra}
              >
                🎨 Lucky Color:
                {" "}
                {
                  horoscope?.color
                }
              </Text>

              <Text
                style={styles.extra}
              >
                🔢 Lucky Number:
                {" "}
                {
                  horoscope?.lucky_number
                }
              </Text>

              <Text
                style={styles.extra}
              >
                ⏰ Lucky Time:
                {" "}
                {
                  horoscope?.lucky_time
                }
              </Text>

              <Text
                style={styles.extra}
              >
                💼 Mood:
                {" "}
                {horoscope?.mood}
              </Text>
            </>
          )}
        </View>

        <View style={styles.energyCard}>
          <Text
            style={styles.energyTitle}
          >
            🌙 Cosmic Energy
          </Text>

          <Text
            style={styles.energyText}
          >
            Emotional vibrations are
            aligned with personal
            transformation and
            self-discovery today.
          </Text>
        </View>

        <View style={styles.energyCard}>
          <Text
            style={styles.energyTitle}
          >
            💫 Love Insight
          </Text>

          <Text
            style={styles.energyText}
          >
            Trust honest communication
            and emotional vulnerability
            in relationships today.
          </Text>
        </View>

        <View style={styles.energyCard}>
          <Text
            style={styles.energyTitle}
          >
            🔮 Spiritual Guidance
          </Text>

          <Text
            style={styles.energyText}
          >
            Your aura is attracting
            positive cosmic frequencies
            and emotional healing.
          </Text>
        </View>
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

  card: {
    backgroundColor:
      "#7C3AED",

    borderRadius: 30,

    padding: 30,

    marginBottom: 25,
  },

  sign: {
    color: "white",

    fontSize: 32,

    fontWeight: "bold",

    marginBottom: 18,
  },

  text: {
    color: "white",

    fontSize: 18,

    lineHeight: 30,

    marginBottom: 18,
  },

  extra: {
    color: "#E9D5FF",

    fontSize: 16,

    marginTop: 10,

    lineHeight: 26,
  },

  energyCard: {
    backgroundColor:
      "#111827",

    borderRadius: 24,

    padding: 24,

    marginBottom: 18,
  },

  energyTitle: {
    color: "#A855F7",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 12,
  },

  energyText: {
    color: "#E5E7EB",

    fontSize: 16,

    lineHeight: 26,
  },
});