import expPushTokensApi from "../api/expoPushTokens";
import navigation from '../navigation/rootNavigation'
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useEffect } from "react";

export default useNotification = (notificationListener) => {

  useEffect(() => {
    registerForPushNotification();
    if(notificationListener) Notifications.addPushTokenListener(notificationListener);
  }, []);

  const registerForPushNotification = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      expPushTokensApi.register(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
