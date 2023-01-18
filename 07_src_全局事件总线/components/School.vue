<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <h2>获取到的学生名称：{{ studentName }}</h2>
  </div>
</template>

<script>

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
    this.$bus.$on('getStudentName', (data) => {
      console.log('school组件收到data',data);
      this.studentName = data;
    })
  },
  beforeDestroy() {
    this.$bus.$off('getSudentName');
  }
 }
</script>
