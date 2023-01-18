<template>
  <div>
    <h2>姓名：{{ name }}</h2>
    <h2>性别：{{ sex }}</h2>
    <button @click="sendStudentName">点击发送name给school组件</button>
  </div>
</template>

<script>
 export default {
  name: 'Student',
  data() {
    return {
      name:'张三',
      sex: '男'
    }
  },
  methods: {
    sendStudentName(){
      this.$bus.$emit('getStudentName',this.name);
    }
  }
 }
</script>
