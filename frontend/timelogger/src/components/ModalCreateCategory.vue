<template>
  <div class="modal" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="mb-4 mt-4">
          <h5 class="modal-title">Add new category</h5>
        </div>
        <div class="mb-4">
          <input
            type="text"
            v-model="categoryName"
            placeholder="Category name"
            class="form-control mb-4"
          />
          <input
            type="text"
            v-model="categoryIcon"
            placeholder="Category icon"
            class="form-control"
          />
        </div>
        <div class="d-flex justify-content-end mb-4">
          <button
            type="button"
            class="btn btn-secondary ml-auto"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleCreateCategory"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      categoryName: "",
      categoryIcon: "",
    };
  },
  methods: {
    handleCreateCategory() {
      const categoryData = {
        name: this.categoryName,
        icon: this.categoryIcon,
      };
      this.$emit("createCategory", categoryData);
    },
    handleCancel() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-dialog {
  width: 900px;
}

.modal-content {
  background-color: #fff;
  padding: 0 30px;
  border-radius: 4px;
}

.modal-content input {
  width: 100%;
  margin-bottom: 10px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
