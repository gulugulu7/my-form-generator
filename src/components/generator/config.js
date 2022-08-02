// 表单属性【右面板】
export const formConf = {
  formRef: "elForm",
  formModel: "formData",
  size: "medium",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  gutter: 15,
  disabled: false,
  span: 24,
};

// 输入型组件【左面板】
export const inputComponents = [
  {
    __config__: {
      label: "单行文本",
      labelWidth: null,
      changeTag: true,
      tag: "el-input",
      tagIcon: "input",
      defaultValue: undefined,
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input",
    },
    // 组件的插槽属性
    __slot__: {
      prepend: "",
      append: "",
    },
    placeholder: "请输入",
  },
  {
    __config__: {
      label: "多行文本",
      labelWidth: null,
      changeTag: true,
      tag: "el-input",
      tagIcon: "textarea",
      defaultValue: undefined,
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input",
    },
    type: "textarea",
    placeholder: "请输入",
  },
  {
    __config__: {
      label: "密码",
      labelWidth: null,
      changeTag: true,
      tag: "el-input",
      tagIcon: "password",
      defaultValue: undefined,
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input",
    },
    type: "password",
    placeholder: "请输入",
  },
  {
    __config__: {
      label: "计数器",
      labelWidth: null,
      changeTag: true,
      tag: "el-input-number",
      tagIcon: "number",
      defaultValue: undefined,
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input-number",
    },
    placeholder: "",
  },
];

//选择型组件
export const selectComponents = [
  {
    __config__: {
      label: "下拉选择",
      labelWidth: null,
      changeTag: true,
      tag: "el-select",
      tagIcon: "select",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/select",
    },
    __slot__: {
      options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    },
    placeholder: "请选择",
  },
  {
    __config__: {
      label: "级联选择",
      labelWidth: null,
      changeTag: true,
      tag: "el-cascader",
      tagIcon: "cascader",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/cascader",
    },
    placeholder: "请选择",
  },
  {
    __config__: {
      label: "单选框组",
      labelWidth: null,
      changeTag: true,
      tag: "el-radio-group",
      tagIcon: "radio",
      span: 24,
      optionType: "default",
      document: "https://element.eleme.cn/#/zh-CN/component/radio",
    },
    __slot__: {
      options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    },
  },
  {
    __config__: {
      label: "多选框组",
      labelWidth: null,
      changeTag: true,
      tag: "el-checkbox-group",
      tagIcon: "checkbox",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/checkbox",
    },
    __slot__: {
      options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    },
  },
  {
    __config__: {
      label: "开关",
      labelWidth: null,
      changeTag: true,
      tag: "el-switch",
      tagIcon: "switch",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/switch",
    },
    placeholder: "",
  },
  {
    __config__: {
      label: "滑块",
      labelWidth: null,
      changeTag: true,
      tag: "el-slider",
      tagIcon: "slider",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/slider",
    },
    placeholder: "",
  },
  {
    __config__: {
      label: "时间选择",
      labelWidth: null,
      changeTag: true,
      tag: "el-time-picker",
      tagIcon: "time",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/time-picker",
    },
    placeholder: "请选择",
  },
  {
    __config__: {
      label: "时间范围",
      labelWidth: null,
      changeTag: true,
      tag: "el-time-picker",
      tagIcon: "time-range",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/time-picker",
    },
    placeholder: "请选择",
  },
  {
    __config__: {
      label: "日期选择",
      labelWidth: null,
      changeTag: true,
      tag: "el-date-picker",
      tagIcon: "date",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/date-picker",
    },
    placeholder: "请选择",
  },
  {
    __config__: {
      label: "日期范围",
      labelWidth: null,
      changeTag: true,
      tag: "el-date-picker",
      tagIcon: "date-range",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/date-picker",
    },
    placeholder: "请选择",
  },
  {
    __config__: {
      label: "评分",
      labelWidth: null,
      changeTag: true,
      tag: "el-rate",
      tagIcon: "rate",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/rate",
    },
  },
  {
    __config__: {
      label: "颜色选择",
      labelWidth: null,
      changeTag: true,
      tag: "el-color-picker",
      tagIcon: "color",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/color-picker",
    },
  },
];
