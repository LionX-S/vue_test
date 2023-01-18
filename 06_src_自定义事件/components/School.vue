<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="sendSchoolName">点击将名字传递给app组件</button>
  </div>
</template>

<script>

 export default {
  name: 'Student',
  data() {
    return {
      name:'科技大学',
      address: '北京'
    }
  },
  methods:{
    sendSchoolName() {
      this.getSchoolName(this.name);
    }
  },
  props:['getSchoolName']
 }
</script>
