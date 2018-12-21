<template>
  <el-card shadow="always" :body-style="{paddingBottom: '8px'}" class="card-top" style="">
    <div class="top-title">
      <span>{{title}}</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="num">
      {{num}}
    </div>
    <div ref="user" style="height: 50px; width: 100%;"></div>
    <div class="card-footer">{{footTitle}}： {{footNum}}</div>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import echarts from "echarts";
import charts from "@/utils/mixins";

interface options {
  color: string;
  type: string;
  data: number[];
}

@Component({
  mixins: [charts]
})
export default class Card extends Vue {
  private myChart: any = null;
  @Prop({ type: String, required: true })
  title!: string;
  @Prop({ type: String, required: true })
  num!: string;
  @Prop({ type: String, required: true })
  footTitle!: string;
  @Prop({ type: String, required: true })
  footNum!: string;
  @Prop({ type: Object, required: true })
  options!: options;
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  }
  private initChart(): void {
    this.myChart = echarts.init(this.$refs.user as HTMLDivElement);
    this.setOptions();
  }
  private setOptions(): void {
    let { data, type, color } = { ...this.options };
    this.myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "none" }
      },
      grid: {
        left: -20,
        right: -20,
        bottom: 0,
        top: 10
      },
      xAxis: [
        {
          show: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          show: false,
          type: "value"
        }
      ],
      color: [color],
      series: [
        {
          data: data,
          type: type,
          smooth: true,
          areaStyle: { normal: {} }
        }
      ]
    });
  }
}
</script>

<style scoped lang="scss">
.top-title {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
}
.card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
}
</style>
