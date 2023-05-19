<template>
  <div class="column mt-4">
    <div v-if="isLoggedIn">
      <h2 class="mb-4">Welcome, {{ currentUser.username }}!</h2>

      <p>
        To create new categories, click on the link to the
        <router-link :to="{ name: 'categories' }">
          Categories section
        </router-link>
      </p>

      <p>
        If you want to manage timers, you can go to the
        <router-link :to="{ name: 'logger' }"> Logger section</router-link>
      </p>

      <p>
        To manage
        <router-link :to="{ name: 'userProfile' }">your account</router-link>
        , click on your name in the header of the website.
      </p>
    </div>

    <div v-else>
      <h2 class="mb-4">Welcome!</h2>

      <p>
        If you don't have an account yet, click
        <router-link :to="{ name: 'register' }"> Sign up</router-link>
      </p>

      <p>
        If you have an account, please log in at
        <router-link :to="{ name: 'login' }"> Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth";

export default {
  name: "TlaHome",

  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
    }),
  },
};
</script>

<style>
.column {
  margin-left: 150px;
  margin-right: 150px;
}

@media (max-width: 992px) {
  .column {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
