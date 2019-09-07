// 这里使一个仓库
// state  代表仓库数据
// mutations  同步修改state的数据
// actions    异步修改state的数据-------这里暂时用不到


// 暴露一下
// 这里必须要export const state
// 用户管理
export const state={
    //声明一下userInfo是一个对象
    userInfo:{
        token:"",
        user:{}
    }
};

// 上面的state调用下面mutations方法,他固定的第一个参数为state,
// data参数不是必须的.是调用方法的时候传入的参数
export const mutations={
    // 设置用户信息
    setUserInfo( state,data){
        //data是后台放回的用户信息
        state.userInfo=data;
    },
    // 上面的专门用于赋值的,下这里的专门用来userInfo的(就是退出),退出按钮要注册时间
    chearuserInfo(state){
        state.userInfo={
            //不用传其他值了 直接恢复上面的初始值为空即可
            token:"",
            user:{}
        }
    }
};