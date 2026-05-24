import React, { useEffect, useRef } from "react";

import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width, height } =
  Dimensions.get("window");

const stars = Array.from({ length: 120 });

export default function StarBackground() {
  return (
    <View style={styles.container}>
      {stars.map((_, index) => (
        <Star key={index} />
      ))}
    </View>
  );
}

function Star() {
  const opacity = useRef(
    new Animated.Value(Math.random())
  ).current;

  const scale = useRef(
    new Animated.Value(1)
  ).current;

  const top = Math.random() * height;

  const left = Math.random() * width;

  const size = Math.random() * 5 + 2;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 1500,
            useNativeDriver: false,
          }),

          Animated.timing(opacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),

        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: 1500,
            useNativeDriver: false,
          }),

          Animated.timing(scale, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          opacity,
          transform: [{ scale }],
          top,
          left,
          width: size,
          height: size,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000814",
  },

  star: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 999,

    shadowColor: "white",
    shadowOpacity: 1,
    shadowRadius: 12,

    elevation: 12,
  },
});