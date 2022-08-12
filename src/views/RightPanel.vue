<template>
  <div class="right-panel">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>
    <div class="field-box">
      <a class="document-link" target="_blank" href="" title="查看组件文档">
        <i class="el-icon-link" />
      </a>
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form
          v-if="Object.keys(activeData).length > 0 && currentTab === 'field'"
          size="small"
          label-width="90px"
        >
          <el-form-item v-if="activeData.__config__.changeTag" label="组件类型">
            <el-select
              v-model="activeData.__config__.tagIcon"
              placeholder="请选择组件类型"
              :style="{ width: '100%' }"
              @change="tagChange"
            >
              <el-option-group
                v-for="group in tagList"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.__config__.label"
                  :label="item.__config__.label"
                  :value="item.__config__.tagIcon"
                >
                  <svg-icon
                    class="node-icon"
                    :icon-class="item.__config__.tagIcon"
                  ></svg-icon>
                  <span>{{ item.__config__.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="activeData.__vModel__ !== undefined"
            label="字段名"
          >
            <el-input
              v-model="activeData.__vModel__"
              placeholder="请输入字段名（v-model）"
            ></el-input
          ></el-form-item>
          <el-form-item
            v-if="activeData.__config__.componentName !== undefined"
            label="组件名"
          >
            {{ activeData.__config__.componentName }}</el-form-item
          >
          <el-form-item
            v-if="activeData.__config__.label !== undefined"
            label="标题"
          >
            <el-input
              v-model="activeData.__config__.label"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData.placeholder !== undefined"
            label="占位提示"
          >
            <el-input
              v-model="activeData.placeholder"
              placeholder="请输入占位提示"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['start-placeholder'] !== undefined"
            label="开始占位"
          >
            <el-input
              v-model="activeData['start-placeholder']"
              placeholder="请输入占位提示"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['end-placeholder'] !== undefined"
            label="结束占位"
          >
            <el-input
              v-model="activeData['end-placeholder']"
              placeholder="请输入占位提示"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.span !== undefined"
            label="表单栅格"
          >
            <el-slider
              v-model="activeData.__config__.span"
              :max="24"
              :min="1"
              :marks="{ 12: '' }"
            ></el-slider>
          </el-form-item>
          <!-- <el-form-item
            v-if="
              activeData.__config__.layout === 'rowFormItem' &&
              activeData.gutter !== undefined
            "
          >
            <el-input-number
              v-model="activeData.gutter"
              :min="0"
              placeholder="栅格间距"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="
              activeData.__config__.layout === 'rowFormItem' &&
              activeData.type !== undefined
            "
          ></el-form-item> -->
          <el-form-item
            v-if="activeData.__config__.labelWidth !== undefined"
            label="标签宽度"
          >
            <el-input
              v-model.number="activeData.__config__.labelWidth"
              type="number"
              placeholder="请输入标签宽度"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData.style && activeData.style.width !== undefined"
            label="组件宽度"
          >
            <el-input
              v-model="activeData.style.width"
              placeholder="请输入组件宽度"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData.__vModel__ !== undefined"
            label="默认值"
          >
            <el-input
              placeholder="请输入默认值"
              v-model="activeData.__config__.defaultValue"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="
              activeData.__slot__ && activeData.__slot__.prepend !== undefined
            "
            label="前缀"
          >
            <el-input
              v-model="activeData.__slot__.prepend"
              placeholder="请输入前缀"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="
              activeData.__slot__ && activeData.__slot__.append !== undefined
            "
            label="后缀"
          >
            <el-input
              v-model="activeData.__slot__.append"
              placeholder="请输入后缀"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['prefix-icon'] !== undefined"
            label="前图标"
          >
            <el-input
              v-model="activeData['prefix-icon']"
              placeholder="请输入前图标名称"
            >
              <el-button
                slot="append"
                icon="el-icon-thumb"
                @click="openIconsDialog('prefix-icon')"
                >选择</el-button
              >
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['suffix-icon'] !== undefined"
            label="后图标"
          >
            <el-input
              v-model="activeData['suffix-icon']"
              placeholder="请输入后图标名称"
            >
              <el-button
                slot="append"
                icon="el-icon-thumb"
                @click="openIconsDialog('suffix-icon')"
                >选择</el-button
              >
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData.maxlength !== undefined"
            label="最多输入"
          >
            <el-input
              v-model="activeData.maxlength"
              placeholder="请输入字符长度"
            >
              <template slot="append"> 个字符 </template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="
              activeData.__config__.showLabel !== undefined &&
              activeData.__config__.labelWidth !== undefined
            "
            label="显示标签"
          >
            <el-switch v-model="activeData.__config__.showLabel"></el-switch>
          </el-form-item>
          <el-form-item
            v-if="activeData['show-word-limit'] !== undefined"
            label="输入统计"
          >
            <el-switch v-model="activeData['show-word-limit']"></el-switch>
          </el-form-item>
          <el-form-item
            v-if="activeData.clearable !== undefined"
            label="是否清空"
          >
            <el-switch v-model="activeData.clearable"></el-switch>
          </el-form-item>
          <el-form-item
            v-if="activeData.readonly !== undefined"
            label="是否只读"
          >
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          <el-form-item
            v-if="activeData.disabled !== undefined"
            label="是否禁用"
          >
            <el-switch v-model="activeData.disabled" />
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.required !== undefined"
            label="是否必填"
          >
            <el-switch v-model="activeData.__config__.required" />
          </el-form-item>
        </el-form>
        <!-- 表单属性 -->
        <el-form v-if="currentTab === 'form'" size="small" label-width="90px">
          <el-form-item label="表单名">
            <el-input
              v-model="formConf.formRef"
              placeholder="请输入表单名（ref）"
            ></el-input>
          </el-form-item>
          <el-form-item label="表单模型">
            <el-input
              v-model="formConf.formModel"
              placeholder="请输入表单模型"
            ></el-input>
          </el-form-item>
          <el-form-item label="校验模型">
            <el-input
              v-model="formConf.formRules"
              placeholder="请输入校验模型"
            ></el-input>
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="medium"> 中等 </el-radio-button>
              <el-radio-button label="small"> 较小 </el-radio-button>
              <el-radio-button label="mini"> 迷你 </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left"> 左对齐 </el-radio-button>
              <el-radio-button label="right"> 右对齐 </el-radio-button>
              <el-radio-button label="top"> 顶部对齐 </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input
              v-model.number="formConf.labelWidth"
              type="number"
              placeholder="请输入标签宽度"
            />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number
              v-model="formConf.gutter"
              :min="0"
              placeholder="栅格间隔"
            />
          </el-form-item>
          <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <icons-dialog
      :visible.sync="iconsVisible"
      :current="activeData[currentIconModel]"
      @select="setIcon"
    ></icons-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  inputComponents,
  selectComponents,
} from "@/components/generator/config";
import { deepClone } from "../utils";
import IconsDialog from "./components/IconsDialog.vue";

export default {
  data() {
    return {
      currentTab: "field",
      iconsVisible: false,
      currentIconModel: null,
    };
  },
  components: {
    IconsDialog,
  },
  computed: {
    ...mapState(["formConf", "activeData", "drawingList", "idGlobal"]),
    tagList() {
      return [
        {
          label: "输入型组件",
          options: inputComponents,
        },
        {
          label: "选择型组件",
          options: selectComponents,
        },
      ];
    },
    index() {
      return this.drawingList.findIndex((item) => {
        return item.renderKey === this.activeData.renderKey;
      });
    },
  },
  watch: {
    formConf: {
      handler(val) {
        this.SET_FORMCONF(val);
      },
      deep: true,
    },
    activeData: {
      handler(val, oldVal) {
        if (val.renderKey === oldVal.renderKey) {
          this.REPLACE_DRAWING({ data: deepClone(val), index: this.index });
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations([
      "SET_FORMCONF",
      "SET_IDGLOBAL",
      "REPLACE_DRAWING",
      "SET_ACTIVEDATA",
    ]),
    tagChange(tagIcon) {
      let target = inputComponents.find((item) => {
        return item.__config__.tagIcon === tagIcon;
      });
      if (!target) {
        selectComponents.find((item) => {
          return item.__config__.tagIcon === tagIcon;
        });
      }
      this.SET_IDGLOBAL();
      let data = deepClone(target);
      data.__vModel__ = `field${this.idGlobal}`;
      data.renderKey = Date.now();
      this.REPLACE_DRAWING({ data: deepClone(data), index: this.index });
      this.SET_ACTIVEDATA(deepClone(data));
    },
    openIconsDialog(model) {
      (this.iconsVisible = true), (this.currentIconModel = model);
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.right-panel {
  width: 350px;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    overflow: hidden;
    box-sizing: border-box;
  }
  .el-scrollbar {
    height: 100%;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}

.document-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 26px;
  height: 25px;
  cursor: pointer;
  background: #409eff;
  color: #fff;
  text-align: center;
  border-radius: 0 0 6px 0;
  line-height: 26px;
  z-index: 1;
  font-size: 18px;
}

.node-icon {
  color: #bebfc3;
}
</style>
