<template>
  <el-dialog :title="isNew ? '新增用户' : '编辑用户'" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
    <div class="flex-style-base fit-inut">
      <span class="red-dot">*</span>
      <div class="search-comp-label">账号</div>
      <el-input v-model="userCode" class="input-style" placeholder="请输入" />
    </div>

    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">用户名</div>
      <el-input v-model="userName" class="input-style" placeholder="请输入" />
    </div>

    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">用户电话</div>
      <el-input v-model="phone" class="input-style" placeholder="请输入" />
    </div>

    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">用户邮箱</div>
      <el-input v-model="email" class="input-style" placeholder="请输入" />
    </div>

    <el-divider></el-divider>

    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">角色名称</div>
      <el-select v-model="usergroupId" placeholder="请选择" style="flex: 1">
        <el-option v-for="(item, index) in usergroupList" :key="index" :label="item.usergroupName"
          :value="item.usergroupId"></el-option>
      </el-select>
    </div>

    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">负责中心</div>
      <el-select v-model="siteIds" placeholder="请选择" multiple style="flex: 1">
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
          <el-option v-for="(item, index) in group.options" :key="index" :label="item.siteName"
            :value="item.siteId"></el-option>
        </el-option-group>
      </el-select>
    </div>



    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">短信提醒</div>
      <el-radio-group v-model="isRemind" style="flex: 1">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </div>

    <div class="flex-style-base fit-inut" style="margin-top: 16px">
      <span class="red-dot">*</span>
      <div class="search-comp-label">是否激活</div>
      <el-radio-group v-model="enabled" style="flex: 1">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </div>

    <div style="margin-top: 32px; color: #8a8a8a">注：初始密码为123456</div>

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
      siteIds: [],
      userCode: "",
      usergroupId: "",
      userName: "",
      phone: "",
      email: "",
      siteControl: "",
      enabled: 0,
      loading: false,
      isNew: true,
      userId: "",
      isRemind: 0
    };
  },
  watch: {
    siteIds(v, o) {
      if (v && v.indexOf(0) > -1 && v.length > 1) {
        this.siteIds = [0];
      }
    },
  },
  computed: {
    options: function () {
      if (this.funcZero(this.siteIds)) {
        return [
          {
            label: "所有中心",
            options: [
              {
                siteId: 0,
                siteName: "所有中心",
              },
            ],
          },
        ];
      }
      return [
        {
          label: "所有中心",
          options: [
            {
              siteId: 0,
              siteName: "所有中心",
            },
          ],
        },
        {
          label: "选择中心",
          options: [...this.siteList],
        },
      ];
    },
  },
  methods: {
    async show(row) {
      this.dialogVisible = true;
      if (!!row) {
        this.isNew = false;
        // 编辑
        this.siteIds = row.siteControlId.split(",").map((item) => Number(item)); // todo something
        this.userCode = row.userCode;
        this.usergroupId = row.usergroupId; // todo something
        this.userName = row.userName;
        this.phone = row.phone;
        this.email = row.email;
        this.enabled = row.enabled;
        this.userId = row.userId;
        this.isRemind = row.isRemind;
      } else {
        this.isNew = true;
        // 新增
        this.siteIds = [];
        this.userCode = "";
        this.usergroupId = "";
        this.userName = "";
        this.phone = "";
        this.email = "";
        this.siteControl = "";
        this.enabled = 0;
        this.isRemind = 0;
      }
    },
    funcZero(ar) {
      return ar && ar.indexOf(0) > -1;
    },
    async handleClick() {
      if (!this.userCode) {
        this.$message({
          message: "账号不能为空",
          type: "error",
        });
        return;
      }

      if (!isMobile(this.userCode)) {
        this.$message({
          message: "账号必须为手机号",
          type: "error",
        });
        return;
      }

      if (!this.userName) {
        this.$message({
          message: "用户名不能为空",
          type: "error",
        });
        return;
      }

      if (!this.phone) {
        this.$message({
          message: "用户电话不能为空",
          type: "error",
        });
        return;
      }

      if (!isMobile(this.phone)) {
        this.$message({
          message: "账号必须为手机号",
          type: "error",
        });
        return;
      }

      if (!this.email) {
        this.$message({
          message: "用户邮箱不能为空",
          type: "error",
        });
        return;
      }

      if (!isEmail(this.email)) {
        this.$message({
          message: "邮箱格式不正确",
          type: "error",
        });
        return;
      }

      if (!this.usergroupId) {
        this.$message({
          message: "请选择角色",
          type: "error",
        });
        return;
      }

      if (!this.siteIds || this.siteIds.length === 0) {
        this.$message({
          message: "请选择中心",
          type: "error",
        });
        return;
      }

      let param = {
        siteControl: this.siteIds.join(","),
        userCode: this.userCode,
        usergroupId: this.usergroupId,
        userName: this.userName,
        phone: this.phone,
        email: this.email,
        enabled: this.enabled,
        isRemind: this.isRemind,
      };
      this.loading = true;
      if (this.isNew) {
        this.addData(param);
      } else {
        param.userId = this.userId;
        this.updateData(param);
      }
    },
    async addData(param) {
      const userId = await this.service.userInsert(param);
      if (!!userId) {
        this.$message({
          message: "用户新增成功",
          type: "success",
        });
        this.$emit("refresh");
        this.dialogVisible = false;
      }
      this.loading = false;
    },
    async updateData(param) {
      const isSuccess = await this.service.userUpdate(param);
      if (isSuccess) {
        this.$message({
          message: "用户更新成功",
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
</style>
