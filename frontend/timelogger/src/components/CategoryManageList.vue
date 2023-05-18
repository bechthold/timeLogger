<template>
  <div>
    <div v-if="categories">
      <div class="row">
        <div
          class="col-lg-12 mb-1"
          v-for="(category, index) in categories"
          :key="index"
        >
          <div class="category-card">
            <div class="category-info">
              <img
                :src="category.icon"
                alt="Category Icon"
                class="category-icon"
              />
              <div class="category-details">
                <div class="category-name">{{ category.name }}</div>
              </div>

              <ModalUpdateObject
                v-model="showUpdateModal"
                :title="'Category name'"
                @ok="handleOkClick"
                @cancel="handleCancelClick"
              >
                <input
                  class="form-control"
                  v-model="tempName"
                  @keydown.enter="handleOkClick"
                  @keydown.esc="handleCancelClick"
                />
              </ModalUpdateObject>

              <ModalDeleteObject
                v-model="showDeleteModal"
                :title="'Are you sure?'"
                @ok="handleConfirmDeleteClick(category)"
                @cancel="handleCancelClick"
              >
              </ModalDeleteObject>
            </div>
            <div class="category-actions">
              <button
                @click="handleUpdateCategoryClick(category)"
                class="btn btn-primary"
              >
                Change name
              </button>
              <button @click="handleDeleteClick" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No category found.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes as categoryActionTypes } from "@/store/modules/category";
import EventBus from "@/events/EventBus";
import ModalUpdateObject from "@/components/ModalUpdateObject.vue";
import ModalDeleteObject from "@/components/ModalDeleteObject.vue";

export default {
  name: "TlaCategoryList",
  components: {
    ModalUpdateObject,
    ModalDeleteObject,
  },

  data() {
    return {
      showUpdateModal: false,
      showDeleteModal: false,
      tempName: "",
      categoryId: null,
    };
  },
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

    handleDeleteClick() {
      this.showDeleteModal = true;
    },

    handleUpdateCategoryClick(category) {
      this.showUpdateModal = true;
      this.tempName = category.name;
      this.categoryId = category.id;
    },

    handleOkClick() {
      this.showUpdateModal = false;
      const updateData = {
        name: this.tempName,
      };

      this.$store
        .dispatch(categoryActionTypes.updateCategory, {
          categoryId: this.categoryId,
          updateData,
        })
        .then((updatedCategory) => {
          console.log("Category updated:", updatedCategory);
          EventBus.$emit("categoryUpdated");
        })
        .catch((error) => {
          console.log("Failed to update category:", error);
        });
    },

    handleConfirmDeleteClick(category) {
      const categoryId = category.id;
      this.$store
        .dispatch(categoryActionTypes.deleteCategory, { categoryId })
        .then((deletedCategory) => {
          console.log("Category deleted:", deletedCategory);
          this.showDeleteModal = false;
          EventBus.$emit("categoryDeleted");
        })
        .catch((error) => {
          console.log("Failed to delete category:", error);
        });
    },

    handleCancelClick() {
      this.showUpdateModal = false;
      this.showDeleteModal = false;
    },
  },
};
</script>

<style scoped>
.row {
  margin: -10px;
}

.category-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  border: 1px solid #ccc;
}

.category-info {
  display: flex;
  align-items: center;
}

.category-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.category-details {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-weight: bold;
}

.category-actions button {
  margin-left: 10px;
}

.modal-dialog {
  width: 900px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 0 30px;
  border-radius: 4px;
}

.modal-content textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
