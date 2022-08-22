<template>
  <div class="left-panel">
    <!-- 左侧配置栏-顶部操作区域 -->
    <div class="logo-wrapper flex align-center">
      <img
        class="logo"
        src="https://github.githubassets.com/pinned-octocat.svg"
        alt
      />
    </div>
    <!-- 左侧配置栏-主操作区域 -->
    <el-scrollbar class="left-scrollbar">
      <div class="component-list">
        <div
          v-for="items in leftComponents"
          :key="items.title"
          class="components-title"
        >
          <div class="flex align-center">
            <svg-icon icon-class="component"></svg-icon>
            <span>{{ items.title }}</span>
          </div>

          <draggable
            :list="items.list"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            class="flex flex-wrap components-items"
            :sort="false"
            :clone="cloneComponent"
            :animation="340"
            @start="onStart"
            @end="onEnd"
            chosenClass="chosen"
            draggable=".components-item"
          >
            <div
              v-for="(item, index) in items.list"
              :key="index"
              class="components-item"
              @click="addComponent(item)"
            >
              <div>
                <svg-icon :icon-class="item.__config__.tagIcon"></svg-icon>
                <span>{{ item.__config__.label }}</span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {
  inputComponents,
  selectComponents,
} from "@/components/generator/config";
import SvgIcon from "@/components/SvgIcon";
import draggable from "vuedraggable";
import { mapMutations, mapState } from "vuex";
import { deepClone } from "../utils";

export default {
  components: {
    SvgIcon,
    draggable,
  },
  computed: {
    ...mapState(["idGlobal"]),
  },
  data() {
    return {
      drag: false,
      leftComponents: [
        {
          title: "输入型组件",
          list: inputComponents,
        },
        {
          title: "选择型组件",
          list: selectComponents,
        },
        {
          title: "布局型组件",
          // list: layoutComponents,
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["SET_IDGLOBAL", "ADD_DRAWING", "SET_ACTIVEDATA"]),
    onStart() {
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
    },
    addComponent(item) {
      this.SET_IDGLOBAL();
      item.__vModel__ = `field${this.idGlobal}`;
      item.renderKey = Date.now();
      const deepCloneObj = deepClone(item);
      this.ADD_DRAWING(deepCloneObj);
      this.SET_ACTIVEDATA(deepCloneObj);

      if (item.__config__.dataType === "dynamic") {
        this.$parent.fetchData(deepCloneObj);
      }
    },
    cloneComponent(origin) {
      let data = deepClone(origin);
      data.renderKey = Date.now();
      this.SET_IDGLOBAL();
      data.__vModel__ = `field${this.idGlobal}`;
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.left-panel {
  width: 260px;
  .logo-wrapper {
    box-sizing: border-box;
    height: 42px;
    border-bottom: 1px solid #f1e8e8;
    .logo {
      width: 22px;
      height: 22px;
      margin: 0 10px;
    }
  }
  .left-scrollbar {
    height: calc(100vh - 42px);
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
    .component-list {
      padding: 15px 10px;
      .components-title {
        color: #222;
        font-size: 12px;
        span {
          font-size: 14px;
          padding-left: 5px;
        }
        .components-items {
          padding: 8px 0;
          .components-item {
            display: block;
            border: 1px dashed #eff6fd;
            box-sizing: border-box;
            padding: 8px;
            width: 48%;
            margin: 1%;
            background-color: #eff6fd;
            &:hover {
              cursor: move;
            }
            span {
              font-size: 14px;
              padding-left: 5px;
            }
          }
        }
      }
    }
  }
}
.chosen {
  border: 1px dashed rgb(89, 89, 223) !important;
  display: block;
}
</style>
