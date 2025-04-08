import {defineStore} from "pinia"
import {reqHospitalDetail} from "../../api/hospital"
//引入医院详情数据的 TS 类型
import type {HosPitalDetailData} from '../../api/hospital/type';
import type {HosPitalDetail} from '../../api/hospital/type'
//pinia仓库写法：组合式API、选择式API写法
import type{DetailState} from './interface'
import { reqHospitalInfo } from "../../api/home";
const useDetailStore =defineStore('Detail',{
    state:():DetailState =>{
        return {
            //医院详情的数据
            hospitalInfo:({} as HosPitalDetailData),
            
        }
    },
    actions:{
        //获取医院详情方法
        async  getHospital(hoscode:string){
            let result:HosPitalDetail =await reqHospitalDetail(hoscode)
            console.log(result);
            if(result.code == 200) {
                //医院详情的数据
                this.hospitalInfo = result.data;
            }
            
        }
    },
    getters:{

    }
});
//获取仓库方法对外暴露
export default useDetailStore;