/**
 * 用来注册全局组件
 */

import Vue from "vue"
// 引入全局的常用组件
import "_c/Common"

import "@/assets/iconfont/iconfont.css"
import "@/assets/iconfont/iconfont.js"
import IconFont from "@/components/IconFont"
import IconSvg from "@/components/IconSvg"
Vue.component("icon-font", IconFont)
Vue.component("icon-svg", IconSvg)
