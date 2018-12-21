import Vue from "vue";
import Router from "vue-router";

import LayoutTwo from "@/views/layout/layout-two.vue";
import LayoutThree from "@/views/layout/layout-three.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/login/index.vue")
    },
    {
      path: "/log",
      meta: { title: "应用日志" },
      component: LayoutTwo,
      children: [
        {
          path: "home",
          meta: { title: "首页" },
          component: () => import("@/views/log/home/home.vue")
        }
      ]
    },
    {
      path: "/configuration",
      meta: { title: "配置中心" },
      component: LayoutTwo,
      children: [
        {
          path: "system",
          meta: { title: "系统配置" },
          component: LayoutThree,
          children: [
            {
              path: "visit",
              meta: { title: "访问配置" },
              component: () =>
                import("@/views/configuration/system/visit/visit.vue")
            },
            {
              path: "basic",
              meta: { title: "基本配置" },
              component: () =>
                import("@/views/configuration/system/basic/basic.vue")
            },
            {
              path: "admin",
              meta: { title: "管理员配置" },
              component: () =>
                import("@/views/configuration/system/admin/admin.vue")
            },
            {
              path: "backups",
              meta: { title: "备份配置" },
              component: () =>
                import("@/views/configuration/system/backups/backups.vue")
            }
          ]
        },
        {
          path: "log",
          meta: { title: "系统日志" },
          component: () => import("@/views/configuration/log/log.vue")
        }
      ]
    }
  ]
});
