import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import {
  Drawer,
} from "expo-router/drawer";

import {
  Redirect,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import * as Notifications from "expo-notifications";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase/config";

import {
  registerForPushNotifications,
  scheduleDailyNotification,
} from "../utils/notifications";

Notifications.setNotificationHandler({
  handleNotification:
    async () => ({
      shouldShowAlert: true,

      shouldPlaySound: true,

      shouldSetBadge: false,
    }),
});

export default function Layout() {
  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);

          setLoading(false);
        }
      );

    registerForPushNotifications();

    scheduleDailyNotification();

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            "#020617",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#7C3AED"
        />
      </View>
    );
  }

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor:
            "#020617",
        },

        headerTintColor:
          "white",

        drawerStyle: {
          backgroundColor:
            "#111827",

          width: 280,
        },

        drawerActiveTintColor:
          "#C084FC",

        drawerInactiveTintColor:
          "#CBD5E1",
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="horoscope"
        options={{
          title: "Horoscope",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="moon"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="chat"
        options={{
          title: "AI Chat",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="sparkles"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="compatibility"
        options={{
          title: "Compatibility",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="heart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="mood"
        options={{
          title: "Mood",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="happy"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="birthchart"
        options={{
          title: "Birth Chart",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="planet"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="tarot"
        options={{
          title: "Tarot",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="star"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="meditation"
        options={{
          title: "Meditation",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="musical-notes"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="aura"
        options={{
          title: "Aura",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="sparkles"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="moon"
        options={{
          title: "Moon Phase",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="moon-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="dream"
        options={{
          title: "Dream",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="cloud"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="quiz"
        options={{
          title: "Quiz",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="help-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="future"
        options={{
          title: "Future",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="time"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="journal"
        options={{
          title: "Journal",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="book"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="calendar"
        options={{
          title: "Calendar",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="calendar"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="affirmation"
        options={{
          title: "Affirmation",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="heart-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="cosmic"
        options={{
          title: "Cosmic AI",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="sparkles-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="zodiac"
        options={{
          title: "Zodiac",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="star-half"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="planets"
        options={{
          title: "Planets",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="planet"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="constellation"
        options={{
          title: "Constellation",

          drawerIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="sparkles-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
              name="onboarding"
              options={{
                title: "onboarding",

                drawerIcon: ({
                  color,
                  size,
                }) => (
                  <Ionicons
                    name="sparkles-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />

      <Drawer.Screen
        name="auth"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="login"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="signup"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />



      <Drawer.Screen
        name="confirmation"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer>
  );
}