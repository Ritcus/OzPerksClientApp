import BlogScreen from "../components/pageBlog";
import HomeScreen from "../components/pageHome";
import LoginScreen from "../components/pageLogin";
import PostPage from "../components/pagePost";
import { useUserContext } from "../userContext";
import PostUpdate from "../components/pagePostAddUpdate";
import BargainScreen from "../components/pageBargain";
import NewcomerScreen from "../components/pageNewcomer";
import CommercialScreen from "../components/pageCommercial";

interface MenuItem {
  name: string;
  iconType: string;
  iconName: string;
  shown: boolean;
  headerName: string;
  component: React.ComponentType<any>;
}

export const getMenuItems = (): MenuItem[] => {
  const { isAdmin } = useUserContext();

  const menuItems: MenuItem[] = [
    {
      name: "Home",
      iconType: "antdesign",
      iconName: "home",
      shown: true,
      component: HomeScreen,
      headerName: "Home",
    },
    {
      name: "Add Post",
      iconType: "Feather",
      iconName: "settings",
      shown: isAdmin,
      component: PostUpdate,
      headerName: "Add Post",
    },
    {
      name: "Update Post",
      iconType: "",
      iconName: "",
      shown: false,
      component: PostUpdate,
      headerName: "Update",
    },
    {
      name: "PostPage",
      iconType: "Feather",
      iconName: "settings",
      shown: false,
      component: PostPage,
      headerName: "Loading...",
    },
    {
      name: "Login",
      shown: false,
      component: LoginScreen,
      iconType: "",
      iconName: "",
      headerName: "",
    },
    {
      name: "Blog",
      shown: true,
      component: BlogScreen,
      iconType: "Feather",
      iconName: "settings",
      headerName: "Blog",
    },
    {
      name: "Bargain",
      shown: true,
      component: BargainScreen,
      iconType: "Feather",
      iconName: "settings",
      headerName: "Bargain",
    },
    {
      name: "New Commer Info",
      shown: true,
      component: NewcomerScreen,
      iconType: "Feather",
      iconName: "settings",
      headerName: "New Commer Info",
    },
    {
      name: "Commercial",
      shown: true,
      component: CommercialScreen,
      iconType: "Feather",
      iconName: "settings",
      headerName: "Commercial",
    },
  ];

  return menuItems;
};
