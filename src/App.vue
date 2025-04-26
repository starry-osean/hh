<template>
    <div class="container">
        <!--顶部全局组件-->
       <HospitalTop/>
       <HospitalBottom/>
       <!--展示路由组件区域-->
       <div class="content">
            <router-view></router-view>
       </div>
       <Login  v-if="userStore.visible"/>
    </div>
</template>
<script lang="ts" setup name="App">
import useUserStore from './store/modules/user';
let userStore=useUserStore();
</script>
<style scoped>

</style>