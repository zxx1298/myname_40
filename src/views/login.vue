<template>
  <div class="login">
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
            type="text"
            placeholder="用户名/手机号码"
            @input="resinput"
            :value="resur.username"
            :rules="/^1\d{10}$/"
            msg_mis="你的账户输错啦"
          ></myinput>
          <myinput type="password" placeholder="密码" v-model="resur.password"></myinput>
        </div>
        <p class="tips">
          没有账号？
          <a href="#/register" class>去注册</a>
        </p>
        <mybutton text="登录" @click="button_dian"></mybutton>
      </div>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { userLogin } from '@/api/users.js'
export default {
  data () {
    return {
      resur: {
        username: '11111',
        password: '123456'
      }
    }
  },
  components: {
    mybutton,
    myinput
  },
  methods: {
    button_dian (event) {
      // console.log(this.resur)
      userLogin(this.resur)
        .then(res => {
          if (res.data.message === '登录成功') {
            localStorage.setItem('heima_40_token', res.data.data.token)
            this.$router.push({ path: `Personal/${res.data.data.user.id}` })
            // console.log(111)
          } else {
            this.$toast.fail(res.data.message)
          }
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登录失败请重试')
        })
    },
    resinput (data) {
      this.resur.username = data
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
