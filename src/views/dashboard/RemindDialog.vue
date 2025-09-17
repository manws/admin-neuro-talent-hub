<template>
  <el-dialog title="访视提醒" class="remind-dialog" :visible.sync="dialogVisible" top="5vh" width="1200px" append-to-body
    @close="dismiss" :close-on-click-modal="false">
    <div class="line"></div>
    <div class="table-container">
      <el-table ref="table" :data="tableData" style="width: 100%" height="calc(100%)" v-loading="listLoading"
        element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
        <!-- @sort-change="handleSortChange" -->
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
        <el-table-column v-for="(column, index) in head" :key="index" :prop="column.fieldCode" :label="column.fieldName"
          align="center" :minWidth="column.minWidth">
          <template slot-scope="scope">
            <span v-if="column.fieldCode === 'subjectCode' &&
              scope.row[column.fieldCode] !== 'N/A'
              " class="btn-text" @click="toVisitProcess(scope.row)">
              {{ scope.row[column.fieldCode] }}
            </span>
            <span v-else>{{ scope.row[column.fieldCode] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="flex-style-base dialog-footer">
      <!-- <div class="btn-cancel" @click="dismiss" style="margin: 0 6px">
        <span style="margin-left: 4px">取消</span>
      </div> -->
      <div class="flex-style-base" style="justify-content: flex-end">
        <CommonPagination :total="page.totalCount" :pagesize="param.pageSize" :current="param.pageIndex"
          @onSizeChange="handlePageSizeChange" @onCurrentChange="handleCurrentPageChange">
        </CommonPagination>
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
      param: {
        siteName: "",
        visitName: "",
        pageIndex: 1,
        pageSize: 50,
      },
      head: service.head,
      page: {},
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
      const { remindList, page } = await this.service.remindList(this.param);
      this.tableData = remindList;
      this.page = page;
      this.listLoading = false;
    },
    dismiss() {
      this.$emit("dismiss", false);
    },
    toVisitProcess(val) {
      this.dismiss();
      const { subjectCode } = val;
      this.$router.push({
        name: "crfSummary",
        params: { subjectCode },
        query: { subjectCode },
      });
    },
    handlePageSizeChange(val) {
      // 每页数量改变
      // 那就要从第一页开始
      this.param.pageIndex = 1;
      this.param.pageSize = val;
      this.initData();
    },
    handleCurrentPageChange(val) {
      // 页码改变
      this.param.pageIndex = val;
      this.initData();
    },
    handleSortChange(sort) {
      if (sort.order == null) {
        this.param.orderFieldCode = "";
        this.initData();
        return;
      }
      this.param.orderFieldCode = sort.prop;
      this.param.orderTypeId = sort.order == "ascending" ? 0 : 1;
      this.param.pageIndex = 1;
      this.initData();
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
</style>
