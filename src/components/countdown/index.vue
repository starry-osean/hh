<template>
    <span>获取验证码({{ time }}s)</span>
</template>
<script lang="ts" setup>
import { ref,watch } from 'vue';
let time=ref<number>(3);
//接受父组件的props
let props = defineProps(['flag'])
let $emit=defineEmits(['getFlag'])
watch(
    ()=> props.flag,
    ()=>{
        //
      let timer=setInterval(()=>{
        if(time.value>0){
            time.value--;

            $emit('getFlag',false);
            //清除定时器
            clearInterval(timer);
        }else{
            time.value=3;
        }
      },1000)
    },
    {
        immediate:true,
    }
);
</script>
<style scoped lang="scss">

</style>