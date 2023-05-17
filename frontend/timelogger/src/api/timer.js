import axios from "@/api/axios";

const getTimers = () => {
  return axios.get("/timers");
};

const createTimer = () => {
  return axios.post("/timers");
};

export default {
  getTimers,
  createTimer,
};
