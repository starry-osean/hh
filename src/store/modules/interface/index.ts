import type { HosPitalDetailData ,DeparmentArr ,UserInfo} from "../../../api/hospital/type";

//定义仓库内部存储数据 State 的 TS 类型
export interface DetailState{
    hospitalInfo:HosPitalDetailData,
    deparmentArr:DeparmentArr
}
//用户仓库相关 state 数据的 TS 类型定义
export interface UserState {
    visible:boolean,//用于控制登录组件的dialog显示与隐藏
    code:string,//存储验证码
    userInfo:UserInfo
}