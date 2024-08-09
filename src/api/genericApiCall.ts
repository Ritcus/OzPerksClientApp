import { Platform } from "react-native";

async function genericApiCall<T>(endpoint: string, method: string, data?: T) {
  let url = "http://192.168.4.25:7018/api/" + `${endpoint}`;

  if (Platform.OS === "android")
    url = "http://192.168.4.25:7018/api/" + `${endpoint}`;

  let requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    const resposeData = await response.json();
    if (method == "GET") {
      const resultData: T = resposeData;
      return resultData;
    } else {
      return resposeData;
    }
  } catch (error) {
    console.error("API error", error);
  }
}

export default genericApiCall;
