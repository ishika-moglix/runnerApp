import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://runnerqa.moglilabs.com/api",
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
