import * as Notifications from "expo-notifications";

import * as Device from "expo-device";

import { Platform } from "react-native";

export async function registerForPushNotifications() {
  if (Platform.OS === "web") {
    console.log(
      "Notifications not supported on web"
    );

    return;
  }

  if (Device.isDevice) {
    const {
      status: existingStatus,
    } =
      await Notifications.getPermissionsAsync();

    let finalStatus =
      existingStatus;

    if (
      existingStatus !== "granted"
    ) {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (
      finalStatus !== "granted"
    ) {
      alert(
        "Notification permission denied"
      );

      return;
    }
  }
}

export async function scheduleDailyNotification() {
  if (Platform.OS === "web") {
    console.log(
      "Notifications disabled on web"
    );

    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync(
    {
      content: {
        title:
          "🔮 Nebula Daily Horoscope",

        body:
          "🌙 Cosmic energy is guiding you today.",

        sound: true,
      },

      trigger: {
        hour: 9,

        minute: 0,

        repeats: true,
      },
    }
  );
}