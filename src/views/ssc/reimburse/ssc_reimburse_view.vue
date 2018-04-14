<template>
  <div class="body">
    <bpm-c-navbar title="费用报销核算流程"
                  :showLeft="true"
                  :rightShowArray = "['submit', 'close']"
                  @btnClicked="btnClicked"/>
    <bpm-d-basearea />
    <bpm-d-businessarea :readonlys="[true, true, true, true, true, true, true, true]"
                        :shows="[true, true, true, true, true, true, false, false]"/>
    <bpm-d-attacharea />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'ViewScene',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['startProcess']),
    btnClicked (aNum) {
      console.log('aaa', aNum)
      switch (aNum) {
        case 1: break
        // me.$router.replace({name: 'loading', appid: appid})
        case 2: this.$router.replace({name: 'HistoryScene'})
          break
        case 3: this.$router.replace({name: 'StoryScene'})
          break
        default:break
      }
    }
  },
  created () {
    // 设置当前状态为只读
    this.$store.dispatch('setPageType', 'view')
    this.$store.dispatch('setTsId', 'PIID-48fe3cf7-162d-465d-b27d-985f9af941ca')
    // load resource
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
