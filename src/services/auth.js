import axios from "axios";
import Geolocation from "react-native-geolocation-service";
import { BASE_URL } from "../constants";
import { getDistance } from 'geolib';


const getLocation = async (type) =>
  new Promise(function (myResolve, myReject) {
    Geolocation.getCurrentPosition((info) => {
      myResolve(info.coords[type]);
    },
    (error) => {
      myReject(error.message);
    });
  });

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

const sendOtp = async (phoneNumber) =>
  axiosInstance.post("users/login", {
    phoneNumber,
    latitude: await getLocation("latitude"),
    longitude: await getLocation("longitude"),
    accuracy: await getLocation("accuracy"),
    address: "",
  });

const login = async (data) =>
  axiosInstance.post("users/verifyOtp", {
    ...data,
    latitude: await getLocation("latitude"),
    longitude: await getLocation("longitude"),
    accuracy: await getLocation("accuracy"),
    address: "",
  });

const uploadDeviceId = async (data) =>
  axiosInstance.post("users/saveDeviceId", data, {
    headers: {
      latitude: await getLocation("latitude"),
      longitude: await getLocation("longitude"),
      accuracy: await getLocation("accuracy"),
    },
  });

export { sendOtp, login, uploadDeviceId };
