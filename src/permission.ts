import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import router from "./router/router";

import { getToken, getMenu } from "@/utils/storage";

router.beforeEach((to, from, next) => {
  // NProgress.start();
  if (getToken()) {
    if (to.path === "/") {
      next(getMenu());
      // NProgress.done();
    } else {
      next();
    }
  } else {
    if (to.path === "/") {
      next();
    } else {
      next("/");
      // NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
