<template>
  <div class="user-profile-view">
    <div class="column col-lg-12 mt-4">
      <div class="d-flex justify-content-right">
        <button @click="handleLogout" class="button btn btn-primary ml-auto">
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",

  methods: {
    handleLogout() {
      localStorage.removeItem("accessToken");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.user-profile-view {
  display: flex;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  margin-bottom: 20px;
  margin-left: 150px;
  margin-right: 150px;
}

.button {
  margin: 20px;
}

@media (max-width: 992px) {
  .user-profile-view {
    flex-direction: column;
  }

  .column {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
