import Vue from "vue";

//import App from './App.vue'
import app from "./components/app.vue";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(app),
}).$mount("#app");
