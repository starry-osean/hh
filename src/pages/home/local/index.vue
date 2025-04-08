<template>
    <div class="region">
        <div class="content">
            <div class="left">地区:</div>
            <ul>
                <li :class="{active:activeFlag == ''}" 
                    @click="changeRegion('')">
                    全部
                </li>
                <li v-for="region in regionArr" 
                    :key="region.value"
                    @click="changeRegion(region.value)"
                    :class="{active:activeFlag== region.value}">
                    {{ region.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    //引入组合式 API 函数
    import { onMounted,ref } from 'vue';
    import { reqHospitalLevelAndRegion } from "../../../api/home";
    import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from "../../../api/home/type";
    
    //定义一个数组，存储医院地区
    let regionArr = ref<HospitalLevelAndRegionArr>([]);
    //控制医院地区高亮的响应式数据
    let activeFlag = ref<string>('');
    //组件挂载完毕
    onMounted(() => {
        getRegion();
    })

    //获取地区
    const getRegion = async () => {
        let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin');
        //存储医院地区数据
        if(result.code == 200) {
            regionArr.value = result.data;
        }
   }

   //点击区域的按钮回调
   const changeRegion = (region:string) => {
        //高亮的响应式数据存储 level 数值
        activeFlag.value = region

        
        //触发自定义事件：将医院等级参数回传给父组件
        $emit('getRegion', region);
   }

     //父组件定义的事件
     let $emit = defineEmits(['getRegion'])
</script>

<script lang="ts">
    export default {
        name: 'Region'
    }
</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;
        .left {
            margin-right: 10px;
            width: 46px;
        }

        ul {
            display:flex;
            flex-wrap:wrap;
            li {
                margin-bottom: 10px;
                margin-right: 10px;

                &.active {
                    color:aqua;
                }
            }
            li:hover {
                color:aqua;
                cursor: pointer;
            }
        }
    }
}
</style>