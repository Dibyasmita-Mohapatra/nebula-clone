import React, {
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  Dimensions,
  View,
} from "react-native";

const { width, height } =
  Dimensions.get("window");

export default function FloatingStars() {
  const stars = Array.from({
    length: 60,
  });

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",

        top: 0,

        left: 0,

        width: width,

        height: height,

        zIndex: 1,
      }}
    >
      {stars.map((_, index) => (
        <Star key={index} />
      ))}
    </View>
  );
}

function Star() {
  const startY =
    Math.random() * height;

  const translateY = useRef(
    new Animated.Value(startY)
  ).current;

  const opacity = useRef(
    new Animated.Value(
      Math.random() * 0.5 + 0.3
    )
  ).current;

  const left =
    Math.random() * width;

  const size =
    Math.random() * 3 + 1;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(
          translateY,
          {
            toValue: -100,

            duration:
              10000 +
              Math.random() * 8000,

            useNativeDriver: false,
          }
        ),

        Animated.sequence([
          Animated.timing(
            opacity,
            {
              toValue: 1,

              duration: 2000,

              useNativeDriver: false,
            }
          ),

          Animated.timing(
            opacity,
            {
              toValue: 0.2,

              duration: 2000,

              useNativeDriver: false,
            }
          ),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",

        width: size,

        height: size,

        borderRadius: size / 2,

        backgroundColor: "white",

        left,

        top: startY,

        opacity,

        transform: [
          {
            translateY,
          },
        ],
      }}
    />
  );
}