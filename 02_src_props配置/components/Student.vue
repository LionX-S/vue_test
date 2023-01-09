<template>
  <div>
    <h2>姓名：{{ name }}</h2>
    <h2>性别：{{ sex }}</h2>
    <h2>年龄：{{ age }}</h2>
  </div>
</template>

<script>
 export default {
  name: 'Student',
  data() {
    return {
    }
  },
  // props:['name','sex','age'] //简单接收
  // 接收时对类型进行限制
  // props:{
  //   name:String,
  //   age:Number,
  //   sex:String
  // }
  props:{
    name:{
      type:String,
      required:true
    },
    age:{
      type:Number,
      default:20
    },
    sex:{
      type:String,
      required:true
    }
  }
 }
</script>
