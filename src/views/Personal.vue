<template>
  <div class="personal">
    <router-link :to="`/editPersonal/`+currentUser.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <!-- <span>个人中心</span> -->
    <mycell title="我的关注" crue='关注的用户' @click="$router.push({name:'Follow'})"></mycell>
    <mycell title="我的跟帖" crue='跟帖/回复'></mycell>
    <mycell title="我的收藏" crue='文章/视频' @click="$router.push({name:'collect'})"></mycell>
    <mycell title="设置" crue=''></mycell>
    <div class="eact">
       <mybutton text="退出" class="exitBtn" @click="exitApp"></mybutton>
    </div>
  </div>
</template>

<script>
import { getuserInfo } from '@/api/users.js'
import mycell from '@/components/my_cell.vue'
import mybutton from '@/components/mybutton.vue'
export default {
  data () {
    return {
      currentUser: {}
    }
  },
  components: {
    mycell, mybutton
  },
  mounted () {
    let id = this.$route.params.id
    getuserInfo(id)
      .then(res => {
        console.log(res)
        if (res.data.message === '获取成功') {
          this.currentUser = res.data.data
          if (this.currentUser.head_img) {
            this.currentUser.head_img = localStorage.getItem('heima_40_baseURL') + this.currentUser.head_img
          } else {
            console.log(123)
            this.currentUser.head_img = localStorage.getItem('heima_40_baseURL') + '/uploads/image/IMG1569381163794.jpeg'
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('获取失败')
      })
  },
  methods: {
    exitApp () {
      console.log(111)
      localStorage.removeItem('heima_40_token')
      localStorage.removeItem('heima_40_baseURL')
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
/deep/.exitBtn {
  margin: 50px auto !important;
}
</style>
