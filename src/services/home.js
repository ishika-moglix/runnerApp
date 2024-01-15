import axios from "axios";
import moment from "moment";
import { AsyncStorage } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { BASE_URL } from "../constants";

const getLocation = async (type) =>
  new Promise(function (myResolve, myReject) {
    Geolocation.getCurrentPosition((info) => {
      myResolve(info.coords[type]);
    });
  });

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
        latitude: await getLocation("latitude"),
        longitude: await getLocation("longitude"),
        accuracy: await getLocation("accuracy"),
      },
    }
  );

const getProfile = async () =>
  axiosInstance.get(`runners/profile`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
    },
  });

export { getHome, getProfile };
