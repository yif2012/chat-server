<template>
    <div>
      <mt-header :title="title"></mt-header>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      showLeft: true
    }
  },
  computed: {
    ...mapGetters([
      'title'
    ]),
    name () {
      return this.$route.name
    }
  },
  methods: {
    save () {
      alert(this.title)
    },
    back () {
      this.$router.go(-1)
    },
    // 检测当前是否为tab最顶层页面
    checkIsTop () {
      // 不需要后退按钮的路由name
      const topPageName = ['login', 'contactBook', 'activity', 'account']
      const routerName = this.$route.name
      if (topPageName.indexOf(routerName) >= 0) {
        this.showLeft = false
      } else {
        this.showLeft = true
      }
    }
  },
  mounted () {
    this.checkIsTop()
  },
  watch: {
    name () {
      this.checkIsTop()
    }
  }
}
</script>
