<template>
  <div class="commonts">
      <myheader title="精彩评论">
  <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="commentList">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replayComment(comment)">回复</span>
        </div>
         <mycommentItem v-if='comment.parent'
         :comment='comment.parent'
         @replayComment='replayComment'
         ></mycommentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <mycommentArea :article='article'
     :replayObj='parentReplayObj'
     @refresh='init'
     @resetValue="parentReplayObj = null"
    ></mycommentArea>

  </div>
</template>

<script>
import myheader from '@/components/my_header.vue'
import mycommentArea from '@/components/my_commentArea'
import mycommentItem from '@/components/my_comment_item.vue'
import { articleUser, userComment } from '@/api/article.js'
export default {
  components: { myheader, mycommentArea, mycommentItem },
  data () {
    return {
      commentList: [],
      article: {},
      parentReplayObj: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      // 获取文章iD
      let id = this.$route.params.id
      // 获取当前文章数据
      let post = await articleUser(id)
      this.article = post.data.data
      // 获取当前文章的评论
      // console.log(res)
      let res = await userComment(id, { pageSize: 50 })
      console.log(res)
      if (res.status === 200) {
        this.commentList = res.data.data.map(value => {
          value.user.head_img = localStorage.getItem('heima_40_baseURL') + '/uploads/image/IMG1569381163794.jpeg'
          return value
        })
      }
      // 让评论列表滚到顶部
      window.scrollTo(0, 0)
    },
    replayComment (comment) {
      this.parentReplayObj = comment
    }
  }
}

</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      padding: 0 0 0 0;
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
      padding: 20px 0 10px 0;
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
</style>
