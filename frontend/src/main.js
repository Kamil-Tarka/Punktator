import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import underscore from 'vue-underscore'
import VueRouter from 'vue-router'
import Routes from './routes'


Vue.config.productionTip = false
Vue.use(underscore);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
