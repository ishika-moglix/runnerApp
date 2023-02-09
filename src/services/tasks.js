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
        "x-lat": await getLocation("latitude"),
        "x-lon": await getLocation("longitude"),
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
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
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
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
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
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const getPickupTaskById = async (type, pickupTaskId) =>
  axiosInstance.get(
    `tasks/${
      type == "pickUpTasks"
        ? "pickups/pickupTaskItems"
        : type == "deliveryTasks"
        ? "deliveries/deliveryTaskItems"
        : type == "returnTasks"
        ? "returnPickup/returnPickupTaskItems"
        : ""
    }`,
    {
      params: {
        [`${
          type == "pickUpTasks"
            ? "pickupTaskId"
            : type == "deliveryTasks"
            ? "deliveryTaskId"
            : type == "returnTasks"
            ? "returnTaskId"
            : ""
        }`]: pickupTaskId,
      },
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        "x-lat": await getLocation("latitude"),
        "x-lon": await getLocation("longitude"),
      },
    }
  );

const getSupplierPickupTaskById = async (type, pickupTaskId) =>
  axiosInstance.get(`v2/tasks/runner/delivery/items`, {
    params: {
      runnerTaskId: pickupTaskId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const getPickupTaskItemsByPoId = async (poId, pickupTaskId) =>
  axiosInstance.get(`tasks/pickups/pickupTaskItemsByPoId`, {
    params: {
      poId,
      pickupTaskId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const getDeliveryTaskItemsByTaskItemId = async (deliveryTaskItemId) =>
  axiosInstance.get(`tasks/deliveries/deliveryTaskLineItems`, {
    params: {
      deliveryTaskItemId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const getReturnTaskItemsByTaskItemId = async (returnTaskItemId) =>
  axiosInstance.get(`tasks/returnPickup/returnPickupTaskLineItems`, {
    params: {
      returnTaskItemId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const getPdfByPoId = async (poId) =>
  axiosInstance.get(`tasks/s3ChallanUrl`, {
    params: {
      poId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const getReasonList = async (type) =>
  axiosInstance.get(`tasks/reasons?type=${type}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const pickupStart = async (data) =>
  axiosInstance.post(`tasks/pickup/taskStatuses`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const deliveryStart = async (data) =>
  axiosInstance.post(`tasks/delivery/taskStatuses`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const returnStart = async (data) =>
  axiosInstance.post(`tasks/returnPickup/taskStatuses`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const returnPicked = async (data) =>
  axiosInstance.post(`tasks/returnPickup/picked`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const markAttempted = async (data) =>
  axiosInstance.post(`tasks/delivery/markAttempted`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const markAttemptedReturn = async (data) =>
  axiosInstance.post(`tasks/return/pickupPending`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const uploadImages = async (data) =>
  axiosInstance.post(`tasks/delivery/deliveredPod`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const markDelivered = async (data) =>
  axiosInstance.post(`tasks/delivery/delivered`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

const returnRejected = async (data) =>
  axiosInstance.post(`v2/tasks/delivery/rejected`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
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
  getDeliveryTaskItemsByTaskItemId,
  markAttempted,
  returnStart,
  uploadImages,
  getReturnTaskItemsByTaskItemId,
  markAttemptedReturn,
  markDelivered,
  returnPicked,
  getSupplierPickupTaskById,
  returnRejected,
};
