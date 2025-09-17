<template>
  <div class="filed-uploader">
    <el-upload :class="uploadDisabled" :file-list="fileList" :action="actionUrl" list-type="picture-card"
      :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :accept="accept" :headers="headers"
      :limit="limit" :disabled="isDisabled" :on-success="onSuccess" :on-error="onError" :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth"
import { isImage, isPdf, isWord, isPpt, isExcel, isVideo, isZip } from "@/utils/tools"
import { flagToken } from "@/settings"
export default {
  name: 'FiledUploader',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    actionUrl: {
      type: String,
    },
    limit: {
      type: Number,
      default: 9
    },
    fileSize: {
      type: Number,
      default: 10
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    value: String
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      isUploading: false
    };
  },
  watch: {
    value: {
      handler(v, o) {
        this.initFileList(v)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    headers: function () {
      const token = getToken()
      const header = {}
      header[flagToken] = token
      return header
    },
    uploadDisabled: function () {
      return this.isDisabled || (this.fileList.length >= this.limit || this.isUploading) ? 'hidden-upload' : ''
    }
  },
  methods: {
    initFileList(value) {
      const fileList = [];
      if (!!value) {
        const urlList = value.split(',');
        urlList.forEach(item => {
          const tempArr = item.split('/');
          fileList.push({
            url: this.getTempUrl(item),
            sourceURL: item,
            name: tempArr[tempArr.length - 1],
          })
        })
      }
      this.$nextTick(() => {
        this.fileList = fileList;
      });
    },
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > this.fileSize) {
        this.$message.error({
          message: `上传文件大小不能超过${this.fileSize}M!`,
        });
        return false;
      }
      this.isUploading = true
      return true;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.refreshFileList(fileList);
    },
    handlePictureCardPreview(file) {
      if (!isImage(file.sourceURL)) {
        this.$confirm(`是否要下载文件【${file.name}】？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const link = document.createElement('a');
          link.style.display = 'none';
          const token = getToken()
          link.href = `${file.sourceURL}/${token}`;
          link.setAttribute('target', '_blank');
          if (!isPdf(file.sourceURL)) {
            // 预览
            link.setAttribute('download', this.getFileName(file.sourceURL))
          }

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
          .catch(() => {
            this.$message.info("已取消操作");
          });
        return
      }
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSuccess(res, file, fileList) {
      const { code, result } = res;
      if (code === 200 && (result.imageURL || result.fileURL)) {
        this.fileList = fileList
        delete file.response
        file.url = this.getTempUrl(result.imageURL ? result.imageURL : result.fileURL)
        file.sourceURL = result.imageURL ? result.imageURL : result.fileURL
        this.refreshFileList(fileList);
        this.$message({
          type: 'success',
          message: res.message
        });
      } else {
        this.fileList = fileList.filter(item => item.uid !== file.uid) || []
        this.$message({
          type: 'error',
          message: res.message
        });
      }
      this.isUploading = false
    },
    onError(err, file, fileList) {
      this.fileList = fileList.filter(item => item.uid !== file.uid)
      this.$message({
        type: 'error',
        message: err.message ? err.message : '上传失败'
      });
      this.isUploading = false
    },
    refreshFileList(fileList) {
      const fileResult = []
      fileList.forEach(item => {
        if (!!item.sourceURL) {
          fileResult.push(item.sourceURL)
        }
      })
      this.$emit('refresh', fileResult);
    },
    getTempUrl(url) {
      let resultUrl
      if (isPdf(url)) {
        resultUrl = require('../../assets/images/pdf.svg')
      } else if (isWord(url)) {
        resultUrl = require('../../assets/images/word.svg')
      } else if (isExcel(url)) {
        resultUrl = require('../../assets/images/excel.svg')
      } else if (isPpt(url)) {
        resultUrl = require('../../assets/images/ppt.svg')
      } else if (isVideo(url)) {
        resultUrl = require('../../assets/images/video.svg')
      } else if (isZip(url)) {
        resultUrl = require('../../assets/images/zip.svg')
      } else if (!isImage(url)) {
        resultUrl = require('../../assets/images/file.svg')
      } else {
        const token = getToken()
        resultUrl = url + '/' + token
      }
      return resultUrl
    },
    getFileName(path) {
      let arr = path.split('/')
      if (arr && arr.length > 0) {
        return arr[length - 1];
      }
      return path
    }

  }
}
</script>

<style lang="scss">
.filed-uploader {
  .hidden-upload .el-upload--picture-card {
    display: none !important;
  }

  // 去除动画
  .el-upload-list__item {
    transition: none !important;
  }
}
</style>