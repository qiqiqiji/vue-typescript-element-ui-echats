<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <card-top
                title="总用户"
                num="1681"
                footTitle="日用户"
                footNum="123"
                :options="{type: 'line', color: '#13C2C2', data: [11, 16, 6, 13, 8, 10, 14]}"
        ></card-top>
      </el-col>
      <el-col :span="6">
        <card-top
                title="本月安全事件"
                num="12321"
                footTitle="本日安全事件"
                footNum="123"
                :options="{type: 'bar', color: '#2FC25B', data: [11, 16, 6, 13, 8, 10, 14]}"
        ></card-top>
      </el-col>
      <el-col :span="6">
        <card-top
                title="本月session会话"
                num="2681"
                footTitle="本日session会话"
                footNum="123"
                :options="{type: 'line', color: '#975fe4', data: [11, 16, 6, 13, 30, 10, 14]}"
        ></card-top>
      </el-col>
      <el-col :span="6">
        <card-top
                title="上传"
                num="521"
                footTitle="下载"
                footNum="123"
                :options="{type: 'bar', color: '#3AA1FF', data: [11, 16, 6, 13, 8, 10, 14]}"
        ></card-top>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" shadow="always" :body-style="{padding: '0'}">
            <div ref="statistics" class="box-content"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <CardBottom
                title="风险账号TOP5"
                color="#C23531"
                :data="[120, 200, 150, 80, 70, 110, 130]"
        ></CardBottom>
      </el-col>
      <el-col :span="8">
        <CardBottom
                title="高频操作TOP5"
                color="#F90"
                :data="[120, 200, 150, 80, 70, 110, 130]"
        ></CardBottom>
      </el-col>
      <el-col :span="8">
        <CardBottom
                title="活跃用户TOP5"
                color="#3AA1FF"
                :data="[120, 200, 150, 80, 70, 110, 130]"
        ></CardBottom>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import echarts from "echarts";
import CardTop from "./components/CardTop/CardTop.vue";
import CardBottom from "./components/CardBottom/CardBottom.vue";
import charts from "@/utils/mixins";

@Component({
  components: {
    CardTop,
    CardBottom
  },
  mixins: [charts]
})
export default class Home extends Vue {
  private myChart: any = null;
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  }
  private initCharts(): void {
    this.myChart = echarts.init(this.$refs.statistics as HTMLDivElement);
    this.myChart.setOption({
      title: {
        text: "事件统计",
        textStyle: {
          fontSize: 20
        }
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        top: "10",
        data: ["多次登陆", "多IP登陆", "多次上传", "多次下载", "搜索引擎"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "多次登陆",
          type: "line",
          data: [120, 132, 339, 134, 90, 230, 210]
        },
        {
          name: "多IP登陆",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "多次上传",
          type: "line",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "多次下载",
          type: "line",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    });
  }
}
</script>

<style scoped lang="scss">
.box-card {
  margin: 24px 0;
  height: 500px;
  position: relative;
}
.box-content {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
}
</style>
