import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import './plugins/apexchart'
import './plugins/vueButstrap'
import RequestMain from "./components/Request/RequestMain";
import ResursMain from "./components/Resurs/ResursMain";
import PlanningMain from "./components/Plannig/PlanningMain";
import HomeMain from "./components/HomeMain";

Vue.config.productionTip = false

const routes = [
  {path: '/Home', component: HomeMain},
  {path: '/Request' , component: RequestMain},
  {path: '/Resurs', component: ResursMain},
  {path: '/Planning', component: PlanningMain}
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
