import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/HomeView.vue";
import TlaRegister from "@/views/RegisterView.vue";
import TlaLogin from "@/views/LoginView.vue";
import TlaCategory from "@/views/CategoryView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
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
    path: "/categories",
    name: "categories",
    component: TlaCategory,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
