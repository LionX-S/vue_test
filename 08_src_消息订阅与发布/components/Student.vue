<template>
  <div>
    <h2>姓名：{{ name }}</h2>
    <h2>性别：{{ sex }}</h2>
    <button @click="sendStudentName">点击发送name给school组件</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
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
      pubsub.publish('hello', this.name);
    }
  }
 }
</script>
