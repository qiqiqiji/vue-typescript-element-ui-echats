<template>
  <div class="nav">
    <div @click="handleClick" :class="{'is-active': isActive}" class="button">
      <svg-icon class="icon" svgClass="icon-caidan"/>
    </div>
    <el-breadcrumb separator="/" style="margin-left: 20px;">
      <transition-group name="fade-transform" mode="out-in">
        <el-breadcrumb-item
          v-for="(items, index) in $route.matched"
          :key="index"
        >{{items.meta.title}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div @click="fullScreen" class="full-screen">
      <svg-icon className="icon" svgClass="icon-quanping"></svg-icon>
    </div>
    <el-dropdown trigger="click" @command="handleCommand" class="nav-right">
      <div class="el-dropdown-link">
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          alt="个人中心"
        >
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改个人信息</el-dropdown-item>
        <el-dropdown-item command="logOut" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import screenfull from "screenfull";
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

const appModule = namespace("app");

@Component({
  components: {
    SvgIcon
  }
})
export default class NavBar extends Vue {
  private isActive: boolean = false;
  @appModule.Action("sideToggle") toggleSideBar!: any;
  created() {
    console.log(this.$route.matched);
  }
  handleClick(): void {
    this.isActive = !this.isActive;
    this.toggleSideBar();
  }
  handleCommand(command: string): void {
    if (command === "logOut") {
      localStorage.clear();
      this.$router.replace("/");
    }
  }
  fullScreen() {
    if (screenfull && screenfull.enabled) {
      screenfull.toggle();
    } else {
      this.$message({
        message: "you browser can not work",
        type: "warning"
      });
      return;
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
  box-sizing: border-box;
  position: relative;
}
.button {
  width: 30px;
  height: 30px;
  transform: rotate(0deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}
.is-active {
  transform: rotate(-90deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}
.full-screen {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 100px;
}
.icon {
  width: 30px;
  height: 30px;
}
.nav-right {
  position: absolute;
  right: 20px;
  z-index: 10;
  img {
    height: 40px;
    width: 40px;
    border-radius: 10px;
  }
}
</style>
