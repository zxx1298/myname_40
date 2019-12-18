<template>

<div class="index">
    <div class="header">
    <span class="iconfont iconnew icon"></span>
    <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
    </div>
    <van-icon name="manager-o" class="icon" @click="jump"/>
    </div>
    <van-tabs v-model="active" sticky swipeable>
        <van-tab :title="data.name" v-for='data in cateList' :key='data.id'>
          <van-list
              :offset='10'
              :immediate-check='false'
              v-model="data.loading"
              :finished="data.finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
            <van-pull-refresh v-model="data.isLoading" @refresh="onRefresh">
              <myarticle v-for="post in data.postList" :key='post.id' :post='post'></myarticle>
            </van-pull-refresh>
          </van-list>
        </van-tab>
    </van-tabs>
</div>

</template>

<script>
import { userCate } from '@/api/cate.js'
import { articleList } from '@/api/article.js'
import myarticle from '@/components/my_articleBlock.vue'
export default {
  components: {
    myarticle
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) { this.getpostList() }
    }
  },
  data () {
    return {
      active: localStorage.getItem('heima_40_token') ? 1 : 0,
      cateList: []
    }
  },
  async mounted () {
    let res = await userCate()
    console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [],
          pageIndex: 1,
          pageSize: 5,
          loading: false,
          finished: false,
          isLoading: false
        }
      })
      this.getpostList()
    }
  },
  methods: {
    async getpostList () {
      let res1 = await articleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      console.log(res1)
      // this.cateList[this.active].postList = res1.data.data
      this.cateList[this.active].postList.push(...res1.data.data)
      this.cateList[this.active].loading = false
      this.cateList[this.active].isLoading = false
      if (res1.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.cateList[this.active].pageIndex++
        this.getpostList()
      }, 3000)
    },
    onRefresh () {
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].finished = false
      setTimeout(() => {
        this.cateList[this.active].postList.length = 0
        this.getpostList()
      }, 3000)
    },
    jump () {
      this.$router.push({ path: `/personal/${window.localStorage.getItem('heima_40_id')}` })
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
