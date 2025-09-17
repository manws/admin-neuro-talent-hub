<template>
  <div class="flex-style-base">
    <el-input-number v-model="field.value" :disabled="isDisabled" style="width: 250px"></el-input-number>
    <el-button v-if="!isDisabled" class="btn-position score-btn" :loading="loading"
      @click="handleClick">获取得分</el-button>
  </div>
</template>

<script>
export default {
  name: 'FieldScore',
  props: {
    isDisabled: Boolean,
    field: Object
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleClick() {
      this.loading = true
      this.$emit('request', this.field, () => {
        this.loading = false
      })
    }
  }

}
</script>

<style scoped>
.score-btn {
  height: 40px !important;
  line-height: 40px !important;
  margin-left: 8px;
}
</style>