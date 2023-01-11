<template>
  <div class="todo-footer" v-show="allLength">
    <input type="checkbox" v-model="allCheck"/>
    <label>已完成{{ getCompleteNum }}</label>/
    <label>全部{{allLength}}</label>
    <button class="btn btn-danger" @click="deleteAll">清除已完成任务</button>
  </div>
</template>

<script>

export default {
  name:'MyFooter',
  props:['todos', 'allSelected', 'allDelete'],
  computed:{
    getCompleteNum() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.done ? 1 : 0);
      },0)
    },
    allLength() {
      return this.todos.length;
    },
    allCheck: {
      get() {
        return this.getCompleteNum == this.allLength && this.allLength > 0;
      },
      set(value) {
        this.allSelected(value);
      }
    }
  },
  methods:{
    deleteAll() {
      this.allDelete();
    }
  }
}
</script>

<style >



