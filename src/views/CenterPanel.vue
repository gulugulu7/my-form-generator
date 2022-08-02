<template>
  <div class="flex-1 center-panel">
    <!-- 中间配置栏-顶部操作区域 -->
    <div class="top-wrapper"></div>
    <!-- 中间配置栏-主操作区域 -->
    <el-scrollbar class="center-scrollbar">
      <el-row class="center-board-row" :gutter="formConf.gutter">
        <!-- :model="formConf.formModel" -->
        <el-form
          :rules="formConf.rules"
          :ref="formConf.formRef"
          :size="formConf.size"
          :label-width="formConf.labelWidth + 'px'"
          :disabled="formConf.disabled"
          :label-position="formConf.labelPosition"
        >
          <draggable
            class="drawing-board"
            v-model="drawingList"
            :group="{ name: 'componentsGroup' }"
            :animation="340"
            ghostClass="ghost"
          >
            <draggable-item
              v-for="(item, index) in drawingList"
              :current-item="item"
              :key="item.renderKey"
              :index="index"
              :formConf="formConf"
            ></draggable-item>
          </draggable>
          <div class="empty-info" v-show="drawingList.length === 0">
            从左侧拖入或点选组件进行表单设计
          </div>
        </el-form>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import DraggableItem from "./DraggableItem.vue";
import draggable from "vuedraggable";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    DraggableItem,
    draggable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["formConf"]),
    drawingList: {
      get() {
        return this.$store.state.drawingList;
      },
      set(val) {
        this.SET_DRAWING(val);
      },
    },
  },
  methods: {
    ...mapMutations(["SET_DRAWING"]),
  },
};
</script>

<style lang="scss" scoped>
.top-wrapper {
  box-sizing: border-box;
  height: 42px;
  border-bottom: 1px solid #f1e8e8;
}

.center-scrollbar {
  height: calc(100vh - 42px);
  overflow: hidden;
  box-sizing: border-box;
  border-left: 1px solid #f1e8e8;
  border-right: 1px solid #f1e8e8;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  /deep/ .el-scrollbar__view {
    overflow-x: hidden !important;
  }
}

.center-board-row {
  overflow: hidden;
  padding: 12px;
  /deep/ .el-form {
    height: calc(100vh - 66px);
  }
  .drawing-board {
    height: 100%;
  }
}

.empty-info {
  position: absolute;
  top: 46%;
  left: 0;
  right: 0;
  color: #ccb1ea;
  text-align: center;
  font-size: 18px;
}
</style>

<style lang="scss">
.ghost {
  position: relative;
  overflow: hidden;
  border: none;
  background-color: #eff6fd;
  min-height: 60px;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    background: rgb(89, 89, 223);
    z-index: 2;
  }
}
</style>
