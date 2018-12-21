<template>
  <el-card shadow="always" class="card-bottom" :body-style="{padding: 0}">
    <div ref="bottom" class="card-content"></div>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import echarts from "echarts";
import charts from "@/utils/mixins";

@Component({
  mixins: [charts]
})
export default class CardBottom extends Vue {
  @Prop({ type: String, required: true })
  title!: string;
  @Prop({ type: String, required: true })
  color!: string;
  @Prop({ type: Array, required: true })
  data!: number[];
  private myChart: any = null;
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  }
  private initChart(): void {
    this.myChart = echarts.init(this.$refs.bottom as HTMLDivElement);
    this.myChart.setOption({
      color: [this.color],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      title: {
        text: this.title,
        left: "center"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          type: "bar",
          barWidth: "60%",
          data: this.data
        }
      ]
    });
  }
}
</script>

<style scoped lang="scss">
.card-bottom {
  position: relative;
  height: 300px;
  .card-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
