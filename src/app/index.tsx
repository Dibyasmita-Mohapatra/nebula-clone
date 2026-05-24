import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import { Redirect } from "expo-router";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase/config";

export default function Index() {
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

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#020617",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#7C3AED"
        />
      </View>
    );
  }

  return user ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/auth" />
  );
}