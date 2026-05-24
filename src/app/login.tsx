import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/config";

import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {
    if (!email || !password) {
      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "Success 🚀",
        "Login Successful"
      );

      router.replace("/home");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        🌙 Welcome Back
      </Text>

      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <Text
        style={styles.signupText}
        onPress={() =>
          router.push("/signup")
        }
      >
        Don't have account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  heading: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#111827",
    color: "white",
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#7C3AED",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  signupText: {
    color: "#A855F7",
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
  },
});