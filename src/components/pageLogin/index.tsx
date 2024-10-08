import React, { useState, useRef } from "react";
import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import genericApiCall from "../../api/genericApiCall";
import { User } from "../../types/TypeUser";
import { _storeDataInAsyncStorage } from "../../functions";
import { useUserContext } from "../../userContext";

let Iusername: string;
let IisAdmin: boolean;

type UserData = {
  username: string | null;
  isAdmin: boolean;
};

//

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

  //User api call

  const addUsers = async (data: User): Promise<boolean> => {
    try {
      const response = await genericApiCall<User>("user", "POST", data);
      if (response != null) {
        const user = response.user as User;
        Iusername = user.fullName;
        IisAdmin = false;
        if (user.role == "Admin") IisAdmin = true;
        console.log(IisAdmin);
        const userData: UserData = { username: Iusername, isAdmin: IisAdmin };
        _storeDataInAsyncStorage("userData", userData);
        setUsername(Iusername);
        return true;
      }
    } catch (e) {
      console.log(e);
      setUsername(Iusername);
    }
    return false;
  };

  const { setUsername, username } = useUserContext();

  const fullNameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);

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
      Alert.alert("Thank You!", "Please go ahead", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 60,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "red",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "red",
  },
  inputView: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    color: "black",
    borderColor: "green",

    borderWidth: 2,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "red",
  },
  button: {
    backgroundColor: "red",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "black",
    fontSize: 20,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "red",
    fontSize: 13,
  },
  error: {
    color: "red",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
});
