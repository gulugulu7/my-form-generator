import { deepClone } from "@/utils/index";

const componentChild = {};
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */
const slotsFiles = require.context("./slots", false, /\.js$/);
const keys = slotsFiles.keys() || [];
keys.forEach((key) => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = slotsFiles(key).default;
  componentChild[tag] = value;
});

function mountSlotFiles(h, confClone, children) {
  const childObjs = componentChild[confClone.__config__.tag];
  if (childObjs) {
    Object.keys(childObjs).forEach((key) => {
      const childFunc = childObjs[key];
      if (confClone.__slot__ && confClone.__slot__[key]) {
        children.push(childFunc(h, confClone, key));
      }
    });
  }
}

function buildDataObject(confClone, dataObject) {
  Object.keys(confClone).forEach((key) => {
    if (
      key !== "__config__" &&
      key !== "__vModel__" &&
      key !== "__slot__" &&
      key !== "style"
    ) {
      dataObject.attrs[key] = confClone[key];
    }

    if (key === "__vModel__") {
      vModel.call(this, dataObject, confClone.__config__.defaultValue);
    }
    if (key === "style") {
      dataObject.style = confClone[key];
    }
  });
}

function vModel(dataObject, defaultValue) {
  dataObject.props.value = defaultValue;
  dataObject.on.input = (val) => {
    this.$emit("input", val);
  };
}

const makeDataObject = () => {
  return {
    class: {},
    attrs: {},
    props: {},
    on: {},
    style: {},
  };
};

export default {
  data() {
    return {};
  },
  props: {
    currentItem: Object,
  },
  render(h) {
    const dataObject = makeDataObject();

    const confClone = deepClone(this.currentItem);
    const children = this.$slots.default || [];

    //如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    mountSlotFiles.call(this, h, confClone, children);

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）
    buildDataObject.call(this, confClone, dataObject);
    return h(confClone.__config__.tag, dataObject, children);
  },
};
