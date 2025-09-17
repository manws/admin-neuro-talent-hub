<template>
  <el-dialog title="重置密码" :visible.sync="dialogVisible" width="600px" top="calc(50vh - 100px)"
    :close-on-click-modal="false">
    <span>
      <span> 该操作会将用户【</span>
      <span>{{ userName }}</span>
      <span>】的登录密码重置为：</span>
      <span style="font-weight: bold">123456</span>
      <span>，密码重置后请联系用户立即修改！</span>
    </span>
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
export default {
  props: {
    usergroupList: {
      type: Array,
      default: () => [],
    },
    siteList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      userId: "",
      userName: "",
      siteControl: "",
    };
  },

  methods: {
    async show(row) {
      this.dialogVisible = true;
      const { userName, userId, siteControl } = row;
      this.userName = userName;
      this.siteControl = siteControl;
      this.userId = userId;
    },
    async handleClick() {
      this.loading = true;
      const isSuccess = await this.service.resetPwd(this.userId);
      if (isSuccess) {
        this.dialogVisible = false;
        this.$message({
          message: "密码重置成功",
          type: "success",
        });
        this.$emit("refresh");
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
</style>
