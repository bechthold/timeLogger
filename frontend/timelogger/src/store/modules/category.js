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
};

export const actionTypes = {
  getAllCategories: "[category] Get all categories",
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
};

export default {
  state,
  actions,
  mutations,
};
