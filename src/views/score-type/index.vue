<template>
  <ComponentsContainer>
    <div class="flex-style-column content-container">
      <div class="flex-style-base header-container">
        <search-comp @search="handleSearch" :stateMap="stateMap"></search-comp>
        <div class="flex-style-base">
          <div class="btn-add" @click="handleAdd" style="margin: 0 6px">
            <i class="el-icon-circle-plus"></i>
            <span style="margin-left: 4px">新增</span>
          </div>
          <TableColumnSelect v-model="disPlayField" :columns="this.head" name="fieldName">
            <div class="btn-select">
              <i class="el-icon-s-grid"></i>
            </div>
          </TableColumnSelect>
        </div>
      </div>

      <div class="table-container">
        <el-table ref="table" :data="tableData" style="width: 100%" height="calc(100%)" v-loading="listLoading"
          element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" @sort-change="handleSortChange">
          <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
          <el-table-column prop="operation" label="记录操作" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div class="flex-style-base" style="justify-content: space-around">
                <div v-if="scope.row.state < 2" class="btn-text" @click="openDrawer(scope.row)">编辑内容</div>
                <div v-else="scope.row.state < 2">无</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="140" fixed="right">
            <template slot-scope="scope">
              <div class="flex-style-base" style="justify-content: space-around">
                <div class="btn-text" @click="handleOp(scope.row, 2)">发布</div>
                <div class="btn-text" @click="handleOp(scope.row, 10)">结束</div>
                <div class="btn-text" @click="handleOp(scope.row, 99)">删除</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(column, index) in columns" sortable="custom" :key="index" :prop="column.fieldCode"
            :label="column.fieldName" align="center" :minWidth="column.minWidth">
            <template slot-scope="scope">
              <span v-if="column.fieldCode === 'enabled'"
                :style="{ color: scope.row.enabled === 0 ? 'red' : 'green' }">{{
                  scope.row.enabled === 0 ? "未激活" : "已激活" }}</span>
              <span v-else-if="column.fieldCode.indexOf('level') === 0">{{ scope.row[column.fieldCode] === 1 ? "考核" :
                "不考核" }}</span>
              <span v-else-if="column.fieldCode === 'state'">{{ stateMap[scope.row.state] }}</span>
              <span v-else>{{ scope.row[column.fieldCode] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-style-base" style="justify-content: flex-end">
        <CommonPagination :total="page.totalCount" :pagesize="param.pageSize" :current="param.pageIndex"
          @onSizeChange="handlePageSizeChange" @onCurrentChange="handleCurrentPageChange">
        </CommonPagination>
      </div>
    </div>
    <OpDialog ref="opDlg" @refresh="initData" :stateMap="stateMap"></OpDialog>
    <EditDrawer ref="drawer"></EditDrawer>
  </ComponentsContainer>
</template>

<script>
import { columnsWidth } from "@/utils/tools.js";
import ComponentsContainer from "_c/Common/ComponentsContainer";
import CommonPagination from "_c/Common/CommonPagination";
import TableColumnSelect from "_c/Common/TableColumnSelect";
import OpDialog from "./OpDialog";
import SearchComp from "./SearchComp";
import EditDrawer from "./EditDrawer";

import service from "./service.js";
export default {
  name: "User",
  components: {
    ComponentsContainer,
    CommonPagination,
    TableColumnSelect,
    SearchComp,
    OpDialog,
    EditDrawer
  },
  data() {
    return {
      showAdvanceDialog: false,
      listLoading: true,
      scoreTypeList: [],
      tableData: [],
      param: {
        pageIndex: 1,
        pageSize: 50,
        orderTypeId: 0,
        orderFieldCode: "",
        subOn: null,
        scoreTypeName: "",
      },
      head: service.head,
      page: {},
      disPlayField: [], // 显示的列
      stateMap: {
        0: '新增成功',
        1: '生成评分表',
        2: '发布成功',
        10: '评分结束',
        99: '删除评分'
      }
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    columns: function () {
      // 显示的表头
      // 通过筛选的方法找到应该显示的Field
      let displayColumnsArr = this.head.filter((item) =>
        this.disPlayField.find((fieldCode) => fieldCode === item.fieldCode)
      );
      return columnsWidth(
        displayColumnsArr,
        this.tableData == null ? [] : this.tableData,
        "fieldCode",
        "fieldName"
      );
    },
  },
  watch: {
    columns(v, o) {
      this.$nextTick(() => {
        this.$refs.table.doLayout();
      });
    },
  },
  methods: {
    async initData() {
      this.listLoading = true;
      const { scoreTypeList, page } =
        await service.getScoreTypeList(this.param);
      this.tableData = scoreTypeList;
      this.page = page;
      this.listLoading = false;
    },
    async openDrawer(row) {
      this.$refs.drawer.openDrawer(row)

    },
    async refreshData() {
      this.listLoading = true;
      const { scoreTypeList, page } =
        await service.getScoreTypeList(this.param);
      this.tableData = scoreTypeList;
      this.page = page;
      this.listLoading = false;
    },
    handleSearch(obj) {
      // 搜索内容区发生变化
      let { pageSize, orderTypeId, orderFieldCode } = this.param;
      this.param = Object.assign({ pageIndex: 1, pageSize, orderTypeId, orderFieldCode }, obj);
      this.refreshData();
    },
    handlePageSizeChange(val) {
      // 每页数量改变
      // 那就要从第一页开始
      this.param.pageIndex = 1;
      this.param.pageSize = val;
      this.refreshData();
    },
    handleCurrentPageChange(val) {
      // 页码改变
      this.param.pageIndex = val;
      this.refreshData();
    },
    handleAdd() {
      this.$refs.opDlg.show();
    },
    handleExport() {
      this.$confirm("是否确定导出当前内容？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.service.userExport();
      }).catch(() => {
        this.$message.info("已取消操作");
      });
    },
    handleOp(row, state) {
      let text = ''
      if (state == 2) {
        text = '发布'
      } else if (state == 10) {
        text = '结束'
      } else if (state == 99) {
        text = '删除'
      }
      this.$confirm(`是否确定执行【${text}】操作？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const updateSuccess = await service.updateState(row.id, state);
        if (updateSuccess) {
          this.refreshData();
        }
      }).catch(() => {
        this.$message.info("已取消操作");
      });

    },
    handleResetPwd(row) {
      this.$refs.resetPwdDlg.show(row);
    },
    handleSortChange(sort) {
      if (sort.order == null) {
        this.param.orderFieldCode = "";
        this.refreshData();
        return;
      }
      this.param.orderFieldCode = sort.prop;
      this.param.orderTypeId = sort.order == "ascending" ? 0 : 1;
      this.param.pageIndex = 1;
      this.refreshData();
    },
  },
};
</script>

<style scoped lang="scss">
.content-container {
  height: 0;
  flex: 1;

  .header-container {
    justify-content: space-between;
    margin: 12px;
    overflow: hidden;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.15);
  }

  .select-area {
    min-width: 180px;
    justify-content: flex-end;
    overflow: auto;
    height: 50px;
  }

  .icon-style {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    color: #409eff;
    user-select: none;
  }

  .icon-style:hover {
    color: #0099ff;
  }
}

.table-container {
  width: calc(100% - 20px);
  height: 0;
  flex-grow: 1;
  margin: 0 10px;
  border-bottom: none;
  border-radius: 4px;
  padding-top: 4px;
}
</style>
