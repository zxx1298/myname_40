<template>
    <div class="register">
    <div id="app">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <myinput
            placeholder="用户名/手机号码"
            v-model="users.username"
            :value="users.username"
            :rules="/^1\d{10}$/"
            msg_mis="你的账户输错啦"
          ></myinput>
          <myinput type="password" placeholder="密码" v-model="users.password"></myinput>
            <myinput  v-model="users.nickname" placeholder='请输入昵称'></myinput>
        </div>
        <p class="tips">
          已有账号？
          <a href="#/login" class>去登录</a>
        </p>
        <mybutton text="注册" @click="register_on"></mybutton>
      </div>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { userRegister } from '@/api/users.js'
export default {
  components: {
    mybutton, myinput
  },
  data () {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register_on () {
    //   console.log(this.users)
      let res = await userRegister(this.users)
      console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册账号成功')
        this.$router.push({ name: 'login' })
      } else {
        this.$toast.fail('注册账号失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
