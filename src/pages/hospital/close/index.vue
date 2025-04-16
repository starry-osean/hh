<template>
    <div class="close">
        <div class="info">
            <h1>{{ hospitalStore.hospitalInfo.hospital.hosname }}停诊信息</h1>
            <el-empty description="暂无信息" />

        </div>
    </div>
</template>
<script setup lang="ts">
import useDetailStore from '../../../store/modules/hospitalDetail';
    let hospitalStore=useDetailStore();

</script>
<style lang="scss" scoped>
    .close{
        .info{
            text-align:center;
        }
    }
</style>