<script>
import render from "@/components/render/render";
import { mapMutations, mapState } from "vuex";
import { deepClone } from "../utils";

const components = {
  itemBtns(h, currentItem, index) {
    const deleteItem = () => {
      this.DELETE_DRAWING(index);
    };
    const copyItem = () => {
      let data = deepClone(currentItem);
      data.renderKey = Date.now();
      this.SET_IDGLOBAL();
      data.__vModel__ = `field${this.idGlobal}`;
      this.COPY_DRAWING({ data, index });
    };
    return [
      <span class="drawing-item-copy" title="复制" onClick={copyItem}>
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={deleteItem}>
        <i class="el-icon-delete" />
      </span>,
    ];
  },
};

const layouts = {
  colFormItem(h, currentItem, index) {
    const activeItem = (item) => {
      this.SET_ACTIVEDATA(item);
    };
    return (
      <el-col
        class={
          this.activeData.renderKey === currentItem.renderKey
            ? "active-from-item drawing-item"
            : "drawing-item"
        }
        span={currentItem.__config__.span}
      >
        <el-form-item
          label={
            currentItem.__config__.showLabel
              ? currentItem.__config__.label
              : null
          }
          label-width={
            currentItem.__config__.showLabel
              ? currentItem.__config__.labelWidth
                ? currentItem.__config__.labelWidth + "px"
                : null
              : "0px"
          }
          nativeOnClick={(event) => {
            activeItem(currentItem);
            event.stopPropagation();
          }}
          required={currentItem.__config__.required}
        >
          <render
            key={currentItem.renderKey}
            currentItem={currentItem}
            onInput={(event) => {
              this.$set(currentItem.__config__, "defaultValue", event);
            }}
          ></render>
        </el-form-item>
        {components.itemBtns.call(this, h, currentItem, index)}
      </el-col>
    );
  },
};

export default {
  data() {
    return {};
  },
  components: {
    render,
  },
  props: {
    currentItem: Object,
    formConf: Object,
    index: Number,
  },
  computed: {
    ...mapState(["activeData"]),
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "SET_ACTIVEDATA",
      "DELETE_DRAWING",
      "COPY_DRAWING",
      "SET_IDGLOBAL",
    ]),
  },
  render(h) {
    return layouts.colFormItem.call(this, h, this.currentItem, this.index);
  },
};
</script>

<style lang="scss" scoped>
.drawing-item {
  position: relative;
  &:hover {
    cursor: move;
    /deep/ .el-form-item {
      background-color: #eff6fd;
    }
    & > .drawing-item-copy,
    & > .drawing-item-delete {
      display: inline-block;
    }
  }
  /deep/ .el-form-item {
    padding: 12px 10px;
    margin-bottom: 15px;
  }
  & > .drawing-item-copy,
  & > .drawing-item-delete {
    border: 1px solid;
    background: #fff;
    border-radius: 50%;
    font-size: 12px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    display: none;
    cursor: pointer;
    position: absolute;
    top: -10px;
    z-index: 1;
  }

  & > .drawing-item-copy {
    color: #409eff;
    border-color: #409eff;
    right: 56px;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
  & > .drawing-item-delete {
    color: #f56c6c;
    border-color: #f56c6c;
    right: 24px;
    &:hover {
      background-color: #f56c6c;
      color: #fff;
    }
  }
}
.active-from-item {
  /deep/ .el-form-item {
    background-color: #eff6fd;
  }
}
</style>
