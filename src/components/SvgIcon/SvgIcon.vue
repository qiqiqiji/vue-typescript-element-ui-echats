<template>
  <svg :class="className" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SvgIcon extends Vue {
  @Prop(String) className!: string;
  @Prop({ type: String, required: true })
  svgClass!: string;
  get svgName() {
    return "#" + this.svgClass;
  }
}
</script>
