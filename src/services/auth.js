import axios from "axios";
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

const sendOtp = async (phoneNumber) =>
  axiosInstance.post(
    "users/login",
    {
      phoneNumber,
    },
    {
      headers: {
        "x-lat": await getLocation("latitude"),
        "x-lon": await getLocation("longitude"),
      },
    }
  );

const login = async (data) =>
  axiosInstance.post("users/verifyOtp", data, {
    headers: {
      "x-lat": await getLocation("latitude"),
      "x-lon": await getLocation("longitude"),
    },
  });

export { sendOtp, login };
