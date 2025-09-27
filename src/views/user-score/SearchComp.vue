<template>
  <div class="flex-style-base fit-inut">
    <div class="search-comp-label group-search">考核名称</div>
    <el-input v-model="scoreTypeName" style="width: 180px; margin-left: 8px" placeholder="请输入" />
    <div class="search-comp-label group-search" style="margin-left: 16px;">考核人员</div>
    <el-input v-model="userName" style="width: 180px; margin-left: 8px" placeholder="请输入" />

    <div class="flex-style-base" style="margin-left: 10px">
      <!-- <div class="btn-reset" style="margin: 0 6px" @click="reset">重置</div> -->
      <div class="btn-search" style="margin: 0 6px" @click="search">检索</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scoreTypeName: "",
      userName: ""
    };
  },
  methods: {
    reset() {
      this.scoreTypeName = "";
      this.userName = "";
      let result = {
        scoreTypeName: this.scoreTypeName,
        userName: this.userName,
      };
      this.$emit("search", result);
    },
    search() {
      let result = {
        scoreTypeName: this.scoreTypeName,
        userName: this.userName,
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

/* @media screen and (max-width: 1500px) {
  .group-search {
    display: none;
  }
} */
</style>
