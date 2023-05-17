<template>
  <div>
    <div v-if="categories">
      <div class="row">
        <div
          class="col-lg-2 col-md-4 col-sm-6 mb-4"
          v-for="(category, index) in categories"
          :key="index"
          @click="handleCategoryClick(category)"
        >
          <div class="category-card">
            <img
              :src="category.icon"
              alt="Category Icon"
              class="category-icon"
            />
            <div class="category-name">{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/category";

export default {
  name: "TlaCategoryList",
  computed: {
    ...mapState({
      isLoading: (state) => state.category.isLoading,
      categories: (state) => state.category.categories,
      error: (state) => state.category.error,
    }),
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store
        .dispatch(actionTypes.getAllCategories)
        .then(() => {
          console.log("Success");
        })
        .catch(() => {
          console.log("Failure");
        });
    },
    handleCategoryClick(category) {
      console.log("Category ID:", category.id);
      console.log("Category Name:", category.name);
    },
  },
};
</script>

<style scoped>
.row {
  margin: -10px;
}

.col-lg-2,
.col-md-4,
.col-sm-6 {
  padding: 10px;
}

.category-card {
  cursor: pointer;
  text-align: center;
}

.category-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.category-name {
  font-weight: bold;
}
</style>
