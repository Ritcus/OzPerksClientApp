import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  screen: string;
  navigation: DrawerNavigationProp<any>;
}

const Header: React.FC<HeaderProps> = ({ screen, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <MaterialCommunityIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Text>{screen}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: '100%',
    backgroundColor: '#526F50',
    elevation: 5,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Header;
