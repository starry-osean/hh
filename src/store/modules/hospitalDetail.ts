import {defineStore} from "pinia"
import {reqHospitalDetail,reqHospitalDepartment } from "../../api/hospital"
//引入医院详情数据的 TS 类型
import type {HosPitalDetailData} from '../../api/hospital/type';
import type {HosPitalDetail,DeparmentResponseData } from '../../api/hospital/type'
//pinia仓库写法：组合式API、选择式API写法
import type{DetailState} from './interface/'
const useDetailStore =defineStore('Detail',{
    state:():DetailState =>{
        return {
            //医院详情的数据
            hospitalInfo:({} as HosPitalDetailData),
            //储存医院科室数据
            deparmentArr:[]
        }
    },
    actions:{
        //获取医院详情方法
        async getHospital(hoscode: string) {
            try {
                const result: HosPitalDetail = await reqHospitalDetail(hoscode);
                if (result.code === 200) {
                  this.hospitalInfo = result.data;
                } else {
                  console.error('获取医院详情失败:', result.message);
                }
              } catch (error) {
                console.error('获取医院详情失败:', error);
              }
            },
          //获取某一个医院科室的数据
        async getDepartment(hoscode:string) {
              let result:DeparmentResponseData = await reqHospitalDepartment(hoscode);
                console.log(result);
                
              
              if(result.code == 200) {
                  this.deparmentArr=result.data;
        
              }
          }
      },
      getters:{
  
      }
  });
//获取仓库方法对外暴露
export default useDetailStore;