<template>
  <bpm-c-toptitle title="当前状态"
                  :isCollapse="true">
    <bpm-c-block  :preadonly="true"
                  ptitle="任务名称"
                  pinputtype="text"
                  v-model="taskInfo.info1"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="用户"
                  pinputtype="text"
                  v-model="taskInfo.info2"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="任务类型"
                  pinputtype="text"
                  v-model="taskInfo.info3"/>
    <bpm-c-block  :preadonly="true"
                  ptitle=""
                  pinputtype="text"
                  pcontent=""/>
  </bpm-c-toptitle>
</template>

<script>
export default {
  name: 'bpmDHisheadArea',
  data () {
    let taskInfo = {
      info1: '起草',
      info2: '王燕燕',
      info3: '单一签核'
    }
    return {
      taskInfo: taskInfo
    }
  },
  methods: {
    addClicked () {
    },
    updateClicked () {
    },
    deleteClicked () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
