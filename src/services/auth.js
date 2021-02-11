import axios from "axios";
import store from "../redux";

const axiosInstance = axios.create({
  baseURL: store.getState().auth.url,
  headers: {
    "Content-Type": "application/json",
  },
});

const sendOtp = async (phoneNumber) =>
  axiosInstance.post("users/login", {
    phoneNumber,
  });

const login = async (data) => axiosInstance.post("users/verifyOtp", data);

export { sendOtp, login };
