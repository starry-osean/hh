<template>
  <div class="search">
        <el-autocomplete class="inline-input w-50"
        clearable placeholder="请输入"   v-model="hosname"  :fetch-suggestions="fetchData" :trigger-on-focus="false" @select="goDetail"> 
        </el-autocomplete>
        <div class="mb-4">
            <el-button type="primary" :icon="Search">搜索</el-button>
            <!--组件加冒号-->
        </div>
  </div>
</template>
<script lang="ts" setup>
    //引入提供的图标
    import {Search} from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import {reqHospitalInfo} from '../../../api/home'
    import type{HospitalInfo} from '../../../api/home/type'
    import { useRouter } from 'vue-router'
    let $router=useRouter()
    let hosname=ref<string>('')
      //顶部组件回调
    const fetchData=async(keyword:string,cb:any)=>{
        //输入一次关键字执行函数一次，发请求获数据
        let result:HospitalInfo=await reqHospitalInfo(keyword)
        
        //整理数据为组件需要数据格式
        let showData=result.data.map(item=>{
            
            return {
                value:item.hosname,
                hoscode:item.hoscode
            }
        })
        //展示组件提供的户数
        cb(showData)
        
    }
    const goDetail=(item:any)=>{
        $router.push({path:'/hospital/register'})
    }
</script>
<script lang="ts">
    export default {
        name : 'Search'
    }
</script>
<style lang="scss" scoped>
    .search{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        //深度选择器
         ::v-deep(.el-input_wrapper){
                width: 600px;
                margin-right: 10px;
        }
    }
</style>