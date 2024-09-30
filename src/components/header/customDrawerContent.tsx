import React from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "@rneui/themed";

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
  },
  logo: {
    width: 270,
    height: 120,
    marginTop: 20,
    resizeMode: "cover",
  },
});

export default CustomDrawerContent;
