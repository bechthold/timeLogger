import categoryApi from "@/api/category";

const state = {
  categories: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getAllCategoriesStart: "[category] Get all categories start",
  getAllCategoriesSuccess: "[category] Get all categories success",
  getAllCategoriesFailure: "[category] Get all categories failure",

  createCategoryStart: "[category] Create category start",
  createCategorySuccess: "[category] Create category success",
  createCategoryFailure: "[category] Create category failure",

  updateCategoryStart: "[category] Update category start",
  updateCategorySuccess: "[category] Update category success",
  updateCategoryFailure: "[category] Update category failure",

  deleteCategoryStart: "[category] Delete category start",
  deleteCategorySuccess: "[category] Delete category success",
  deleteCategoryFailure: "[category] Delete category failure",
};

export const actionTypes = {
  getAllCategories: "[category] Get all categories",
  createCategory: "[category] Create category",
  updateCategory: "[category] Update category",
  deleteCategory: "[category] Delete category",
};

const mutations = {
  [mutationTypes.getAllCategoriesStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getAllCategoriesSuccess](state, payload) {
    state.isLoading = false;
    state.categories = payload;
  },
  [mutationTypes.getAllCategoriesFailure](state) {
    state.isLoading = false;
    state.categories = [];
  },
  [mutationTypes.createCategoryStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.createCategorySuccess](state, createdCategory) {
    state.categories.push(createdCategory);
  },
  [mutationTypes.createCategoryFailure](state, error) {
    state.isLoading = false;
    state.error = error;
  },

  [mutationTypes.updateCategorySuccess](state, updatedCategory) {
    const index = state.categories.findIndex(
      (category) => category.id === updatedCategory.id
    );
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },
  [mutationTypes.deleteCategorySuccess](state, categoryId) {
    state.categories = state.categories.filter(
      (category) => category.id !== categoryId
    );
  },
};

const actions = {
  [actionTypes.getAllCategories](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getAllCategoriesStart);
      categoryApi
        .getCategories()
        .then((response) => {
          context.commit(
            mutationTypes.getAllCategoriesSuccess,
            response.data.categories
          );
          resolve(response.data.categories);
        })
        .catch(() => {
          context.commit(mutationTypes.getAllCategoriesFailure);
        });
    });
  },

  [actionTypes.createCategory](context, categoryData) {
    context.commit(mutationTypes.createCategoryStart);
    return new Promise((resolve, reject) => {
      categoryApi
        .createCategory(categoryData)
        .then((response) => {
          context.commit(
            mutationTypes.createCategorySuccess,
            response.data.category
          );
          resolve(response.data.category);
        })
        .catch((error) => {
          context.commit(mutationTypes.createCategoryFailure, error);
          reject(error);
        });
    });
  },

  [actionTypes.updateCategory](context, { categoryId, updateData }) {
    return new Promise((resolve) => {
      categoryApi
        .updateCategory(categoryId, updateData)
        .then((response) => {
          const updatedCategory = response.data.category;
          context.commit(mutationTypes.updateCategorySuccess, updatedCategory);
          resolve(updatedCategory);
        })
        .catch((error) => {
          console.log("Failed to update category:", error);
        });
    });
  },

  [actionTypes.deleteCategory](context, { categoryId }) {
    return new Promise((resolve) => {
      categoryApi
        .deleteCategory(categoryId)
        .then(() => {
          context.commit(mutationTypes.deleteCategorySuccess, categoryId);
          resolve();
        })
        .catch((error) => {
          console.log("Failed to delete category:", error);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
