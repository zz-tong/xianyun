import createPersistedState from 'vuex-persistedstate'

// export default是nuxt函数的固定格式
export default ({ store }) => {
    window.onNuxtReady(() => {
        //插件的方法
        createPersistedState({
            key: "store", // 读取本地存储的数据到store,可以任意的一个字符串
        })(store)
    })
}