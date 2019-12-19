<template>
  <div class="comment">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment" @click="$router.push({ path: `/commonts/${article.id}`})" >
        <i class="iconfont iconpinglun-"></i>
        <em>{{article.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" :class="{active:article.has_star}" @click="onStar"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" :placeholder="placeholder"></textarea>
        <div>
            <span @click="send">发送</span>
            <span @click='cancelReplay'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { userStar, postComment } from '@/api/article.js'
export default {
  props: ['article', 'replayObj'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  watch: {
    replayObj () {
      if (this.replayObj) {
        this.isFocus = true
        // console.log(this.replayObj)
        this.placeholder = '@' + this.replayObj.user.nickname
      }
    }
  },
  methods: {
    // 获取焦点时触发
    handlerFocus () {
      this.isFocus = true
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    // 收藏文章和取消文章收藏
    async onStar () {
      let res = await userStar(this.article.id)
      console.log(res)
      this.$toast.success(res.data.message)
      this.article.has_star = !this.article.has_star
    },
    // 取消评论
    cancelReplay () {
      this.isFocus = false
      this.$refs.commtext.value = ''
      this.$emit('resetValue')
    },
    async send () {
      // 发表评论
      let data = {
        content: this.$refs.commtext.value
      }
      console.log(data)
      // 判断是否回复某一条评论
      if (this.replayObj) {
        data.parent_id = this.replayObj.id
      }
      let res1 = await postComment(this.article.id, data)
      console.log(res1)
      if (res1.status === 200) {
        this.isFocus = false
        this.$toast.success(res1.data.message)
        this.$refs.commtext.value = ''
        // 通知父组件刷新数据
        this.$emit('refresh')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.comment{
    position: fixed;
    bottom: 0;
    left: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  .active{
      color:red;
  }
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
