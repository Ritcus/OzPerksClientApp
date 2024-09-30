import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { Post } from "../../types/TypePost";
import genericApiCall from "../../api/genericApiCall";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function AnnouncementScreen() {
  useEffect(() => {
    fetchUsers();
  }, []);

  const navigation = useNavigation<NavigationProp<any>>();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const postList = await genericApiCall<Post[]>(`post/type/4`, "GET");
      setPosts(postList);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleOnPress = async (item: Post) => {
    navigation.navigate("PostPage", item);
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={posts}
        scrollEnabled={false}
        keyExtractor={(item) => item.id || item.title}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOnPress(item)}>
            {index === 1 ? (
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
                <Image
                  source={{ uri: item.imageUri }}
                  style={{ flex: 1, margin: hp("0.5%") }}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    display: "flex",
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
});
