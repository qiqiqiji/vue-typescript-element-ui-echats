<template>
  <div class="login-container">
    <h1 style="color: #eee; text-align: center;">数据加密管理系统</h1>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      class="login-form"
    >
      <el-form-item  prop="username">
        <svg-icon className="icon" svgClass="icon-zhanghao"></svg-icon>
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon className="icon" svgClass="icon-mima"></svg-icon>
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLogin" style="width: 100%;" @click="handlerLogin('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
/// <reference path="../../typings/type.d.ts" />
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import scrypt from "scrypt-async";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import { getSiteId, getPasswordStrategy, login, getMenu } from "@/api";
import { checkPasswordStrategy, getFailDetail } from "@/utils/check";
import { saveUserInfo, saveMenu } from "@/utils/storage";
/**
 * TypeScript的访问修饰符有三个，分别是public、private、protected 。
   TypeScript的默认访问修饰符是public。
   1）public声明的属性和方法在类的内部和外部均能访问到。
   2）protected声明的方法和属性只能在类的内部和其子类能访问。
   3）private声明的方法和属性只能在其类的内部访问。
 */

interface Validate {
  username: string;
  password: string;
}

interface LoginRulesFun {
  username: [
    {
      required: boolean;
      trigger: string;
      validator: (rule: any, value: string, callback: () => {}) => void;
    }
  ];
  password: [
    {
      required: boolean;
      trigger: string;
      validator: (rule: any, value: string, callback: () => {}) => any;
    }
  ];
}

const appModule = namespace("app");

@Component({
  name: "login",
  components: {
    SvgIcon
  }
})
export default class Login extends Vue {
  $refs!: {
    loginForm: HTMLFormElement;
  };
  // siteId
  private siteId: string = "";
  // 登录表单
  private loginForm: Validate = {
    username: "",
    password: ""
  };
  // 校验规则
  private passWordStrategy: any = {};
  private scryptParam: object = {
    N: 1024,
    r: 8,
    p: 1,
    dkLen: 64,
    interruptStep: 1000,
    encoding: "hex"
  };
  // 表单校验
  private loginRules: LoginRulesFun = {
    username: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: string, callback: (res?: any) => {}) => {
          if (value === "") {
            callback(new Error("请输入用户名"));
          } else {
            callback();
          }
        }
      }
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        validator: this.passwordRule
      }
    ]
  };
  @appModule.State("menu") menu!: object[];
  @appModule.Action("getMenu") getMenu!: any;
  @Watch("menu")
  onChange(val: object[]) {
    this.getPath(val[0]);
  }
  // 登录加载中
  private isLogin: boolean = false;
  created() {
    getSiteId().then((result: any) => {
      this.siteId = result.data.siteId;
    });
    getPasswordStrategy().then((result: any) => {
      this.passWordStrategy = result.data;
    });
  }
  // 登录
  async handlerLogin(formName: string) {
    (<any>this.$refs)[formName].validate((valid: any) => {
      if (!valid) {
        return false;
      }
      this.isLogin = true;
      // 加密
      scrypt(
        this.loginForm.password,
        this.loginForm.username + this.siteId,
        this.scryptParam,
        (derivedKey: any) => {
          let loginData = {
            isPasswordFormatCorrect: true,
            password: derivedKey,
            type: "login",
            username: this.loginForm.username
          };
          // 接口
          login(loginData).then((result: any) => {
            let data = result.data;
            if (data.success) {
              saveUserInfo(
                data.name,
                data.role,
                loginData.username,
                this.siteId,
                data.token,
                data.expressTime
              );
              this.getMenu();
            } else {
              this.$message.error(data.detail);
            }
          });
        }
      );
    });
  }
  private getPath(data: any): void {
    if (data.submenu) {
      this.getPath(data.submenu[0]);
    } else {
      saveMenu(data.url);
      this.$router.replace(data.url);
    }
  }
  // 表单-密码校验函数
  private passwordRule(rule: any, value: string, callback: (res?: any) => {}) {
    let {
      minLengthOfPasswordManager: minPasswordLength,
      passwordStyleManager: style
    } = this.passWordStrategy;
    if (value === "") {
      callback(new Error("密码不能为空"));
    } else if (!checkPasswordStrategy(minPasswordLength, style, value)) {
      let errorDetail = getFailDetail(style, minPasswordLength);
      callback(new Error(errorDetail));
    } else {
      callback();
    }
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;
    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: #eee;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $bg;
  padding-top: 200px;
}
.login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 500px;
  padding: 35px;
  margin: 20px auto;
}
.icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: 15px;
}
</style>
