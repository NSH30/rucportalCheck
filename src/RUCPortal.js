import Vue from "vue";
import App from "./components/app.vue";
import Vuetify from "vuetify";

import VuetifyDialog from "vuetify-dialog";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, VuetifyDialog, {
  components: {},
});

var mainComponent = null;
function start() {
  mainComponent = new Vue({
    Vuetify: new Vuetify(),
    render: (h) => h(App),
  });
  window.Bus = mainComponent;
  mainComponent.$mount("app");
}
export default function () {
  start();
  /* widget.addEvent("onLoad", () => {
    start();
  });
  widget.addEvent("onRefresh", () => {
    mainComponent.$emit("widgetRefresh");
  });
  widget.addEvent("onResize", () => {
    mainComponent.$emit("widgetResize");
  });
  widget.addEvent("onSearch", (data) => {
    mainComponent.$emit("widgetSearch", data);
  });*/
}
