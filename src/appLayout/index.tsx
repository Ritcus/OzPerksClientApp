import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Progress from "react-native-progress";
import { useUserContext } from "../userContext";
import CustomDrawerContent from "../components/header/customDrawerContent";
import { getMenuItems } from "../types/TypeDrawerItems";

export default function AppLayout() {
  const { username, isAdmin, loading } = useUserContext();

  useEffect(() => {}, [username]);

  const Drawer = createDrawerNavigator();
  const menuItems = getMenuItems();

  return (
    <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      {loading ? (
        <View>
          <View style={styles.progress}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.progress}>
            <Progress.CircleSnail size={100} progress={1} thickness={6} />
          </View>
        </View>
      ) : (
        <SafeAreaView style={styles.page}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName={username == null ? "Login" : "Home"}
              backBehavior="history"
              drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
              {menuItems.map((drawer) => (
                <Drawer.Screen
                  key={drawer.shown ? drawer.name : null}
                  name={drawer.name}
                  options={{
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name={drawer.iconName}
                        type={drawer.iconType}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                    ),
                    headerShown: drawer.name == "Login" ? false : true,
                    headerStyle: { backgroundColor: "lightblue" },
                    headerTintColor: Colors.DarkBlue,
                    headerTitle: drawer.headerName,
                    headerRight: () => <Text>Hi {username}</Text>,
                    drawerItemStyle: drawer.shown
                      ? { display: "flex" }
                      : { display: "none" },
                  }}
                  component={drawer.component}
                />
              ))}
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#DDD",
    overflow: "scroll",
    justifyContent: "center",
  },
  progress: {
    verticalAlign: "middle",
    alignSelf: "center",
  },
  logo: {
    width: 270,
    height: 120,
    marginTop: 20,
    resizeMode: "cover",
    margin: 10,
  },
});
