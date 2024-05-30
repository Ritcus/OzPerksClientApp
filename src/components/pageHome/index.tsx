// HomeComponent.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {


    useEffect(() => {
        const a = AsyncStorage.getItem('UserName'); 
        console.log(a);
    })

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Form" />
    </View>
  );
};

export default HomeScreen;
