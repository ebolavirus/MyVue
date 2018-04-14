<template>
  <bpm-c-toptitle title="基本信息"
                  @click="click_toptitle"
                  :isCollapse="true">
    <bpm-c-block  :preadonly="true"
                  ptitle="申请单号"
                  pinputtype="text"
                  :pline="1"
                  pcontent="FY201712000005"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="申请日期"
                  pinputtype="text"
                  pcontent="2017-12-6 15:46:34"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="申请人"
                  pinputtype="text"
                  pcontent="任高勇"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="申请公司/部门"
                  pinputtype="text"
                  pcontent="/万华集团/万华化学集团股份有限公司/信息中心/协同办公"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="申请人电话"
                  pinputtype="text"
                  pcontent="18153517096"/>
  </bpm-c-toptitle>
</template>

<script>
export default {
  name: 'bpmDBasearea',
  data () {
    return {
      msg: 'Welcome to  Vue.js App'
    }
  },
  methods: {
    click_toptitle () {
      // alert('点击')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
