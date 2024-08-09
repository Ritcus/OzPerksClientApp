import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, Text, Image } from 'react-native';
import genericApiCall from './src/api/genericApiCall';
import { User } from './src/types/TypeUser';
import { Post } from './src/types/TypePost';
import { Icon, createTheme, makeStyles } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { _retrieveDataFromAsyncStorage } from './src/functions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './src/components/header/customDrawerContent';
import menuItems from './src/types/TypeDrawerItems';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

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
  const [userName, setUserName] = useState<string | null | undefined>(); 
  let storedUser: string | null | undefined;
  const [loading, setLoading] = useState(true);
  //Core Logic 

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
          storedUser = await AsyncStorage.getItem('@UserName').then(a => a?.toString());
          setUserName(storedUser)
          if (storedUser) {
              setUserName(a => { return storedUser});
              console.log("running")
          }
          setTimeout(() => {setLoading(false)}, 5000)
          console.log(userName)
      } catch (error) {
        console.error(error);
        setTimeout(() => {setLoading(false)}, 5000)
      }
  };
  checkUser();
  }, [userName]);



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

  const {height, width} = Dimensions.get("window");

  const Drawer = createDrawerNavigator();

  return (
    <View style={{flex:1, display:'flex', justifyContent:'center'}}>
      {loading ? <View >
        <View style={styles.progress}>
      <Image source={require('./assets/logo.png')} style= {styles.logo} />
      </View>
      <View style={styles.progress}>
        <Progress.CircleSnail size={100} progress={1} thickness={6} />
        </View>
        </View> :
      <SafeAreaView style={styles.page}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName={userName == null ? 'Login':'Home'}
          drawerContent={(props) => <CustomDrawerContent {...props} /> }>
            {
          menuItems.map((drawer) =>
          <Drawer.Screen 
          key={drawer.shown ? drawer.name : null}
             name={drawer.name}
             options={{
                 drawerIcon:({focused})=>
                 <Icon 
                 name={drawer.iconName}
                 type={drawer.iconType}
                 size={24}
                 color={focused ? "#e91e63" : "black"} />,
                 headerShown:!drawer.loginPage,
                 headerStyle:{backgroundColor:"lightblue"},
                 headerTintColor: Colors.DarkBlue,
                 headerTitle: drawer.headerName,
                 headerRight:() => <Text>Hi {userName}</Text> ,
                 drawerItemStyle : (drawer.shown ? {display : 'flex'} : {display:'none'} )
        }} component={drawer.component}/>
          )}
          </Drawer.Navigator>
        </NavigationContainer>
        </SafeAreaView>
}
</View>
  );
}

const styles = StyleSheet.create({
  page:{
    flex:1,
    backgroundColor:"#DDD",
    overflow:'scroll',
    justifyContent:'center'
  },
  progress:{
    verticalAlign:'middle',
    alignSelf:'center',
  },
  logo: {
    width: 270,
    height: 120,
    marginTop:20,
    resizeMode: 'cover',
    margin:10
  },
})
