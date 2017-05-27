<style scoped>
    .bg {
        height: 100vh;
        overflow: auto;
        margin-bottom: 52px;
    }
    p {
      margin: 16px;
    }
    
    .other {
      text-align: left;
      margin-bottom: 10px;
    }
    
    .me {
      text-align: right;
      margin-bottom: 10px;
    }
    
    .content {
      position: relative;
      color: #000;
      border-radius: 5px;
      padding: 5px;
      display: inline-block;
      max-width: 150px;
      word-break: break-all;
      font-size: 12px;
    }
    
    .other .content {
      margin-left: 11px;
      background-color: #FFF;
    }
    
    .me .content {
      margin-right: 11px;
      background-color: #98e165;
      text-align: left;
    }
    
    .other .name,
    .me .name {
      font-size: 12px;
      color: #777;
    }
    
    .arrow {
      position: absolute;
      top: 2px;
      /* 圆角的位置需要细心调试哦 */
      width: 0;
      height: 0;
      font-size: 0;
      border: solid 6px;
    }
    
    .me .arrow {
      right: -11px;
      border-color: transparent transparent transparent #98e165;
    }
    
    .other .arrow {
      left: -11px;
      border-color: transparent #FFF transparent transparent;
    }
    
    #contentList p {
      text-align: center;
    }
    
    #contentList p span {
      background-color: #ddd;
      border-radius: 5px;
      padding: 2px 5px;
      font-size: 12px;
      display: inline-block;
      color: #444;
    }
    .input {
      position: fixed;
      bottom: 51px;
      width: 100%;
    }
</style>
<template>
  <div class="bg">
    <div id="contentList">
      <div class="input">
        <mt-field label="" placeholder="输入聊天内容" autofocus="autofocus">
          <mt-button type="primary" size="small" @click="send()">发送</mt-button>
        </mt-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    send: function () {
      debugger
      this.$store.state.io.emit('messageClient', '123')
    }
  }
}
</script>
