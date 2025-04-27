//引入二次封装axios
import request from "../../utils/request";
import type{HosPitalDetail,DeparmentResponseData,UserLoginResponseData,LoginData,WXLoginResponseData} from"../../api/hospital/type"
//枚举请求地址
enum API{
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    //获取医院科室数据
    HOSPITALDEPARMENT_URL='/hosp/hospital/department/',
    //获取验证码接口
    GETTUSERCODE_URL = '/sms/send/',
     //用户登录接口
     USERLOGIN_URL = '/user/login',
      //获取微信扫描登录需要的参数接口
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
}
//获取医院详情的接口
export const reqHospitalDetail = 
(hoscode:string) => 
  request.get<any,HosPitalDetail>(API.HOSPITALDETAIL_URL + hoscode);
export const reqHospitalDepartment
=(hoscode:string)=>request.get<any,DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);
//获取验证码接口
export const reqCode  = 
    (phone:string) =>
    request.get<any,any>(API.GETTUSERCODE_URL + phone);
//用户登录接口
export const reqUserLogin = 
    (data:LoginData) => 
    request.post<any,UserLoginResponseData>(API.USERLOGIN_URL, data);
  //获取微信扫描登录生成二维码需要的参数接口
export const reqWxLogin =(wxRedirectUri: string)=>
  request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`); 