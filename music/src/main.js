import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./api/apiall"

Vue.use(Router);
Vue.use(ElementUI);
Vue.prototype.axios= axios
axios.defaults.baseURL='http://10.50.5.48:8080';     // http://10.12.0.26:8080
const originalPush = Router.prototype.push                            //
Router.prototype.push = function push(location) {                     //  解决多次点击同一个路由报错
  return originalPush.call(this, location).catch(err => err)          //
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


