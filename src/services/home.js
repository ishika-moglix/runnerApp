import axios from "axios";
import moment from "moment";
import { AsyncStorage } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://runnerqa.moglilabs.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getHome = async (date) =>
  axiosInstance.get(
    `runners/summary?from=${moment(date).format("YYYY-MM-DD")}&to=${moment(
      date
    ).format("YYYY-MM-DD")}`,
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const getProfile = async () =>
  axiosInstance.get(`runners/profile`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

export { getHome, getProfile };
