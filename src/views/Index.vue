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
      // 获取当前栏目的新闻数据，如新闻列表长度为0说明还没有获取过这个栏目的数据，那么就发起请求
      // 如果已经有数据则无需再发请求
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
    // 获取所有栏目数据
    let res = await userCate()
    console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // 对数据进行改造，添加能够满足业务需求的成员
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [], // 当前栏目的新闻列表数据
          pageIndex: 1, // 当前栏目的页码
          pageSize: 5, // 当前栏目每页所显示的新闻数据
          loading: false, // 当前栏目更多数据加载状态，默认为不在加载数据
          finished: false, // 数据是否已经完毕加载完毕，默认为没有完毕
          isLoading: false// 标记是否处于下拉刷新的状态，默认为false
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
