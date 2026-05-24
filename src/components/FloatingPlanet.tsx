import React, {
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  Dimensions,
} from "react-native";

const { width, height } =
  Dimensions.get("window");

export default function FloatingPlanet() {
  const translateY = useRef(
    new Animated.Value(0)
  ).current;

  const rotate = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(
            translateY,
            {
              toValue: -20,

              duration: 3000,

              useNativeDriver: false,
            }
          ),

          Animated.timing(
            translateY,
            {
              toValue: 20,

              duration: 3000,

              useNativeDriver: false,
            }
          ),
        ]),

        Animated.loop(
          Animated.timing(
            rotate,
            {
              toValue: 1,

              duration: 12000,

              useNativeDriver: false,
            }
          )
        ),
      ])
    ).start();
  }, []);

  const spin =
    rotate.interpolate({
      inputRange: [0, 1],

      outputRange: [
        "0deg",
        "360deg",
      ],
    });

  return (
    <Animated.View
      style={{
        position: "absolute",

        top: 120,

        right: -40,

        width: 180,

        height: 180,

        borderRadius: 90,

        backgroundColor:
          "rgba(124,58,237,0.25)",

        transform: [
          {
            translateY,
          },

          {
            rotate: spin,
          },
        ],

        shadowColor: "#7C3AED",

        shadowOpacity: 0.8,

        shadowRadius: 30,

        elevation: 20,
      }}
    />
  );
}