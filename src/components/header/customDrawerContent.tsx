import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon, Image } from '@rneui/themed';



const CustomDrawerContent = (props:any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style= {styles.logo} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  logo: {
    width: 270,
    height: 120,
    marginTop:20,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
    color: '#e91e63',
  },
});

export default CustomDrawerContent;
