<template>
  <div class="mainbody" aria-label="Coach">
    <bpm-c-navbar :title="title"
                  @navClicked="navClicked"
                  :showLeft="false"
                  :rightShowArray="['save','close']" />
    <bpm-c-toptitle title="报销明细"
                    :isCollapse="true">
      <div>
        <bpm-c-block :preadonly="false"
                     ptitle="内部订单"
                     pinputtype="internalorder"
                     pcontent="" />
        <bpm-c-block :preadonly="false"
                     ptitle="核算科目"
                     pinputtype="subject"
                     pcontent="" />
        <bpm-c-block :preadonly="true"
                     ptitle="不含税金额"
                     pinputtype="number"
                     pcontent="1,100.00" />
        <bpm-c-block :preadonly="true"
                     ptitle="税额"
                     pinputtype="number"
                     pcontent="0.00" />
        <bpm-c-block :preadonly="true"
                     ptitle="申请报销金额"
                     pinputtype="number"
                     pcontent="1,100.00" />
        <bpm-c-block :preadonly="true"
                     ptitle="实际报销金额"
                     pinputtype="number"
                     pcontent="1,100.00" />
        <bpm-c-block :preadonly="false"
                     pinputtype="textarea"
                     ptitle="摘要"
                     pcontent="1,100.00" />
      </div>
    </bpm-c-toptitle>
    <bpm-c-toptitle title="差旅费明细"
                    :isCollapse="true">
      <div>
        <bpm-c-blockradio :preadonly="false"
                          ptitle="内部订单"
                          v-model="radioValue"
                          :pvalues="['IN', 'OUT']"
                          :poptions="['中国','其他国家或地区']"/>
        <bpm-c-tab :preadonly="false"
                   :ptabs="['车船费明细','住宿费明细','出租费明细','出差补贴明细']"
                   v-model="tabIndex"/>
        <div v-if="tabIndex === 0">
          <bpm-d-grid
            :key="tabIndex"
            :inputTitle="inputTitle[tabIndex]"
            :inputLine="inputLine[tabIndex]"
            :inputType="inputType[tabIndex]"
            :inputKey="inputKey[tabIndex]"
            :inputReadonly="inputReadonly[tabIndex]"
            :showCheckbox="true"
            :height="300"
            :gridInfo="gridInfo[tabIndex]"
            :gridTitleInfo="gridTitleInfo[tabIndex]"
            :gridShowInfo="gridShowInfo[tabIndex]"
            :gridWidthInfo="gridWidthInfo[tabIndex]"
          />
          <bpm-c-block :preadonly="true"
                       :pline="1"
                       ptitle="实际报销金额"
                       pinputtype="number"
                       pcontent="0.00" />
        </div>
        <div v-else-if="tabIndex === 1">
          <bpm-d-grid
            :key="tabIndex"
            :inputTitle="inputTitle[tabIndex]"
            :inputLine="inputLine[tabIndex]"
            :inputType="inputType[tabIndex]"
            :inputKey="inputKey[tabIndex]"
            :inputReadonly="inputReadonly[tabIndex]"
            :showCheckbox="true"
            :height="300"
            :gridInfo="gridInfo[tabIndex]"
            :gridTitleInfo="gridTitleInfo[tabIndex]"
            :gridShowInfo="gridShowInfo[tabIndex]"
            :gridWidthInfo="gridWidthInfo[tabIndex]"
          />
          <bpm-c-block :preadonly="true"
                       :pline="1"
                       ptitle="实际报销金额"
                       pinputtype="number"
                       pcontent="0.00" />
        </div>
        <div v-else-if="tabIndex === 2">
          <bpm-d-grid
            :key="tabIndex"
            :inputTitle="inputTitle[tabIndex]"
            :inputLine="inputLine[tabIndex]"
            :inputType="inputType[tabIndex]"
            :inputKey="inputKey[tabIndex]"
            :inputReadonly="inputReadonly[tabIndex]"
            :showCheckbox="true"
            :height="300"
            :gridInfo="gridInfo[tabIndex]"
            :gridTitleInfo="gridTitleInfo[tabIndex]"
            :gridShowInfo="gridShowInfo[tabIndex]"
            :gridWidthInfo="gridWidthInfo[tabIndex]"
          />
          <bpm-c-block :preadonly="true"
                       :pline="1"
                       ptitle="实际报销金额"
                       pinputtype="number"
                       pcontent="0.00" />
        </div>
        <div v-else-if="tabIndex === 3">
          <bpm-d-grid
            :key="tabIndex"
            :inputTitle="inputTitle[tabIndex]"
            :inputLine="inputLine[tabIndex]"
            :inputType="inputType[tabIndex]"
            :inputKey="inputKey[tabIndex]"
            :inputReadonly="inputReadonly[tabIndex]"
            :showCheckbox="true"
            :height="300"
            :gridInfo="gridInfo[tabIndex]"
            :gridTitleInfo="gridTitleInfo[tabIndex]"
            :gridShowInfo="gridShowInfo[tabIndex]"
            :gridWidthInfo="gridWidthInfo[tabIndex]"
          />
          <bpm-c-block :preadonly="true"
                       :pline="1"
                       ptitle="实际报销金额"
                       pinputtype="number"
                       pcontent="0.00" />
        </div>
      </div>
    </bpm-c-toptitle>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'bpmDFeeChoose',
  props: {
    title: '',
    dialogVisible: {
      type: Number,
      default: -1
    },
    pselectType: {
      type: String,
      default: ''
    }
  },
  data () {
    let inputTitle = []
    inputTitle[0] = ['国家', '出差城市', '出发日期', '离开日期', '不含税金额', '税额', '票面金额', '实际报销金额', '备注']
    inputTitle[1] = ['国家', '入住城市', '酒店名称', '入住天数', '不含税金额', '税额', '票面金额', '实际报销金额', '入住人数', '同行人员(男)', '同行人员(女)', '备注']
    inputTitle[2] = ['票面金额', '实际报销金额', '票据张数', '备注']
    inputTitle[3] = ['城市', '补贴标准', '补贴天数', '实际补贴金额', '备注']
    let inputLine = []
    inputLine[0] = [2, 2, 2, 2, 2, 2, 2, 2, 1]
    inputLine[1] = [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1]
    inputLine[2] = [2, 2, 1, 1]
    inputLine[3] = [2, 2, 2, 2, 1]
    let inputType = []
    inputType[0] = ['text', 'text', 'date', 'date', 'number', 'number', 'number', 'number', 'textarea']
    inputType[1] = ['text', 'text', 'text', 'number', 'number', 'number', 'number', 'number', 'number', 'text', 'text', 'textarea']
    inputType[2] = ['number', 'number', 'number', 'textarea']
    inputType[3] = ['text', 'number', 'number', 'number', 'textarea']
    let inputKey = []
    inputKey[0] = ['info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7', 'info8', 'info9']
    inputKey[1] = ['info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7', 'info8', 'info9', 'info10', 'info11', 'info12']
    inputKey[2] = ['info1', 'info2', 'info3', 'info4']
    inputKey[3] = ['info1', 'info2', 'info3', 'info4', 'info5']
    let inputReadonly = []
    inputReadonly[0] = [false, false, false, false, false, false, true, true, false]
    inputReadonly[1] = [false, false, false, false, false, false, true, true, false, false, false, false]
    inputReadonly[2] = [false, true, false, false]
    inputReadonly[3] = [false, false, false, true, false]
    let gridInfo = [[], [], [], []]
    let gridShowInfo = []
    gridShowInfo[0] = ['info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7', 'info8', 'info9']
    gridShowInfo[1] = ['info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7', 'info8', 'info9', 'info10']
    gridShowInfo[2] = ['info1', 'info2', 'info3', 'info4']
    gridShowInfo[3] = ['info1', 'info2', 'info3', 'info4', 'info5']
    let gridTitleInfo = []
    gridTitleInfo[0] = ['国家', '出差城市', '出发日期', '离开日期', '不含税金额', '税额', '票面金额', '实际报销金额', '备注']
    gridTitleInfo[1] = ['国家', '入住城市', '酒店名称', '入住天数', '不含税金额', '税额', '票面金额', '实际报销金额', '入住人数', '备注']
    gridTitleInfo[2] = ['票面金额', '实际报销金额', '票据张数', '备注']
    gridTitleInfo[3] = ['城市', '补贴标准', '补贴天数', '实际补贴金额', '备注']
    let gridWidthInfo = []
    gridWidthInfo[0] = [80, 80, 80, 80, 80, 80, 80, 80, 300]
    gridWidthInfo[1] = [80, 80, 80, 80, 80, 80, 80, 80, 80, 220]
    gridWidthInfo[2] = [220, 220, 200, 300]
    gridWidthInfo[3] = [160, 160, 160, 160, 300]
    return {
      inputTitle: inputTitle,
      inputLine: inputLine,
      inputType: inputType,
      inputKey: inputKey,
      inputReadonly: inputReadonly,
      gridInfo: gridInfo,
      gridTitleInfo: gridTitleInfo,
      gridShowInfo: gridShowInfo,
      gridWidthInfo: gridWidthInfo,
      tabIndex: 0,
      radioValue: 'IN'
    }
  },
  computed: {
    ...mapState(['chooseDialogEnum']),
    isDialogVisible () {
      return this.dialogVisible >= 0
    }
  },
  watch: {
    radioValue (to) {
      console.log('rebrusechoose value changed......', to)
    }
  },
  methods: {
    addClicked () {
    },
    updateClicked () {},
    deleteClicked () {},
    navClicked (atype) {
      if (atype === 'close') {
        this.$emit('closeClicked')
      }
    },
    selectClick (i) {
      console.log(i)
      this.dialogVisible = i
    },
    selDialogClicked (aObj) {
      this.dialogVisible = -1
      console.log('choose', aObj)
    },
    setDialogClose () {
      this.dialogVisible = -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainbody {
    width: 980px;
    min-height: 200px;
  }
</style>
