import React, { useState, useRef } from "react";
import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { styles } from "./style";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import genericApiCall from "../../api/genericApiCall";
import { User } from "../../types/TypeUser";
import { _storeDataInAsyncStorage } from "../../functions";

let Iusername: string;

//Form validation logic
const validateFullName = (name: string): string | null => {
  const regex = /^[A-Za-z\s]+$/;
  if (!name.match(regex)) {
    return "Full name must only contain letters and spaces";
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(regex)) {
    return "Invalid email address";
  }
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (phone && !/^\d+$/.test(phone)) {
    return "Phone number must only contain digits";
  }
  return null;
};

//User api call

const addUsers = async (data: User): Promise<boolean> => {
  try {
    const respone = await genericApiCall<User>("user", "POST", data);
    if (respone != null) {
      const user = respone.user as User;
      Iusername = user.fullName;
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

export default function LoginScreen({}) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const fullNameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);

  const [abds, setabds] = useState("");

  const handleValidation = async () => {
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    setErrors({
      fullName: fullNameError || "",
      email: emailError || "",
      phone: phoneError || "",
    });

    if (fullNameError) {
      fullNameRef.current.shake();
    }
    if (emailError) {
      emailRef.current.shake();
    }
    if (phoneError) {
      phoneRef.current.shake();
    }

    if (!fullNameError && !emailError && !phoneError) {
      const user: User = {
        fullName,
        email,
        phone,
      };
      const success = await addUsers(user);
      if (success) {
        _storeDataInAsyncStorage("@UserName", user.fullName);
      }
      Alert.alert("Thank You!", "Please go ahead", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Main"),
        },
      ]);
    }
  };
  const handleBlur = (field: string) => {
    switch (field) {
      case "fullName":
        setErrors((prev) => ({
          ...prev,
          fullName: validateFullName(fullName) || "",
        }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(email) || "" }));
        break;
      case "phone":
        setErrors((prev) => ({ ...prev, phone: validatePhone(phone) || "" }));
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>WELCOME</Text>
      <Text style={styles.title}>GET STARTED</Text>
      <View style={styles.inputView}>
        <Input
          style={styles.input}
          ref={fullNameRef}
          placeholderTextColor={"black"}
          placeholder="FULL NAME"
          value={fullName}
          onChangeText={setFullName}
          onBlur={() => handleBlur("fullName")}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.fullName ? (
          <Text style={styles.error}>{errors.fullName}</Text>
        ) : null}
        <Input
          ref={emailRef}
          style={styles.input}
          placeholderTextColor={"black"}
          placeholder="EMAIL"
          secureTextEntry
          value={email}
          onChangeText={setEmail}
          onBlur={() => handleBlur("email")}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        <Input
          ref={phoneRef}
          style={styles.input}
          placeholderTextColor={"black"}
          placeholder="PHONE"
          secureTextEntry
          value={phone}
          onChangeText={setPhone}
          onBlur={() => handleBlur("phone")}
          keyboardType="phone-pad"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleValidation}>
          <Text style={styles.buttonText}>LET'S GO</Text>
        </Pressable>
        <Text style={styles.optionsText}>FOLLOW US ON</Text>
      </View>

      <View style={styles.mediaIcons}>
        <Pressable onPress={() => Alert.alert("Facebook Link!", "LOL")}>
          <Icon
            raised
            name="facebook"
            type="font-awesome"
            color={"red"}
            style={styles.icons}
          />
        </Pressable>
        <Pressable onPress={() => Alert.alert("Tiktok Link!", "LOL")}>
          <Icon raised name="tiktok" color={"red"} style={styles.icons} />
        </Pressable>
        <Pressable onPress={() => Alert.alert("Insta Link!", "LOL")}>
          <Icon
            raised
            name="instagram"
            type="font-awesome"
            color={"red"}
            style={styles.icons}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
