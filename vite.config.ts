import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
//引入node提供内置模块path：获取绝对路径
import path from 'path'
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  //用于配置服务器代理的代码片段，
  server:{
    proxy:{
      '/api':{
        target:'http://syt.atguigu.cn',
        changeOrigin:true,
      }
    }
    
  }
})
