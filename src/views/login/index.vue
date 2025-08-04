<template>
  <!-- 登录容器,先写静态组件，再写业务实现 -->
  <div class="login_container">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-form class="login_form" :model="user" :rules="rules">
          <h1>Hello</h1>
          <h2>欢迎来到AI Voice</h2>
          <div class="login_form_item">
            <el-form-item prop="username">
              <el-input
                prefix-icon="User"
                v-model="user.username"
                placeholder="输入账户"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="Lock"
                v-model="user.password"
                placeholder="输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login_btn" type="primary" @click="login">登录</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reqLogin } from '@/api/user'
import { reactive } from 'vue'
import useUserStore from '@/stores/user'
import { useRouter } from 'vue-router'
//Notification 通知
import { ElNotification } from 'element-plus'
//定义数据
//收集用户的账号与密码
let user = reactive({
  username: '',
  password: '',
})
//定义表单校验规则
const rules = {
  username: [{ required: true, min: 3, message: '用户名至少3位', trigger: 'change' }],
  password: [{ required: true, min: 5, message: '密码长度应为5-10位', trigger: 'change' }],
}
const store = useUserStore()
const router = useRouter()
//定义数据的方法
async function login() {
  //点击登录之后发起请求
  //通知仓库发起请求
  //请求成功->路由跳转，
  //请求失败->弹出登录失败信息
  let response = await reqLogin(user)
  store.updateToken(response.data)
  console.log(response)
  if (response.code == '200') {
    router.push('/layout')
    // router.replace('/home')
    ElNotification({
      title: 'Success',
      message: '登陆成功',
      type: 'success',
    })
  } else {
    ElNotification({
      title: 'Error',
      message: '登陆失败',
      type: 'error',
    })
  }
}
//原本需要return所有数据和方法 setup语法糖自动返回
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.jpg');
  background-repeat: no-repeat; //禁止重复
  background-size: cover; //拉伸填满容器
  background-position: center;
}
.login_form {
  width: 80%;
  position: relative;
  top: 30vh;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }
  .login_form_item {
    margin: 30px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
