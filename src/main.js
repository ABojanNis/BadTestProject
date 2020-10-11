import Vue from "vue";

import "./components";

import "./plugins";
import vuetify from "./plugins/vuetify";

import { EventBus } from "./services/EventBus";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

var app = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

window.addEventListener("unhandledrejection", event => {
  event.preventDefault();

  var promise = event.promise;

  promise.catch(error => {
    EventBus.$emit("serverError", { component: app, error: error });
  });
});
