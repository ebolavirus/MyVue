<template>
  <div>
    <bpm-c-toptitle title="附件(0)"
                    :isCollapse="true">
      <div class="attachmentdiv">
        <h3 class="headerBorder"></h3>
        <div class="bodyBorder">
          <bpm-c-attachlist/>
          <input type="button" class="blue" value="创建文档" @click="dialogVisible = true">
          <input type="button" class="blue" value="刷新">
        </div>
      </div>
    </bpm-c-toptitle>
    <saber-dialog title="创建文档"
                  :visible.sync="dialogVisible"
                  styleStr="padding: 25px 25px 30px"
                  width="400px"
                  :before-close="handleClose">
      <bpm-d-attachdialog />
      <span slot="footer">
        <input type="button" value="确定" class="blue" @click="dialogVisible = false">
        <input type="button" value="取消" class="blue" @click="dialogVisible = false">
      </span>
    </saber-dialog>
  </div>
</template>

<script>
export default {
  name: 'bpmDAttacharea',
  data () {
    return {
      dialogVisible: false,
      msg: 'Welcome to  Vue.js App'
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .attachmentdiv {
    width: 100%;
    height: 300px;
    background-color: #eff3f6;
  }

  .headerBorder {
    background-image: -webkit-gradient(linear, 0% 100%, 0% 0%, from(rgb(234, 234, 234)), to(rgb(221, 221, 221)));
    border: 1px solid #BBBBBB;
    border-top: 3px solid #1B76BC;
    margin: 0;
    padding: 7px 10px 4px 10px;
  }

  .bodyBorder {
    border: 1px solid #BBBBBB;
    border-top: 0px;
    padding: 5px;
  }

  .blue {
    align-items: flex-start;
    background-color: rgb(27, 117, 188);
    border-bottom-color: rgb(33, 72, 108);
    border-radius: 4px;
    border-bottom-style: solid;
    border: 1px;
    border-left-color: rgb(65, 120, 170);
    border-right-color: rgb(33, 72, 108);
    border-top-color: rgb(65, 120, 170);
    box-sizing: border-box;
    min-width: 100px;
    color: rgb(242, 242, 242);
    height: 30px;
    margin: 5px 5px 0px 0px;
    padding: 1px 6px 3px 6px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
