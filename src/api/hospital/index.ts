//引入二次封装axios
import request from "../../utils/request";
import type{HosPitalDetail,DeparmentResponseData} from"../../api/hospital/type"
//枚举请求地址
enum API{
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    //获取医院科室数据
    HOSPITALDEPARMENT_URL='/hosp/hospital/department/'
}
//获取医院详情的接口
export const reqHospitalDetail = 
(hoscode:string) => 
  request.get<any,HosPitalDetail>(API.HOSPITALDETAIL_URL + hoscode);
export const reqHospitalDepartment
=(hoscode:string)=>request.get<any,DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);
    