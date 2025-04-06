<template>
    <div class="local">
        <div class="content">
            <div class="left">地区</div>
            <ul class="region">
                <li class="active">全部：</li>
                <li>朝阳区</li>
                <li>西城区</li>
                <li>东城区</li>
                <li>海淀区</li>
                <li v-for="region in regionArr" :class="{active:activeFlag==region.value}" :key="region.value" @click="changeRegion">西城区</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndRegion } from '../../../api/home';
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '../../../api/home/type';
let regionArr=ref<HospitalLevelAndRegionArr>([])
//控制等级高亮效果
let activeFlag=ref<string>('')
  onMounted(()=>{
    getRegion()
  })
  const getRegion=async()=>{
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion(
     "HosType")
      console.log(result);
        //存储医院等级数据
       if (result.code==200){
            regionArr.value=result.data
            console.log(regionArr.value)   
        }
  }
   const changeRegion=(region:string)=>{
            activeFlag.value=region
            $emit('getRegion',region)
    }
    let $emit=defineEmits(['getRegion'])
</script>
<style lang="scss" scoped>
    .local{
        color: #7f7f7f;
        margin-top: 10px;
        .content{
            display: flex;
            .left{
                margin-right: 5px;
                margin-top: 5px;
            }
            .region{
                display: flex;
                flex-wrap: wrap;
                li{
                    margin: 5px;
                    &.active{
                        color: aqua;
                    }
                }
                li:hover{
                    color: aqua;
                    cursor: pointer;
                }
                
            }
        }
    }
</style>