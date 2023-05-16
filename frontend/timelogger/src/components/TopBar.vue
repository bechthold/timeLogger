<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >TimeLogger</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'categories' }"
                exact
                active-class="active"
              >
                <i class="ion-compose"></i> Categories
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'userProfile', params: { id: currentUser.id } }"
                exact
                active-class="active"
              >
                <img class="user-pic" :src="currentUser.image" />
                {{ currentUser.username }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'login' }"
                exact
                active-class="active"
              >
                Sign in
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'register' }"
                exact
                active-class="active"
              >
                Sign up
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getterTypes } from "@/store/modules/auth";
import { mapGetters } from "vuex";

export default {
  name: "TlaTopBar",
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous,
    }),
  },
};
</script>
