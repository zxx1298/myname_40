<template>
  <div class="collect">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <van-swipe-cell outside v-for="(item,index) in collectList" :key="item.id" >
        <articleblock :post="item"></articleblock>
        <template slot="right" >
          <van-button square  type="danger" text="删除" @click="btn_dian(item.id,index)"/>
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import articleblock from '@/components/my_articleBlock.vue'
import myheader from '@/components/my_header'
import { getCollect } from '@/api/users.js'
import { userStar } from '@/api/article.js'
export default {
  components: {
    myheader, articleblock
  },
  data () {
    return {
      collectList: {}
    }
  },
  async mounted () {
    let res = await getCollect()
    console.log(res)
    if (res.status === 200) {
      this.collectList = res.data.data
    }
  },
  methods: {
    async btn_dian (id, index) {
      let res1 = await userStar(id)
      console.log(res1)
      if (res1.status === 200) {
        this.collectList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang='less' scoped>
/deep/.van-swipe-cell__right{
    top:40px
}
</style>
