import { reqLogin } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//组合式写法
const useUserStore = defineStore(
  'user',
  () => {
    //定义数据(state)，只能由actions来赋值
    const token = ref()
    //定义数据的方法(action 同步+异步,即修改数据的方法和发送请求的方法)
    //async函数会返回一个promise对象(三种状态即进行中,已成功，已失败)，通过该对象组件即可知道请求是否成功，成功就跳转路由
    //await 只能在 async 函数中使用
    //请求方写在组件里，再写一个方法重新赋值即可
    function updateToken(data: string) {
      token.value = data
    }
    //以对象的方式return出去供对象使用
    return { token, updateToken }
  },
  //开启数据持久化
  {
    persist: true,
  },
)
export default useUserStore
