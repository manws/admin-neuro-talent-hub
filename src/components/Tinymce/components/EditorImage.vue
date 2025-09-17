<template>
    <div class="upload-container">
        <el-button :style="{ background: color, borderColor: color }" icon="el-icon-upload" size="mini" type="primary"
                   @click="dialogVisible = true">
            上传
        </el-button>
        <el-dialog :visible.sync="dialogVisible" title="上传图片">
            <el-upload :multiple="true" :file-list="fileList" :show-file-list="true" :on-remove="handleRemove"
                       :on-success="handleSuccess" :before-upload="beforeUpload" class="editor-slide-upload"
                       :action="uploadObj.action" :headers="uploadObj.headers" :data="uploadObj.data"
                       list-type="picture-card">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div class="flex-style-base" style="justify-content: flex-end">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "EditorSlideUpload",
    props: {
        color: {
            type: String,
            default: "#1890ff",
        },
        uploadObj: {
            type: Object,
            default: () => {
                return {
                    action: "", // 请求地址
                    headers: {}, // 请求头
                    data: {}, // 请求额外参数
                };
            },
        },
    },
    data() {
        return {
            dialogVisible: false,
            listObj: {},
            fileList: [],
        };
    },
    methods: {
        checkAllSuccess() {
            console.log(this.listObj);
            return Object.keys(this.listObj).every(
                (item) => this.listObj[item].hasSuccess
            );
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map((v) => this.listObj[v]);
            if (!this.checkAllSuccess()) {
                this.$message(
                    "请等待所有图片附件上传成功，如果存在网络异常问题, 请刷新界面重新上传！"
                );
                return;
            }
            this.$emit("successCBK", arr);
            this.listObj = {};
            this.fileList = [];
            this.dialogVisible = false;
        },
        handleSuccess(response, file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = response.files.file;
                    this.listObj[objKeyArr[i]].hasSuccess = true;
                    return;
                }
            }
        },
        handleRemove(file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]];
                    return;
                }
            }
        },
        beforeUpload(file) {
            const _self = this;
            const _URL = window.URL || window.webkitURL;
            const fileName = file.uid;
            this.listObj[fileName] = {};
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function () {
                    _self.listObj[fileName] = {
                        hasSuccess: false,
                        uid: file.uid,
                        width: this.width,
                        height: this.height,
                    };
                };
                resolve(true);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
    margin-bottom: 20px;
    ::v-deep .el-upload--picture-card {
        width: 100%;
    }
}
</style>
