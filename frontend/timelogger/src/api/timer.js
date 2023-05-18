import axios from "@/api/axios";

const getTimers = () => {
  return axios.get("/timers");
};

const createTimer = (timerData) => {
  return axios.post("/timers", { timer: timerData });
};

const updateTimer = (id, updateData) => {
  return axios.put(`/timers/${id}`, { timer: updateData });
};

export default {
  getTimers,
  createTimer,
  updateTimer,
};
