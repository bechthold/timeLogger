<template>
  <div class="auth-page mt-4">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <div class="d-flex justify-content-center">
            <h1 class="text-center">Sign in</h1>
          </div>
          <p class="text-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
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
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { actionTypes } from "@/store/modules/auth";
import TlaValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: "McvLogin",
  components: {
    TlaValidationErrors,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "logger" });
        });
    },
  },
};
</script>
