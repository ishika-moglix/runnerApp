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

const getPickupTaskByPoId = async (type, pickupTaskId, poId) =>
  axiosInstance.get(`tasks/pickups/pickupTaskItems/search`, {
    params: {
      pickupTaskId,
      poId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

const getDeliveryTaskByInvoice = async (type, deliveryTaskId, invoiceNumber) =>
  axiosInstance.get(`tasks/deliveries/deliveryTaskItems/search`, {
    params: {
      deliveryTaskId,
      invoiceNumber,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

const getPickupTaskById = async (type, pickupTaskId) =>
  axiosInstance.get(
    `tasks/${
      type == "pickUpTasks"
        ? "pickups/pickupTaskItems"
        : type == "deliveryTasks"
        ? "deliveries/deliveryTaskItems"
        : ""
    }`,
    {
      params: {
        [`${
          type == "pickUpTasks"
            ? "pickupTaskId"
            : type == "deliveryTasks"
            ? "deliveryTaskId"
            : ""
        }`]: pickupTaskId,
      },
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const getPickupTaskItemsByPoId = async (poId, pickupTaskId) =>
  axiosInstance.get(`tasks/pickups/pickupTaskItemsByPoId`, {
    params: {
      poId,
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

const getReasonList = async (type) =>
  axiosInstance.get(`tasks/reasons?type=${type}`, {
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

const deliveryStart = async (data) =>
  axiosInstance.post(`tasks/delivery/taskStatuses`, data, {
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
  getPickupTaskItemsByPoId,
  getReasonList,
  deliveryStart,
  getDeliveryTaskByInvoice,
};
