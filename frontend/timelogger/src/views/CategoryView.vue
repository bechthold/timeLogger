<template>
  <div>
    <h1>Categories</h1>
    <TlaCategoryList />
  </div>
</template>

<script>
import TlaCategoryList from "@/components/CategoryList";

export default {
  name: "CategoryView",
  components: {
    TlaCategoryList,
  },
};
</script>
