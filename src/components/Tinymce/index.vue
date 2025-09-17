<template>
    <div class="tinymce-container" :class="{ fullscreen: fullscreen }" :style="{ width: containerWidth }">
        <textarea :id="tinymceId" class="tinymce-textarea" />
        <div v-if="false" class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" :uploadObj="uploadObj"
                         @successCBK="imageSuccessCBK" />
        </div>
    </div>
</template>

<script>
import config from "./config";
import editorImage from "./components/EditorImage";
import load from "./dynamicLoadScript";

// 中文文档   http://tinymce.ax-z.cn/configure/file-image-upload.php
const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce@5.7.1/tinymce.min.js";
const tinymceLang =
    "https://cdn.jsdelivr.net/gh/wt-sml/wutong_cdn/js/tinymce-lang-zh@5.2.2.js";

export default {
    name: "Tinymce",
    components: { editorImage },
    props: {
        id: {
            type: String,
            default: function () {
                return "vue-tinymce";
            },
        },
        value: {
            type: String,
            default: "",
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return [];
            },
        },
        menubar: {
            type: String,
            default: "file edit insert view format table",
        },
        height: {
            type: [Number, String],
            required: false,
            default: 360,
        },
        width: {
            type: [Number, String],
            required: false,
            default: "auto",
        },
        isEditable: {
            type: Boolean,
            default: true,
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
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
        };
    },
    computed: {
        containerWidth() {
            const width = this.width;
            if (/^[\d]+(\.[\d]+)?$/.test(width)) {
                // matches `100`, `'100'`
                return `${width}px`;
            }
            return width;
        },
    },
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() =>
                    window.tinymce.get(this.tinymceId).setContent(val || "")
                );
            }
        },
    },
    mounted() {
        this.init();
    },
    activated() {
        if (window.tinymce) {
            this.initTinymce();
        }
    },
    deactivated() {
        this.destroyTinymce();
    },
    destroyed() {
        this.destroyTinymce();
    },
    methods: {
        init() {
            // dynamic load tinymce from cdn
            load(tinymceCDN, (err) => {
                if (err) {
                    this.$message.error(err.message);
                    return;
                }
                this.initTinymce();
            });
        },
        initTinymce() {
            console.log(window.tinymce);
            const _this = this;
            window.tinymce.init({
                selector: `#${this.tinymceId}`,
                ...config,
                height: this.height,
                menubar: this.menubar, // 菜单栏的配置
                readonly: !_this.isEditable, // 是否只读
                language: "zh_CN",
                language_url: "/tinymce/langs/zh_CN.js", //tinymceLang,
                content_css: "/tinymce/index.css",
                images_upload_url: "/demo/upimg.php", // 服务器地址，用来上传图片，不设置不可上传本地图片
                imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
                init_instance_callback: (editor) => {
                    if (_this.value) {
                        editor.setContent(_this.value);
                    }
                    _this.hasInit = true;
                    editor.on("NodeChange Change KeyUp SetContent", () => {
                        this.hasChange = true;
                        this.$emit("input", editor.getContent());
                    });
                },
                setup(editor) {
                    editor.on("FullscreenStateChanged", (e) => {
                        _this.fullscreen = e.state;
                    });
                },
                convert_urls: false,
                file_picker_types: "file image media",
                file_picker_callback: function (callback, value, meta) {
                    //文件分类
                    var filetype =
                        ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
                    //后端接收上传文件的地址
                    var upurl = "/demo/upfile.php";
                    //为不同插件指定文件类型及后端地址
                    switch (meta.filetype) {
                        case "image":
                            filetype = ".jpg, .jpeg, .png, .gif";
                            upurl = "upimg.php";
                            break;
                        case "media":
                            filetype = ".mp3, .mp4";
                            upurl = "upfile.php";
                            break;
                        case "file":
                        default:
                    }
                    //模拟出一个input用于添加本地文件
                    var input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", filetype);
                    input.click();
                    input.onchange = function () {
                        var file = this.files[0];

                        var xhr, formData;
                        console.log(file.name);
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open("POST", upurl);
                        xhr.onload = function () {
                            var json;
                            if (xhr.status != 200) {
                                failure("HTTP Error: " + xhr.status);
                                return;
                            }
                            json = JSON.parse(xhr.responseText);
                            if (!json || typeof json.location != "string") {
                                failure("Invalid JSON: " + xhr.responseText);
                                return;
                            }
                            callback(json.location);
                        };
                        formData = new FormData();
                        formData.append("file", file, file.name);
                        xhr.send(formData);

                        //下方被注释掉的是官方的一个例子
                        //放到下面给大家参考

                        /*var reader = new FileReader();
                      reader.onload = function () {
                          // Note: Now we need to register the blob in TinyMCEs image blob
                          // registry. In the next release this part hopefully won't be
                          // necessary, as we are looking to handle it internally.
                          var id = 'blobid' + (new Date()).getTime();
                          var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                          var base64 = reader.result.split(',')[1];
                          var blobInfo = blobCache.create(id, file, base64);
                          blobCache.add(blobInfo);

                          // call the callback and populate the Title field with the file name
                          callback(blobInfo.blobUri(), { title: file.name });
                      };
                      reader.readAsDataURL(file);*/
                    };
                },
                images_upload_handler(blobInfo, success, failure, progress) {
                    progress(0);
                    const token = _this.$store.getters.token;
                    setTimeout(() => {
                        console.log(blobInfo);
                        progress(100);
                        success(
                            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3832721317,312397218&fm=26&gp=0.jpg"
                        );
                    }, 1000);
                },
            });
        },
        destroyTinymce() {
            const tinymce = window.tinymce.get(this.tinymceId);
            if (this.fullscreen) {
                tinymce.execCommand("mceFullScreen");
            }

            if (tinymce) {
                tinymce.destroy();
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent();
        },
        imageSuccessCBK(arr) {
            arr.forEach((v) =>
                window.tinymce
                    .get(this.tinymceId)
                    .insertContent(`<img class="wscnph" src="${v.url}" >`)
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.tinymce-container {
    position: relative;
    line-height: normal;
}

.tinymce-container {
    ::v-deep {
        .mce-fullscreen {
            z-index: 10000;
        }
    }
}

.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}

.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 2005;
}

.fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
}

.editor-upload-btn {
    display: inline-block;
}
</style>
