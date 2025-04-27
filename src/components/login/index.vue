<template>
    <div class="login_container">
        <!---->
        <el-dialog v-model="userStore.visible" title="用户登录" width="40%" ref="dialog" >
                <!-- 对话框身体部分的结构 -->
                
                <el-row>
                      <!-- 左侧结构：手机号码登录、微信扫一扫登录 -->
                  <el-col :span="12">
                    <div class="login">
                        <div v-show="scene == 0">
                            <el-form :model="loginParam"  ref="form" :rules="rules">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请你输入手机号码" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请你输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone?true:false">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"/><!--自定义事件-->
                                        <span v-else @click="getCode" >获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <div class="bottom">
                                <el-button style="width: 90%;" type="primary" size="default"
                                    :disabled="!isPhone || loginParam.code.length < 6 ? true : false" @click="login"
                                    >用户登录</el-button>
                            </div>
                            <div class="bottom" @click="changeScene">
                                <p>微信扫码登录</p>
                                <svg t="1742385902919" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2681" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2682"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2683"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            <!-- 在这个容器当中显示微信扫码登录的页面 -->
                            <div id="login_container">
                            </div>
                            <div class="phone" @click="handler" >
                                <p>手机短信验证码登录</p>
                                <svg t="1700204925114" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4093" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4094"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </el-col>
                       <el-con :span="12">
                            <div class="leftContent">
                                <div class="top">
                                    <div class="item">
                                        <img src="../../assets/erweima.png" alt="">
                                        <svg t="1745238904536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" width="16" height="16"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#dbdbdb" p-id="2380"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#dbdbdb" p-id="2381"></path></svg>
                                        <p>微信扫一扫关注</p>
                                        <p>“快速预约挂号”</p>
                                    </div>
                                    <div class="item">
                                        <img src="../../assets/erweima.png" alt="">
                                        <svg t="1745239933029" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3588" width="16" height="16"><path d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z" p-id="3589" fill="#2c2c2c"></path></svg>
                                        <p>扫一扫下载</p>
                                        <p>“预约挂号”APP</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tip">
                                <p>尚医通官方指定平台</p>
                                <p>快速登录</p>
                            </div>
                     </el-con>
                </el-row>
                <template  #footer>
                    <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
                </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
//获取 user 仓库的数据（visiable）数据可以控制 login 组件的对话框的显示与隐藏
import { reactive, ref ,computed, watch} from "vue";
import useUserStore from "../../store/modules/user"
import { User,Lock, Phone } from '@element-plus/icons-vue'
//导入倒计时组件
import CountDown from '../../components/countdown/index.vue'
import { ElMessage } from "element-plus";
import  {reqWxLogin}from '../../api/hospital/index'
import type{WXLoginResponseData} from '../../api/hospital/type'
import { lt } from "element-plus/es/locales.mjs";
let userStore=useUserStore();
let scene=ref<number>(0);
//收集表单数据--手机号码
let loginParam=reactive({
    phone:'',//收集手机号码
    code:'',//收集验证码
})
//计算手机号码格式
let isPhone=computed(()=>{
    //正则表达式
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    
    return reg.test(loginParam.phone);
})
//点击微信登录切换扫码登录
const changeScene=async ()=>{
    scene.value=1;
    //发请求获取微信扫码二维码需要的参数
    //咋们在向硅谷学校的服务器发请求，获取微信扫码登录页面参数
    //还需要携带一个参数：告诉学校服务器授权成功后以后重定向项目某一个页面
    let redirect_URL=encodeURIComponent(window.location.origin+'/wxlogin');
    let result:WXLoginResponseData=await reqWxLogin(redirect_URL);
    
    //生成微信扫描登录的二维码页面
     //@ts-ignore
     new WxLogin({
        self_redirect: true,//true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
        id: "login_container",//显示二维码容器 ID
        appid: result.data.appid,//应用的唯一标识 appid
        scope: "snsapi_login",//代表微信扫描登录的页面已经授权了，应用授权的作用域
        redirect_uri: result.data.redirectUri,//填写授权回调域的路径，就是用户授权成功以后微信服务器向公司后台推送 code 地址
        state: result.data.state,//state 就学校服务器重定向地址，携带用户的信息
        style: "black",//文字颜色
        href: "" //自定义样式链接       
    });
}
//定义一个响应式数据去控制倒计时组件的显示与隐藏
//flag，true:开始倒计时，false:并非倒计时
let flag = ref<boolean>(false);
userStore.getCode(loginParam.phone)
userStore.userLogin
//获取验证码按钮回调
const getCode = async() => {
    //解决element-plus按钮禁用还能点击问题
    if(!isPhone.value||flag.value)return;
    flag.value=true
 try {
    //获取验证码
    await userStore.getCode(loginParam.phone) 
    loginParam.code=userStore.code;
 }catch(error){
    //验证码失败
    ElMessage({
        type:'error',
        message:(error as Error).message
    })
 }
};
const getFlag=(val:boolean)=>{
    flag.value=val;
    
}
//获取form组件实例
const form=ref<any>()
const login=async()=>{
     //保证表单校验的两项都符合条件
    await form.value.validate();
    
       //发起登录请求
    //登录请求成功，顶部组件需要展示用户名字，对话框关闭
    //登录请求失败，弹出对应登录失败的错误信息
    try{
        userStore.userLogin(loginParam);
        userStore.visible=false
    }catch(error){
        ElMessage({
            type:'error',
            message:(error as Error).message
        })
    }
}
//自定义校验规则：手机号码的自定义校验规则
const validatorPhone =(rule:any,value:any,callback:any)=>{
    const reg= /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    if(reg.test(value)){
        callback();
    }else{
        callback(new Error('请输入正确的手机号码格式'));
    }
}
const validatorCode=(rule:any,value:any,callback:any)=>{
    const reg=/^\d{6}$/;
    if(reg.test(value)){
        callback();

    }else{
        callback(new Error('请输入正确的验证码格式'))
    }
}
 //表单校验的规则对象
const rules={
     //手机号码验证规则
    //required:代表当前字段务必进行校验
    //message:代表校验错误的提示信息
    //trigger:代表表单校验触发的时机，change:文本发生变化的时候校验，blur:失去焦点的时候校验
    //min:代表最小位数
    //max:代表最大位数
    //phone:[{required:true,message:'手机号务必11位',trigger:'change',min:11}],
    // code:[{required:true,message:'验证码务必6位',trigger:'burl',min:6}]
    phone: [{trigger:'change', validator:validatorPhone}],
    code: [{trigger:'change', validator:validatorCode}]
};

//关闭窗口的回调
const closeDialog = () => {
    userStore.visible = false;
    
};
//点击手机短信验证盒子
const handler=()=>{
    scene.value=0;
}
watch (()=>scene.value,(val:number)=>{
    if (val==1){
        userStore.queryState();
    }
})
</script>
<script lang="ts">
export default {
    name: 'login'
}
</script>
<style scoped lang="scss">
.login_container {
    //深度选择器
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;
                p{
                    margin: 10px 0;
                }
            }
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                
                img {
                    width: 130px;
                    height: 130px;
                    margin-right: 20px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }
    }

    .tip {
        text-align: center;
        margin: 20px 0px;
        font-size: 20px;
        font-weight: 900;
    }
} 
</style>