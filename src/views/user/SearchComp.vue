<template>
  <div class="flex-style-base fit-inut">
    <div class="search-comp-label" style="margin-left: 16px">账户</div>
    <el-input v-model="userCode" style="width: 180px; margin-left: 8px" placeholder="请输入" />
    <div class="search-comp-label" style="margin-left: 16px">中心名称</div>
    <el-select v-model="siteId" filterable placeholder="请选择" style="flex: 1">
      <el-option v-for="(item, index) in siteList" :key="index" :label="item.siteName" :value="item.siteId"></el-option>
    </el-select>

    <div class="search-comp-label group-search" style="margin-left: 16px">角色名称</div>
    <el-select v-model="usergroupId" class="group-search" placeholder="请选择" style="flex: 1" filterable clearable>
      <el-option v-for="(item, index) in usergroupList" :key="index" :label="item.usergroupName"
        :value="item.usergroupId"></el-option>
    </el-select>

    <div class="flex-style-base" style="margin-left: 10px">
      <div class="btn-reset" style="margin: 0 6px" @click="reset">重置</div>
      <div class="btn-search" style="margin: 0 6px" @click="search">检索</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    siteList: {
      type: Array,
      default: () => [],
    },
    usergroupList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      siteId: "",
      usergroupId: "",
      userCode: "",
    };
  },
  computed: {},
  methods: {
    reset() {
      this.siteId = "";
      this.usergroupId = "";
      this.userCode = "";
      let result = {
        userCode: "",
        siteId: this.siteId,
        usergroupId: this.usergroupId,
      };
      this.$emit("search", result);
    },
    search() {
      let result = {
        userCode: this.userCode,
        siteId: this.siteId,
        usergroupId: this.usergroupId,
      };

      this.$emit("search", result);
    },
  },
};
</script>

<style scoped>
.search-comp-label {
  width: auto;
  min-width: 0;
  margin-right: 8px;
  font-size: 14px;
  font-weight: 500;
}

@media screen and (max-width: 1200px) {
  .group-search {
    display: none;
  }
}
</style>
