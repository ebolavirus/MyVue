<template>
  <div class="blockContent">
    <div class="blockLeft">
      <span class="aSpan">{{title}}</span>
    </div>
    <div :class="pline === 1?'blockRightLong':'blockRight'">
      <span v-if="preadonly" class="aSpan">{{dateofrealValue}}</span>
      <input v-else type="date" class="aDate" @change="changeAction" v-model="realValue">
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCBlock',
  model: {
    prop: 'pcontent',
    event: 'changed'
  },
  props: {
    // 只读/可编辑,
    preadonly: {
      type: Boolean,
      default: false
    },
    // 可能占一整行或行的一半
    pline: {
      type: Number,
      default: 2
    },
    ptitle: {
      type: String,
      default: ' '
    },
    pcontent: {
      type: String,
      default: ' '
    }
  },
  data: function () {
    return {
      realValue: this.datetimeToString(this.pcontent, 'yyyy-MM-dd')
    }
  },
  watch: {
    pcontent (to) {
      this.realValue = this.datetimeToString(to, 'yyyy-MM-dd')
    }
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    },
    dateofrealValue () {
      return this.datetimeToString(this.realValue, 'yyyy-MM-dd')
    }
  },
  methods: {
    changeAction () {
      console.log(this.realValue)
      this.$emit('changed', this.realValue)
      this.$emit('valueChanged', this.realValue)
    },
    datetimeToString (date, format) {
      if (!date) {
        return ''
      }
      let aDate = new Date(date)
      var o = {
        'M+': aDate.getMonth() + 1, // month
        'd+': aDate.getDate(), // day
        'h+': aDate.getHours(), // hour
        'm+': aDate.getMinutes(), // minute
        's+': aDate.getSeconds(), // second
        S: aDate.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(
          RegExp.$1,
          (aDate.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      // console.log(format);
      return format
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blockContent {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .blockLeft {
    background-color: #f4f4f4;
    float: left;
    text-align: center;
    width: 140px;
    min-height: 26px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }
  .blockRight {
    background-color: #eff3f6;
    float: left;
    padding-left: 8px;
    min-height: 26px;
    width: 340px;
    min-width: 340px;
    text-align: start;
    border-bottom: 1px solid #e3e3e3;
  }
  .blockRightLong {
    background-color: #eff3f6;
    float: left;
    padding-left: 8px;
    min-height: 26px;
    width: 830px;
    min-width: 830px;
    text-align: start;
    border-bottom: 1px solid #e3e3e3;
  }
  .aSpan {
    display: block;
    margin-top: 4px;
  }
  .aDate {
    width: 240px;
    margin-top: 1px;
  }
</style>
