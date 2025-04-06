import { createApp } from 'vue'
import './style.css'
//引入清除样式
import './style/reset.scss'
import App from './App.vue'
//引入全局组件
import HospitalTop from './components/hospital_top/index.vue'
import HospitalBottom from './components/hospitai_bottom/index.vue'
//引入router核心插件并安装
import router from './router'
//引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入国际化文件
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//利用createApp方法创建并挂载实例
const app=createApp(App)
app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
//安装router
app.use(router)
//安装element-plus
app.use(ElementPlus,{
    locale: zhCn,
})
//挂载
app.mount('#app')
