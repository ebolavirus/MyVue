<template>
  <div>
    <div v-if="needHead" v-show="headVisible">
      <bpm-c-subtitle :title="title"
                      :isCollapse="true"></bpm-c-subtitle>
      <div class="content">
        <bpm-c-block v-for="(val,i) in inputTitle"
                     :key="i"
                     :ptitle="val"
                     :preadonly="inputReadonly[i]"
                     :pinputtype="inputType[i]"
                     :pline="inputLine[i]"
                     v-model="selectedGridInfo[inputKey[i]]"
                     @valueChanged="valueChanged($event,i)"
                     :pcontent="pcontent(i)"
        />
      </div>
    </div>
    <bpm-c-gridbar v-if="needBar" note="提示:双击记录进行编辑或查看"
                   :showArray="['zhizheng','add','delete','']"
                   :show="headVisible"
                   @rightCancelClicked="rightCancelClicked"
                   @rightSaveClicked="rightSaveClicked"
                   @addClicked="addClicked"
                   @updateClicked="updateClicked"
                   @deleteClicked="deleteClicked"/>
    <bpm-c-gridmain
      @gridClick="gridClicked"
      @gridDBLClick="gridDBLClicked"
      :height="height"
      :showCheckbox="showCheckbox"
      :gridInfo="gridInfo"
      :gridTitleInfo="gridTitleInfo"
      :gridShowInfo="gridShowInfo"
      :gridWidthInfo="gridWidthInfo"/>
    <bpm-c-gridpage/>
  </div>
</template>

<script>
export default {
  name: 'bpmDGrid',
  props: {
    inputTitle: {
      type: Array,
      default () {
        return []
      }
    },
    needHead: {
      type: Boolean,
      default: true
    },
    needBar: {
      type: Boolean,
      default: true
    },
    inputLine: {
      type: Array,
      default () {
        return []
      }
    },
    inputType: {
      type: Array,
      default () {
        return []
      }
    },
    inputKey: {
      type: Array,
      default () {
        return []
      }
    },
    inputReadonly: {
      type: Array,
      default () {
        return []
      }
    },
    gridInfo: {
      type: Array,
      default () {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 200
    },
    gridTitleInfo: {
      type: Array,
      default () {
        return []
      }
    },
    gridShowInfo: {
      type: Array,
      default () {
        return []
      }
    },
    gridWidthInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      headVisible: false,
      selectedGridInfo: {},
      title: '表单详情'
    }
  },
  methods: {
    pcontent (i) {
      if (!this.selectedGridInfo || !this.inputKey) {
        return ''
      }
      return this.selectedGridInfo[this.inputKey[i]]
    },
    updateClicked () {
      this.alert(12321)
      // this.dialogVisible = true
      this.headVisible = !this.headVisible
      this.$emit('updateClicked')
    },
    addClicked () {
      this.headVisible = !this.headVisible
      this.$emit('addClicked')
    },
    deleteClicked () {
      this.$emit('deleteClicked')
    },
    rightCancelClicked () {
      this.headVisible = !this.headVisible
    },
    rightSaveClicked () {
      this.headVisible = !this.headVisible
    },
    gridClicked (index) {
      console.log('clicked', index)
      this.selectedGridInfo = this.gridInfo[index]
      /* this.headVisible = !this.headVisible */
    },
    gridDBLClicked (index) {
      console.log('double clicked', index)
      this.headVisible = true
      this.selectedGridInfo = this.gridInfo[index]
    },
    setDialogClose () {
      this.dialogVisible = false
    },
    login () {

    },
    valueChanged (eventValue, index) {
      // let keyValue = this.inputKey[index]
      // this.selectedGridInfo[keyValue] = eventValue
      console.log('selected UPDATED')
      console.log(this.selectedGridInfo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head {
    width: 100%;
    text-align: left;
    background-color: #16F6F6;
    height: 24px;
  }

  .content {
    width: 100%;
    display: block;
  }

  .icon {
    font-size: 12px;
    padding-left: 12px;
    color: #ab51ab;
    line-height: 24px;
    height: 20px;
    margin: 0;
    margin-left: 30px;
    float: left;
    width: 300px;
    font-weight: 100;
  }
</style>
