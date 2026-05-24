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
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/config";

import { router } from "expo-router";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export default function SignupScreen() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const signup = async () => {
    if (!email || !password) {
      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,

          zodiac: "Scorpio",

          createdAt: new Date(),
        }
      );

      Alert.alert(
        "Success 🚀",
        "Account Created Successfully"
      );

      router.push("/login");
    } catch (error: any) {
      Alert.alert(
        "Signup Failed",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        ✨ Create Account
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
        onPress={signup}
      >
        <Text style={styles.buttonText}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text
        style={styles.loginText}
        onPress={() =>
          router.push("/login")
        }
      >
        Already have account? Login
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

  loginText: {
    color: "#A855F7",
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
  },
});