import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";

import {
  router,
  useRootNavigationState,
} from "expo-router";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

import StreakCard from "../components/StreakCard";

import AchievementCard from "../components/AchievementCard";

import FloatingPlanet from "../components/FloatingPlanet";

import FloatingStars from "../components/FloatingStars";

import PremiumCard from "../components/PremiumCard";

export default function HomeScreen() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data =
      await AsyncStorage.getItem(
        "userProfile"
      );

    if (data) {
      setUser(JSON.parse(data));
    }
  };

  const testFirebase =
    async () => {
      try {
        console.log(
          "Button Clicked 🚀"
        );

        await addDoc(
          collection(
            db,
            "test"
          ),
          {
            username:
              user?.name ||
              "Nebula User",

            zodiac:
              user?.zodiac ||
              "Scorpio",

            message:
              "Firebase Connected 🚀",

            createdAt:
              new Date(),
          }
        );

        console.log(
          "Firebase Working ✅"
        );

        alert(
          "Firebase Connected Successfully 🚀"
        );
      } catch (error) {
        console.log(
          "Firebase Error:",
          error
        );

        alert(
          "Firebase Connection Failed ❌"
        );
      }
    };

  const logout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Logout",
          style: "destructive",

          onPress: async () => {
            try {
              await signOut(auth);

              await AsyncStorage.removeItem(
                "userProfile"
              );

              Alert.alert(
                "Success ✅",
                "Logged out successfully"
              );

              setTimeout(() => {
                router.replace("/auth");
              }, 500);
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Error ❌",
                "Logout failed"
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FloatingStars />

      <FloatingPlanet />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.heading}>
          ✨ Nebula
        </Text>

        <LinearGradient
          colors={[
            "#7C3AED",
            "#312E81",
          ]}
          style={styles.heroCard}
        >
          <Text
            style={
              styles.heroTitle
            }
          >
            {user
              ? `Welcome ${user.name}`
              : "Welcome Cosmic Soul"}
          </Text>

          <Text
            style={
              styles.heroText
            }
          >
            {user
              ? `Your zodiac sign is ${user.zodiac}`
              : "Discover your cosmic identity"}
          </Text>
        </LinearGradient>

        <StreakCard />

        <AchievementCard />

        <PremiumCard />

        <LinearGradient
          colors={[
            "#EC4899",
            "#7C3AED",
          ]}
          style={styles.infoCard}
        >
          <Text
            style={
              styles.infoTitle
            }
          >
            Daily Energy
          </Text>

          <Text
            style={
              styles.infoText
            }
          >
            ✨ Emotional clarity
            and spiritual growth
            surround your energy
            today.
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={[
            "#0F172A",
            "#1E1B4B",
          ]}
          style={styles.infoCard}
        >
          <Text
            style={
              styles.infoTitle
            }
          >
            Cosmic Insight
          </Text>

          <Text
            style={
              styles.infoText
            }
          >
            🌙 Trust your
            intuition before
            making important
            emotional decisions.
          </Text>
        </LinearGradient>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/zodiac"
            )
          }
        >
          <Text
            style={
              styles.changeText
            }
          >
            ✨ Change Zodiac
            Sign
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.firebaseButton
          }
          onPress={
            testFirebase
          }
        >
          <Text
            style={
              styles.firebaseText
            }
          >
            🚀 Test Firebase
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.logoutButton
          }
          onPress={logout}
        >
          <Text
            style={
              styles.logoutText
            }
          >
            Logout
          </Text>
        </TouchableOpacity>
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

    fontSize: 38,

    fontWeight: "bold",

    marginBottom: 30,
  },

  heroCard: {
    borderRadius: 30,

    padding: 28,

    marginBottom: 25,

    shadowColor:
      "#7C3AED",

    shadowOpacity: 0.9,

    shadowRadius: 25,

    elevation: 20,
  },

  heroTitle: {
    color: "white",

    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 14,
  },

  heroText: {
    color: "#E5E7EB",

    fontSize: 17,

    lineHeight: 28,
  },

  infoCard: {
    borderRadius: 26,

    padding: 24,

    marginBottom: 20,

    shadowColor:
      "#7C3AED",

    shadowOpacity: 0.5,

    shadowRadius: 20,

    elevation: 15,
  },

  infoTitle: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 14,
  },

  infoText: {
    color: "#E5E7EB",

    fontSize: 16,

    lineHeight: 28,
  },

  changeText: {
    color: "#C084FC",

    fontSize: 18,

    fontWeight: "bold",

    textAlign: "center",

    marginTop: 30,

    marginBottom: 30,
  },

  firebaseButton: {
    backgroundColor:
      "#7C3AED",

    paddingVertical: 18,

    borderRadius: 24,

    alignItems: "center",

    marginBottom: 25,

    shadowColor:
      "#7C3AED",

    shadowOpacity: 0.8,

    shadowRadius: 18,

    elevation: 15,
  },

  firebaseText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor:
      "#EF4444",

    paddingVertical: 18,

    borderRadius: 24,

    alignItems: "center",

    marginBottom: 40,
  },

  logoutText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});