<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/风间彻1.png" alt="">
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="right">
                    <p class="help">帮助中心</p>
                    <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册 </p>
                    <p v-else>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                           {{ userStore.userInfo.name }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>实名认证</el-dropdown-item>
                                <el-dropdown-item>挂号订单</el-dropdown-item>
                                <el-dropdown-item>就诊人管理</el-dropdown-item>
                                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                        </el-dropdown>
                    </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="index">
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
//获取 user 仓库的数据（visiable）数据可以控制 login 组件的对话框的显示与隐藏
import useUserStore from "../../store/modules/user"
let userStore=useUserStore();
let $router=useRouter
const goHome=()=>{
    $router.push({path:'/home'})
}
//弹出对话框
const login=()=>{
    userStore.visible=true
}
//退出登录按钮的回调
const logout=()=>{
    //通知 pinia 仓库清除用户相关信息
    userStore.logout();
    //编程式导航路由跳转到首页
    $router.push({path:'/home'});
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
                        .login{
                            cursor: pointer;
                        }
                    }
            }
    }
  
    
</style>