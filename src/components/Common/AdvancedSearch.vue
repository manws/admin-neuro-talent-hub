<template>
    <div class="flex-style-base advanced-search">
        <div class="flex-style-column">
            <div class="flex-style-base" v-for="(search, index) in searchList" :key="index">
                <el-select v-model="search.fieldCode" style="width: 160px" @change="onLabelSelect(search, $event)">
                    <el-option v-for="item in labelList" :key="item.fieldCode" :label="item.fieldName"
                        :value="item.fieldCode"></el-option>
                </el-select>

                <el-select v-model="search.reg" style="width: 100px" :disabled="!search.fieldCode">
                    <el-option v-for="item in getRegList(search.field ? search.field.fieldTypeId : '')" :value="item.value"
                        :label="item.label" :key="item.value"></el-option>
                </el-select>

                <el-select v-if="getType(search.field) === ''" style="width: 200px" value="" :disabled="true"></el-select>

                <el-select v-if="getType(search.field) === 'select-multiple'" v-model="search.value" multiple collapse-tags
                    style="width: 200px" :disabled="!search.reg && search.reg !== 0">
                    <el-option v-for="item in codegroup[search.fieldCode]" :value="item.codeId" :label="item.codeValue1"
                        :key="item.codeId"></el-option>
                </el-select>
                <el-input-number v-else-if="getType(search.field) === 'input-number'" v-model="search.value"
                    :disabled="!search.reg && search.reg !== 0" style="width: 200px"></el-input-number>
                <el-input v-else-if="getType(search.field) === 'input-text'" v-model="search.value" placeholder="请输入"
                    style="width: 200px" :disabled="!search.reg && search.reg !== 0" />
                <el-date-picker v-else-if="getType(search.field) === 'date-picker'" type="date" v-model="search.value"
                    placeholder="请选择" style="width: 200px" :disabled="!search.reg && search.reg !== 0"></el-date-picker>
            </div>
        </div>

        <div class="flex-style-base">
            <el-button-group shape="circle" style="margin-left: 10px; min-width: 120px">
                <el-button type="success" @click="add"><i class="el-icon-plus"></i></el-button>
                <el-button type="success" style="background-color: #ffb2ac; border: solid 1px #ffb2ac"><i
                        class="el-icon-minus" @click="remove"></i></el-button>
            </el-button-group>

            <el-button type="primary" @click="reset" style="margin: 0 10px">重置</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdvancedSearch",
    data() {
        return {
            searchList: [],
        };
    },
    props: {
        codegroup: [Array, Object],
        labelList: [Array, Object],
    },
    mounted() {
        this.searchList.push({});
    },
    methods: {
        getRegList(type) {
            if (type === 6 || type === 7 || type === 8) {
                return [
                    {
                        label: "包含",
                        value: 5,
                    },
                    {
                        label: "不包含",
                        value: 6,
                    },
                ];
            } else if (type === 2 || type === 3) {
                return [
                    {
                        label: "等于",
                        value: 2,
                    },
                    {
                        label: "不等于",
                        value: 4,
                    },
                    {
                        label: "模糊",
                        value: 7,
                    },
                ];
            } else if (type === 1 || type === 4 || type === 5) {
                return [
                    {
                        label: "小于",
                        value: 1,
                    },
                    {
                        label: "等于",
                        value: 2,
                    },
                    {
                        label: "大于",
                        value: 3,
                    },
                    {
                        label: "不等于",
                        value: 4,
                    },
                ];
            }
        },
        getType(field) {
            if (!field) return "";
            let type = field.fieldTypeId;
            // 类似没有单选的情况哦
            if (type === 6 || type === 7 || type === 8) {
                return "select-multiple";
            } else if (type === 1) {
                return "input-number";
            } else if (type === 2 || type === 3) {
                return "input-text";
            } else if (type === 4) {
                return "date-picker";
            }

            return "";
        },
        onLabelSelect(search, fieldCode) {
            this.labelList.forEach((obj) => {
                if (fieldCode === obj.fieldCode) {
                    this.$set(search, "field", obj);
                }
            });
            this.$set(search, "reg", "");
            this.$set(search, "value", null);
        },
        add() {
            if (this.searchList.length === 3) {
                this.$message({
                    message: "最多只能添加三个选择项",
                    type: "warning",
                });
            } else {
                this.searchList.push({});
            }
        },
        remove() {
            if (this.searchList.length < 2) {
                this.$message({
                    message: "不能再少了",
                    type: "warning",
                });
            } else {
                // 删除最后一个元素
                this.searchList.pop();
            }
        },
        reset() {
            this.searchList = [];
            this.searchList.push({});
            this.$emit("search", {});
        },
        search() {
            let obj = {};
            this.searchList.forEach((item) => {
                if (
                    item.fieldCode &&
                    item.reg &&
                    item.value &&
                    (item.value > 0 || item.value.length > 0)
                ) {
                    obj[item.fieldCode] = item.reg + "|" + String(item.value);
                }
            });
            this.$emit("search", obj);
        },
    },
};
</script>

<style scoped>
.advanced-search {
    align-items: flex-start;
    flex-wrap: nowrap;
    overflow: hidden;
}
</style>
