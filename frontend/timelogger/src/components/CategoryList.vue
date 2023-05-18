<template>
  <div>
    <div v-if="categories">
      <div class="row">
        <div
          class="col-lg-2 col-md-4 col-sm-6 mt-4"
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
import { actionTypes as categoryActionTypes } from "@/store/modules/category";
import { actionTypes as timerActionTypes } from "@/store/modules/timer";
import EventBus from "@/events/EventBus";

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
        .dispatch(categoryActionTypes.getAllCategories)
        .then(() => {
          console.log("Success");
        })
        .catch(() => {
          console.log("Failure");
        });
    },
    handleCategoryClick(category) {
      const timerData = {
        category_id: category.id,
        comment: null,
      };
      this.$store
        .dispatch(timerActionTypes.createTimer, timerData)
        .then((newTimer) => {
          console.log("New Timer:", newTimer);
          EventBus.$emit("timerCreated");
        })
        .catch((error) => {
          console.error("Failed to create timer:", error);
        });
    },
  },
};
</script>

<style scoped>
.col-lg-2,
.col-md-4,
.col-sm-6 {
  padding: 10px;
  margin-right: 30px;
  margin-left: 20px;
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
