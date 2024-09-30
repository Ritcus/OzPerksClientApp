import { Button, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../types/TypePost";
import { RouteProp, useRoute } from "@react-navigation/native";
import genericApiCall from "../../api/genericApiCall";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { useUserContext } from "../../userContext";

type ParamList = {
  Params: Post;
};

export default function PostPage() {
  const { isAdmin } = useUserContext();
  const { params } = useRoute<RouteProp<ParamList, "Params">>();
  const post: Post = params;
  const [loading, setLoading] = useState(true);
  const navi = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    setLoading(false);
    changeHeading();
  }, [post]);

  const changeHeading = () => {
    navi.setOptions({
      headerTitle: post?.title,
    });
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Card>
          <View
            style={{
              marginBottom: hp("2%"),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Icon.Button
              style={{ flex: 1, alignSelf: "flex-start" }}
              onPress={() => navi.goBack()}
              name="reply"
              size={hp("3%")}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: hp("2.5%"),
                }}
              >
                Back
              </Text>
            </Icon.Button>
            {isAdmin && (
              <Icon.Button
                style={{ backgroundColor: "#FF0000", alignSelf: "flex-end" }}
                onPress={() => navi.navigate("Update Post", post)}
                name="edit"
                size={hp("3%")}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: hp("2.5%"),
                  }}
                >
                  Edit
                </Text>
              </Icon.Button>
            )}
          </View>
          <Card.Divider />
          <Card.Title style={{ fontSize: hp("4%") }}>{post.title}</Card.Title>
          <Card.Divider />
          <View style={{ alignSelf: "flex-end" }}>
            <Text style={{ fontSize: hp("1.%"), marginBottom: hp("3%") }}>
              {new Date(post.createdAt!)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", "")}
            </Text>
          </View>
          <Card.Image
            style={{ marginBottom: hp("3%") }}
            source={{
              uri: post.imageUri,
            }}
          />
          <Card.Divider />
          <Text style={{ fontSize: hp("2%"), marginBottom: hp("3%") }}>
            {post.body}
          </Text>
          <Card.Divider />
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
});
