import axios from "axios";
import moment from "moment";
import { AsyncStorage } from "react-native";
import Geolocation from "react-native-geolocation-service";

const getLocation = async (type) =>
  new Promise(function (myResolve, myReject) {
    Geolocation.getCurrentPosition((info) => {
      myResolve(info.coords[type]);
    });
  });

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
        "x-lat": await getLocation("latitude"),
        "x-lon": await getLocation("longitude"),
        "x-acc": await getLocation("accuracy"),
      },
    }
  );

const getProfile = async () =>
  axiosInstance.get(`runners/profile`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
      "x-acc": await getLocation("accuracy"),
    },
  });

export { getHome, getProfile };
