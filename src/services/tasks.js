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

const getFuturePos = async (poId) =>
  axiosInstance.post(
    `tasks/futurePickuppoItemsByPoId`,
    {
      poId,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        latitude: await getLocation("latitude"),
        longitude: await getLocation("longitude"),
        accuracy: await getLocation("accuracy"),
        address: "",
      },
    }
  );

const assingPickUp = async (poItemIds) =>
  axiosInstance.post(
    `tasks/futurePickup/createAssign`,
    {
      poItemIds,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        latitude: await getLocation("latitude"),
        longitude: await getLocation("longitude"),
        accuracy: await getLocation("accuracy"),
        address: "",
      },
    }
  );

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
        latitude: await getLocation("latitude"),
        longitude: await getLocation("longitude"),
        accuracy: await getLocation("accuracy"),
        address: "",
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
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
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
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
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
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
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
        latitude: await getLocation("latitude"),
        longitude: await getLocation("longitude"),
        accuracy: await getLocation("accuracy"),
        address: "",
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
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      address: "",

      accuracy: await getLocation("accuracy"),
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
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
  });

const getDeliveryTaskItemsByTaskItemId = async (deliveryTaskItemId) =>
  axiosInstance.get(`tasks/deliveries/deliveryTaskLineItems`, {
    params: {
      deliveryTaskItemId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
  });

const getReturnTaskItemsByTaskItemId = async (returnTaskItemId) =>
  axiosInstance.get(`tasks/returnPickup/returnPickupTaskLineItems`, {
    params: {
      returnTaskItemId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
  });

const getPdfByPoId = async (poId) =>
  axiosInstance.get(`tasks/s3ChallanUrl`, {
    params: {
      poId,
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),

      address: "",
    },
  });

const getReasonList = async (type) =>
  axiosInstance.get(`tasks/reasons?type=${type}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
  });

const pickupStart = async (data) =>
  axiosInstance.post(
    `tasks/pickup/taskStatuses`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const deliveryStart = async (data) =>
  axiosInstance.post(
    `tasks/delivery/taskStatuses`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const returnStart = async (data) =>
  axiosInstance.post(
    `tasks/returnPickup/taskStatuses`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const returnPicked = async (data) =>
  axiosInstance.post(
    `tasks/returnPickup/picked`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const markAttempted = async (data) =>
  axiosInstance.post(
    `tasks/delivery/markAttempted`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const markAttemptedReturn = async (data) =>
  axiosInstance.post(
    `tasks/return/pickupPending`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const uploadImages = async (data) =>
  axiosInstance.post(
    `tasks/delivery/deliveredPod`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const markDelivered = async (data) =>
  axiosInstance.post(
    `tasks/delivery/delivered`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

const returnRejected = async (data) =>
  axiosInstance.post(
    `v2/tasks/delivery/rejected`,
    {
      ...data,
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
      address: "",
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  );

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
  getFuturePos,
  assingPickUp,
};
