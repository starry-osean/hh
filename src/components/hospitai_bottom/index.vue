<template>
    <div class="bottom">
        <div class="content">
            <div class="left">
                <p>京JCP 122541623326号 电话挂号2213263236</p>
            </div>
            <div class="right">
                <span>联系我们</span>
                <span>合作伙伴</span>
                <span> 用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
        
</script>
<style scoped>
    .bottom{
            position: fixed;
            height: 70px;
            width: 100%;
            display: flex;
            bottom: 0px;
            left: 1px;
            justify-items: center;
            align-items: center;
            background-color:aliceblue;
            .content{
                height: 50px;
                width: 1000px;
                color:darkgray;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-left: 250px;
            }
            .left{
                display: flex;

            }
            .right{
                span{
                    margin-left: 5px;
                }
            }
        }
</style>