<template>
  <div class="edit">
      <myheader title="用户编辑信息">
          <span slot="left"  class="iconfont iconjiantou2" @click="$router.back()"></span>
          <!-- <span slot="right">退出</span> -->
      </myheader>
      <div class="head">
          <img :src="current.head_img" alt="">
          <van-uploader :after-read="afterRead"></van-uploader>
      </div>
          <mycell title="昵称" :crue='current.nickname' @click="nickshow=!nickshow"></mycell>
            <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm='updateNickname'>
                <van-field required  label="昵称" :value="current.nickname" placeholder="请输入昵称" ref="nickname" />
            </van-dialog>
          <mycell title="密码" :crue='current.password' type='password' @click="passwordshow=!passwordshow"></mycell>
          <van-dialog v-model="passwordshow" title="修改密码" show-cancel-button @confirm='updatePassword' :before-close='beforeclose'>
                <van-field required  label="原密码"  placeholder="请输入原始密码" ref="jiuword" />
                <van-field required  label="新密码"  placeholder="请输入新密码" ref="xinword" />
            </van-dialog>
          <mycell title="性别" :crue="current.gender===1?'男':'女'" @click="gendershow=!gendershow"></mycell>
          <van-dialog v-model="gendershow" title="性别" nshow-cancel-butto @confirm='showgender' >
              <van-picker
                    :columns="['女','男']"
                    :default-index="current.gender-0"
                    @change="onChange"
                    />
            </van-dialog>
  </div>
</template>

<script>
import myheader from '@/components/my_header.vue'
import mycell from '@/components/my_cell.vue'
import { getuserInfo, userEdit } from '@/api/users.js'
import { uploderFile } from '@/api/uploderfile.js'
export default {
  components: {
    myheader, mycell
  },
  data () {
    return {
      id: '',
      current: {},
      nickshow: false,
      passwordshow: false,
      gendershow: false,
      genderIndex: ''
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getuserInfo(this.id)
    console.log(res)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      if (this.current.head_img) {
        this.current.head_img = localStorage.getItem('heima_40_baseURL') + this.current.head_img
      } else {
        // console.log(123)
        this.current.head_img = localStorage.getItem('heima_40_baseURL') + '/uploads/image/IMG1569381163794.jpeg'
      }
    } else {
      this.$toast.fail('获取数据失败')
    }
  },
  methods: {
    async afterRead (file) {
    //   console.log(file)
      let fromdate = new FormData()
      fromdate.append('file', file.file)
      let res = await uploderFile(fromdate)
      //   console.log(res1)
      if (res.data.message === '文件上传成功') {
        console.log(1)
        let res1 = await userEdit(this.id, { head_img: res.data.data.url })
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          this.current.head_img = localStorage.getItem('heima_40_baseURL') + res.data.data.url
        } else {
          this.toast.fail('修改用户头像失败')
        }
      } else {
        this.$toast.fail('文件上传失败')
      }
    },
    async updateNickname () {
    //   console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await userEdit(this.id, { nickname })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        this.current.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    async updatePassword () {
    //   console.log(11)
      let jiuword = this.$refs.jiuword.$refs.input.value
      if (this.current.password === jiuword) {
        let password = this.$refs.xinword.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        let res1 = await userEdit(this.id, { password })
        console.log(res1)
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改密码成功')
          localStorage.removeItem('heima_40_token')
          this.$router.push({ name: 'login' })
        } else {
          this.$toast.fail('修改密码失败')
        }
      }
    },
    beforeclose (action, done) {
    //   console.log(action, done)
      let jiuword = this.$refs.jiuword.$refs.input.value
      let xinword = this.$refs.xinword.$refs.input.value
      if (action === 'confirm' && this.current.password !== jiuword) {
        this.$toast.fail('输入的密码不正确')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(xinword)) {
        this.$toast.fail('请输入3-16位数字')
        done(false)
      } else {
        done()
      }
    },
    async showgender () {
      let res = await userEdit(this.id, { gender: this.genderIndex })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.current.gender = this.genderIndex
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  }
}
</script>

<style lang='less' >
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  // 修改元素的大小
/deep/.van-uploader__upload{
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
}
// 设置元素的对齐方式
/deep/.van-uploader{
    // 实现任意元素居中
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    opacity: 0;
}
}
</style>
