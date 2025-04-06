<template>
    <el-carousel height="350px">
   
        <el-carousel-item v-for="item in 4" :key="item">
            <!--<h3 class="samll justify-center" text="2xl">{{ item }}</h3>-->
            <img src="../../../assets/背景.jpg" alt="">
            <img src="../../../assets/朋友背景.jpg" alt="">
        </el-carousel-item>
    </el-carousel>
</template>
<script lang="ts" setup>

</script>
<style scoped lang="scss">
    img{
        width: 100%;
        height: 1000px;
    }
</style>