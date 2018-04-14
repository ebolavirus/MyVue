<template>
  <div class="mainbody" aria-label="Coach">
    <bpm-c-navbar :title="title"
                  @navClicked="navClicked"
                  :showLeft="false"
                  :rightShowArray="['save','close']"/>
    <div>
      <bpm-c-block :ptitle="blockTitleInfo[0]"
                   pinputtype="text"
                   @valueChanged="valueChanged($event,1)"
                   v-model="input1" />
      <bpm-c-blockbutton ptitle="查询"
                         pcontent=""
                         @chicked="queryClicked" />
      <bpm-c-block :ptitle="blockTitleInfo[1]"
                    :pline="1"
                    pinputtype="text"
                   @valueChanged="valueChanged($event,2)"
                   v-model="input2" />
    </div>
    <bpm-c-gridmain
      :height="408"
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
  name: 'bpmDCommonchoose',
  props: {
    title: '',
    pselectType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input1: '',
      input2: ''
    }
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
    gridInfo () {
      return this.ssc.reimburse.costCenterList
    },
    gridShowInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanycostcenter) {
        return ['costCenterCode', 'costCenterName']
      } else if (this.pselectType === this.chooseDialogEnum.internalorder) {
        return ['inwardOrderCode', 'inwardOrderName']
      } else if (this.pselectType === this.chooseDialogEnum.subject) {
        return ['budgetSubjectCode', 'budgetSubjectName']
      }
    },
    blockTitleInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanycostcenter) {
        return ['成本中心名称', '成本中心代码']
      } else if (this.pselectType === this.chooseDialogEnum.internalorder) {
        return ['内部订单名称', '内部订单代码']
      } else if (this.pselectType === this.chooseDialogEnum.subject) {
        return ['科目名称', '科目代码']
      }
    },
    gridTitleInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanycostcenter) {
        return ['成本中心代码', '成本中心名称']
      } else if (this.pselectType === this.chooseDialogEnum.internalorder) {
        return ['内部订单代码', '内部订单名称']
      } else if (this.pselectType === this.chooseDialogEnum.subject) {
        return ['科目代码', '科目名称']
      }
    },
    gridWidthInfo () {
      return [490, 490]
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
