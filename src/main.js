import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import './cube-ui';
import './register';
import './common/stylus/index.styl'
import "./registerServiceWorker";
import fastClick from 'fastclick';
// import 'lib-flexible/flexible';
Vue.config.productionTip = false;
fastClick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
