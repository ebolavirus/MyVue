<template>
  <div class="mainbody" aria-label="Coach">
    <bpm-c-navbar :title="title"
                  @navClicked="navClicked"
                  :showLeft="false"
                  :rightShowArray="['save','close']"/>
    <bpm-c-gridmain
      :height="458"
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
  name: 'bpmDSimplechoose',
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
    navClicked (atype) {
      if (atype === 'close') {
        this.$emit('closeClicked')
      }
    },
    selectedClicked (aindex) {
      console.log('choose', aindex)
      this.$emit('selectClicked', this.gridInfo[aindex])
    },
    ...mapActions(['getCrossCompany'])
  },
  computed: {
    ...mapState(['ssc', 'chooseDialogEnum']),
    gridInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanyname) {
        return this.ssc.reimburse.crossCompanyInfo
      } else if (this.pselectType === this.chooseDialogEnum.accountBankNumber) {
        return []
      }
    },
    gridShowInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanyname) {
        return ['companycode', 'companyname']
      } else if (this.pselectType === this.chooseDialogEnum.accountBankNumber) {
        return ['bankCode', 'employeeBankNo', 'bankName']
      }
    },
    gridTitleInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanyname) {
        return ['公司代码', '公司名称']
      } else if (this.pselectType === this.chooseDialogEnum.accountBankNumber) {
        return ['银行代码', '银行卡号', '银行名称']
      }
    },
    gridWidthInfo () {
      if (this.pselectType === this.chooseDialogEnum.reimbursecompanyname) {
        return [490, 490]
      } else if (this.pselectType === this.chooseDialogEnum.accountBankNumber) {
        return [300, 330, 350]
      }
    }
  },
  mounted () {
    if (this.pselectType === this.chooseDialogEnum.reimbursecompanyname) {
      this.getCrossCompany({ me: this })
    } else if (this.pselectType === this.chooseDialogEnum.accountBankNumber) {
    }
  },
  created () {
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
