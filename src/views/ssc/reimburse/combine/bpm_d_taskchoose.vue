<template>
  <div class="mainbody" aria-label="Coach">
    <bpm-c-navbar :title="title"
                  @navClicked="navClicked"
                  :showLeft="false"
                  :rightShowArray="['save','close']"/>
    <div>
      <bpm-c-block ptitle="申请人"
                   :preadonly="true"
                   pinputtype="text"
                   v-model="input1" />
      <bpm-c-block ptitle="流程名称"
                   :preadonly="true"
                   pinputtype="text"
                   v-model="input2" />
    </div>
    <bpm-c-gridmain
      :height="380"
      :showCheckbox="false"
      @gridDBLClick="selectedClicked"
      :gridInfo="gridInfo"
      :gridTitleInfo="gridTitleInfo"
      :gridShowInfo="gridShowInfo"
      :gridWidthInfo="gridWidthInfo"/>
    <bpm-c-gridpage />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'bpmDTaskchoose',
  props: {
    title: '',
    pselectType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['queryCostCenter']),
    valueChanged (aValue, aIndex) {
      if (aIndex === 1) {
        this.input1 = aValue
      } else if (aIndex === 2) {
        this.input2 = aValue
      }
    },
    navClicked (atype) {
      if (atype === 'close') {
        this.$emit('closeClicked')
      }
    },
    queryClicked () {
      console.log(this.input1, this.input2)
    },
    selectedClicked (aindex) {
      console.log('choose', aindex)
      this.$emit('selectClicked', this.gridInfo[aindex])
    }
  },
  computed: {
    ...mapState(['ssc', 'chooseDialogEnum']),
    input1 () {
      return 'yywangc'
    },
    input2 () {
      if (this.pselectType === this.chooseDialogEnum.trainlink) {
        return '培训申请'
      } else if (this.pselectType === this.chooseDialogEnum.aboardlink) {
        return '出国或签证(V3)'
      }
    },
    gridInfo () {
      return this.ssc.reimburse.costCenterList
    },
    gridShowInfo () {
      return ['bBpdNameLocale', 'piid', 'createTime', 'btNo', 'completeTime', 'deptName']
    },
    blockTitleInfo () {
      return ['申请人', '流程名称']
    },
    gridTitleInfo () {
      return ['流程类型', '流程实例', '创建时间', '单号', '完成时间', '发起部门']
    },
    gridWidthInfo () {
      return [100, 80, 140, 140, 140, 380]
    }
  },
  mounted () {
    if (this.pselectType === this.chooseDialogEnum.reimbursecompanycostcenter) {
      this.queryCostCenter({ me: this, queryCostCentCode: this.input2, queryCostCentName: this.input1 })
    } else if (this.pselectType === this.chooseDialogEnum.internalorder) {
    } else if (this.pselectType === this.chooseDialogEnum.subject) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainbody {
    width: 980px;
    height: 550px;
  }
</style>
