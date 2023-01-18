<template>
  <div id="app">
    <!-- 自定义事件实现 （第一种写法 @或v-on） -->
    <Student v-on:getStudentName="getStudentName"></Student>
    <hr>
    <!-- 父传子 props实现 -->
    <School :getSchoolName="getSchoolName"></School>
    <!-- 自定义事件实现（第二种写法 使用ref属性） -->
    <!-- 这种写法比较灵活 可以延迟触发 -->
    <Student ref="student"></Student>
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from './components/School.vue';

export default {
  name: "App",
  components: {
    Student,
    School
  },
  methods:{
    getSchoolName(name) {
      console.log(name);
    },
    getStudentName(name) {
      console.log(name);
    }
  },
  mounted() {
    this.$refs.student.$on('getStudentName', this.getStudentName);
  }
};
</script>

<style>

</style>
