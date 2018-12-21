import router from "../router/router";
import axios from "axios";
import { getToken, removeToken } from "@/utils/storage";
import { MessageBox, Message } from "element-ui";
import { startLoading, endLoading } from "./loading";

const service = axios.create({
  baseURL: "/",
  // headers: { "Content-Type": "application/x-www-form-urlencoded" },
  timeout: 6000,
  withCredentials: true
});

service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

//请求拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      if (config.method === "get" || config.method === "post")
        config.headers.Authorization = `Bearer ${getToken()}`;
    }
    startLoading();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  response => {
    endLoading();
    return response;
  },
  error => {
    endLoading();
    let errorData = error.response.data.accessDenied;
    if (errorData === "needLogin") {
      removeToken();
      router.replace("/");
    } else if (errorData && errorData !== "needLogin") {
      MessageBox.confirm("您没有权限，请联系管理员", "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: "warning"
      })
        .then(() => {
          router.go(-1);
        })
        .catch(() => {
          router.go(-1);
        });
    }
    if (error.response.status === 308) {
      router.replace(error.response.data.url);
    }
    return Promise.reject(error);
  }
);

const ajax = (
  url: string = "",
  data: object = {},
  method: string = "get",
  params: object = {}
) => service({ method, url, data, params });

export default ajax;
