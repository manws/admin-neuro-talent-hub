<template>
    <div class="flex-style-base operation-btn" @mouseover="iconColor = '#0c97ee'" @mouseleave="iconColor = '#5c6b77'"
         @click="onClick">
        <icon-font v-if="icon" :style="{ color: iconColor }" :icon="icon" :size="size" />
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
    name: "CommonOperaBtn",
    props: {
        name: String,
        size: {
            type: Number,
            default: 18,
        },
        icon: {
            type: String,
            default: "question-mark",
        },
    },
    data() {
        return {
            iconColor: "#5c6b77",
        };
    },
    methods: {
        onClick() {
            this.$emit("onclick");
        },
    },
};
</script>

<style scoped>
.operation-btn {
    padding: 4px 6px;
    border: solid #8a8a8a 1px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 6px;
}

.operation-btn p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 6px;
}

.operation-btn:hover {
    border: solid #0c97ee 1px;
    border-radius: 4px;
    color: #0c97ee;
    background-color: rgba(12, 151, 238, 0.05);
}

.operation-btn:active {
    background-color: #f2f2f2;
}
</style>
