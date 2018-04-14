<template>
  <div class="body">
    <div class="pageItem" @click="push('SscReimburseDraft')">起草</div>
    <div class="pageItem" @click="push('SscReimburseApprove')">审批</div>
    <div class="pageItem" @click="push('SscReimburseApproveFee')">制证</div>
    <div class="pageItem" @click="push('SscReimburseView')">查看</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
    push (pathName) {
      this.$router.push(pathName)
    }
  },
  created () {
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.pageItem{
  font-size: 30px;
  height:100px;
  border:1px lightgrey solid;
  background: lightblue;
}
</style>
