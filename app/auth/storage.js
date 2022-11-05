import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    return await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error while storing auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error while getting auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken()
  if(token) return (token) ? jwtDecode(token) : null
}

const removeToken = async () => {
    try {
        return await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log("Error while removing auth token", error);
    }
}
export default {
  storeToken,
  getToken,
  getUser,
  removeToken
};
