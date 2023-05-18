<template>
  <div class="category-view">
    <div class="left-column col-lg-6 mt-4">
      <TlaCategoryManageList />

      <div class="d-flex justify-content-right">
        <button @click="openModal" class="button btn btn-primary ml-auto">
          Add new category
        </button>
      </div>
    </div>

    <ModalCreateCategory
      :showModal="showModal"
      @createCategory="createCategory"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import TlaCategoryManageList from "@/components/CategoryManageList";
import ModalCreateCategory from "@/components/ModalCreateCategory";
import { actionTypes as categoryActionTypes } from "@/store/modules/category";
import EventBus from "@/events/EventBus";

export default {
  name: "CategoryView",
  components: {
    TlaCategoryManageList,
    ModalCreateCategory,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    createCategory(categoryData) {
      this.$store
        .dispatch(categoryActionTypes.createCategory, categoryData)
        .then((newCategory) => {
          console.log("New Category:", newCategory);
          EventBus.$emit("categoryCreated");
          this.closeModal();
        })
        .catch((error) => {
          console.error("Failed to create category:", error);
          this.closeModal();
        });
    },
  },
};
</script>

<style scoped>
.category-view {
  display: flex;
  flex-wrap: wrap;
}

.left-column,
.right-column {
  flex: 1;
  margin-bottom: 20px;
}

.left-column {
  margin-left: 150px;
  margin-right: 150px;
}

.button {
  margin: 20px;
}

@media (max-width: 992px) {
  .category-view {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
