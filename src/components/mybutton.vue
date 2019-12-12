<template>
  <div class="btn" @click="button_on">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    button_on () {
      this.$emit('click')
    }
  }
}
</script>

<style lang='less'>
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
