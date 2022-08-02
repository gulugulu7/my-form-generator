<template>
  <div class="container flex">
    <!-- 左侧配置栏 -->
    <left-panel></left-panel>
    <!-- 中间配置栏 -->
    <center-panel></center-panel>
    <!-- 右侧配置栏 -->
    <right-panel></right-panel>
  </div>
</template>

<script>
import LeftPanel from "./LeftPanel";
import CenterPanel from "./CenterPanel";
import RightPanel from "./RightPanel";

export default {
  components: {
    LeftPanel,
    CenterPanel,
    RightPanel,
  },
};
</script>

<style lang="scss">
@import "@/styles/home";
</style>
