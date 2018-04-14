<template>
  <div ida="dhxMainCont" class="header" :style="'height:' + height + 'px;width:'+ sumWidth + 'px;'" :v-show="show">
    <div id="dhxGridObj_UnP8gAZY2h7n" class="gridbox">
      <div class="xhdr">
        <img src="/static/images/sort_desc.gif" style="display: none; position: absolute;">
        <table cellpadding="0" cellspacing="0" class="hdr">
          <tbody>
          <tr style="height: 0px;">
            <!--1st th is for the checkbox-->
            <th style="width: 40px;" v-if="showCheckbox"></th>
            <th v-for="(val,i) in gridWidthInfo" :key="i" :style="'width:' + val + 'px;'"/>
          </tr>
          <tr class="hdrtr">
            <td class="hdrtd" style="cursor: default;" v-if="showCheckbox">
              <div class="hdrcell">
                <input type="checkbox">
              </div>
            </td>
            <td v-for="(val,i) in gridTitleInfo"
                :key="i"
                class="hdrtd">
              <div class="hdrcell">{{val}}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="objbox">
        <table cellpadding="0" cellspacing="0" class="obj row20px" style="width: 100%; table-layout: fixed;">
          <tbody>
          <tr style="height: 0px;">
            <!--1st th is for the checkbox-->
            <th style="width: 40px;" v-if="showCheckbox"></th>
            <th v-for="(val,i) in gridWidthInfo" :key="i" :style="'width:' + val + 'px;'"/>
          </tr>
          <tr v-for="(val,i) in gridInfo"
              @click="rowSelect(i)"
              @dblclick="rowDoubleSelect(i)"
              :key="i"
              :class="className(i)">
            <td class="hdrcell2" title="" v-if="showCheckbox">
              <input type="checkbox">
            </td>
            <td v-for="(val2,j) in gridShowInfo"
                :key="j"
                :title="val[val2]"
                class="hdrtd">
              {{val[val2]}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCGridmain',
  data () {
    return {
      collapse: false,
      selectedRow: -1
    }
  },
  props: {
    gridInfo: {},
    gridTitleInfo: {},
    gridShowInfo: {},
    gridWidthInfo: {},
    title: {
      type: String,
      default: '标题'
    },
    param: '',
    isCollapse: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 200
    },
    show: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sumWidth () {
      let jw = 0
      for (let aw in this.gridWidthInfo) {
        jw += this.gridWidthInfo[aw]
      }
      if (this.showCheckbox) {
        jw += 40
      }
      return jw
    }
  },
  methods: {
    pclick () {
      this.isCollapse = !this.isCollapse
      this.$emit('click', this.param)
    },
    rowSelect (index) {
      this.selectedRow = index
      this.$emit('gridClick', index)
    },
    rowDoubleSelect (index) {
      this.selectedRow = index
      this.$emit('gridDBLClick', index)
    },
    className (index) {
      let classN = 'ev_light'
      if (index === this.selectedRow) {
        classN = 'selected'
      } else if (index % 2 === 1) {
        classN = 'odd_light'
      }
      return classN
    }
  }
}
</script>

<style scoped>
  .header {
    position: relative;
    left: 0px;
    top: 0px;
    overflow: hidden;
    width: 100%;
  }

  .gridbox {
    overflow: hidden;
    text-align: left;
    width: 100%;
    height: 100%;
    cursor: default;
    border: 0px solid white;
  }

  .xhdr {
    background-color: #eee;
    width: 100%;
    height: 30px;
    overflow: hidden;
    position: relative;
  }

  .hdr {
    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(253, 253, 253)), to(rgb(238, 240, 244)));
    display: table;
    border-collapse: separate;
    border-color: grey;
    margin-right: 20px;
    min-height: 30px;
    padding-right: 20px;
    vertical-align: middle;
    table-layout: fixed;
    width: 100%;
  }

  .hdrtr {
    display: table-row;
    vertical-align: top;
    border-color: inherit;
    border-collapse: separate;
  }

  .hdrtd {
    border-width: 1px;
    border-style: solid;
    border-collapse: separate;
    border-color: #ffffff #dfdfdf #dfdfdf #ffffff;
    cursor: default;
    display: table-cell;
    empty-cells: show;
    line-height: normal;
    padding: 5px 0px 5px 0px;
    vertical-align: middle;
    text-align: center;
  }

  .hdrcell2 {
    border-width: 1px;
    border-style: solid;
    border-collapse: separate;
    border-color: #ffffff #dfdfdf #dfdfdf #ffffff;
    cursor: default;
    display: table-cell;
    empty-cells: show;
    line-height: normal;
    padding: 0px;
    vertical-align: middle;
    text-align: center;
  }

  .hdrcell {
    width: auto;
    color: rgb(96, 98, 102);
    cursor: default;
    display: block;
    empty-cells: show;
    font-family: Tahoma;
    font-size: 12px;
    font-weight: bold;
    line-height: normal;
    text-align: center;
  }

  .objbox {
    background-color: white;
    position: relative;
    width: 100%;
    overflow: auto;
  }

  .ev_light {
    border-color: #808080 #808080 #d6d6d6 #808080;
    border-collapse: separate;
    display: table-row;
    font-size: 12px;
    vertical-align: middle;
    background-color: #ffffff;
  }
  .odd_light {
    border-color: #808080 #808080 #d6d6d6 #808080;
    border-collapse: separate;
    display: table-row;
    font-size: 12px;
    vertical-align: middle;
    background-color: #f6f6f6;
  }
  .selected {
    border-color: #808080 #808080 #d6d6d6 #808080;
    border-collapse: separate;
    display: table-row;
    font-size: 12px;
    vertical-align: middle;
    background-color: #ffde99;
  }
</style>
