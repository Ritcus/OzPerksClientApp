import AdminPortal from "../components/pageAdminPortal";
import HomeScreen from "../components/pageHome";
import LoginScreen from "../components/pageLogin";
import PostPage from "../components/pagePost";

export interface MenuItem {
    name: string;
    iconType: string;
    iconName: string;
    shown: boolean;
    loginPage:boolean;
    headerName:string;
    component: React.ComponentType<any>;
}

const menuItems: MenuItem[] = [
    {
        name: 'Home',
        iconType: 'antdesign',
        iconName: 'home',
        shown: true,
        component: HomeScreen,
        loginPage: false,
        headerName: "Home"
    },
    {
        name: 'Admin',
        iconType: 'Feather',
        iconName: 'settings',
        shown: true,
        component: AdminPortal,
        loginPage: false,
        headerName: "Admin"
    },
    {
        name: 'PostPage',
        iconType: 'Feather',
        iconName: 'settings',
        shown: false,
        component: PostPage,
        loginPage: false,
        headerName: "Loading..."
    },
    {
        name: 'Login',
        shown: false,
        loginPage: true,
        component: LoginScreen,
        iconType: "",
        iconName: "",
        headerName: ""
    }
];

export default menuItems;