<template>
  <div class="body">
    <bpm-c-navbar title="费用报销核算流程-制证"/>
    <bpm-d-basearea/>
    <bpm-d-businessarea :readonlys="[true, true, true, true, true, true, true, true]"
                        :shows="[true, true, true, true, true, true, false, false]"/>
    <bpm-d-attacharea/>
  </div>
</template>

<script>
export default {
  name: 'MainScene',
  data () {
    return {}
  },
  methods: {
    click_toptitle () {
      alert('点击')
    }
  },
  created () {
    // 设置当前状态为起草
    this.$store.dispatch('setPageType', 'other')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body {
    display: flex;
    flex-direction: column;
    font-size: 12px;
  }
</style>
