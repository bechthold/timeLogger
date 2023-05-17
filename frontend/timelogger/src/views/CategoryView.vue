<template>
  <div>
    <TlaStartedTimerList />
    <TlaCategoryList />
    <FinishedTimerList />
  </div>
</template>

<script>
import TlaCategoryList from "@/components/CategoryList";
import TlaStartedTimerList from "@/components/StartedTimerList.vue";
import FinishedTimerList from "@/components/FinishedTimerList.vue";

export default {
  name: "CategoryView",
  components: {
    TlaCategoryList,
    TlaStartedTimerList,
    FinishedTimerList,
  },
};
</script>
