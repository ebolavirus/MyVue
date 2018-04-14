<template>
  <div class="body"
       :v-loading="flowLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)" >
    <bpm-c-navbar title="费用报销核算流程1"
                  :showLeft="true"
                  @submitVerify="submitVerify"
                  @confirmVerify="confirmVerify"
                  :rightShowArray="['submit','save','signout','close']"/>
    <bpm-d-basearea/>
    <bpm-d-businessarea :readonlys="[false, false, false, false, false, false, true, true]"/>
    <bpm-d-attacharea />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'MainScene',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['apiloading', 'isSubmitVerify', 'isConfirmVerify', 'isStartProc', 'targetUsers', 'approvalType', 'completeTaskType', 'lang', 'userId', 'bpdUri', 'tsId', 'target']),
    ...mapState(['ssc']),
    flowLoading: function () {
      return this.apiloading
    }
  },
  created () {
    // 设置当前状态为起草
    this.$store.dispatch('setPageType', 'draft')
    this.$store.dispatch('setUserId', 'gyren')
    this.$store.dispatch('setBpdUri', 'MTV3@MobileTestV3')
  },
  methods: {
    ...mapActions(['setApiloading', 'setIsSubmitVerify', 'setIsConfirmVerify', 'startProcess', 'setIsStartProc']),
    click_toptitle () {
      alert('点击')
    },
    submitVerify () {
      console.log('submitVerify start- >')
      // todo 业务校验
      console.log('submitVerify end- >')
      this.setIsSubmitVerify(true)
    },
    confirmVerify () {
      console.log('confirmVerify 校验业务数据开始- >')
      // todo 业务校验
      console.log('confirmVerify 校验业务数据结束- >')
      this.setIsConfirmVerify(true)
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
