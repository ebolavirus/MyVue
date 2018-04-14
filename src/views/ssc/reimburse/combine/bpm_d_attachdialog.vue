<template>
  <div class="dijitDialogPaneContent" style="width: 340px; height: auto;">
    <form method="post" enctype="multipart/form-data">
      <fieldset>
        <legend>文档内容</legend>
        <table class="docAttachmentTableNoLines" cellspacing="3px" style="width: 100%; margin: 0px; border: none;">
          <tbody>
          <tr id="fileContent">
            <td align="left" width="180px" class="inputFieldLabel" style="border: none; display: none;">文件名</td>
            <td style="border: none;">
              <input type="file" name="fileContent" title="文件名" size="80">
            </td>
          </tr>
          </tbody>
        </table>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'bpmCAttachdialog',
  data () {
    return {
      msg: 'Welcome to  Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dijitDialogPaneContent {
    width: 30%;
    opacity: 1;
    z-index: 950;
    position: absolute;
    top: 10%;
  }
</style>
