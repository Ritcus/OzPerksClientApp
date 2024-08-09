import { Button, Card, Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import { StyleSheet,View, Text, ActivityIndicator,SafeAreaView } from 'react-native';
import { Post } from '../../types/TypePost';
import { RouteProp, useRoute } from '@react-navigation/native';
import genericApiCall from '../../api/genericApiCall';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';


type ParamList = {
    Params: {id: string};
  };
  

export default function PostPage () {
    //const {post} = route.params;
    const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
    console.log(params)

    const[post, setPost] = useState<Post>();
    const [loading, setLoading] = useState(true);
    const navi = useNavigation();
    useEffect(() => {
      //setLoading(true);
      fetchUsers();
  }, []);


    const fetchUsers = async() => {
      try {
        const aPost = await genericApiCall<Post>(`post/${params}`, 'GET' );
        setPost(aPost) 
        navi.setOptions({
          headerTitle: aPost?.title,
        })
      }
      catch(e){
        console.log(e);
      }
      setLoading(false)
    }

  return (
    <ScrollView style={styles.content}>
      {loading ? (<ActivityIndicator size="large" color="#0000ff" />): (

     <Card>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            {post?.body}
          </Text>
          <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title={ post?.title}
          />
        </Card>
      )
}
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    overflow:'scroll',
    justifyContent: "center",
    flexGrow:1
  },
    content: {
      flexGrow:1,
      height:'100%',
      width:'100%'
    }
  });
