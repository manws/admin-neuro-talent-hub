<template>
    <div class="flex-style-base">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.type"></el-tab-pane>
        </el-tabs>
        <div class="flex-style-base right-layout">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommonTab",
    props: {
        tabs: Array,
    },
    data() {
        return {
            activeName: "",
        };
    },
    mounted() {
        if (this.tabs && this.tabs.length > 0) {
            this.activeName = this.tabs[0].type;
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>
<style scoped>
.right-layout {
    height: 41px;
    margin-bottom: 15px;
    border-bottom: solid 2px #e2e5eb;
    flex-grow: 1;
    justify-content: flex-end;
}
</style>
