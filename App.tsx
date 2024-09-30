import React, { useEffect } from "react";
import { Alert, BackHandler, View } from "react-native";

import { UserProvider } from "./src/userContext";
import AppLayout from "./src/appLayout";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  useEffect(() => {
    // Check internet connection when app starts
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        Alert.alert("No Internet", "Please check your internet connection", [
          { text: "OK", onPress: () => BackHandler.exitApp() }, // Exit the app
        ]);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <UserProvider>
        <AppLayout />
      </UserProvider>
    </View>
  );
}
