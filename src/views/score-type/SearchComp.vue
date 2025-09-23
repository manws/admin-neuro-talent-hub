<template>
  <div class="flex-style-base fit-inut">
    <div class="search-comp-label" style="margin-left: 16px">考核名称</div>
    <el-input v-model="subOn" style="width: 180px; margin-left: 8px" placeholder="请输入" />
    <div class="search-comp-label group-search" style="margin-left: 16px">发布时间</div>
    <el-select v-model="scoreTypeName" class="group-search" placeholder="请选择" style="flex: 1" filterable clearable>
      <el-option v-for="(value, key) in stateMap" :key="key" :label="value"
        :value="key"></el-option>
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
    stateMap: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      scoreTypeName: "",
      subOn: "",
    };
  },
  computed: {},
  methods: {
    reset() {
      this.scoreTypeName = "";
      this.subOn = "";
      let result = {
        subOn: "",
        scoreTypeName: this.scoreTypeName,
      };
      this.$emit("search", result);
    },
    search() {
      let result = {
        subOn: this.subOn,
        scoreTypeName: this.scoreTypeName,
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
