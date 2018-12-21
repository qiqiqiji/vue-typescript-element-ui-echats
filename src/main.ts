import Vue from "vue";
import "./mock";

// import "../theme/index.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import "@/styles/index.scss";

import App from "@/App.vue";
import router from "./router/router";
import store from "./store/store";
import "./permission";

Vue.use(ElementUI);

// import svg from "@/components/SvgIcon/SvgIcon.vue";
//
// // 注册全局组件
// Vue.component("svg-icon", svg);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
