<template>
  <div>
    <tla-top-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import TlaTopBar from "@/router/TopBar.vue";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "TlaApp",
  components: {
    TlaTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
