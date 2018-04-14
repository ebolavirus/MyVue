<template>
  <div class="body">
    <bpm-c-navbar title="历史"
                  :showLeft="true"
                  @btnClicked="btnClicked"
                  :rightShowArray="['signout','close']"/>
    <bpm-d-hishead />
    <bpm-d-hislist />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'MainScene',
  data () {
    return {
      isDialogVisible: false
    }
  },
  computed: {
    ...mapState(['userId']),
    ...mapState(['bpdUri']),
    ...mapState(['tsPiid']),
    ...mapState(['ssc'])

  },
  created () {
    // 设置当前状态为起草
    // this.$store.dispatch('setTaskStatus', taskStatus.draft)
    // this.$store.dispatch('setUserId', 'xiahui')
    // this.$store.dispatch('setBpdUri', 'MTV3@MobileTestV3')
  },
  methods: {
    ...mapActions(['startProcess']),
    click_toptitle () {
      alert('点击')
    },
    btnClicked (aNum) {
    },
    submitClicked (aNum) {
      console.log(aNum)
      if (aNum === 2) {
        this.isDialogVisible = false
      }
    }
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
