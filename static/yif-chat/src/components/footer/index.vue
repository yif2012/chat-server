<template>
    <mt-tabbar>
        <mt-tab-item id="tab1" :class="{'is-selected': isSelected === 'chat'}" @click.native="router('chat')">
            <i class="icon iconfont">&#xe60e;</i>
            聊天室
        </mt-tab-item>        
        <mt-tab-item id="tab4" :class="{'is-selected': isSelected === 'me'}" @click.native="router('me')">
            <i class="icon iconfont">&#xe60a;</i>
            我
        </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
  data () {
    return {
      isSelected: 'chat'
    }
  },
  computed: {
    routeName () {
      const fullPath = this.$route.fullPath
      const name = fullPath.split('index/')[1].split('/')[0]
      return name
    }
  },
  created () {
  },
  mounted () {
    this.isSelected = this.routeName
  },
  methods: {
    router (name) {
      this.isSelected = name
      if (this.$route.name === name) return
      if (name === 'income') {
        this.$router.push({ name: 'income', params: { type: 0 } })
      } else {
        this.$router.push({ name })
      }
      this.$router.push({name})
    }
  },
  watch: {
    routeName (val) {
      this.isSelected = this.routeName
    }
  }
}
</script>
<style>
    .iconfont {font-size: 20px !important;display: block;margin-bottom: 5px;}
    .is-selected {background-color: #fafafa!important;border-top: 1px solid #eaeaea;}
</style>
