import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";

extend("required", { ...required, message: e => e + " is required!" });
extend("min", {
  ...min,
  message: (e, v) => e + " must be minimum " + v.length + " characters long!"
});

Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);
