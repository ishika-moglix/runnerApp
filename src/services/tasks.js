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

const getPickupTaskByPoId = async (pickupTaskId, poId) =>
  axiosInstance.get(`tasks/pickups/pickupTaskItems/search`, {
    params: {
      pickupTaskId,
      poId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

const getPickupTaskById = async (pickupTaskId) =>
  axiosInstance.get(`tasks/pickups/pickupTaskItems`, {
    params: {
      pickupTaskId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

const getPdfByPoId = async (poId) =>
  axiosInstance.get(`tasks/s3ChallanUrl`, {
    params: {
      poId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

const pickupStart = async (data) =>
  axiosInstance.post(`tasks/pickup/taskStatuses`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

export {
  getTask,
  getPickupTask,
  getPickupTaskByPoId,
  getPickupTaskById,
  getPdfByPoId,
  pickupStart,
};
