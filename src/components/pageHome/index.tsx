// HomeComponent.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  SectionList,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Post } from "../../types/TypePost";
import genericApiCall from "../../api/genericApiCall";
import { Avatar, Icon, ListItem } from "@rneui/themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Divider } from "@rneui/base";
import Carousel from "react-native-reanimated-carousel";

const HomeScreen = () => {
  const [post, setPost] = useState<Post[]>();
  const [announcement, setSetAnnouncement] = useState<Post[]>();
  const [announcementLoading, setannouncementLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carouselGallery, setcarouselGallery] = useState<{
    id: string;
    image: string;
    title: string;
  }>();
  const images = [
    {
      id: 1,
      image: require("../../../assets/adaptive-icon.png"),
      title: "First Slide",
    },
    {
      id: 2,
      image: require("../../../assets/logo.png"),
      title: "Second Slide",
    },
    { id: 3, image: require("../../../assets/logo.png"), title: "Third Slide" },
  ];

  const fetchAnnouncement = async () => {
    setannouncementLoading(true);
    try {
      const announcmentList = await genericApiCall<Post[]>(
        `post/type/4`,
        "GET"
      );
      if (announcmentList != null) setSetAnnouncement(announcmentList);
    } catch (e) {
      console.log(e);
    }
    setannouncementLoading(false);
  };

  const navigation = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    fetchPost();
    fetchAnnouncement();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const aPost = await genericApiCall<Post[]>(`post/type/1`, "GET");
      if (aPost != null) setPost(aPost);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleOnPress = async (item: Post) => {
    //await fetchUsers();
    navigation.navigate("PostPage", item);
  };

  function onPressCategory(): void {
    navigation.navigate("PostPage", "664734e6ca4503a6df02aefa");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categories}>
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            margin: hp("0.8%"),
            fontSize: hp("3%"),
          }}
        >
          Categories
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: hp("0.5%"),
            marginBottom: hp("2%"),
          }}
        >
          <View style={styles.categoriesType}>
            <Avatar
              size={hp("10%")}
              rounded
              icon={{
                name: "newspaper",
                type: "ionicon",
                color: "purple",
                iconStyle: { fontSize: hp("20%") },
              }}
              onPress={onPressCategory}
              containerStyle={styles.avatarStyle}
            />
            <Text style={styles.subCategory}>Blog</Text>
          </View>
          <View style={styles.categoriesType}>
            <Avatar
              size={hp("10%")}
              rounded
              icon={{
                name: "business",
                type: "ionicon",
                color: "purple",
                iconStyle: { fontSize: hp("20%") },
              }}
              onPress={onPressCategory}
              containerStyle={styles.avatarStyle}
            />
            <Text style={styles.subCategory}>Commercial</Text>
          </View>
          <View style={styles.categoriesType}>
            <Avatar
              size={hp("10%")}
              rounded
              icon={{
                name: "cash",
                type: "ionicon",
                color: "purple",
                iconStyle: { fontSize: hp("20%") },
              }}
              onPress={onPressCategory}
              containerStyle={styles.avatarStyle}
            />
            <Text style={styles.subCategory}>Bargain</Text>
          </View>
          <View style={styles.categoriesType}>
            <Avatar
              size={hp("10%")}
              rounded
              icon={{
                name: "walk",
                type: "ionicon",
                color: "purple",
                iconStyle: { fontSize: hp("20%") },
              }}
              onPress={onPressCategory}
              containerStyle={styles.avatarStyle}
            />
            <Text style={styles.subCategory}>NewCommer</Text>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Divider style={{ borderTopWidth: hp("0.5%"), margin: hp("0.5%") }} />
        <Text
          style={{
            fontSize: hp("3%"),
            textAlign: "center",
            color: "white",
            backgroundColor: "#2089dc",
            padding: hp("0.5%"),
            margin: hp("0.5%"),
          }}
        >
          Announcement{" "}
          <Icon name="radio" type="ionicons" color="white" size={hp("3%")} />
        </Text>
      </View>
      <View style={{ flex: 1, margin: hp("0.5%") }}>
        {announcementLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Carousel
            loop
            width={wp("98%")}
            height={hp("30%")}
            autoPlay={true}
            data={announcement || []}
            scrollAnimationDuration={5000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleOnPress(item)}
                style={styles.touchable} // Add style to TouchableOpacity
              >
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    borderWidth: 1,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.imageUri }}
                    style={{ flex: 1, width: "100%", height: "100%" }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: 500,
                      backgroundColor: "#add8e6",
                      fontSize: hp("2%"),
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View>
        <Divider style={{ borderTopWidth: hp("0.5%"), margin: hp("0.5%") }} />
        <View
          style={{
            backgroundColor: "#2089dc",
            padding: hp("0.5%"),
            margin: hp("0.5%"),
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{ fontSize: hp("3%"), color: "white", verticalAlign: "top" }}
          >
            Top Blogs
            <Icon
              name="newspaper"
              style={{ textAlignVertical: "bottom" }}
              type="ionicons"
              color="white"
              size={hp("3%")}
            />
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          margin: hp("0.5%"),
          borderWidth: wp("0.5%"),
          justifyContent: "center",
        }}
      >
        <FlatList
          data={post?.slice(0, 5)}
          scrollEnabled={false}
          keyExtractor={(item) => item.id || item.title}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleOnPress(item)}>
              {index !== 0 ? (
                <Divider
                  style={{
                    borderTopWidth: hp("0.5%"),
                    margin: hp("0.5%"),
                    borderColor: "purple",
                  }}
                />
              ) : (
                <></>
              )}
              <View style={styles.item}>
                <View style={styles.listImage}>
                  <Avatar
                    size={64}
                    source={
                      item.imageUri
                        ? { uri: item.imageUri }
                        : require("../../../assets/Image_not_available.jpg")
                    }
                    containerStyle={{ flex: 1, margin: hp("0.5%") }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.body}>
                    {item.body}.....
                  </Text>
                </View>
                <View>
                  <Icon size={50} name="caret-right" type="font-awesome" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    display: "flex",
  },
  categories: {
    borderWidth: hp("0.5%"),
    height: "auto",
    margin: hp("0.5%"),
    backgroundColor: "white",
    justifyContent: "center",
    opacity: 1,
  },
  categoriesType: {
    maxWidth: hp("20%"),
    maxHeight: hp("30%"),
  },
  avatarStyle: {
    borderRadius: hp("3%"),
    borderWidth: hp("0.5%"),
    backgroundColor: "#add8e6",
  },
  subCategory: {
    alignSelf: "center",
    fontSize: hp("1.8%"),
    fontWeight: "500",
  },
  item: {
    backgroundColor: "#add8e6",
    padding: hp("1%"),
    marginVertical: hp("0.4%"),
    flexDirection: "row",
  },
  listImage: {
    flex: 0.3,
  },
  title: {
    fontSize: hp("3%"),
    fontWeight: "600",
  },
  body: {
    margin: hp("0.5%"),
    fontStyle: "italic",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  touchable: {
    flex: 1,
  },
});
