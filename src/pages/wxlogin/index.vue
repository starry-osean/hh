<template>
    <div>
    </div>
</template>
<script setup lang="ts">
//获取用户信息
import { useRoute } from 'vue-router';
import { SET_TOKEN } from '../../utils/user';
//获取路由对象
let $route = useRoute();

SET_TOKEN(JSON.stringify($route.query));
//
let html:any=document.querySelector('html');
html.style.display='none';
</script>
<style scoped lang="scss">

</style>