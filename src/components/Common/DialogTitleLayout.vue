<template>
    <div class="flex-style-base">
        <h4 style="flex-grow: 1; font-size: 1.2rem">{{ title }}</h4>
        <el-tooltip class="item" effect="dark" :content="!fullscreen ? '全屏' : '退出全屏'" placement="bottom">
            <icon-font class="fullscreen-style" :icon="!fullscreen ? 'full-screen' : 'shrink'"
                       @click.native="toggleFullscreen" />
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: "DialogTitleLayout",
    props: {
        title: String,
        fullscreen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    methods: {
        toggleFullscreen() {
            this.$emit("fullscreen");
        },
    },
};
</script>

<style scoped>
.fullscreen-style {
    margin-right: 2.5rem;
    cursor: pointer;
}
</style>
