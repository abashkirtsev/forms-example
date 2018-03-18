import Vue from "vue";
import Vuex from "vuex";

import App from "./components/app";
import storeConfig from "./store";

Vue.use(Vuex);

new Vue({
  el: "#app",
  store: new Vuex.Store(storeConfig),
  render: h => h(App)
});
