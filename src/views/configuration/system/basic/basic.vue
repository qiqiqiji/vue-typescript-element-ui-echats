<template>
  <div>
    <el-card shadow="always">
      <div slot="header" class="card-title">
        <span>恢复出厂配置</span>
      </div>
      <div class="card-body">
        <span>恢复出厂设置将丢失所有的配置!</span>
        <el-button type="danger" size="medium" @click="resetAll">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Basic extends Vue {
  private codeShow: boolean = false;
  private resetAll(): void {
    this.$confirm("此操作将丢失所有的配置, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {})
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
  }
}
</script>

<style scoped lang="scss">
@import "../../../../styles/mixins";
.card-title {
  @include card-title;
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
