import axios from "@/api/axios";

const getCategories = () => {
  return axios.get("/categories");
};

export default {
  getCategories,
};
