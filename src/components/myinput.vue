<template>
    <input
    type="text"
    class="inp"
    :value="value"
     @input="resinput"
     @blur="resblur"
    :class="{error:!statu,success:statu}"
     >
</template>

<script>
export default {
  // rules： 文本框的验证规则
  // msg_mis:输入不合法时的提示文本
  props: ['value', 'rules', 'msg_mis'],
  data () {
    return {
      statu: false
    }
  },

  methods: {
    // 相应文本框内容的变化
    resinput (event) {
      // 要告诉父组件内容变化，并且要告诉父组件内容到底 现在是什么值
      let value = event.target.value
      // 验证当前的输入是否合法
      if (this.rules) {
        if (this.rules.test(value)) {
          this.statu = true
        } else {
          this.statu = false
        }
      } else {
        this.statu = !!value
      }

      this.$emit('input', value)
    },
    // 响应文本框失去焦点
    resblur (event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        console.log(this.msg_mis)
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .inp{
    width: 314*100vw/360;
    height: 40*100vw/360;
    border:none;
    outline: none;
    border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
}
.error{
    border-bottom-color:red;
}
.success{
    border-bottom-color:green;
}
</style>
