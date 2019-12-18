<template>
  <div class="cell" @click="cell_on">
    <div class="left">{{title}}</div>
    <div class="right">{{type==='password'?"******":crue}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'crue', 'type'],
  methods: {
    cell_on (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less'  scoped>
.cell{
  height: 60*100vw/360;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin: 0 15px;
  .right{
    color: #aaa;
    font-size: 13px;
  }
}
</style>
