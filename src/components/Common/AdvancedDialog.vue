<template>
  <el-dialog title="高级筛选" class="advanced-search fit-inut" :visible.sync="dialogVisible" width="700px" @close="dismiss">
    <div class="flex-style-column" style="height: 300px">
      <div class="flex-style-base" style="margin-top: 16px" v-for="(search, index) in searchList" :key="index">
        <el-select v-model="search.fieldCode" style="flex: 1;margin-right: 8px;" size="middle"
          @change="onLabelSelect(search, $event)">
          <el-option v-for="item in labelList" :key="item.fieldCode" :label="item.fieldName"
            :value="item.fieldCode"></el-option>
        </el-select>

        <el-select v-model="search.reg" style="flex: 1;margin-right: 8px;" :disabled="!search.fieldCode">
          <el-option v-for="item in getRegList(
            search.field ? search.field.fieldTypeId : ''
          )" :value="item.value" :label="item.label" :key="item.value"></el-option>
        </el-select>

        <el-select v-if="getType(search.field) === ''" style="flex: 1;margin-right: 8px;" value=""
          :disabled="true"></el-select>

        <el-select v-if="getType(search.field) === 'select-multiple'" v-model="search.value" multiple collapse-tags
          style="flex: 1;margin-right: 8px;" :disabled="!search.reg && search.reg !== 0">
          <el-option v-for="item in codegroup[search.fieldCode]" :value="item.codeId" :label="item.codeValue1"
            :key="item.codeId"></el-option>
        </el-select>
        <el-input-number v-else-if="getType(search.field) === 'input-number'" v-model="search.value"
          :disabled="!search.reg && search.reg !== 0" style="flex: 1;margin-right: 8px;"></el-input-number>
        <el-input v-else-if="getType(search.field) === 'input-text'" v-model="search.value" placeholder="请输入"
          style="flex: 1;margin-right: 8px;" :disabled="!search.reg && search.reg !== 0" />
        <el-date-picker v-else-if="getType(search.field) === 'date-picker'" type="date" v-model="search.value"
          placeholder="请选择" style="flex: 1;margin-right: 8px;"
          :disabled="!search.reg && search.reg !== 0"></el-date-picker>

        <div v-if="index === 0" class="flex-style-base btn-cancel jia-jian" @click="add">
          <svg-icon icon-class="jia" />
        </div>
        <div v-else class="flex-style-base btn-cancel jia-jian" @click="remove">
          <svg-icon icon-class="jian" />
        </div>
      </div>
    </div>

    <span slot="footer" class="flex-style-base dialog-footer">
      <div class="btn-cancel" @click="dialogVisible = false" style="margin: 0 6px">
        取消
      </div>
      <div class="btn-reset" style="margin: 0 6px" @click="reset">重置</div>
      <div class="btn-position" style="margin: 0 6px" @click="search">确定</div>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "AdvancedDialog",
  data() {
    return {
      // dialogVisible: false,
      searchList: [],
    };
  },
  props: {
    dialogVisible: Boolean,
    codegroup: [Array, Object],
    labelList: [Array, Object],
  },
  model: {
    prop: "dialogVisible",
    event: "dismiss",
  },
  mounted() {
    this.searchList.push({});
  },
  watch: {
    dialogVisible(v, o) {
      // this.searchList = [{}];
    },
  },
  methods: {
    resetParam() {
      this.searchList = [];
      this.searchList.push({});
    },
    getRegList(type) {
      if (type === 6 || type === 7 || type === 8) {
        return [
          {
            label: "包含",
            value: 5,
          },
          {
            label: "不包含",
            value: 6,
          },
        ];
      } else if (type === 2 || type === 3) {
        return [
          {
            label: "等于",
            value: 2,
          },
          {
            label: "不等于",
            value: 4,
          },
          {
            label: "模糊",
            value: 7,
          },
        ];
      } else if (type === 1 || type === 4 || type === 5) {
        return [
          {
            label: "小于",
            value: 1,
          },
          {
            label: "等于",
            value: 2,
          },
          {
            label: "大于",
            value: 3,
          },
          {
            label: "不等于",
            value: 4,
          },
        ];
      }
    },
    getType(field) {
      if (!field) return "";
      let type = field.fieldTypeId;
      // 类似没有单选的情况哦
      if (type === 6 || type === 7 || type === 8) {
        return "select-multiple";
      } else if (type === 1) {
        return "input-number";
      } else if (type === 2 || type === 3) {
        return "input-text";
      } else if (type === 4) {
        return "date-picker";
      }

      return "";
    },
    onLabelSelect(search, fieldCode) {
      this.labelList.forEach((obj) => {
        if (fieldCode === obj.fieldCode) {
          this.$set(search, "field", obj);
        }
      });
      this.$set(search, "reg", "");
      this.$set(search, "value", null);
    },
    add() {
      if (this.searchList.length === 3) {
        this.$message({
          message: "最多只能添加三个选择项",
          type: "warning",
        });
      } else {
        this.searchList.push({});
      }
    },
    remove() {
      if (this.searchList.length < 2) {
        this.$message({
          message: "不能再少了",
          type: "warning",
        });
      } else {
        // 删除最后一个元素
        this.searchList.pop();
      }
    },
    dismiss() {
      this.$emit("dismiss", false);
    },
    reset() {
      this.searchList = [];
      this.searchList.push({});
      this.$emit("search", { searchDataDict: {} });
    },
    search() {
      let obj = {};
      this.searchList.forEach((item) => {
        if (
          item.fieldCode &&
          item.reg &&
          item.value &&
          (item.value > 0 || item.value.length > 0)
        ) {
          obj[item.fieldCode] = item.reg + "|" + String(item.value);
        }
      });
      this.$emit("search", { searchDataDict: obj });
      this.$emit("dismiss", !this.dialogVisible);
    },
  },
};
</script>

<style lang="scss">
.advanced-search {
  .el-dialog__body {
    padding: 0 20px !important;
  }
}
</style>

<style scoped>
.dialog-footer {
  justify-content: flex-end;
  margin-top: 32px;
}

.jia-jian {
  width: 32px;
  height: 32px;
  padding: 0 !important;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
}
</style>
