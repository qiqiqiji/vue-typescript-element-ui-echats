import { Component, Watch, Vue } from "vue-property-decorator";
import { State, namespace } from "vuex-class";

const appModule = namespace("app");

@Component
export default class Charts extends Vue {
  private resizeHandler: any = null;
  private myChart: any = null;
  private timer: any = null;
  private sideTimer: any = null;
  @appModule.State("isOpen") isOpen!: boolean;
  @Watch("isOpen")
  onChanged(val: boolean, oldVal: boolean) {
    this.sideTimer = setTimeout(() => {
      this.myChart.resize();
    }, 500);
  }
  mounted() {
    this.resizeHandler = () => {
      if (this.myChart) {
        // 防抖
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.myChart.resize();
        }, 300);
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  }
  beforeDestroy() {
    if (!this.myChart) return;
    window.removeEventListener("resize", this.resizeHandler);
    this.myChart.dispose();
    this.myChart = null;
    clearTimeout(this.timer);
    this.timer = null;
    clearTimeout(this.sideTimer);
    this.sideTimer = null;
  }
}
