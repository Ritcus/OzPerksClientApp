// HomeComponent.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator  } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Post } from '../../types/TypePost';
import genericApiCall from '../../api/genericApiCall';

const HomeScreen = () => {
  const[post, setPost] = useState<Post>();
  const Id = '664734e6ca4503a6df02aefa';
  const [loading, setLoading] = useState(false);

const navigation = useNavigation<NavigationProp<any>>();
    useEffect(() => {
        const a = AsyncStorage.getItem('UserName'); 
        console.log(a);
    })


    const fetchUsers = useCallback (async() => {
      setLoading(true);
      try {
        const aPost = await genericApiCall<Post>(`post/${Id}`, 'GET' );
        setPost(aPost)
        
      }
      catch(e){
        console.log(e);
      }
      setLoading(false);
    },[])

    const handleOnPress= async() => {
      //await fetchUsers();
      navigation.navigate("PostPage",'664734e6ca4503a6df02aefa');
    }

  return (
    <View >
      <Text>Home Screen</Text>
      <Button title="Go to Form" onPress={handleOnPress} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
    justifyContent:'center',
    alignItems:'center'
  }
});