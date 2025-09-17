<template>
  <div class="flex-style-base" style="width: 100%;">
    <el-select v-model="value" :disabled="isDisabled" filterable remote clearable reserve-keyword placeholder="请输入关键词"
      :remote-method="querySearchAsync" :loading="loading" @change="onSelectChanged()"
      style="min-width: 250px; width: 100%;">
      <el-option v-for="(item, index) in options" :key="index" :label="item.lltName" :value="item.label">
        {{ item.label }}
      </el-option>
    </el-select>

    <el-popover v-if="!!watchInfo && !!field.value && !!watchInfo.lltName" placement="bottom-start" width="500"
      trigger="hover">
      <div class="flex-style-column">
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">低位语</span>
          <span class="watch-item-code">{{ watchInfo?.lltCode }}</span>
          <span class="watch-item-name single-text">{{ watchInfo?.lltName }}</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">首选语</span>
          <span class="watch-item-code">{{ watchInfo?.ptCode }}</span>
          <span class="watch-item-name single-text">{{ watchInfo?.ptName }}</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">高位语</span>
          <span class="watch-item-code">{{ watchInfo?.hltCode }}</span>
          <span class="watch-item-name single-text">{{ watchInfo?.hltName }}</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">高位组语</span>
          <span class="watch-item-code">{{ watchInfo?.hlgtCode }}</span>
          <span class="watch-item-name single-text">{{ watchInfo?.hlgtName }}</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">系统器官分类</span>
          <span class="watch-item-code">{{ watchInfo?.socCode }}</span>
          <span class="watch-item-name single-text">{{ watchInfo?.socName }}</span>
          <span class="watch-item-name single-text">{{ watchInfo?.socAbbrev }}</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">主SOC编码</span>
          <span class="watch-item-code">Y</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">词典名称</span>
          <span class="watch-item-code">MedDRA</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">词典版本</span>
          <span class="watch-item-code">27.1</span>
        </div>
        <div class="flex-style-base watch-item-container">
          <span class="watch-item-label">语种</span>
          <span class="watch-item-code">CN</span>
        </div>
      </div>
      <svg-icon slot="reference" class="watch-btn" icon-class="skill" />
    </el-popover>

  </div>
</template>

<script>
export default {
  name: 'FieldMeddra',
  props: {
    isDisabled: Boolean,
    field: Object,
  },
  data() {
    return {
      value: null,
      watchInfo: null,
      loading: false,
      options: [],
      queryString: ''
    }
  },
  async mounted() {
    this.value = this.field.value;
    const meddra = this.field.meddra;
    this.watchInfo = meddra;
    this.options = []
  },
  methods: {
    async querySearchAsync(queryString) {
      this.queryString = queryString;
      if (!queryString) {
        return
      }
      const meddraList = await this.service.meddraList({ lltName: queryString });
      if (!meddraList || meddraList.length === 0) {
        const emptyMeddra = {
          'label': queryString
        }
        // @ts-ignore
        this.options = [emptyMeddra]
        return
      }
      const realList = meddraList.map(item => {
        return Object.assign(item, {
          label: `${item.lltName}->${item.ptName}->${item.hltName}->${item.hlgtName}->${item.socName}[${item.primarySoc}]`
        })
      })
      this.options = realList || []

    },
    onSelectChanged() {
      console.log(this.value)
      if (!!this.value) {
        const watchInfo = this.options.find(item => item.label === this.value) || null
        if (!!watchInfo && !!watchInfo.id) {
          this.watchInfo = watchInfo
          this.field.meddra = watchInfo
          this.field.value = watchInfo.lltName
        } else {
          this.watchInfo = null
          this.field.meddra = { label: this.queryString }
          this.field.value = this.queryString
        }
      } else {
        this.watchInfo = null
        this.field.meddra = { label: this.queryString }
        this.field.value = this.queryString
      }
    }
  }
}
</script>

<style scoped lang="scss">
.watch-btn {
  margin-left: 8px;
  font-size: 16px;
  color: $jbPrimaryColor;
}

.watch-btn:hover {
  cursor: pointer;
}

.watch-item-container {
  line-height: 24px;
  margin-top: 8px;
  display: inline-block
}

.watch-item-label {
  width: 100px;
  display: inline-block;
}

.watch-item-name {
  width: 54px;
  margin-left: 8px;
  flex: 1;
}

.watch-item-code {
  width: 100px;
}
</style>