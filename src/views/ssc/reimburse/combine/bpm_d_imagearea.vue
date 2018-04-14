<template>
<bpm-c-subtitle title="报销单据影像链接"
                :isCollapse="true">
  <bpm-c-block  :preadonly="true"
                ptitle="报销影印链接"
                pinputtype="url"
                :pcontent="JSON.stringify({text:1,url:'http://www.baidu.com'})"/>
  <bpm-c-block  :preadonly="true"
                ptitle=""
                pinputtype="text"
                pcontent=""/>
</bpm-c-subtitle>
</template>

<script>
export default {
  name: 'bpmDImagearea',
  data () {
    return {
      msg: 'Welcome to  Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
