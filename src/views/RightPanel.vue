<template>
  <div class="right-panel">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>
    <div class="field-box">
      <a
        class="document-link"
        target="_blank"
        href="documentLink"
        title="查看组件文档"
      >
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
              :value="setDefaultValue(activeData.__config__.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-checkbox-group'"
            label="至少应选"
          >
            <el-input-number
              v-model="activeData.min"
              :min="0"
              placeholder="至少应选"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-checkbox-group'"
            label="最多可选"
          >
            <el-input-number
              v-model="activeData.max"
              :min="0"
              placeholder="最多可选"
            ></el-input-number>
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
            v-if="activeData.autosize !== undefined"
            label="最小行数"
          >
            <el-input-number
              v-model="activeData.autosize.minRows"
              :min="1"
              placeholder="最小行数"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="activeData.autosize !== undefined"
            label="最大行数"
          >
            <el-input-number
              v-model="activeData.autosize.maxRows"
              :min="1"
              placeholder="最大行数"
            ></el-input-number>
          </el-form-item>
          <el-form-item v-if="isShowMin" label="最小值">
            <el-input-number
              v-model="activeData.min"
              placeholder="最小值"
            ></el-input-number>
          </el-form-item>
          <el-form-item v-if="isShowMax" label="最大值">
            <el-input-number
              v-model="activeData.max"
              placeholder="最大值"
            ></el-input-number>
          </el-form-item>
          <el-form-item v-if="activeData.height !== undefined" label="组件高度">
            <el-input-number
              v-model="activeData.height"
              placeholder="高度"
              @input="changeRenderKey"
            />
          </el-form-item>
          <el-form-item v-if="isShowStep" label="步长">
            <el-input-number
              v-model="activeData.step"
              placeholder="步数"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="activeData['show-stops'] !== undefined"
            label="显示间断点"
          >
            <el-switch v-model="activeData['show-stops']" />
          </el-form-item>
          <el-form-item v-if="activeData.range !== undefined" label="范围选择">
            <el-switch v-model="activeData.range" @change="rangeChange" />
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-input-number'"
            label="精度"
          >
            <el-input-number
              v-model="activeData.precision"
              :min="0"
              placeholder="精度"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-input-number'"
            label="按钮位置"
          >
            <el-radio-group v-model="activeData['controls-position']">
              <el-radio-button label=""> 默认 </el-radio-button>
              <el-radio-button label="right">
                右侧
              </el-radio-button></el-radio-group
            >
          </el-form-item>
          <el-form-item
            label="严格步数"
            v-if="activeData.__config__.tag === 'el-input-number'"
          >
            <el-switch v-model="activeData['step-strictly']"></el-switch>
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
            v-if="activeData['active-text'] !== undefined"
            label="开启提示"
          >
            <el-input
              v-model="activeData['active-text']"
              placeholder="请输入开启提示"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['inactive-text'] !== undefined"
            label="关闭提示"
          >
            <el-input
              v-model="activeData['inactive-text']"
              placeholder="请输入关闭提示"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData['active-value'] !== undefined"
            label="开启值"
          >
            <el-input
              :value="setDefaultValue(activeData['active-value'])"
              placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData['inactive-value'] !== undefined"
            label="关闭值"
          >
            <el-input
              :value="setDefaultValue(activeData['inactive-value'])"
              placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData['active-color'] !== undefined"
            label="开启颜色"
          >
            <el-color-picker
              v-model="activeData['active-color']"
            ></el-color-picker>
          </el-form-item>
          <el-form-item
            v-if="activeData['inactive-color'] !== undefined"
            label="关闭颜色"
          >
            <el-color-picker
              v-model="activeData['inactive-color']"
            ></el-color-picker>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-cascader'"
            label="选项分隔符"
          >
            <el-input
              v-model="activeData.separator"
              placeholder="请输入选项分隔符"
            />
          </el-form-item>
          <template
            v-if="
              ['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(
                activeData.__config__.tag
              ) > -1
            "
          >
            <el-divider>选项</el-divider>
            <draggable
              :list="activeData.__slot__.options"
              group="selectItem"
              :animation="340"
              handle=".option-drag"
            >
              <div
                v-for="(item, index) in activeData.__slot__.options"
                :key="index"
                class="select-item"
              >
                <div class="select-line-icon option-drag">
                  <i class="el-icon-s-operation"></i>
                </div>
                <el-input
                  v-model="item.label"
                  placeholder="选项名"
                  size="small"
                ></el-input>
                <el-input
                  placeholder="选项值"
                  size="small"
                  :value="item.value"
                  @input="setOptionValue(item, $event)"
                ></el-input>
                <div
                  class="close-btn select-line-icon"
                  @click="activeData.__slot__.options.splice(index, 1)"
                >
                  <i class="el-icon-remove-outline"></i>
                </div>
              </div>
            </draggable>
            <div>
              <el-button
                style="margin-left: 20px"
                icon="el-icon-circle-plus-outline"
                type="text"
                @click="addSelectItem"
                >添加选项</el-button
              >
            </div>
            <el-divider />
          </template>
          <template
            v-if="['el-cascader'].indexOf(activeData.__config__.tag) > -1"
          >
            <el-divider>选项</el-divider>
            <el-form-item
              v-if="activeData.__config__.dataType"
              label="数据类型"
            >
              <el-radio-group v-model="activeData.__config__.dataType">
                <el-radio-button label="dynamic">动态数据</el-radio-button>
                <el-radio-button label="static">静态数据</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <template v-if="activeData.__config__.dataType === 'dynamic'">
              <el-form-item label="接口地址">
                <el-input
                  v-model="activeData.__config__.url"
                  :title="activeData.__config__.url"
                  palceholder="请输入接口地址"
                  clearable
                >
                  <el-select
                    slot="prepend"
                    v-model="activeData.__config__.method"
                    :style="{ width: '85px' }"
                  >
                    <el-option label="get" value="get" />
                    <el-option label="post" value="post" />
                    <el-option label="put" value="put" />
                    <el-option label="delete" value="delete" />
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="数据位置">
                <el-input
                  v-model="activeData.__config__.dataPath"
                  placeholder="请输入数据位置"
                ></el-input>
              </el-form-item>

              <template v-if="activeData.props">
                <el-form-item label="标签键名">
                  <el-input
                    v-model="activeData.props.label"
                    placeholder="请输入标签键名"
                  ></el-input>
                </el-form-item>
                <el-form-item label="值键名">
                  <el-input
                    v-model="activeData.props.value"
                    placeholder="请输入值键名"
                  ></el-input>
                </el-form-item>
                <el-form-item label="子级键名">
                  <el-input
                    v-model="activeData.props.children"
                    placeholder="请输入子级键名"
                  ></el-input>
                </el-form-item>
                <el-button @click="determineFetch" size="small" type="primary"
                  >确定</el-button
                >
              </template>
            </template>

            <el-tree
              v-if="activeData.__config__.dataType === 'static'"
              draggable
              :data="activeData.options"
              node-key="id"
              :expand-on-click-node="false"
              :render-content="renderContent"
            ></el-tree>
            <div
              v-if="activeData.__config__.dataType === 'static'"
              style="margin-left: 20px"
            >
              <el-button
                style="padding-bottom: 0"
                icon="el-icon-circle-plus-outline"
                type="text"
                @click="addTreeItem"
                >添加父级</el-button
              >
            </div>
            <el-divider />
          </template>

          <el-form-item
            label="选项样式"
            v-if="activeData.__config__.optionType !== undefined"
          >
            <el-radio-group v-model="activeData.__config__.optionType">
              <el-radio-button label="default">默认</el-radio-button>
              <el-radio-button label="button">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="
              activeData.__config__.border !== undefined &&
              activeData.__config__.optionType === 'default'
            "
            label="是否带边框"
          >
            <el-switch v-model="activeData.__config__.border"
          /></el-form-item>
          <el-form-item
            label="组件大小"
            v-if="
              (activeData.size !== undefined &&
                activeData.__config__.optionType === 'button') ||
              activeData.__config__.border
            "
          >
            <el-radio-group v-model="activeData.size">
              <el-radio-button label="medium">中等</el-radio-button>
              <el-radio-button label="small">较小</el-radio-button>
              <el-radio-button label="mini">迷你</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="任选层级"
            v-if="activeData.__config__.tag === 'el-cascader'"
          >
            <el-switch v-model="activeData.props.checkStrictly"></el-switch>
          </el-form-item>
          <el-form-item
            label="是否多选"
            v-if="activeData.__config__.tag === 'el-cascader'"
          >
            <el-switch v-model="activeData.props.multiple"></el-switch>
          </el-form-item>
          <el-form-item
            label="展示全路径"
            v-if="activeData.__config__.tag === 'el-cascader'"
          >
            <el-switch v-model="activeData['show-all-levels']"></el-switch>
          </el-form-item>
          <el-form-item
            v-if="activeData['picker-options'] !== undefined"
            label="时间段"
          >
            <el-input
              v-model="activeData['picker-options'].selectableRange"
              placeholder="请输入时间段"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="activeData['range-separator'] !== undefined"
            label="分隔符"
          >
            <el-input
              v-model="activeData['range-separator']"
              placeholder="请输入分隔符"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="
              activeData.type !== undefined &&
              activeData.__config__.tag === 'el-date-picker'
            "
            label="时间类型"
          >
            <el-select
              v-model="activeData.type"
              placeholder="请选择时间类型"
              :style="{ width: '100%' }"
              @change="dateTypeChange"
            >
              <el-option
                v-for="(item, index) in dateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.format !== undefined" label="时间格式">
            <el-input
              :value="activeData.format"
              placeholder="请输入时间格式"
              @input="setTimeValue($event)"
            ></el-input>
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
            v-if="activeData['allow-half'] !== undefined"
            label="允许半选"
          >
            <el-switch v-model="activeData['allow-half']" />
          </el-form-item>
          <el-form-item
            v-if="activeData['show-text'] !== undefined"
            label="辅助文字"
          >
            <el-switch
              v-model="activeData['show-text']"
              @change="rateTextChange"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData['show-score'] !== undefined"
            label="显示分数"
          >
            <el-switch
              v-model="activeData['show-score']"
              @change="rateScoreChange"
            />
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
          <el-form-item
            label="能否搜索"
            v-if="activeData.filterable !== undefined"
          >
            <el-switch v-model="activeData.filterable"></el-switch
          ></el-form-item>
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
    <treeNode-dialog
      :visible.sync="dialogVisible"
      title="添加选项"
      @commit="addNode"
    ></treeNode-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  inputComponents,
  selectComponents,
} from "@/components/generator/config";
import { deepClone, isNumberStr } from "../utils";
import IconsDialog from "./components/IconsDialog.vue";
import TreeNodeDialog from "./components/TreeNodeDialog";
import draggable from "vuedraggable";

const dateTimeFormat = {
  date: "yyyy-MM-dd",
  week: "yyyy 第 WW 周",
  month: "yyyy-MM",
  year: "yyyy",
  datetime: "yyyy-MM-dd HH:mm:ss",
  daterange: "yyyy-MM-dd",
  monthrange: "yyyy-MM",
  datetimerange: "yyyy-MM-dd HH:mm:ss",
};

export default {
  data() {
    return {
      currentTab: "field",
      iconsVisible: false,
      currentIconModel: null,
      dialogVisible: false,
      currentNode: null,
      dateTypeOptions: [
        {
          label: "日(date)",
          value: "date",
        },
        {
          label: "周(week)",
          value: "week",
        },
        {
          label: "月(month)",
          value: "month",
        },
        {
          label: "年(year)",
          value: "year",
        },
        {
          label: "日期时间(datetime)",
          value: "datetime",
        },
      ],
      dateRangeTypeOptions: [
        {
          label: "日期范围(daterange)",
          value: "daterange",
        },
        {
          label: "月范围(monthrange)",
          value: "monthrange",
        },
        {
          label: "日期时间范围(datetimerange)",
          value: "datetimerange",
        },
      ],
    };
  },
  components: {
    IconsDialog,
    draggable,
    TreeNodeDialog,
  },
  computed: {
    ...mapState(["formConf", "activeData", "drawingList", "idGlobal"]),
    documentLink() {
      return (
        this.activeData.__config__.document ||
        "https://element.eleme.cn/#/zh-CN/component/installation"
      );
    },
    dateOptions() {
      if (
        this.activeData.type !== undefined &&
        this.activeData.__config__.tag === "el-date-picker"
      ) {
        if (this.activeData["start-placeholder"] === undefined) {
          return this.dateTypeOptions;
        }
        return this.dateRangeTypeOptions;
      }
      return [];
    },
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
    activeTag() {
      return this.activeData.__config__.tag;
    },
    isShowMin() {
      return ["el-input-number", "el-slider"].indexOf(this.activeTag) > -1;
    },
    isShowMax() {
      return ["el-input-number", "el-slider"].indexOf(this.activeTag) > -1;
    },
    isShowStep() {
      return ["el-input-number", "el-slider"].indexOf(this.activeTag) > -1;
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
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(",");
      }
      if (typeof val === "boolean") {
        return `${val}`;
      }
      return val;
    },
    onDefaultValueInput(str) {
      if (Array.isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          "defaultValue",
          str.split(",").map((val) => (isNumberStr(val) ? +val : val))
        );
      } else if (["true", "false"].includes(str)) {
        // 布尔
        this.$set(this.activeData.__config__, "defaultValue", JSON.parse(str));
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          "defaultValue",
          isNumberStr(str) ? +str : str
        );
      }
    },
    onSwitchValueInput(val, name) {
      if (["true", "false"].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val));
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val);
      }
    },
    tagChange(tagIcon) {
      let target = [...inputComponents, ...selectComponents].find((item) => {
        return item.__config__.tagIcon === tagIcon;
      });

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
    setOptionValue(item, val) {
      item.val = isNumberStr(val) ? +val : val;
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: "",
        value: "",
      });
    },
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    append(data) {
      if (!data.children) {
        this.$set(data, "children", []);
      }
      this.dialogVisible = true;
      this.currentNode = data.children;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    addTreeItem() {
      this.dialogVisible = true;
      this.currentNode = this.activeData.options;
    },
    addNode(data) {
      this.currentNode.push(data);
    },
    rangeChange(val) {
      this.$set(
        this.activeData.__config__,
        "defaultValue",
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      );
    },
    setTimeValue(val, type) {
      const valueFormat = type === "week" ? dateTimeFormat.date : val;
      this.$set(this.activeData.__config__, "defaultValue", null);
      this.$set(this.activeData, "value-format", valueFormat);
      this.$set(this.activeData, "format", val);
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val);
    },
    rateTextChange(val) {
      if (val) this.activeData["show-score"] = false;
    },
    rateScoreChange(val) {
      if (val) this.activeData["show-text"] = false;
    },
    determineFetch() {
      this.$parent.fetchData(this.activeData);
    },
    changeRenderKey() {
      this.activeData.__config__.renderKey = +new Date();
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

.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  .el-input + .el-input {
    margin-left: 4px;
  }
}

.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}

.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}

.option-drag {
  cursor: move;
}
</style>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
