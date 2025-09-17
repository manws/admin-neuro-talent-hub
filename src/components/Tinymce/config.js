export default {
    plugins: [
        "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
    ],
    toolbar: [
        "searchreplace bold italic underline strikethrough bullist numlist alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
        "formatselect fontselect fontsizeselect forecolor backcolor hr link image charmap preview anchor pagebreak insertdatetime media table emoticons fullscreen",
    ],
    font_formats:
        "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
    placeholder: "在这里输入内容",
    statusbar: true, // 底部状态栏
    body_class: "panel-body ", // 图片和表格是否开启在编辑器内部缩放
    object_resizing: false,
    custom_undo_redo_levels: 10, //撤销次数
    end_container_on_empty_block: true, // 如果在空的内部块元素中按enter键，则此选项允许您拆分当前容器块元素
    powerpaste_word_import: "clean",
    advlist_bullet_styles: "square",
    advlist_number_styles: "default",
    default_link_target: "_blank",
    link_title: false,
    nonbreaking_force_tab: true,
    branding: false,
    // inline: true, //开启内联模式   内容完全继承自外层定义的样式，真正实现了"所见即所得"  TODO 显示异常，暂时注释掉
}
