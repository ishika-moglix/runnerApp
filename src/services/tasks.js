import axios from "axios";
import moment from "moment";
import { AsyncStorage } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://runnerqa.moglilabs.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getTask = async (type, date, page) =>
  axiosInstance.post(
    `v2/tasks/runner/delivery`,
    {
      from: moment(date).format("YYYY-MM-DD"),
      to: moment(date).format("YYYY-MM-DD"),
      type: type.toUpperCase(),
      pageNumber: page,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const getPickupTask = async (type, date, page) =>
  axiosInstance.get(`tasks/pickups`, {
    params: {
      from: moment(date).format("YYYY-MM-DD"),
      to: moment(date).format("YYYY-MM-DD"),
      type: type.toUpperCase(),
      pageNumber: page,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

export { getTask, getPickupTask };
