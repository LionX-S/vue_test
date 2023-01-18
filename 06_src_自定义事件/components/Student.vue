<template>
  <div>
    <h2 @click="showName">姓名：{{ name }}</h2>
    <h2>性别：{{ sex }}</h2>
    <button @click="sendStudentName">点击将名字传递给app组件（自定义事件实现）</button>
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
  methods:{
    showName(){
      alert(this.name)
    },
    sendStudentName() {
      this.$emit('getStudentName',this.name);
    }
  }
 }
</script>
