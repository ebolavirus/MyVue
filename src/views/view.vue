<template>
  <div class="body">
    <bpm-c-navbar title="费用报销核算流程"></bpm-c-navbar>
    <bpm-d-basearea />
    <bpm-d-businessarea />
    <bpm-d-attacharea />
  </div>
</template>

<script>
export default {
  name: 'MainScene',
  data () {
    return {}
  },
  methods: {
    click_toptitle () {
      alert('点击')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.body {
  display: flex;
  flex-direction: column;
  font-family: "微软雅黑,Verdana,Helvetica,Arial", arial;
  font-size: 12px;
}
</style>
