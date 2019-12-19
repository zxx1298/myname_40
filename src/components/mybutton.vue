<template>
  <div class="btn" @click="button_on">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    // 当被点击的时候，将事件传递给父组件，让父组件进行事件的相应
    button_on (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.btn{
    width: 318*100vw/360;
    height: 48*100vw/360;
    background-color: red;
    border-radius: 24*100vw/360;
    text-align: center;
    color: #fff;
    line-height: 48*100vw/360;
    font-size: 18px;
}
</style>
