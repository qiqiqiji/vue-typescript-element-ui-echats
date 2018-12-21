<template>
  <el-container style="height: 100%;">
    <side-bar class="side"></side-bar>
    <el-container>
      <el-header style="padding: 0;">
        <nav-bar></nav-bar>
      </el-header>
      <el-main style="background-color: #F0F2F5">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SideBar from "./components/SideBar.vue";
import NavBar from "./components/NavBar.vue";

@Component({
  components: {
    SideBar,
    NavBar
  }
})
export default class Layout extends Vue {}
</script>

<style scoped lang="scss">
</style>
