<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <div class="d-flex justify-content-center">
            <h1 class="text-center">Sign up</h1>
          </div>
          <p class="text-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <tla-validation-errors
            class="text-danger"
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg mb-3"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg mb-3"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg mb-3"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-lg btn-primary ml-auto"
                type="submit"
                :disabled="isSubmitting"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TlaValidationErrors from "@/components/ValidationErrors";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "TlaRegister",
  components: {
    TlaValidationErrors,
  },
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((user) => {
          console.log(`Successfully register user ${user}`);
          this.$router.push({ name: "home" });
        });
    },
  },
};
</script>
