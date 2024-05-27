// Layout.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import login from '../loginScreen'; // Adjust the import path as necessary
import home from '../homeScreen'; // Adjust the import path as necessary

const Drawer = createDrawerNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={home} />
        <Drawer.Screen name="Login" component={login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
