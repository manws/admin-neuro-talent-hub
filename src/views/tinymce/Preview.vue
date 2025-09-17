<template>
    <el-dialog :show-close="false" :visible.sync="isVisible" width="70%" :title="html.title" center>
        <div class="flex-style-base" style="justify-content: center">
            <span>创建人：{{ html.author }}</span>
            <span style="
          width: 1px;
          height: 15px;
          margin: 0 16px;
          background-color: rgba(0, 0, 0, 0.05);
        "></span>
            <span>创建时间：{{ createTime }}</span>
        </div>
        <div v-html="html.content" class="pre-class"></div>

        <!-- 关闭按钮 -->
        <i class="el-icon-close icon-class" @click="isVisible = false"></i>
    </el-dialog>
</template>

<script>
import moment from "moment";
export default {
    computed: {
        createTime: function () {
            return moment(this.html.display_time).format("YYYY-MM-DD HH:mm:ss");
        },
    },
    props: {
        html: {
            type: [String, Object],
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            isVisible: false,
        };
    },
    mounted() {},
    methods: {},
};
</script>

<style scoped lang="scss">
.icon-class {
    position: fixed;
    top: 24px;
    right: 24px;
    font-size: 28px;
    color: white;
    cursor: pointer;
}

.pre-class {
    padding: 0 32px;
    margin-top: 16px;
    word-wrap: break-word;
    white-space: pre-wrap;
    min-height: calc(50vh);
}
</style>
