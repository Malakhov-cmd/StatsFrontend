
<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link to="/Home" class="mainNav"> Разумные решения </router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/Request" class="mainNav">Обращения</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/Resurs" class="mainNav">Ресурсы</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/Planning" class="mainNav">Планировщик</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>

import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

export default {
  name: 'Home',

  data: () => ({

  })

}
</script>

<style>
.mainNav{
  text-decoration: none;
  color: #b8b6b6;
}
</style>