<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/风间彻1.png" alt="">
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="right">
                    <p class="help">帮助中心</p>
                    <p class="login">登录/注册</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="index">
import { useRouter } from 'vue-router';

let $router=useRouter
const goHome=()=>{
    $router.push({path:'/home'})
}
</script>
<style scoped lang="scss">
    .top{
        position: fixed;
        z-index: 999;
        height: 70px;
        display: flex;
        justify-content: center; 
        align-items: center;
        top:0;
            .content{
                height: 70px;
                width: 1200px;
                background-color: white;
                
                display: flex;
                justify-content: space-between;
                    .left{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            height: 50px;
                            width: 50px;
                            margin-right: 10px;
                        }
                        p{
                            font-size: 40px;
                            color: aqua;
                        }
                    }
                    .right{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 12px;
                        color: darkgray;
                        .help{
                            margin-right: 10px;
                        }
                    }
            }
    }
  
    
</style>