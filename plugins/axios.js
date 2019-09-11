//使用出来axios的请求拦截插件,在登录时提示用户用户名或密码错误可以使用

//先引入一个组件
import {Message} from "element-ui";

export default({$axios})=>{
    //错误拦截,onError用户错误拦截
    $axios.onError((res)=>{
        //返回的res是一个错误的对象,error对象下都有response的属性可以访问错误的信息
        //解构出错误信息,和代码
        const {message,statusCode}=res.response.data;
        //判断登录时用户等信息提示
        if(statusCode===400){
            // Message=this.$message  上面已引用组件this可以直接指向 
            Message.error(message)
        }
    })
};
 