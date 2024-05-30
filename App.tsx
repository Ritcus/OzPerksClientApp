import React, { useEffect, useState, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import genericApiCall from './src/api/genericApiCall';
import { User } from './src/types/TypeUser';
import { Post } from './src/types/TypePost';
import { createTheme, makeStyles } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/components/pageLogin';
import { createStackNavigator } from '@react-navigation/stack';
import MainDrawerNavigator from './src/components/navigation';
import { _retrieveDataFromAsyncStorage } from './src/functions';

const theme = createTheme({
  lightColors: {
    primary: 'lightyellow',
  },
  darkColors: {
    primary: 'green',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

const Stack = createStackNavigator();

const Background : React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const styles = useStyles();
  return <View style={styles.container}>{children}</View>;
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.primary,
  },
}));

const abc = () => {
  const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await genericApiCall('users',"GET" );
    }
    catch(e){

    }
  }
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]); 
  const datas : User = {fullName: "Rikki G", phone:"004545445", email:"rikki@gmail.com"}
  const [ppost, setPpost] = useState<Post>(); 

  //Core Logic 

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>();

  useEffect(() => {
    //fetchUsers();
    //addUsers();
    //getAPost();
    getSavedData();
  }, []);


  const getSavedData = async () => {
    try {
      const value = await _retrieveDataFromAsyncStorage('@UserName')
      if(value === null){
         setIsFirstLaunch(true);
         console.log(isFirstLaunch)
      }
      else{
        setIsFirstLaunch(false);
      }
      
      console.log(value)
      
    } catch (error) {
      setIsFirstLaunch(true);
    }
  }


  const getAPost = async () => {
    try {
      //const post = await genericApiCall<Post>('post/66441455d66e9db9e15392ab', 'GET');
      //setPpost(post);
      //console.log("getapost")
      //console.log(post);
      
      updateAPost();
    }
    catch(e){
      console.log(e);
    }
  }
  const updateAPost = async () => {
    try {
      //console.log(post.lastUpdatedAt)
      const pp : Post = {id:'6644144bd66e9db9e15392aa', title: "Rikki G", body:"004545445", type:1}
      pp.lastUpdatedAt = new Date(Date.now());
      const ac = await genericApiCall<Post>(`post/${pp.id}`, 'PUT', pp);
      console.log("update a post")
      console.log(ac);
    }
    catch(e){
      console.log(e);
    }
  }

  const addUsers = async () => {
    try {
      const userList = await genericApiCall<User>('user', 'POST', datas );
      console.log(userList);
    }
    catch(e){
      console.log(e);
    }
  }

  const fetchUsers = async () => {
    try {
      const userList = await genericApiCall<User[]>('user', 'GET' );
      console.log(userList);
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <View style={styles.c}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? 'Login':'Main'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainDrawerNavigator} />
      </Stack.Navigator>
          </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  c: {
    height:'100%',
    width:'auto'
  },
});
