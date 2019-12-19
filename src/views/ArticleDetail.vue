<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new" ></span>
      </div>
      <span @click="onAttention" :class='{active:article.has_follow}'>{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
        <div class="desc">
        <span>{{article.user&& article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-12-17</span>
      </div>
      <div class="content" v-html="article.content" v-if="article.type===1"></div>
       <video v-if='article.type===2' :src='article.content' controls></video>
      <div class="opt">
        <span class="like" :class="{active:article.has_like}" @click="onLike">
          <van-icon name="good-job-o"  />{{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for='item in commentList' :key='item.id'>
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <mycommentArea :article='article'></mycommentArea>
  </div>
</template>

<script>
import { articleUser, articleLick, userComment } from '@/api/article.js'
import { userFollows, userUnfollow } from '@/api/users.js'
import mycommentArea from '@/components/my_commentArea.vue'

export default {
  components: { mycommentArea },
  data () {
    return {
      article: {},
      commentList: []
    }
  },
  async mounted () {
    // 根据文章的id获取文章的详情，实现动态渲染
    let res = await articleUser(this.$route.params.id)
    console.log(res)
    if (res.status === 200) {
      // console.log(111)
      this.article = res.data.data
      // 获取文章评论数据
      let res5 = await userComment(this.article.id, { pageSize: 10 })
      console.log(res5)
      if (res5.status === 200) {
        this.commentList = res5.data.data.map(value => {
          value.user.head_img = localStorage.getItem('heima_40_baseURL') + value.user.head_img
          return value
        })
      }
    }
  },
  methods: {
    // 关注，取消关注
    async onAttention () {
      let res
      // 判断当前的关注状态，根据状态来调用方法
      if (this.article.has_follow === true) {
        res = await userUnfollow(this.article.user.id)
      } else {
        res = await userFollows(this.article.user.id)
      }
      console.log(res)
      this.$toast.success(res.data.message)
      // 修改元素所绑定的数据,实现页面元素效果的刷新
      this.article.has_follow = !this.article.has_follow
    },
    // 点赞和取消点赞
    async onLike () {
      // console.log(111)
      let res2 = await articleLick(this.article.id)
      // 修改元素绑定的状态，已点赞还是未点赞
      this.article.has_like = !this.article.has_like
      if (res2.data.message === '点赞成功') {
        // 点赞之后点赞的数量加1
        this.article.like_length++
      } else if (res2.data.message === '取消成功') {
      // 取消点赞之后点赞的数量减1
        this.article.like_length--
      }
      this.$toast.success(res2.data.message)
    }
  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 50px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border: 1px solid #ccc;
    color: #333;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      color: #fff;
      background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video {
    width: 100%;
    margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .like{
    &.active{
      color:red
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      padding: 0 0 0 0 ;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}

/deep/.photo {
  img {
    width: 100% !important;
    display: block;
  }
}
</style>
