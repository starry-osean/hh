//定义用户相关的仓库
import {defineStore} from "pinia"
import {reqCode} from  '../../api/hospital';
//登录请求类型
const useUserStore  =defineStore('User',{
    state:()=>{
        return {
            visible:false,//用于控制登录组件的dialog显示与隐藏
            code:'',//存储验证码
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
                return 'ok'
            }else{
                //return Promise.reject(new Error(result.message));
            }
        
            
        },
    },
    getters:{
        
    }
});
export default useUserStore;