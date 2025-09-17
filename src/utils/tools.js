export const forEach = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    const len = arr.length
    while (++i < len) {
        const item = arr[i]
        fn(item, i, arr)
    }
}

/**
 * 比较columns 和 dataList每一列文字的最大长度,并添加minWidth
 */
export const columnsWidth = (columns, dataList, code, title, isSort) => {
    // 第一步,先遍历dataList获取最大的长度,保存到一个数组arr里面去
    forEach(columns, (item, i, columns) => {
        const key = item[code]
        // title的长度
        let titleLength = 0
        // 先获取表头长度,字母和字符以及数字算半个汉字,汉字算一个
        for (let i = 0; i < item[title].length; i++) {
            const ch = item[title][i]
            if (checkChar(ch)) {
                titleLength += 0.5
            } else {
                titleLength += 1
            }
        }
        forEach(dataList, (dataItem, index, dataList) => {
            let valueLength = 0
            // 判断value是否为空,不为空获取value的长度
            if (dataItem[key]) {
                for (let i = 0; i < String(dataItem[key]).length; i++) {
                    const ch = String(dataItem[key])[i]
                    if (checkChar(ch)) {
                        valueLength += 0.5
                    } else {
                        valueLength += 1
                    }
                }
            }

            // 比较title和value的长度,将最大长度赋值给titleLength
            titleLength = Math.max(titleLength, valueLength)
        });
        item.minWidth = 60 + titleLength * 15;
        // 如果是操作按钮或者有自定义控件的多加一点
        if (item.hasOwnProperty("slot")) {
            // item.minWidth = 80 + titleLength * 10
        }

        if (item.type === "index") {
            item.minWidth = 70
            item.width = 70
        } else if (item.slot === "operation") {
            if (!item.width) {
                item.width = 100
            }
        } else if (!item.slot && isSort) {
            item.sortable = "custom"
        }
    })
    // 这一步的处理是为了返回一个新的数组,因为columns长度没变话组件不会自动刷新
    columns = columns.concat([])
    return columns
}

function checkChar(str) {
    var reg = /^[0-9a-zA-Z@!~%.^&*-_]+$/
    if (reg.test(str)) {
        return true
    }
    return false
}

export const isMobile = value => {
    return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)
}

export const isEmail = value => {
    var reg = /^([a-zA-Z0-9_]-*\.*)+@([a-zA-Z0-9_]-?)+(\.[a-zA-Z]{2,3}){1,2}$/
    return reg.test(value)
}

export const isImage = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
}

export const isPdf = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['pdf'].indexOf(ext.toLowerCase()) !== -1;
}

export const isWord = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['doc', 'docx'].indexOf(ext.toLowerCase()) !== -1;
}

export const isPpt = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['ppt', 'pptx'].indexOf(ext.toLowerCase()) !== -1;
}

export const isExcel = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['xls', 'xlsx'].indexOf(ext.toLowerCase()) !== -1;
}

export const isVideo = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['mp4', 'm2v', 'mkv'].indexOf(ext.toLowerCase()) !== -1;
}

export const isAudio = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['avi', 'flv', 'mpg', 'mp3', 'wav', 'wmv'].indexOf(ext.toLowerCase()) !== -1;
}

export const isZip = path => {
    //获取最后一个.的位置
    var index= path.lastIndexOf('.');
    //获取后缀
    var ext = path.substr(index + 1);
    return ['zip', 'rar', '7z'].indexOf(ext.toLowerCase()) !== -1;
}