
<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">
          <router-link to="/Home" class="mainNav"> Разумные решения </router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
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
        </b-collapse>
      </b-navbar>
    </div>
    <b-container>
      <router-view></router-view>
    </b-container>
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
  margin-left: 13px;
}
</style>