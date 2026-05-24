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
  Image,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

import FloatingStars from "../components/FloatingStars";

export default function ProfileScreen() {
  const [name, setName] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [zodiac, setZodiac] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const docRef = doc(
          db,
          "profiles",
          auth.currentUser?.uid || ""
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {
          const data =
            docSnap.data();

          setName(data.name);

          setBio(data.bio);

          setZodiac(
            data.zodiac
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  const saveProfile =
    async () => {
      try {
        await setDoc(
          doc(
            db,
            "profiles",
            auth.currentUser?.uid || ""
          ),
          {
            name,

            bio,

            zodiac,

            updatedAt:
              new Date(),
          }
        );

        await AsyncStorage.setItem(
          "userProfile",
          JSON.stringify({
            name,

            zodiac,
          })
        );

        Alert.alert(
          "Success",
          "Profile Updated 🚀"
        );
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Profile update failed"
        );
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
          👤 Cosmic Profile
        </Text>

        <View style={styles.profileCard}>
          <Image
            source={{
              uri:
                "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />

          <Text style={styles.zodiacBadge}>
            ✨ {zodiac || "Scorpio"}
          </Text>
        </View>

        <TextInput
          placeholder="Your Name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Your Zodiac"
          placeholderTextColor="#94A3B8"
          value={zodiac}
          onChangeText={setZodiac}
          style={styles.input}
        />

        <TextInput
          placeholder="Your Bio"
          placeholderTextColor="#94A3B8"
          value={bio}
          onChangeText={setBio}
          multiline
          style={[
            styles.input,
            {
              height: 120,
              textAlignVertical:
                "top",
            },
          ]}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={saveProfile}
        >
          <Text style={styles.buttonText}>
            Save Profile
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

    fontSize: 34,

    fontWeight: "bold",

    marginBottom: 30,
  },

  profileCard: {
    alignItems: "center",

    marginBottom: 30,
  },

  avatar: {
    width: 120,

    height: 120,

    borderRadius: 60,

    marginBottom: 20,

    borderWidth: 4,

    borderColor: "#7C3AED",
  },

  zodiacBadge: {
    color: "white",

    backgroundColor:
      "#7C3AED",

    paddingHorizontal: 20,

    paddingVertical: 10,

    borderRadius: 20,

    fontSize: 18,

    fontWeight: "bold",
  },

  input: {
    backgroundColor:
      "#111827",

    color: "white",

    borderRadius: 20,

    padding: 18,

    fontSize: 16,

    marginBottom: 18,
  },

  button: {
    backgroundColor:
      "#7C3AED",

    paddingVertical: 18,

    borderRadius: 22,

    alignItems: "center",
  },

  buttonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});