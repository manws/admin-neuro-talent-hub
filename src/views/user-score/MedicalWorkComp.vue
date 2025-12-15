<template>
  <div class="medical-work-content">
    <template v-for="(item, index) in contentShow">
      <div style="margin-bottom: 16px;">
        <div class="level1-title">{{item.fieldName}}</div>
        <div v-if="item.subContentList.length == 0" class="content-text1">{{item.result}}</div>
        <div v-else class="sub-content">
          <template v-for="(subItem, subIndex) in item.subContentList">
            <div class="level1-title">{{subItem.fieldName}}</div>
            <div class="content-text2">{{subItem.result}}</div>
          </template>

        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MedicalWorkComp',
  props: {
    contentShow: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {}
}

</script>

<style scoped lang="scss">
.medical-work-content {
  margin-left: 24px;
  margin-top: 8px;
}

.level1-title {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 500;
  line-height: 24px;
  margin: 8px 0;
}

.content-text1 {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 400;
  background-color: #F6F7F8;
  border-radius: 4px;
  padding: 8px 16px;
}

.content-text2 {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 400;
  margin-left: 28px;
}

.sub-content {
  background-color: #F6F7F8;
  border-radius: 4px;
  padding: 8px 24px;
}

.item-name {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
}

</style>
