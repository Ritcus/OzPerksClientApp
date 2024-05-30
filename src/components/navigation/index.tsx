// Navigation.tsx
import React, {useState, useEffect} from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import menuItems from '../../types/TypeDrawerItems';
import { Icon } from '@rneui/themed';
import CustomDrawerContent from '../header/customDrawerContent';
import Header from '../header/header';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../pageLogin';


const Drawer = createDrawerNavigator();




const MainDrawerNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const abc = true;
  console.log()

  return (
        <Drawer.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                drawerActiveTintColor:"#e91e63",
                drawerType:'front',
                drawerLabelStyle:{marginVertical:10},
                drawerActiveBackgroundColor:"#92CD86"
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                 {menuItems.map((drawer) => ( drawer.hidden ?
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
                drawerIcon:({focused})=>
                <Icon 
                name={drawer.iconName}
                type={drawer.iconType}
                size={24}
                color={focused ? "#e91e63" : "black"} />,
                headerShown:true,
                header: ({navigation}) => <Header screen={drawer.name} navigation={navigation}/>
        }}
            component={drawer.component}
          /> : null
        ))
        }
            </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
