//定义用户相关的仓库
import {defineStore} from "pinia"
import {reqCode,reqUserLogin} from  '../../api/hospital';
import type { UserState } from "./interface";
import type { LoginData, UserLoginResponseData,UserInfo} from "../../api/hospital/type";
import { GET_TOKEN,SET_TOKEN,REMOVE_TOKEN } from "../../utils/user";
import { timePanelSharedProps } from "element-plus/es/components/time-picker/src/props/shared.mjs";
//登录请求类型
const useUserStore  =defineStore('User',{
    state: (): UserState => {
        return {
            //用于控制登录组件 Dialog 的显示与隐藏
            visible: false,
            //存储用户的验证码
            code: '',
            //存储用户信息
            //({} as UserInfo)本地存储本地拿或者对象
            userInfo: JSON.parse(GET_TOKEN() as string)||({}as UserInfo)
        }
    },
    actions:{
        //获取验证码的方法
        async getCode(phone:string) {
            //向服务器携带手机号码，获取验证码
            //正常开发，只需要发一个请求，后端就会将验证码推送到用户手机设备中
            //当前我们目前服务器不能向用户手机设备推送验证码（花钱）
            let result:any = await reqCode(phone);
            
            if(result.code==200){
                this.code=result.data;
                //本地存储持久化用户信息
                //localStorage.setItem('USERINFO',JSON.stringify(this.userInfo))
                SET_TOKEN(JSON.stringify(this.userInfo));
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message));
            }
        
            
        },
        //手机号登陆
        async  userLogin(loginData:LoginData){
           let result=await reqUserLogin(loginData);
                if(result.code==200){
                    
                    this.userInfo=result.data;
                }else{
                    return Promise.reject(new Error (result.message))
                }
            
        },
        //退出登录方法
        logout(){
            //清空仓库的数据
            this.userInfo={name:'',token:''};
             //清空本地存储的数据
            REMOVE_TOKEN();
        },
        queryState(){
            let timer=setInterval(()=>{
                if(GET_TOKEN()){
                    this.visible=false;
                    this.userInfo=JSON.parse(GET_TOKEN() as string);
                    clearInterval(timer);
                }
            },1000)
        }
    },
    getters:{
        
    }
});
export default useUserStore;