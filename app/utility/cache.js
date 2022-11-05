import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const isExpiredTime = 5;

const store = async (key, value) => {
  const item = {
    value,
    timestamp: Date.now(),
  };

  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
    const now = dayjs()
    const storedTime = dayjs(item.timestamp)
    return now.diff(storedTime, 'minute') > isExpiredTime;
}

const get = async (key) => {
    const result = await AsyncStorage.getItem(prefix + key)
    const item = JSON.parse(result)

    if(!item) return null;

    if(isExpired(item)){
        //Command Query Separation (CQS)
        await AsyncStorage.removeItem(prefix + key)
        return null;
    }

    return item.value
}

export default {
  store,
  get
};
