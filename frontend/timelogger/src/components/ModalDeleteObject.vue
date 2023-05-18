<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="mb-4 mt-4">
          <h5 class="modal-title">{{ title }}</h5>
        </div>

        <div class="d-flex justify-content-end mb-4">
          <button class="btn btn-secondary ml-auto" @click="handleCancelClick">
            Cancel
          </button>
          <button class="btn btn-primary" @click="handleOkClick">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    value(newValue) {
      this.show = newValue;
    },
  },
  methods: {
    handleOkClick() {
      this.$emit("ok");
    },
    handleCancelClick() {
      this.$emit("cancel");
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

.modal-content textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
