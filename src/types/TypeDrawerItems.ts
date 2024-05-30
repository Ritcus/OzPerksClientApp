import AdminPortal from "../components/pageAdminPortal";
import HomeScreen from "../components/pageHome";
import LoginScreen from "../components/pageLogin";

interface MenuItem {
    name: string;
    iconType: string;
    iconName: string;
    hidden: boolean;
    component: React.ComponentType<any>;
}

const menuItems: MenuItem[] = [
    {
        name: 'Home',
        iconType: 'antdesign',
        iconName: 'home',
        hidden:true,
        component:HomeScreen
    },
    {
        name: 'Admin',
        iconType: 'Feather',
        iconName: 'settings',
        hidden:true,
        component:AdminPortal
    },
    {
        name: 'Login',
        iconType: 'Feather',
        iconName: 'settings',
        hidden:false,
        component:LoginScreen
    }
];

export default menuItems;