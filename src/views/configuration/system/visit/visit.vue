<template>
  <div>
    <el-card shadow="always">
      <div slot="header" class="card-title">
        <span>登录配置</span>
        <el-button type="text" size="medium" @click="saveSettings('login')" class="save-button">保存设置</el-button>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <span>允许登录失败次数：</span>
            <el-tooltip class="item" effect="dark" content="次数必须为整数，可选范围1~99" placement="bottom-start">
              <el-input-number v-model="loginConfigForm.failNum" class="choose" controls-position="right" size="medium" :min="1" :max="99"></el-input-number>
            </el-tooltip>
            <span class="unit">次</span>
          </el-col>
          <el-col :span="12">
            <span class="choose-title">空闲注销时间：</span>
            <el-tooltip class="item" effect="dark" content="时间必须为整数，可选范围1~999" placement="bottom-start">
              <el-input-number v-model="loginConfigForm.logoutTime"  class="choose" size="medium" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-tooltip>
            <span class="unit">分</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>登录失败锁定时间：</span>
            <el-tooltip class="item" effect="dark" content="时间必须为整数，可选范围1~999" placement="bottom-start">
              <el-input-number v-model="loginConfigForm.loginFailTime" class="choose" size="medium" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-tooltip>
            <span class="unit">分</span>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card shadow="always" class="pwd-card">
      <div slot="header" class="card-title">
        <span>密码配置</span>
        <el-button type="text" size="medium" @click="saveSettings('pwd')" class="save-button">保存设置</el-button>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <span>最小密码长度：</span>
            <el-tooltip class="item" effect="dark" content="长度必须为整数，可选范围8~16" placement="bottom-start">
              <el-input-number v-model="pwdConfigForm.minPwdLength"  class="choose" size="medium" controls-position="right" :min="8" :max="16"></el-input-number>&nbsp;
            </el-tooltip>
            <span class="unit">字符</span>
          </el-col>
          <el-col :span="12">
            <span>字符组合要求：</span>
            <el-select v-model="pwdConfigForm.pwdStyle" size="medium" clearable placeholder="请选择">
              <el-option
                      v-for="item in pwdOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLoginConfig, getPwdConfig } from "@/api";

interface loginConfig {
  failNum: number;
  logoutTime: number;
  loginFailTime: number;
}

interface pwdConfig {
  minPwdLength: number;
  pwdStyle: string;
}

@Component
export default class Log extends Vue {
  private loginConfigForm: loginConfig = {
    failNum: 0,
    logoutTime: 0,
    loginFailTime: 0
  };
  private pwdConfigForm: pwdConfig = {
    minPwdLength: 0,
    pwdStyle: "1"
  };
  private pwdOptions: object[] = [
    {
      value: "1",
      label: "必须含有大小写字母和数字"
    },
    {
      value: "2",
      label: "无要求"
    },
    {
      value: "3",
      label: "必须含有小写字母"
    },
    {
      value: "4",
      label: "必须含有小写字母和数字"
    }
  ];
  created() {
    this.initData();
  }
  private initData(): void {
    getLoginConfig().then((result: any) => {
      this.loginConfigForm.failNum = result.data.retryNumber;
      this.loginConfigForm.loginFailTime = result.data.failedLockTime;
      this.loginConfigForm.logoutTime = result.data.expire;
    });
    getPwdConfig().then((result: any) => {
      this.pwdConfigForm.minPwdLength = result.data.minLengthOfPasswordManager;
      this.pwdConfigForm.pwdStyle = result.data.passwordStyleManager;
    });
  }
  private saveSettings(data: string): void {
    if (data === "login") {
      // 接口
    } else {
      // 接口
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../styles/mixins";
.card-title {
  @include card-title;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pwd-card {
  margin-top: 30px;
}
.save-button {
  padding: 0;
}
.unit {
  margin-left: 5px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
