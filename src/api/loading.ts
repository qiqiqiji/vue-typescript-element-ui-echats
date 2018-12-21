// import { Loading } from "element-ui";
// import NProgress from "nprogress"; // Progress 进度条
// import "nprogress/nprogress.css"; // Progress 进度条样式
//
// let timer: any = null;
// let loading: any = null;
// function showLoading() {
//   timer = setTimeout(() => {
//     loading = Loading.service({
//       lock: true,
//       text: "努力加载中...",
//       spinner: "el-icon-loading",
//       background: "rgba(0, 0, 0, 0.7)"
//     });
//   }, 1000);
// }
// function hideLoading() {
//   if (loading !== null) loading.close();
//   clearTimeout(timer);
//   timer = null;
// }
//
// // 请求合并
// let num = 0;
//
// export const startLoading = () => {
//   if (num === 0) showLoading();
//   num++;
// };
//
// export const endLoading = () => {
//   if (num <= 0) return;
//   num--;
//   if (num === 0) hideLoading();
// };

import { Loading } from "element-ui";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

// 请求合并
let num = 0;

export const startLoading = () => {
  if (num === 0) NProgress.start();
  num++;
};

export const endLoading = () => {
  if (num <= 0) return;
  num--;
  if (num === 0) NProgress.done();
};
