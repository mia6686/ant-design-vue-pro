import Vue from "vue";
import antd from "ant-design-vue";
import ref from "vue-ref";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
//引入这个权限组件
import Authorized from "./components/Authorized";
//引入这个权限指令
import Auth from "./directives/auth"

Vue.config.productionTip = false;

Vue.use(antd);
Vue.use(ref, { name: "ant-ref" });
//进行全局使用
Vue.component("Authorized", Authorized);
//可以使用use的方式去使用
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
