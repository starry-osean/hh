//对于axios函数库进行二次封装
//目的1：利用axious请求，响应式拦截器，
// 目的2：请求拦截器，一般可以在请求头中携带公共返回数据，处理http网络错误
import axios from 'axios'
import { ElMessage } from 'element-plus'
const request=axios.create({
    baseURL:'/api',//不能少斜杠
    timeout:5000
})
request.interceptors.request.use((config)=>{
    //config:请求拦截器注入的对象（配置对象），配置对象的身上的headers属性
    //可以通过请求头携带公共参数-token
    return config
})
//响应式拦截器
request.interceptors.response.use((response)=>{
    //拦截器成功回调，一般会简化数据
    return response.data
},(ereor)=>{
    let status=ereor.response.status
    switch (status){
        //HTTP状态码
        case 404:
            ElMessage({
                type:'error',
                message:'请求失败路径出现问题'
            })
            break;
        case 500|501|502|503|504|505:
            ElMessage({
                type:'error',
                message:'服务器挂了'
            })
            break;
        case 401:
            ElMessage({
                type:'error',
                message:'参数有误'
            })
            break;
    }
    //处理http网络请求
    return Promise.reject(new Error(ereor.message))
})
export default request