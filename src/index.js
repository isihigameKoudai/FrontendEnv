import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import App from "./App.vue";
import route from "./route";
import store from "./store";

Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  el: "#app",
  store: store,
  router: route,
  render: h => h(App)
});
