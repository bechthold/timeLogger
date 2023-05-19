import Vue from "vue";
import VueRouter from "vue-router";

import TlaRegister from "@/views/RegisterView.vue";
import TlaLogin from "@/views/LoginView.vue";
import TlaLogger from "@/views/LoggerView.vue";
import TlaCategory from "@/views/CategoryView.vue";
import TlaUserProfile from "@/views/UserProfileView.vue";
import TlaHome from "@/views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/categories",
    name: "categories",
    component: TlaCategory,
  },
  {
    path: "/",
    name: "home",
    component: TlaHome,
  },
  {
    path: "/register",
    name: "register",
    component: TlaRegister,
  },
  {
    path: "/login",
    name: "login",
    component: TlaLogin,
  },
  {
    path: "/logger",
    name: "logger",
    component: TlaLogger,
  },
  {
    path: "/user",
    name: "userProfile",
    component: TlaUserProfile,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
