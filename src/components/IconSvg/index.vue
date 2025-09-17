<!-- 多色图标组件 -->
<template>
    <svg class="iconfont-svg" aria-hidden="true" :style="styles">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: "IconSvg",
    props: {
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 16,
        },
    },
    computed: {
        iconName() {
            return `#icon-${this.icon}`;
        },
        styles() {
            return {
                fontSize: `${this.size}px`,
            };
        },
    },
};
</script>

<style></style>
