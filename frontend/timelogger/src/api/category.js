import axios from "@/api/axios";

const getCategories = () => {
  return axios.get("/categories");
};

const createCategory = (categoryData) => {
  console.log(`category data ${JSON.stringify(categoryData)}`);
  return axios.post("/categories", { category: categoryData });
};

const updateCategory = (id, updateData) => {
  return axios.put(`/categories/${id}`, { category: updateData });
};

const deleteCategory = (id) => {
  return axios.delete(`/categories/${id}`);
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
