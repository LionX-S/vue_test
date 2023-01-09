<template>
  <div id="app">
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDOM">点我输出上方DOM元素</button>
    <School ref="sch"/>
  </div>
</template>

<script>
import School from "./components/School.vue";

export default {
  name: "App",
  data() {
    return {
      msg:'欢迎你学习vue'
    }
  },
  components: {
    School,
  },
  methods: {
    showDOM(){
      console.log(this.$refs.title);
      // 这里输出school的vc
      console.log(this.$refs.sch);
    }
  },
};
</script>

<style>

</style>
