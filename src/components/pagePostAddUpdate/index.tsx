import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  View,
  Switch,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Icon, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import genericApiCall from "../../api/genericApiCall";
import { Post } from "../../types/TypePost";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RouteProp, useRoute } from "@react-navigation/native";

type ParamList = {
  Params: Post;
};

export default function PostUpdate() {
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const { params } = useRoute<RouteProp<ParamList, "Params">>();
  const existingPost: Post = params;

  const navigation = useNavigation<NavigationProp<any>>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
    isActive: true,
    imageUri: "",
    createdAt: new Date(),
    type: 0,
  });

  const [primaryButtonTxt, setPBText] = useState("Submit");

  useEffect(() => {
    if (existingPost) {
      setPost(existingPost);
      setIsUpdate(true);
      setPBText("Update");
    }
  }, [existingPost]);

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result && !result.canceled) {
      console.log(JSON.stringify(result));
      const { uri, fileName, mimeType } = result.assets[0];
      setImage({
        uri,
        name: fileName || "SomeImage",
        type: mimeType || "application/octet-stream",
      });
    } else {
      Alert.alert("Image selection canceled.");
    }
  };

  const resetForm = () => {
    setPost({
      title: "",
      body: "",
      type: 0,
      imageUri: "",
      isActive: true,
    });
    setImage(null);
  };

  const isFormValid = (title: string, body: string): boolean => {
    return title.trim() !== "" && body.trim() !== "";
  };

  const handleCancel = () => {
    isUpdate ? navigation.goBack() : (resetForm(), navigation.goBack());
  };

  const handleSubmitUpdate = () => {
    console.log(isUpdate);
    isUpdate ? updatePost() : submitPost();
  };

  const updatePost = async () => {
    if (!isFormValid(post.title, post.body)) {
      Alert.alert("Validation Error", "Please fill in both Title and Body.");
      return;
    }
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("type", post.type);
    formData.append("createdAt", post.createdAt);
    formData.append("imageUri", post.imageUri);
    formData.append("image", image);
    try {
      const response: ApiResponse<Post> = await genericApiCall<Post>(
        `post/${post.id}`,
        "PUT",
        formData
      );
      Alert.alert("Success!", response?.message, [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", JSON.stringify(error), [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  const submitPost = async () => {
    if (!isFormValid(post.title, post.body)) {
      Alert.alert("Validation Error", "Please fill in both Title and Body.");
      return;
    }
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("type", post.type);
    formData.append("image", image);
    console.log(JSON.stringify(formData));
    try {
      const response: ApiResponse<Post> = await genericApiCall<Post>(
        "post",
        "POST",
        formData
      );
      Alert.alert("Success!", response?.message, [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", JSON.stringify(error), [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    }
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        {" "}
        {isUpdate
          ? "Please update the details of the post."
          : "Please enter the details of the post."}{" "}
      </Text>

      <Input
        placeholder="Title"
        value={post.title}
        numberOfLines={3}
        multiline={true}
        onChangeText={(text) => setPost({ ...post, title: text })}
        rightIcon={<Icon name="title" size={24} color="black" />}
      />

      <Input
        placeholder="Body"
        value={post.body}
        multiline={true}
        style={{ height: hp("20%") }}
        onChangeText={(text) => setPost({ ...post, body: text })}
        rightIcon={<Icon name="description" size={24} color="black" />}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Is Active</Text>
        <Switch
          value={post.isActive}
          onValueChange={(value) => setPost({ ...post, isActive: value })}
        />
      </View>

      <View style={styles.imageUploader}>
        <Text style={styles.textLabel}>Select Image</Text>
        <Pressable style={styles.button} onPress={handleImageUpload}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>
      </View>
      {image && (
        <Text style={{ textAlign: "right", fontWeight: "bold" }}>
          Image selected: <Text style={{ color: "green" }}>{image.name}</Text>
        </Text>
      )}
      {post.imageUri && !image && (
        <Text style={{ textAlign: "right", fontWeight: "bold" }}>
          Image Stored:{" "}
          <Text style={{ color: "green" }}>
            {post.imageUri.substring(post.imageUri.lastIndexOf("/") + 1)}
          </Text>
        </Text>
      )}

      <View style={styles.pickerContainer}>
        <Text style={styles.textLabel}>Type</Text>
        <Picker
          selectedValue={post.type}
          style={styles.picker}
          onValueChange={(value) => setPost({ ...post, type: value })}
        >
          <Picker.Item label="Commercial" value={3} />
          <Picker.Item label="Blog" value={0} />
          <Picker.Item label="Newcomer" value={2} />
          <Picker.Item label="Bargain" value={1} />
          <Picker.Item label="Announcement" value={4} />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.submitButton} onPress={handleSubmitUpdate}>
          <Text style={styles.buttonText}>{primaryButtonTxt}</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp("2%"),
    backgroundColor: "#fff",
  },

  header: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: hp("1%"),
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: hp("1%"),
  },
  picker: {
    height: hp("10%"),
    width: wp("50%"),
  },
  textLabel: {
    fontSize: hp("2%"),
  },
  imageUploader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: hp("1%"),
  },
  switchLabel: {
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    padding: hp("1%"),
    borderRadius: hp("0.5%"),
    alignItems: "center",
    marginVertical: hp("1%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("1.8%"),
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: hp("1%"),
    borderRadius: hp("0.5%"),
    alignItems: "center",
    marginTop: hp("2%"),
    width: wp("40%"),
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    padding: hp("1%"),
    borderRadius: hp("0.5%"),
    alignItems: "center",
    marginTop: hp("2%"),
    width: wp("40%"),
  },
});
