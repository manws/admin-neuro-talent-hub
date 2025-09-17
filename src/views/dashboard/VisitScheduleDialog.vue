<template>
  <el-dialog title="访视计划" class="remind-dialog" :visible.sync="dialogVisible" top="5vh" width="1200px" append-to-body
    @close="dismiss" :close-on-click-modal="false">
    <div class="line"></div>
    <div class="table-container">
      <el-table ref="table" :data="tableData" style="width: 100%" height="calc(100%)" v-loading="listLoading"
        element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" :border="false">
        <el-table-column prop="crfFormName" label="列表信息" align="left" fixed :minWidth="200" :maxWidth="210">
          <template slot-scope="scope">
            <span style="font-weight: normal; color: #606266">{{
    scope.row.crfFormName
  }}</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(column, index) in head" :key="index" :label="column.fieldName" align="center"
          :minWidth="100">
          <el-table-column :prop="column.fieldCode" :label="column.fieldCode" align="center" :minWidth="130">
            <template slot-scope="scope">
              <span>{{ scope.row[column.fieldCode].state }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="flex-style-base" style="justify-content: center">
      <div class="flex-style-base" style="justify-content: center">
        <span class="tips-label">R=可填写多份</span>
        <span class="tips-label">O=需要时填</span>
        <span class="tips-label">R=可填写多份</span>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import service from "../remind/service.js";
import CommonPagination from "_c/Common/CommonPagination";

export default {
  components: {
    CommonPagination,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "dialogVisible",
    event: "dismiss",
  },
  data() {
    return {
      loading: false,
      listLoading: true,
      tableData: [],
      head: service.head,
      visitList: [],
      visitSchedule: [],
    };
  },
  watch: {
    dialogVisible(v, o) {
      if (v) {
        this.initData();
      }
    },
  },
  methods: {
    async initData() {
      this.listLoading = true;
      const { visitList, visitSchedule } = await this.service.visitSchedule();
      this.head = visitList.map((item) => {
        return {
          fieldName: item.visitName,
          fieldCode: item.visitCode,
          align: "center",
          value: "",
          ...item,
        };
      });
      this.tableData = visitSchedule;
      this.listLoading = false;
    },
    dismiss() {
      this.$emit("dismiss", false);
    },
  },
};
</script>

<style lang="scss">
.remind-dialog {
  .el-dialog__body {
    padding: 0 16px;
  }
}
</style>

<style scoped>
.table-container {
  height: 75vh;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
}

.dialog-footer {
  justify-content: flex-end;
}

.input-style {
  width: 0;
  flex: 1;
}

.search-comp-label {
  width: 120px;
}

.content {
  height: 75vh;
  overflow: hidden;
}

.tips-label {
  color: #afafaf;
  margin: 8px;
}
</style>
