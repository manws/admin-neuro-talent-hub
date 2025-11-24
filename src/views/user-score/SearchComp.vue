<template>
  <div class="flex-style-base fit-inut">
    <div class="search-comp-label group-search">考核名称</div>
    <el-select v-model="scoreTypeId" class="group-search" placeholder="请选择" style="flex: 1" filterable clearable>
      <el-option v-for="(item, index) in scoreTypeList" :key="index" :label="item.scoreTypeName"
                 :value="item.id"></el-option>
    </el-select>
    <div class="search-comp-label group-search" style="margin-left: 16px;">考核人员</div>
    <el-input v-model="userName" style="width: 180px; margin-left: 8px" placeholder="请输入" clearable />

    <div class="flex-style-base" style="margin-left: 10px">
       <div class="btn-reset" style="margin: 0 6px" @click="reset">重置</div>
      <div class="btn-search" style="margin: 0 6px" @click="search">检索</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scoreTypeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentScoreTypeId: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    currentScoreTypeId: {
      handler(val) {
        this.scoreTypeId = val;
      },
    }
  },
  data() {
    return {
      scoreTypeId: "",
      userName: ""
    };
  },
  methods: {
    reset() {
      this.scoreTypeId = "";
      this.userName = "";
      let result = {
        scoreTypeId: this.scoreTypeId,
        userName: this.userName,
      };
      this.$emit("search", result);
    },
    search() {
      let result = {
        scoreTypeId: this.scoreTypeId,
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
