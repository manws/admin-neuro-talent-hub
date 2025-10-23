const path = require("path")
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === "production" ? "./" : ""
const proxyHost = 'http://39.97.242.35:11032/'

module.exports = {
    outputDir: "admin-neuro-talent-hub",
    publicPath: "",
    indexPath: "./index.html",

    chainWebpack: (config) => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("_c", resolve("src/components"))
            .set("_a", resolve("assets"))

        config.module.rule("svg").exclude.add(resolve("src/icons")).end()
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end()
    },

    // 设为false打包时不生成.map文件
    productionSourceMap: false,

    //process.env.NODE_ENV === 'development', // process.env.NODE_ENV === 'development'
    lintOnSave: false,

    devServer: {
        host: "0.0.0.0",
        port: 8040,
        open: true,
        hotOnly: false,
        proxy: proxyHost,
    },
    css: {
        // 只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块，设置为false则会去掉.module
        requireModuleExtension: true,
        loaderOptions: {
            // 可全局使用 variables.scss 中的变量
            sass: {
                prependData: `@import "@/styles/variables.scss";`
            }
        }
    }
}
