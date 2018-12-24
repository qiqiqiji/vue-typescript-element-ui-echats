<template>
  <el-menu
          :collapse="isOpen"
          unique-opened
          router
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :default-active="$route.path">
    <el-menu-item index="">
      <svg-icon className="icon" svgClass="icon-dunpai"></svg-icon>
      <span slot="title" style="color: #fff; font-size: 20px; font-weight: bolder">网络安全</span>
    </el-menu-item>
    <el-menu-item v-for="(items, index) in noChildren" :key="index" :index="items.url">
      <span slot="title">{{items.name}}</span>
    </el-menu-item>
    <el-submenu v-for="(first, index) in hasChildren" :key="index" :index="first.url" class="submenu-title-two">
      <template slot="title">
        <img :src="`/img/${first.imageUrl}`" class="menu-icon"/>
        <span>{{first.name}}</span>
      </template>
      <div v-for="(second, index) in first.submenu" :key="index">
        <el-menu-item :index="second.url" v-if="!second.submenu">
          <svg-icon className="menu-icon" svgClass="icon-more"></svg-icon>
          <span>{{second.name}}</span>
        </el-menu-item>
        <el-submenu :index="second.name" v-else class="submenu-title-three">
          <template slot="title">
            <svg-icon className="menu-icon" svgClass="icon-more"></svg-icon>
            <span>{{second.name}}</span>
          </template>
          <el-menu-item v-for="(third, index) in second.submenu" :key="index" :index="third.url">
            <svg-icon className="menu-icon" svgClass="icon-more"></svg-icon>
            <span>{{third.name}}</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
const appModule = namespace("app");
@Component({
  components: {
    SvgIcon
  }
})
export default class SideBar extends Vue {
  @appModule.State("isOpen") isOpen!: boolean;
  @appModule.State("menu") menu!: object[];
  @appModule.Action("getMenu") getMenu!: any;
  get hasChildren() {
    return this.menu.filter((items: any) => {
      return items.submenu;
    });
  }
  get noChildren() {
    return this.menu.filter((items: any) => {
      return !items.submenu;
    });
  }
  created(): void {
    this.getMenu();
  }
}
</script>

<style lang="scss" scoped>
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 14px;
  margin-left: 6px;
}
.icon {
  height: 32px;
  width: 32px;
  margin-right: 8px;
}
</style>
