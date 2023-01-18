<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <h2>获取到的学生名称：{{ studentName }}</h2>
  </div>
</template>

<script>
 import pubsub from 'pubsub-js';
 export default {
  name: 'Student',
  data() {
    return {
      name:'科技大学',
      address: '北京',
      studentName:''
    }
  },
  mounted(){
    this.pubid = pubsub.subscribe('hello', (msgName,data) => {
      this.studentName = data;
    })
  },
  beforeDestroy() {
    // 取消订阅
    pubsub.unsubscribe(this.pubid);
  }
 }
</script>
