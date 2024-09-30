import { Platform } from "react-native";

async function genericApiCall<T>(
  endpoint: string,
  method: string,
  data?: T | FormData
) {
  let url = "http://192.168.4.25:7018/api/" + `${endpoint}`;

  if (Platform.OS === "android")
    url = "http://192.168.4.25:7018/api/" + `${endpoint}`;

  let body: BodyInit_ | null = null;
  let headers: HeadersInit_ = {};
  if (data instanceof FormData) {
    body = data;
  } else {
    body = data ? JSON.stringify(data) : null;
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, { method, body, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
    }
    const resposeData = await response.json();

    console.log(resposeData);
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
