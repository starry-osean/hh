<template>
    <div class="home">
        <!--首页轮播图-->
         <Carousel/>
         <!--首页搜索表单-->
         <Search/>
         <!--展示医院结构-->
         <el-row gutter="20">
            <el-col :span="20">
                <!--等级组件-->
                <Leve @getLevel="getLevel"/>
                <!--地区组件-->
                <Local @getRegion="getRegion"/>
                <!--医院卡片-->
                <div class="hospital" >
                    <Card class="item" v-for="(item,index) in hasHospitalArr" :key="index" :hospitalInfo="item"/>
                </div>
                <el-empty description="暂无数据" />
                <!--分页器-->
                <el-pagination
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        :background="true"
                        layout="prev, pager, next,jumper,->,sizes,total"
                        :total="total"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        /><!--可以顶到最右侧-->
            </el-col>
            <el-col :span="4">
                <Tip/>
            </el-col>
         </el-row>
    </div>
</template>
<script lang="ts" setup name="home">
//引入组合式API函数
import { onMounted,ref } from 'vue'
import { reqHospital } from '../../api/home'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Leve from './level/index.vue'
import Local from'./local/index.vue'
import Card from"./card/index.vue"
import type { Content, HospitalResponseData  } from '../../api/home/type'
import Tip from './tip/index.vue'
//分页器页码
    let pageNo=ref<number>(1)
    let pageSize=ref<number>(10)
    let hasHospitalArr=ref<Content>([])
    let total=ref<number>(0)
    //存储医院等级相应数据
    let hostpype=ref<string>('')
    //存储医院地区
    let districtCode=ref<string>('')
    //挂在一次发一次请求
    onMounted(()=>{
        getHospitalInfo()
    })
    //获取网络已有的数据
    const getHospitalInfo=async ()=>{
        let result : HospitalResponseData =await reqHospital(pageNo.value,pageSize.value,hostpype.value,districtCode.value)
        if (result.code==200){
            hasHospitalArr.value=result.data.content
           total.value=result.data.totalElements
        }
        
    }
    //分页器页码发生变化回调
    const currentChange=()=>{
        getHospitalInfo()
    }
    //下拉菜单发生变化时触发
    const sizeChange=()=>{
        getHospitalInfo()
    }
    //子组件自定义事件：获取子给父组件传递过来参数
    const getLevel=(level:string)=>{
        //收集参数：等级参数
        hostpype.value=level
        //再次发请求
        getHospitalInfo()
    }
    const getRegion=(region:string)=>{
        districtCode.value=region
        getHospitalInfo()
    }
</script>
<style scoped lang="scss">
    .hospital{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item{
            width: 40%;
            margin: 10px 0px;
        }
    }
</style>