import axios from "@/api/axios";

const getTimers = () => {
  return axios.get("/timers");
};

const createTimer = (timerData) => {
  return axios.post("/timers", { timer: timerData });
};

export default {
  getTimers,
  createTimer,
};
