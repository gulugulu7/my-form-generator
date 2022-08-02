export default {
  options(h, conf) {
    const list = [];
    conf.__slot__.options.forEach((item) => {
      if (conf.__config__.optionType === "button") {
        list.push(
          <el-radio-button label={item.value}>{item.label}</el-radio-button>
        );
      } else {
        list.push(
          <el-radio label={item.value} border={conf.__config__.border}>
            {item.label}
          </el-radio>
        );
      }
    });
    return list;
  },
};
