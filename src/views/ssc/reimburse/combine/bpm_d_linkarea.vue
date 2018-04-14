<template>
<bpm-c-subtitle title="流程链接"
                :isCollapse="true">
  <bpm-c-block  :preadonly="false"
                ptitle="培训申请链接"
                pinputtype="trainlink"
                pcontent=""/>
  <bpm-c-block  :preadonly="false"
                ptitle="出国申请链接"
                pinputtype="aboardlink"
                pcontent=""/>
</bpm-c-subtitle>
</template>

<script>
export default {
  name: 'bpmDLinkarea',
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
