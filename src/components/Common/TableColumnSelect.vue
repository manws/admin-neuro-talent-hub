<template>
    <el-dropdown trigger="click">
        <slot />
        <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="list" :style="{ 'max-height': height + 'px' }"
                               class="flex-style-column checkbox-container" @change="handleChange">
                <el-checkbox v-for="(item, index) in columns" :key="index" class="checkbox-style"
                             :label="item[flag]">{{ item[name] }}</el-checkbox>
            </el-checkbox-group>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: "TableColumnSelect",
    props: {
        columns: Array, // 初始数据源
        height: {
            type: Number,
            default: 300,
        },
        name: {
            type: String,
            default: "fieldName", // 显示的名字
        },
        flag: {
            type: String,
            default: "fieldCode", // 选中的标识
        },
        selectedList: [Array, Object], // 被选中的项
    },
    model: {
        prop: "selectedList",
        event: "selected",
    },
    data() {
        return {
            list: [],
        };
    },
    watch: {
        columns: {
            handler(v, o) {
                if (v) {
                    let keyArr = [];
                    this.list.length = 0;
                    v.forEach((item, index) => {
                        if (!item.skip) {
                            this.list.push(item[this.flag]);
                        }
                    });
                    this.$emit("selected", this.list);
                }
            },
            immediate: true,
        },
    },
    methods: {
        handleChange(val) {
            this.$emit("selected", this.list);
        },
    },
};
</script>

<style scoped>
.checkbox-container {
    overflow: auto;
}

.checkbox-style {
    padding: 6px 16px;
}
</style>
