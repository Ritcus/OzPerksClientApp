import AsyncStorage from "@react-native-async-storage/async-storage";

type UserData = {
  username: string | null;
  isAdmin: boolean;
};

export const _storeDataInAsyncStorage = async (
  variableName: string,
  variableValue: UserData
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(variableName, JSON.stringify(variableValue));
    return true;
  } catch (error) {
    console.error("Error saving data", error);
    return false;
  }
};

export const _retrieveDataFromAsyncStorage = async (
  variableName: string
): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(variableName);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
