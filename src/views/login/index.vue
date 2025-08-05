<template>
  <div class="login-bg">
    <div class="login-card">
      <div class="login-logo">
        <img src="@/assets/images/logo.jpg" alt="logo" />
        <span>AI Voice</span>
      </div>
      <el-form class="login_form" :model="user" :rules="rules">
        <h1>欢迎登录</h1>
        <div class="login_form_item">
          <el-form-item prop="username">
            <el-input prefix-icon="User" v-model="user.username" placeholder="输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="Lock" v-model="user.password" placeholder="输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reqLogin } from '@/api/user'
import { reactive } from 'vue'
import useUserStore from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
let user = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, min: 3, message: '用户名至少3位', trigger: 'change' }],
  password: [{ required: true, min: 5, message: '密码长度应为5-10位', trigger: 'change' }],
}
const store = useUserStore()
const router = useRouter()
async function login() {
  let response = await reqLogin(user)
  store.updateToken(response.data)
  if (response.code == '200') {
    router.push('/layout')
    ElNotification({ title: 'Success', message: '登录成功', type: 'success' })
  } else {
    ElNotification({ title: 'Error', message: '登录失败', type: 'error' })
  }
}
</script>
<style scoped lang="scss">
.login-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(102,126,234,0.12);
  padding: 48px 36px 36px 36px;
  min-width: 340px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.8s;
}
.login-logo {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  img {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-right: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
    letter-spacing: 2px;
  }
}
.login_form {
  width: 100%;
  h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 24px;
    text-align: center;
    font-weight: 700;
  }
  .login_form_item {
    margin: 0 0 12px 0;
  }
  .login_btn {
    width: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border: none;
    font-weight: 600;
    letter-spacing: 2px;
  }
  .el-input__wrapper {
    border-radius: 8px;
    background: #f8f9fa;
    box-shadow: none;
  }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 600px) {
  .login-card {
    min-width: 90vw;
    padding: 24px 8px;
  }
}
</style>
