<template>
  <el-dialog :title="isNew ? '新增考核' : '编辑考核'" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
    <div class="flex-style-base fit-inut">
      <span class="red-dot">*</span>
      <div class="search-comp-label">考核名称</div>
      <el-input v-model="scoreTypeName" class="input-style" placeholder="请输入" />
    </div>

    <div>
      <div class="label-text">考核内容</div>
      <div class="flex-style-base fit-inut" style="margin-top: 16px">
        <span class="red-dot" style="color: transparent;">*</span>
        <div class="search-comp-label">医疗工作</div>
        <el-radio-group v-model="level1" style="flex: 1">
          <el-radio :label="1">考核 </el-radio>
          <el-radio :label="0">不考核</el-radio>
        </el-radio-group>
      </div>

      <div class="flex-style-base fit-inut" style="margin-top: 16px">
        <span class="red-dot" style="color: transparent;">*</span>
        <div class="search-comp-label">教学工作</div>
        <el-radio-group v-model="level2" style="flex: 1">
          <el-radio :label="1">考核 </el-radio>
          <el-radio :label="0">不考核</el-radio>
        </el-radio-group>
      </div>

      <div class="flex-style-base fit-inut" style="margin-top: 16px">
        <span class="red-dot" style="color: transparent;">*</span>
        <div class="search-comp-label">科研工作</div>
        <el-radio-group v-model="level3" style="flex: 1">
          <el-radio :label="1">考核 </el-radio>
          <el-radio :label="0">不考核</el-radio>
        </el-radio-group>
      </div>

      <div class="flex-style-base fit-inut" style="margin-top: 16px">
        <span class="red-dot" style="color: transparent;">*</span>
        <div class="search-comp-label">人才培养</div>
        <el-radio-group v-model="level4" style="flex: 1">
          <el-radio :label="1">考核 </el-radio>
          <el-radio :label="0">不考核</el-radio>
        </el-radio-group>
      </div>

      <div class="flex-style-base fit-inut" style="margin-top: 16px">
        <span class="red-dot" style="color: transparent;">*</span>
        <div class="search-comp-label">公益工作</div>
        <el-radio-group v-model="level5" style="flex: 1">
          <el-radio :label="1">考核</el-radio>
          <el-radio :label="0">不考核</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="flex-style-base fit-inut" style="margin-top: 16px;">
      <span class="red-dot">*</span>
      <div class="search-comp-label">结束时间</div>
      <el-date-picker v-model="endOn" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" class="input-style date-picker-disabled"
        type="datetime" placeholder="请选择结束日期">
      </el-date-picker>
    </div>


    <span slot="footer" class="flex-style-base dialog-footer">
      <div class="btn-cancel" @click="dialogVisible = false" style="margin: 0 6px">
        <span style="margin-left: 4px">取消</span>
      </div>
      <el-button class="btn-position" :loading="loading" @click="handleClick" style="margin: 0 6px">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isMobile, isEmail } from "@/utils/tools";
import service from "./service.js";
export default {
  props: {
    stateMap: {
      type: Object,
      default: () => { },
    },
  },
  mounted() {
  },
  data() {
    return {
      dialogVisible: false,
      scoreTypeName: "",
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      loading: false,
      isNew: true,
      endOn: "",
      id: "",
    };
  },
  methods: {
    async show(row) {
      this.dialogVisible = true;
      if (!!row) {
        this.isNew = false;
        // 编辑
        this.scoreTypeName = row.scoreTypeName;
        this.level1 = row.level1;
        this.level2 = row.level2;
        this.level3 = row.level3;
        this.level4 = row.level4;
        this.level5 = row.level5;
        this.endOn = row.endOn
        this.id = row.id;
      } else {
        this.isNew = true;
        // 新增
        this.scoreTypeName = null
        this.level1 = 0
        this.level2 = 0
        this.level3 = 0
        this.level4 = 0;
        this.level5 = 0;
        this.endOn = ''
      }
    },
    async handleClick() {
      if (!this.scoreTypeName) {
        this.$message({
          message: "考核名称不能为空",
          type: "error",
        });
        return;
      }

      if (this.level1 === 0 && this.level2 === 0 && this.level3 === 0 && this.level4 === 0 && this.level5 === 0) {
        this.$message({
          message: "请至少选择一个考核内容",
          type: "error",
        });
        return;
      }

      if (!this.endOn) {
        this.$message({
          message: "请输入考核结束时间",
          type: "error",
        });
        return;
      }

      let param = {
        scoreTypeName: this.scoreTypeName,
        level1: this.level1,
        level2: this.level2,
        level3: this.level3,
        level4: this.level4,
        level5: this.level5,
        endOn: this.endOn
      };
      this.loading = true;
      if (this.isNew) {
        this.addData(param);
      } else {
        param.id = this.id;
        this.updateData(param);
      }
    },
    async addData(param) {
      const id = await service.insert(param);
      if (!!id) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.$emit("refresh");
        this.dialogVisible = false;
      }
      this.loading = false;
    },
    async updateData(param) {
      const isSuccess = await service.update(param);
      if (isSuccess) {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.$emit("refresh");
        this.dialogVisible = false;
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.el-dialog__header {
  // border-bottom: solid 1px #cdcdcd;
}
</style>

<style scoped>
.dialog-footer {
  justify-content: flex-end;
}

.input-style {
  width: 0;
  flex: 1;
}

.search-comp-label {
  width: 80px;
  text-align: justify;
  text-align-last: justify;
  font-size: 14px;
  color: #333333;
  margin-right: 16px;
}

.label-text {
  margin-top: 18px;
  width: 80px;
  text-align: justify;
  text-align-last: justify;
  font-size: 14px;
  color: #333333;
  margin-right: 16px;
}

.date-picker-disabled:hover {
  cursor: not-allowed;
}
</style>
