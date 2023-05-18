<template>
  <div class="category-view">
    <div class="left-column col-lg-6 mt-4">
      <TlaStartedTimerList />
      <TlaCategoryList />
    </div>
    <div class="right-column col-lg-6 mt-4">
      <FinishedTimerList />
    </div>
  </div>
</template>

<script>
import TlaCategoryList from "@/components/CategoryList";
import TlaStartedTimerList from "@/components/StartedTimerList.vue";
import FinishedTimerList from "@/components/FinishedTimerList.vue";

export default {
  name: "LoggerView",
  components: {
    TlaCategoryList,
    TlaStartedTimerList,
    FinishedTimerList,
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
}

.right-column {
  margin-right: 150px;
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
