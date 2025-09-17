<template>
  <div v-if="field.isShow || show === true" class="flex-style-base field-content">
    <el-input-number v-if="fieldTypeId === 1" v-model="field.value" :disabled="isDisabled"
      style="width: 250px"></el-input-number>

    <el-input v-else-if="fieldTypeId === 2" v-model="field.value" placeholder="请输入内容" :disabled="isDisabled"
      style="min-width: 250px; width: 100%">
      <el-button slot="append" v-if="field.tail">{{ field.tail }}</el-button>
    </el-input>

    <el-input v-else-if="fieldTypeId === 3" type="textarea" maxlength="200" v-model="field.value" :rows="3"
      placeholder="限制200字" :disabled="isDisabled" style="min-width: 250px; width: 100%"></el-input>

    <el-date-picker style="width: 250px" v-else-if="fieldTypeId == 4 && field.format && field.format.length > 12"
      v-model="field.value" type="datetime" placeholder="选择日期" :format="field.format" :value-format="field.format"
      :disabled="isDisabled"></el-date-picker>

    <el-date-picker style="width: 250px" v-else-if="fieldTypeId == 4" v-model="field.value" type="date"
      placeholder="选择日期" :format="field.format" :value-format="field.format" :disabled="isDisabled"></el-date-picker>

    <el-time-picker style="width: 250px" v-else-if="fieldTypeId == 5" v-model="field.value" :format="field.format"
      :value-format="field.format" :disabled="isDisabled"></el-time-picker>

    <el-radio-group v-else-if="fieldTypeId === 6" v-model="field.value" :disabled="isDisabled">
      <el-radio v-for="( item, index ) in codegroup " :key="index" :label="String(item.codeId)" style="margin-top: 6px"
        :style="{ display: codegroup.length > 2 ? 'block' : '' }" @click.native.prevent="onClickRadio(item.codeId)">
        {{ item.codeValue1 }} {{ item.codeValue2 }} {{ item.remark }}
      </el-radio>
    </el-radio-group>

    <el-select v-else-if="fieldTypeId == 7" style="width: 250px" v-model="field.value" placeholder="请选择"
      @change="onSelectChange" :disabled="isDisabled">
      <el-option v-for=" item in codegroup " :key="item.codeId" :label="item.codeValue1" :value="item.codeId">{{
        item.codeValue1 }} {{ item.codeValue2 }}
        {{ item.remark }}</el-option>
    </el-select>

    <div v-else-if="fieldTypeId === 8">
      <el-checkbox-group v-model="checkboxValue" @change="onCheckboxChange" :disabled="isDisabled">
        <el-checkbox v-for="( item, index ) in codegroup " :key="index" :label="item.codeId" style="margin-top: 6px"
          :style="{ display: codegroup.length > 2 ? 'block' : '' }">
          {{ item.codeValue1 }} {{ item.codeValue2 }} {{ item.remark }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-else-if="fieldTypeId == 9">
      <field-uploader ref="uploader" :value="field.value" :limit="1"
        :actionUrl="`/api/v2/File/crfImage/${projectDB}/${requestParam.subjectCode}/${requestParam.visitCode}/${requestParam.formId}/${field.fieldCode}`"
        @refresh="handleImageChange" :isDisabled="isDisabled" accept="image/*"></field-uploader>
    </div>
    <div v-else-if="fieldTypeId == 10">
      <field-uploader ref="uploader" :value="field.value" :limit="1"
        :actionUrl="`/api/v2/File/crfFile/${projectDB}/${requestParam.subjectCode}/${requestParam.visitCode}/${requestParam.formId}/${field.fieldCode}`"
        @refresh="handleImageChange" :isDisabled="isDisabled" accept="image/*,.pdf"></field-uploader>
    </div>
    <div v-else-if="fieldTypeId == 11" :disabled="isDisabled">
      {{ field.value }}
    </div>
    <div v-else-if="fieldTypeId == 12">
      <FieldScore :field="field" :isDisabled="isDisabled" @request="requestField"></FieldScore>
    </div>
    <div v-else-if="fieldTypeId == 13">
      <field-uploader ref="uploader" :value="field.value" :limit="1"
        :actionUrl="`/api/v2/File/crfCompress/${projectDB}/${requestParam.subjectCode}/${requestParam.visitCode}/${requestParam.formId}/${field.fieldCode}`"
        @refresh="handleImageChange" :isDisabled="isDisabled" :fileSize="20" accept=".zip,.rar,.7z"></field-uploader>
    </div>
    <div v-else-if="fieldTypeId == 14">
      <field-uploader ref="uploader" :value="field.value" :limit="3"
        :actionUrl="`/api/v2/File/crfFile/${projectDB}/${requestParam.subjectCode}/${requestParam.visitCode}/${requestParam.formId}/${field.fieldCode}`"
        @refresh="handleImageChange" :isDisabled="isDisabled" accept="image/*,.pdf"></field-uploader>
    </div>

    <FieldMeddra v-else-if="fieldTypeId == 15" :isDisabled="isDisabled" :field="field"></FieldMeddra>
    <div style="padding: 0 8px;">{{ field.uint }}</div>
  </div>
</template>

<script>
import FieldUploader from './FieldUploader.vue';
import FieldScore from './FieldScore.vue';
import FieldMeddra from './FieldMeddra.vue';
export default {
  components: { FieldUploader, FieldScore, FieldMeddra },
  name: "FieldContent",
  data() {
    return {
      checkboxValue: [],
      isIndeterminate: false,
    };
  },
  computed: {
    fieldTypeId: function () {
      if (this.typeId === -1) {
        return this.field.fieldTypeId;
      }
      return this.typeId;
    },
    projectDB: function () {
      return this.$store.getters.project.projectDB
    }
  },
  watch: {
    codegroup: {
      handler(v, o) {
        if (this.fieldTypeId === 8) {
          if (!!this.field.value && typeof this.field.value === 'string') {
            this.checkboxValue = this.field.value
              .split(",")
              .map((item) => item);
          } else {
            this.checkboxValue = [];
          }
        }
      },
      immediate: true
    },
    field: {
      handler(v, o) {
        if ((v.fieldTypeId === 1 || v.fieldTypeId === 12) && (v.value === null || v.value === '')) {
          v.value = v.value || undefined;
        }
      },
      immediate: true,
      deep: true
    }
  },
  props: {
    typeId: {
      type: Number,
      default: -1,
    },
    show: {
      type: Boolean,
      default: false,
    },
    codegroup: [Array, Object],
    field: [Object],
    isDisabled: {
      type: Boolean,
      default: true,
    },
    isMerge: {
      type: Boolean,
      default: false,
    },
    mergeLabel: {
      type: String,
      default: "全选",
    },
    formId: {
      type: [String, Number],
    },
    requestParam: {
      type: Object,
      default: () => {
        return { formId: '', subjectCode: '', visitCode: '' }
      }
    }
  },
  methods: {
    onClickRadio(e) {
      if (this.isDisabled) return;
      e === this.field.value
        ? (this.field.value = null)
        : (this.field.value = e);
      this.$set(this.field, "value", this.field.value);
      this.$emit("change");
    },
    onCheckboxChange(checked) {
      this.$set(this.field, "value", checked.join(","));
      this.$emit("change");
    },
    onSelectChange(value) {
      this.$emit("change");
    },
    handleImageChange(fileList) {
      this.field.value = fileList.join(',')
      this.$emit("change");
    },
    requestField(field, callback) {
      this.$emit('request', field, callback)
    }
  },
};
</script>

<style lang="scss">
.field-content {
  .el-radio {
    display: flex !important;
  }

  .el-radio__input {
    line-height: 24px;
  }

  .el-radio__label {
    white-space: pre-wrap;
    line-height: 24px;
  }

  .el-checkbox {
    display: flex !important;
  }

  .el-checkbox__input {
    line-height: 24px;
    margin-top: 2px;
  }

  .el-checkbox__label {
    white-space: pre-wrap;
    line-height: 24px;
  }
}
</style>
