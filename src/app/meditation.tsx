import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Audio } from "expo-av";

import FloatingStars from "../components/FloatingStars";

export default function MeditationScreen() {
  const [sound, setSound] =
    useState<any>(null);

  const [playing, setPlaying] =
    useState("");

  const playMusic =
    async (
      file: any,
      title: string
    ) => {
      try {
        if (sound) {
          await sound.unloadAsync();
        }

        const { sound: newSound } =
          await Audio.Sound.createAsync(
            file
          );

        setSound(newSound);

        setPlaying(title);

        await newSound.playAsync();
      } catch (error) {
        console.log(error);
      }
    };

  const stopMusic =
    async () => {
      if (sound) {
        await sound.stopAsync();

        setPlaying("");
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
          🎵 Meditation Space
        </Text>

        <Text style={styles.subheading}>
          Relax your soul with cosmic
          frequencies
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            playMusic(
              require("../../assets/music/rain.mp3"),
              "Rain Meditation"
            )
          }
        >
          <Text style={styles.title}>
            🌧️ Rain Meditation
          </Text>

          <Text style={styles.text}>
            Calm rain for stress relief
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            playMusic(
              require("../../assets/music/cosmic.mp3"),
              "Cosmic Energy"
            )
          }
        >
          <Text style={styles.title}>
            🌌 Cosmic Energy
          </Text>

          <Text style={styles.text}>
            Deep spiritual ambience
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            playMusic(
              require("../../assets/music/meditation.mp3"),
              "Deep Meditation"
            )
          }
        >
          <Text style={styles.title}>
            🧘 Deep Meditation
          </Text>

          <Text style={styles.text}>
            Healing meditation frequencies
          </Text>
        </TouchableOpacity>

        {playing ? (
          <View style={styles.nowPlaying}>
            <Text
              style={
                styles.playingText
              }
            >
              🎶 Now Playing:
              {" "}
              {playing}
            </Text>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={stopMusic}
            >
              <Text
                style={
                  styles.stopText
                }
              >
                Stop Music
              </Text>
            </TouchableOpacity>
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

    marginBottom: 10,
  },

  subheading: {
    color: "#C084FC",

    fontSize: 16,

    marginBottom: 30,
  },

  card: {
    backgroundColor:
      "#111827",

    borderRadius: 26,

    padding: 24,

    marginBottom: 20,
  },

  title: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 12,
  },

  text: {
    color: "#E5E7EB",

    fontSize: 16,
  },

  nowPlaying: {
    backgroundColor:
      "#7C3AED",

    borderRadius: 24,

    padding: 24,

    marginTop: 20,
  },

  playingText: {
    color: "white",

    fontSize: 20,

    fontWeight: "bold",

    marginBottom: 20,
  },

  stopButton: {
    backgroundColor:
      "#EF4444",

    paddingVertical: 14,

    borderRadius: 18,

    alignItems: "center",
  },

  stopText: {
    color: "white",

    fontSize: 16,

    fontWeight: "bold",
  },
});