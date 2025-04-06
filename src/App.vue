<template>
    <div class="container">
        <!--顶部全局组件-->
       <HospitalTop/>
       <HospitalBottom/>
       <!--展示路由组件区域-->
       <div class="content">
            <router-view></router-view>
       </div>
    </div>
</template>
<script lang="ts" setup name="App">

</script>
<style scoped>

</style>